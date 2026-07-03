import type { LanguageKey } from "./schema";

export interface TestCase {
  input: string;
  output: string;
}

export interface PracticeProblem {
  id: string;
  title: string;
  topic: string;
  difficulty: "warm-up" | "easy" | "medium";
  statement: string;
  inputFormat: string;
  outputFormat: string;
  samples: TestCase[];
  hidden: TestCase[];
  /** Standalone question text for the /solve deep link. */
  solverPrompt: string;
}

// Curated and stdin/stdout-based so a real execution engine can judge them —
// dozens not thousands (PRD §6.4). Sample tests are shown; hidden ones aren't.
export const PROBLEMS: PracticeProblem[] = [
  {
    id: "sum-array",
    title: "Sum of an array",
    topic: "arrays",
    difficulty: "warm-up",
    statement:
      "Read an array of n integers and print the sum of all its elements. A warm-up: get the input parsing right and the rest follows.",
    inputFormat: "Line 1: n (1 ≤ n ≤ 10^5). Line 2: n space-separated integers (each |x| ≤ 10^6).",
    outputFormat: "A single integer — the sum.",
    samples: [
      { input: "5\n1 2 3 4 5\n", output: "15" },
      { input: "3\n-1 5 2\n", output: "6" },
    ],
    hidden: [
      { input: "1\n42\n", output: "42" },
      { input: "4\n1000000 1000000 1000000 1000000\n", output: "4000000" },
    ],
    solverPrompt:
      "Write a complete program that reads from standard input: first line n (1 ≤ n ≤ 10^5), second line n space-separated integers (each up to 10^6 in absolute value), and prints the sum of the array to standard output. Watch for the sum exceeding 32-bit range.",
  },
  {
    id: "two-sum",
    title: "Two sum (indices)",
    topic: "arrays · hashing",
    difficulty: "easy",
    statement:
      "Given an array and a target k, print the indices of the two numbers that add up to k. Exactly one valid pair exists. Print the smaller index first.",
    inputFormat: "Line 1: n and k (2 ≤ n ≤ 10^5). Line 2: n space-separated integers.",
    outputFormat: "Two 0-based indices i j with i < j, separated by a space.",
    samples: [
      { input: "4 9\n2 7 11 15\n", output: "0 1" },
      { input: "3 6\n3 2 4\n", output: "1 2" },
    ],
    hidden: [
      { input: "2 10\n5 5\n", output: "0 1" },
      { input: "5 0\n-3 8 3 1 7\n", output: "0 2" },
    ],
    solverPrompt:
      "Write a complete program reading from standard input: first line n and k (2 ≤ n ≤ 10^5), second line n space-separated integers. Exactly one pair of elements sums to k. Print the two 0-based indices, smaller first, space-separated. Aim for O(n) with a hash map, not O(n^2).",
  },
  {
    id: "reverse-string",
    title: "Reverse a string",
    topic: "strings",
    difficulty: "warm-up",
    statement:
      "Read one line and print it reversed. Sounds trivial — the interesting part is how each language holds a string.",
    inputFormat: "A single line s (1 ≤ |s| ≤ 10^4). May contain spaces.",
    outputFormat: "The line reversed.",
    samples: [
      { input: "hello\n", output: "olleh" },
      { input: "never odd or even\n", output: "neve ro ddo reven" },
    ],
    hidden: [
      { input: "a\n", output: "a" },
      { input: "racecar\n", output: "racecar" },
    ],
    solverPrompt:
      "Write a complete program that reads a single line (up to 10^4 characters, may contain spaces) from standard input and prints it reversed. Discuss how strings differ across C, C++, Java and Python (mutability, reading a full line safely).",
  },
  {
    id: "fibonacci",
    title: "Nth Fibonacci number",
    topic: "recursion · dp",
    difficulty: "easy",
    statement:
      "Print the nth Fibonacci number, where F(0) = 0 and F(1) = 1. Naive recursion will not survive n = 50 — that's the point.",
    inputFormat: "A single integer n (0 ≤ n ≤ 50).",
    outputFormat: "F(n).",
    samples: [
      { input: "10\n", output: "55" },
      { input: "1\n", output: "1" },
    ],
    hidden: [
      { input: "50\n", output: "12586269025" },
      { input: "0\n", output: "0" },
    ],
    solverPrompt:
      "Write a complete program that reads a single integer n (0 ≤ n ≤ 50) from standard input and prints the nth Fibonacci number (F(0)=0, F(1)=1). Explain why naive recursion is exponential and fix it with iteration or memoization. Note that F(50) overflows 32-bit integers.",
  },
  {
    id: "balanced-brackets",
    title: "Balanced brackets",
    topic: "stacks",
    difficulty: "easy",
    statement:
      "Given a string of brackets ()[]{}, decide whether it is balanced: every opener closes in the right order with the right type.",
    inputFormat: "A single line containing only the characters ()[]{} (1 ≤ |s| ≤ 10^4).",
    outputFormat: "\"yes\" if balanced, \"no\" otherwise.",
    samples: [
      { input: "()[]{}\n", output: "yes" },
      { input: "(]\n", output: "no" },
    ],
    hidden: [
      { input: "([{}])\n", output: "yes" },
      { input: "(((\n", output: "no" },
      { input: "([)]\n", output: "no" },
    ],
    solverPrompt:
      "Write a complete program that reads one line containing only the bracket characters ()[]{} (length up to 10^4) from standard input and prints \"yes\" if the brackets are balanced and \"no\" otherwise. Use a stack; explain why a counter alone is not enough.",
  },
  {
    id: "second-largest",
    title: "Second largest (distinct)",
    topic: "arrays",
    difficulty: "easy",
    statement:
      "Find the second largest distinct value in an array — in one pass, without sorting. Duplicates of the maximum don't count.",
    inputFormat: "Line 1: n (2 ≤ n ≤ 10^5, at least two distinct values). Line 2: n integers.",
    outputFormat: "The second largest distinct value.",
    samples: [
      { input: "5\n3 1 4 1 5\n", output: "4" },
      { input: "4\n7 7 7 2\n", output: "2" },
    ],
    hidden: [
      { input: "2\n-5 -10\n", output: "-10" },
      { input: "6\n1 2 3 4 5 6\n", output: "5" },
    ],
    solverPrompt:
      "Write a complete program reading from standard input: first line n (2 ≤ n ≤ 10^5, guaranteed at least two distinct values), second line n integers. Print the second largest distinct value without sorting, in a single O(n) pass. Handle duplicates of the maximum correctly.",
  },
];

export function getProblem(id: string): PracticeProblem | undefined {
  return PROBLEMS.find((p) => p.id === id);
}

export const STARTER_CODE: Record<LanguageKey, string> = {
  c: `#include <stdio.h>

int main(void) {
    /* read from stdin with scanf/fgets, print with printf */

    return 0;
}
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // read from stdin with cin/getline, print with cout

    return 0;
}
`,
  java: `import java.util.*;

class Main {  // keep it 'class Main' (not public) — the judge requires it
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // read from stdin, print with System.out.println

    }
}
`,
  python: `import sys

data = sys.stdin.read()
# parse the input, print your answer
`,
};
