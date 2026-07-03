import OpenAI from "openai";
import { CHAT_MODEL, getClient } from "@/lib/llm";
import { LANGUAGE_LABELS, type Solution } from "@/lib/schema";

export const maxDuration = 300;

interface ChatRequest {
  question?: string;
  attempt?: string;
  solution?: Solution;
  messages?: { role: "user" | "assistant"; content: string }[];
}

function buildSystem(question: string, attempt: string | undefined, solution: Solution | undefined): string {
  const parts: string[] = [
    `You are the doubt-clearing mentor in a coding-education app for 1st-3rd year engineering students.

Rules:
- Ground every answer in the actual problem and code the student is looking at (provided below) — never a generic version of it.
- When the student shares their own broken code, default to Socratic debugging: ask what they expected vs. what they got, point at the likely fault line, and let them fix it. Give a full corrected rewrite only if they explicitly ask for one.
- You do NOT have web access. For version-specific facts (exact compiler messages, current library APIs), answer from knowledge and say plainly when you are not certain — never fabricate a citation or a version number.
- Keep answers focused and conversational — a few short paragraphs, not an essay. Plain prose; code snippets in backticks where needed.`,
  ];

  parts.push(`\n## The problem the student is viewing\n${question}`);

  if (attempt && attempt.trim()) {
    parts.push(`\n## The student's own attempt (before seeing the solution)\n${attempt}`);
  }

  if (solution) {
    const code = solution.solutions
      .map((s) => `### ${LANGUAGE_LABELS[s.language]}\n${s.code}\nComplexity: ${s.complexity.time} time, ${s.complexity.space} space.`)
      .join("\n\n");
    parts.push(`\n## The generated solution on the student's screen\nApproach: ${solution.approach}\n\n${code}`);
  }

  return parts.join("\n");
}

export async function POST(req: Request) {
  let body: ChatRequest;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const question = body.question?.trim();
  const history = body.messages ?? [];
  if (!question || history.length === 0 || history[history.length - 1].role !== "user") {
    return new Response("question and a messages array ending in a user message are required", { status: 400 });
  }

  const client = getClient();
  const system = buildSystem(question, body.attempt, body.solution);
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const completion = await client.chat.completions.create({
          model: CHAT_MODEL,
          max_tokens: 4000,
          temperature: 0.6,
          stream: true,
          messages: [
            { role: "system", content: system },
            ...history.map((m) => ({ role: m.role, content: m.content })),
          ],
        });
        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
        controller.close();
      } catch (error) {
        const message =
          error instanceof OpenAI.AuthenticationError
            ? "\n\n[NVIDIA API key missing or invalid — set NVIDIA_API_KEY in .env.local and restart the dev server.]"
            : error instanceof OpenAI.APIError
              ? `\n\n[LLM API error (${error.status}): ${error.message}]`
              : `\n\n[Error: ${error instanceof Error ? error.message : "unknown"}]`;
        controller.enqueue(encoder.encode(message));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
