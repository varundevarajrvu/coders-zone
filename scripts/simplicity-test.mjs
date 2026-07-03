import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

// Mirrors the simplicity rules in lib/solver.ts (condensed for a single-language probe)
const SYSTEM = `You are the solution engine of a coding-mentor app for 1st-3rd year engineering students.

Rules:
- SIMPLICITY IS THE PRIME DIRECTIVE. Write the solution a strong 2nd-year student would write on a good day — not what a competitive programmer would. Among all approaches that comfortably pass the constraints, always pick the one whose REASONING is simplest to explain, even when a cleverer approach is asymptotically better.
- Time beats space, simplicity beats space: when two approaches have the same time complexity, ALWAYS pick the simpler one even if it uses more memory. O(n) extra space is always acceptable unless the question explicitly forbids it. Never trade explainability for an O(1)-space trick.
- Calibration examples — follow these exactly:
  * "majority element" -> count occurrences with a hash map and return the key with count > n/2. NOT Boyer-Moore voting (that goes in the takeaways as one sentence).
  * "detect cycle in linked list" -> a visited set is the primary solution. Floyd's tortoise-and-hare is a takeaway mention.
  * "0/1 knapsack" -> the full 2D DP table. NOT the space-rolled 1D array.
- If a faster or more space-efficient but more complex approach exists, do NOT implement it — mention it in one takeaway sentence.

Respond with ONLY a JSON object: {"approach": string, "python_code": string, "takeaways": string[]}`;

const QUESTION =
  "Given an array of n integers (n up to 10^5), find the majority element - the element that appears more than n/2 times. It is guaranteed to exist.";

const model = process.argv[2] ?? "deepseek-ai/deepseek-v4-pro";
const t0 = Date.now();
const completion = await client.chat.completions.create({
  model,
  max_tokens: 4000,
  temperature: 0.2,
  response_format: { type: "json_object" },
  messages: [
    { role: "system", content: SYSTEM },
    { role: "user", content: QUESTION },
  ],
});
const secs = Math.round((Date.now() - t0) / 1000);
const raw = completion.choices[0]?.message?.content ?? "";
const data = JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, ""));
console.log(`MODEL: ${model} (${secs}s)`);
console.log(`APPROACH: ${data.approach.slice(0, 300)}`);
console.log(`\nPYTHON:\n${data.python_code}`);
console.log(`\nTAKEAWAYS:\n- ${data.takeaways.join("\n- ")}`);
