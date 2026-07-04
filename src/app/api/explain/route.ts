import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getProblem, type Lang } from "@/lib/problems";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";
const LANG_LABEL: Record<Lang, string> = { python: "Python", c: "C", cpp: "C++", java: "Java" };

export async function POST(req: NextRequest) {
  const { slug, language } = await req.json();
  const problem = getProblem(slug);
  if (!problem) return Response.json({ error: "Unknown problem" }, { status: 404 });

  const lang = (language as Lang) in LANG_LABEL ? (language as Lang) : "python";

  // No key configured → serve the hand-written explanation. Keeps the app fully usable.
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ ...problem.explanation, source: "builtin" });
  }

  try {
    const client = new Anthropic();
    const prompt = `You are a patient CS tutor for a beginner. Explain the reference solution to a coding problem in exactly four short paragraphs.

Problem: ${problem.title}
Statement: ${problem.statement}
Language: ${LANG_LABEL[lang]}
Reference solution:
\`\`\`
${problem.solution[lang]}
\`\`\`

Reply with ONLY a JSON object (no markdown, no code fences) with these string keys:
- "intuition": the plain-language idea before any code — the shape of the problem and why the approach works.
- "approach": the plan in words — data structure, the key step repeated.
- "walkthrough": a line-by-line prose walkthrough of THIS ${LANG_LABEL[lang]} solution. Not code comments — sentences.
- "complexity": time and space complexity, each with the reason, not just big-O letters.
Keep each value to 2-4 sentences, warm and concrete.`;

    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 1600,
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
    if (parsed.intuition && parsed.approach && parsed.walkthrough && parsed.complexity) {
      return Response.json({
        intuition: String(parsed.intuition),
        approach: String(parsed.approach),
        walkthrough: String(parsed.walkthrough),
        complexity: String(parsed.complexity),
        source: "ai",
      });
    }
    return Response.json({ ...problem.explanation, source: "builtin" });
  } catch {
    // Any API/parse failure → fall back to the built-in explanation.
    return Response.json({ ...problem.explanation, source: "builtin" });
  }
}
