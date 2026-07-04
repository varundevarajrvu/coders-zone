import { NextRequest } from "next/server";
import { runCode } from "@/lib/piston";
import type { Lang } from "@/lib/problems";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { language, source, stdin } = await req.json();
  if (!language || typeof source !== "string") {
    return Response.json({ error: "language and source are required" }, { status: 400 });
  }
  const result = await runCode(language as Lang, source, typeof stdin === "string" ? stdin : "");
  return Response.json(result);
}
