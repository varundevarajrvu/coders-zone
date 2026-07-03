import OpenAI from "openai";
import { NextResponse } from "next/server";
import {
  questionHash,
  readCachedSolution,
  recordMetric,
  writeCachedSolution,
} from "@/lib/cache";
import { checkConsistency, generateSolution } from "@/lib/solver";
import type { SolveResponse } from "@/lib/schema";

// Generation + verification is two full model passes — allow a long window.
export const maxDuration = 800;

interface SolveRequest {
  question?: string;
  attempt?: string;
  skipped?: boolean;
}

export async function POST(req: Request) {
  let body: SolveRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const question = body.question?.trim();
  if (!question) {
    return NextResponse.json({ error: "Question is required" }, { status: 400 });
  }

  // Attempt-first gate (PRD §6.3): full solver output requires a logged
  // attempt or an explicit skip. Enforced server-side, not just in the UI.
  const hasAttempt = typeof body.attempt === "string" && body.attempt.trim().length > 0;
  if (!hasAttempt && body.skipped !== true) {
    return NextResponse.json(
      { error: "An attempt (or an explicit skip) is required before the full solution" },
      { status: 403 },
    );
  }
  recordMetric(hasAttempt ? "attempt" : "skip");

  const hash = questionHash(question);
  const cached = readCachedSolution<Omit<SolveResponse, "cached">>(hash);
  if (cached) {
    recordMetric("cache_hit");
    return NextResponse.json({ ...cached, cached: true } satisfies SolveResponse);
  }

  try {
    const solution = await generateSolution(question);
    const verification = await checkConsistency(question, solution);
    const payload = { solution, verification };
    writeCachedSolution(hash, payload);
    recordMetric("generation");
    return NextResponse.json({ ...payload, cached: false } satisfies SolveResponse);
  } catch (error) {
    if (error instanceof OpenAI.AuthenticationError) {
      return NextResponse.json(
        { error: "NVIDIA API key missing or invalid. Set NVIDIA_API_KEY in .env.local and restart the dev server." },
        { status: 401 },
      );
    }
    if (error instanceof OpenAI.RateLimitError) {
      return NextResponse.json(
        { error: "Rate limited by the API — wait a moment and try again." },
        { status: 429 },
      );
    }
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `LLM API error (${error.status}): ${error.message}` },
        { status: 502 },
      );
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
