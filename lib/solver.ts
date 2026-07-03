import type OpenAI from "openai";
import { z } from "zod";
import { getClient, SOLVER_MODEL } from "./llm";
import {
  ConsistencyVerdictSchema,
  LANGUAGES,
  SolutionSchema,
  type ConsistencyVerdict,
  type Solution,
} from "./schema";

const SOLVER_SYSTEM = `You are the solution engine of a coding-mentor app for 1st-3rd year engineering students. Given a coding question, produce solutions in exactly four languages — C, C++, Java, Python — in a fixed teaching format.

Rules:
- SIMPLICITY IS THE PRIME DIRECTIVE. Write the solution a strong 2nd-year student would write on a good day — not what a competitive programmer would. Among all approaches that comfortably pass the constraints, always pick the one whose REASONING is simplest to explain, even when a cleverer approach is asymptotically better. Efficient enough beats maximally efficient.
- Time beats space, simplicity beats space: when two approaches have the same time complexity, ALWAYS pick the simpler one even if it uses more memory. O(n) extra space is always acceptable unless the question explicitly forbids it. Never trade explainability for an O(1)-space trick.
- Calibration examples of what this means — follow these exactly:
  * "majority element" -> count occurrences with a hash map and return the key with count > n/2. NOT Boyer-Moore voting (that goes in the takeaways as one sentence).
  * "detect cycle in linked list" -> a visited set is the primary solution. Floyd's tortoise-and-hare is a takeaway mention.
  * "0/1 knapsack" -> the full 2D DP table with clear row/column meaning. NOT the space-rolled 1D array.
  * "reverse bits / count set bits" -> a simple loop, not bit-twiddling hacks.
- If the question states constraints (e.g. n <= 10^5), the solution must pass them — never give a brute-force solution that would TLE. But within the passing complexity class, choose the most straightforward algorithm and the most boring implementation of it.
- No cleverness for its own sake: no bit tricks, no dense one-liners, no premature micro-optimization, no unnecessary helper abstractions, no exotic data structures when a plain array/map/set does the job. Short functions, flat control flow, obvious variable names.
- If a notably faster or more space-efficient but more complex approach exists, do NOT implement it — instead mention it in one sentence in the summary takeaways (e.g. "Boyer-Moore voting does this in O(1) space — worth learning later") so the student knows it exists.
- Intuition before code. The approach section must let a student roughly predict the code before seeing it.
- Code must be complete, runnable, and idiomatic for each language — not a transliteration of one language into four syntaxes. Use the natural idiom of each (e.g. STL in C++, streams only where natural in Java, list comprehensions in Python where they aid clarity) — but stick to the simple, everyday subset of that idiom.
- All four solutions must implement the same algorithm and agree on edge-case behavior (empty input, duplicates, overflow where relevant).
- The solutions array must contain exactly four entries, one per language key: "c", "cpp", "java", "python".
- Walkthroughs are plain language for a student who may be seeing the idiom for the first time. No jargon left unexplained.
- Complexity justifications explain WHY, in one or two sentences — never just the big-O symbol.
- Explanations are plain prose (no markdown syntax) — they render as plain text.`;

const CHECKER_SYSTEM = `You are an adversarial reviewer in a coding-mentor app's verification pipeline. You are given a coding question and four solutions (C, C++, Java, Python) that claim to implement the same algorithm.

Your job is to try to REFUTE the claim that these solutions are correct and mutually consistent, not to confirm it. Perform at minimum:
1. Trace each solution mentally against 2-3 concrete inputs, including at least one edge case (empty input, single element, duplicates, boundary values). Do the four produce identical results?
2. Check the four implement the same algorithm — not merely similar-looking code.
3. Check the stated time/space complexity claims actually hold for the code as written.
4. Check for language-specific faults: integer overflow in C/C++/Java, off-by-one in loop bounds, mutation bugs, missing input-size handling.

Do NOT flag a solution merely for being less than optimally efficient — this product deliberately prefers the simplest approach that passes the stated constraints. Only flag complexity if the stated claim is false for the code as written, or if the chosen approach would actually violate the question's constraints.

Report every concrete issue you find. The issues array is for CONFIRMED problems only — if a line of investigation concludes "actually this is fine", it belongs in checksPerformed, never in issues. Do not narrate your reasoning inside an issue entry; state the fault and the input that triggers it in 1-3 sentences. If you find no confirmed issues after genuinely trying, and only then, report consistent = true. IMPORTANT: your verdict establishes self-consistency only — it is NOT proof of correctness against ground truth, and the product labels it accordingly. Be strict: a false "consistent" is far worse than a false alarm.`;

// Open models on NIM don't enforce output schemas server-side the way a
// json_schema response format would, so: JSON mode + the schema in the
// prompt + zod validation, with one corrective retry on failure.
async function structuredCall<S extends z.ZodType>(
  schema: S,
  system: string,
  user: string,
  maxTokens: number,
): Promise<z.infer<S>> {
  const client = getClient();
  const jsonSchema = JSON.stringify(z.toJSONSchema(schema));
  const systemWithSchema = `${system}\n\nRespond with ONLY a single JSON object — no markdown fences, no commentary — that validates against this JSON Schema:\n${jsonSchema}`;

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: "system", content: systemWithSchema },
    { role: "user", content: user },
  ];

  let lastError = "";
  for (let round = 0; round < 2; round++) {
    if (round > 0) {
      messages.push({
        role: "user",
        content: `Your previous output failed validation: ${lastError}\nOutput the corrected JSON object only.`,
      });
    }
    const completion = await client.chat.completions.create({
      model: SOLVER_MODEL,
      max_tokens: maxTokens,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages,
    });
    const choice = completion.choices[0];
    const raw = choice?.message?.content ?? "";
    if (choice?.finish_reason === "length") {
      throw new Error("Output was truncated — the response exceeded the token limit");
    }
    const cleaned = raw
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```\s*$/, "");
    try {
      return schema.parse(JSON.parse(cleaned));
    } catch (e) {
      lastError = e instanceof Error ? e.message.slice(0, 2000) : "unparseable output";
      messages.push({ role: "assistant", content: raw });
    }
  }
  throw new Error(`Model output failed schema validation after a retry: ${lastError.slice(0, 300)}`);
}

export async function generateSolution(question: string): Promise<Solution> {
  const solution = await structuredCall(SolutionSchema, SOLVER_SYSTEM, question, 16384);

  const present = new Set(solution.solutions.map((s) => s.language));
  const missing = LANGUAGES.filter((l) => !present.has(l));
  if (missing.length > 0) {
    throw new Error(`Generated solution is missing languages: ${missing.join(", ")}`);
  }
  return solution;
}

export async function checkConsistency(
  question: string,
  solution: Solution,
): Promise<ConsistencyVerdict> {
  const codeSections = solution.solutions
    .map((s) => `### ${s.language}\n\`\`\`\n${s.code}\n\`\`\`\nClaimed complexity: ${s.complexity.time} time, ${s.complexity.space} space — ${s.complexity.justification}`)
    .join("\n\n");

  return structuredCall(
    ConsistencyVerdictSchema,
    CHECKER_SYSTEM,
    `## Question\n${question}\n\n## Claimed approach\n${solution.approach}\n\n## The four solutions\n${codeSections}`,
    8192,
  );
}
