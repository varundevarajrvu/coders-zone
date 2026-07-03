import { NextResponse } from "next/server";
import { recordMetric } from "@/lib/cache";
import { getProblem, type TestCase } from "@/lib/problems";
import { LANGUAGES, type LanguageKey } from "@/lib/schema";

export const maxDuration = 300;

// Wandbox: an existing, hardened public execution engine — never a custom
// sandbox (PRD §3/§8; "Judge0 or equivalent"). The public Piston API went
// whitelist-only in Feb 2026, so Wandbox is the keyless equivalent.
const WANDBOX_URL = process.env.WANDBOX_URL ?? "https://wandbox.org/api/compile.json";
const UA = "coders-zone-beta/0.1 (education)";

// Wandbox saves source as prog.java — Java code must use a non-public
// `class Main` (enforced in the starter template + editor hint).
const COMPILERS: Record<LanguageKey, string> = {
  c: "gcc-13.2.0-c",
  cpp: "gcc-13.2.0",
  java: "openjdk-jdk-22+36",
  python: "cpython-3.14.0",
};

interface JudgeRequest {
  problemId?: string;
  language?: LanguageKey;
  code?: string;
}

interface WandboxResult {
  status?: string;
  signal?: string;
  compiler_error?: string;
  compiler_message?: string;
  program_output?: string;
  program_error?: string;
  program_message?: string;
}

async function runOnce(compiler: string, code: string, stdin: string): Promise<WandboxResult> {
  const res = await fetch(WANDBOX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": UA },
    body: JSON.stringify({ compiler, code, stdin }),
  });
  if (res.status === 429) {
    throw new Error("Execution engine is rate-limiting — wait a few seconds and submit again");
  }
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Execution engine error (${res.status}): ${detail.slice(0, 200)}`);
  }
  return (await res.json()) as WandboxResult;
}

function normalize(out: string): string {
  return out
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim();
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  let body: JudgeRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const problem = body.problemId ? getProblem(body.problemId) : undefined;
  const language = body.language;
  const code = body.code ?? "";
  if (!problem || !language || !LANGUAGES.includes(language) || code.trim().length === 0) {
    return NextResponse.json(
      { error: "problemId, language (c|cpp|java|python) and code are required" },
      { status: 400 },
    );
  }

  recordMetric("judge_submission");
  const compiler = COMPILERS[language];

  try {
    const tests: (TestCase & { isSample: boolean })[] = [
      ...problem.samples.map((t) => ({ ...t, isSample: true })),
      ...problem.hidden.map((t) => ({ ...t, isSample: false })),
    ];

    let passed = 0;
    for (let i = 0; i < tests.length; i++) {
      // be polite to the public engine
      if (i > 0) await wait(300);
      const result = await runOnce(compiler, code, tests[i].input);

      const compileError = (result.compiler_error ?? "").trim();
      const exitOk = result.status === "0" && !result.signal;
      if (!exitOk && compileError && !(result.program_output ?? "").trim() && !(result.program_error ?? "").trim()) {
        return NextResponse.json({
          verdict: "compile_error",
          passed: 0,
          total: tests.length,
          detail: compileError.slice(0, 4000),
        });
      }
      if (!exitOk) {
        const detail =
          (result.program_error ?? "").trim() ||
          (result.signal ? `killed by signal ${result.signal} (infinite loop or out of memory?)` : `exit code ${result.status}`);
        return NextResponse.json({
          verdict: "runtime_error",
          passed,
          total: tests.length,
          failed: { index: i + 1, input: tests[i].input, isSample: tests[i].isSample },
          detail: detail.slice(0, 4000),
        });
      }
      if (normalize(result.program_output ?? "") !== normalize(tests[i].output)) {
        return NextResponse.json({
          verdict: "wrong_answer",
          passed,
          total: tests.length,
          failed: {
            index: i + 1,
            input: tests[i].input,
            expected: tests[i].output.trim(),
            got: normalize(result.program_output ?? "").slice(0, 2000),
            isSample: tests[i].isSample,
          },
        });
      }
      passed++;
    }

    return NextResponse.json({ verdict: "accepted", passed, total: tests.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown judging error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
