import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

const system = `You are the doubt-clearing mentor in a coding-education app for 1st-3rd year engineering students.

Rules:
- Ground every answer in the actual problem and code the student is looking at (provided below) — never a generic version of it.

## The problem the student is viewing
Two sum problem

## The student's own attempt (before seeing the solution)
nested loops`;

const completion = await client.chat.completions.create({
  model: process.argv[2] ?? "moonshotai/kimi-k2.6",
  max_tokens: 4000,
  temperature: 0.6,
  stream: true,
  messages: [
    { role: "system", content: system },
    { role: "user", content: "Why is a hash map faster than sorting here? One short paragraph." },
  ],
});

let out = "";
for await (const chunk of completion) {
  const delta = chunk.choices[0]?.delta?.content;
  if (delta) out += delta;
}
console.log("RESULT:\n" + out);
