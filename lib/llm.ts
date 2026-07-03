import OpenAI from "openai";

// NVIDIA NIM exposes an OpenAI-compatible API. Which models are available
// depends on the key — see https://build.nvidia.com.
const NIM_BASE_URL = "https://integrate.api.nvidia.com/v1";

let client: OpenAI | null = null;

export function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY ?? "",
      baseURL: NIM_BASE_URL,
    });
  }
  return client;
}

// glm-5.2 matched deepseek-v4-pro on solution quality/simplicity in probes
// while being ~7x faster on this endpoint (v4-pro solves ran 4-8 minutes).
export const SOLVER_MODEL = process.env.SOLVER_MODEL ?? "z-ai/glm-5.2";
// Chat default chosen empirically on this endpoint: v4-flash had 2-minute
// latencies, kimi-k2.6's content stream emitted junk prefixes; glm-5.2 was
// fast and clean. Override with CHAT_MODEL if the endpoint changes.
export const CHAT_MODEL = process.env.CHAT_MODEL ?? "z-ai/glm-5.2";
