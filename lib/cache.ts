import fs from "fs";
import path from "path";
import crypto from "crypto";

const CACHE_DIR = path.join(process.cwd(), ".cache");
const SOLUTIONS_DIR = path.join(CACHE_DIR, "solutions");
const METRICS_FILE = path.join(CACHE_DIR, "metrics.json");

function ensureDirs() {
  fs.mkdirSync(SOLUTIONS_DIR, { recursive: true });
}

// Same question asked by many students each semester — cache by normalized
// hash so we don't regenerate (and re-verify) from scratch every time.
export function questionHash(question: string): string {
  const normalized = question.trim().toLowerCase().replace(/\s+/g, " ");
  return crypto.createHash("sha256").update(normalized).digest("hex").slice(0, 24);
}

export function readCachedSolution<T>(hash: string): T | null {
  const file = path.join(SOLUTIONS_DIR, `${hash}.json`);
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return null;
  }
}

export function writeCachedSolution(hash: string, data: unknown): void {
  ensureDirs();
  const file = path.join(SOLUTIONS_DIR, `${hash}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

export type MetricKind = "attempt" | "skip" | "generation" | "cache_hit" | "judge_submission";

// Skip-to-answer rate is a first-class product metric (PRD §10) — an honest
// cost signal, not a vanity number. Recorded server-side so it can't be
// dodged by the client.
export function recordMetric(kind: MetricKind): void {
  ensureDirs();
  let metrics: Record<string, number> = {};
  try {
    metrics = JSON.parse(fs.readFileSync(METRICS_FILE, "utf8"));
  } catch {
    // first write
  }
  metrics[kind] = (metrics[kind] ?? 0) + 1;
  fs.writeFileSync(METRICS_FILE, JSON.stringify(metrics, null, 2), "utf8");
}
