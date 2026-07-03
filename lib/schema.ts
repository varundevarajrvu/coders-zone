import { z } from "zod";

export const LANGUAGES = ["c", "cpp", "java", "python"] as const;
export type LanguageKey = (typeof LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<LanguageKey, string> = {
  c: "C",
  cpp: "C++",
  java: "Java",
  python: "Python",
};

export const LanguageSolutionSchema = z.object({
  language: z.enum(LANGUAGES),
  code: z
    .string()
    .describe("Complete, runnable, idiomatic solution in this language"),
  walkthrough: z
    .array(
      z.object({
        lines: z
          .string()
          .describe("Which part of the code this explains, e.g. 'lines 4-9' or the function name"),
        explanation: z
          .string()
          .describe("Plain-language explanation; no jargon left unexplained"),
      }),
    )
    .describe("Line-by-line walkthrough mapped to the code"),
  complexity: z.object({
    time: z.string().describe("e.g. O(n log n)"),
    space: z.string().describe("e.g. O(n)"),
    justification: z
      .string()
      .describe("One or two sentences on WHY these bounds hold"),
  }),
});

export const SolutionSchema = z.object({
  restatement: z
    .string()
    .describe("One line restating the problem, confirming correct understanding"),
  approach: z
    .string()
    .describe(
      "Plain-language approach and intuition, BEFORE any code: what's the idea, why this idea. A reader should be able to roughly predict the code from this.",
    ),
  solutions: z
    .array(LanguageSolutionSchema)
    .describe("Exactly four entries: one each for c, cpp, java, python"),
  summary: z.object({
    takeaways: z.array(z.string()).describe("3-5 bullet key takeaways"),
    commonMistake: z
      .string()
      .describe("One common mistake students make on this pattern"),
  }),
});

export type Solution = z.infer<typeof SolutionSchema>;
export type LanguageSolution = z.infer<typeof LanguageSolutionSchema>;

export const ConsistencyVerdictSchema = z.object({
  consistent: z
    .boolean()
    .describe(
      "True only if all four solutions implement the same algorithm, agree on edge-case behavior, and the complexity claims hold",
    ),
  checksPerformed: z
    .array(z.string())
    .describe("Short descriptions of each check actually performed"),
  issues: z
    .array(
      z.object({
        where: z
          .string()
          .describe("Which language/section the issue is in, e.g. 'java' or 'complexity claim'"),
        description: z.string(),
      }),
    )
    .describe("Concrete problems found; empty if none"),
});

export type ConsistencyVerdict = z.infer<typeof ConsistencyVerdictSchema>;

export interface SolveResponse {
  solution: Solution;
  verification: ConsistencyVerdict;
  cached: boolean;
}
