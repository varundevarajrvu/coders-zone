import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { Lang } from "@/lib/problems";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";
const LANG_LABEL: Record<Lang, string> = { python: "Python", c: "C", cpp: "C++", java: "Java" };

export async function POST(req: NextRequest) {
  const { problem, language } = await req.json();
  if (!problem || typeof problem !== "string" || !problem.trim()) {
    return Response.json({ error: "Describe a problem first." }, { status: 400 });
  }
  const lang: Lang = (language as Lang) in LANG_LABEL ? (language as Lang) : "python";

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({
      needsKey: true,
      error:
        "The AI Solver needs an Anthropic API key (set ANTHROPIC_API_KEY). Until then, try the Practice tab — those problems have ready-made verified solutions and explanations.",
    });
  }

  try {
    const client = new Anthropic();
    const prompt = `A student gives you a programming problem. Write a correct, complete solution in ${LANG_LABEL[lang]} and explain it.

The program must read any input from standard input and print the answer to standard output (${LANG_LABEL[lang]} conventions${lang === "java" ? "; the public class must be named Main" : ""}).

Problem from the student:
"""
${problem.slice(0, 4000)}
"""

Reply with ONLY a JSON object (no markdown fences) with keys:
- "code": the full runnable ${LANG_LABEL[lang]} program as a single string.
- "explanation": 3-5 sentences, beginner-friendly, explaining the idea and the key steps.
- "complexity": time and space complexity with the reason.`;

    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");

    const parsed = JSON.parse(text);
    if (parsed.code) {
      return Response.json({
        code: String(parsed.code),
        explanation: String(parsed.explanation || ""),
        complexity: String(parsed.complexity || ""),
        language: lang,
        source: "ai",
      });
    }
    return Response.json({ error: "The solver couldn't format a solution. Try rephrasing the problem." }, { status: 502 });
  } catch (e) {
    return Response.json({ error: `Solver error: ${(e as Error).message}` }, { status: 502 });
  }
}
