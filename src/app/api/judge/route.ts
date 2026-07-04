import { NextRequest } from "next/server";
import { runCode } from "@/lib/piston";
import { getProblem, type Lang } from "@/lib/problems";

export const runtime = "nodejs";
export const maxDuration = 60;

/** Normalise output for comparison: trim trailing spaces per line, drop trailing blank lines. */
function norm(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

export async function POST(req: NextRequest) {
  const { slug, language, source } = await req.json();
  const problem = getProblem(slug);
  if (!problem) return Response.json({ error: "Unknown problem" }, { status: 404 });
  if (!language || typeof source !== "string") {
    return Response.json({ error: "language and source are required" }, { status: 400 });
  }

  const results: {
    index: number;
    hidden: boolean;
    passed: boolean;
    stdin?: string;
    expected?: string;
    got?: string;
    stderr?: string;
  }[] = [];

  let passed = 0;
  let compileError: string | undefined;
  let message: string | undefined;

  for (let i = 0; i < problem.tests.length; i++) {
    const t = problem.tests[i];
    const r = await runCode(language as Lang, source, t.stdin);

    if (r.compileError) {
      compileError = r.compileError;
      break;
    }
    if (r.message) {
      message = r.message;
      break;
    }

    const ok = norm(r.stdout) === norm(t.expected);
    if (ok) passed++;
    results.push({
      index: i,
      hidden: !!t.hidden,
      passed: ok,
      ...(t.hidden
        ? {}
        : { stdin: t.stdin, expected: norm(t.expected), got: norm(r.stdout), stderr: r.stderr?.trim() || undefined }),
    });
  }

  return Response.json({
    total: problem.tests.length,
    passed,
    allPassed: !compileError && !message && passed === problem.tests.length,
    compileError,
    message,
    results,
  });
}
