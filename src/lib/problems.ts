export type Lang = "python" | "c" | "cpp" | "java";

export type TestCase = { stdin: string; expected: string; hidden?: boolean };

export type Explanation = {
  intuition: string;
  approach: string;
  walkthrough: string;
  complexity: string;
};

export type Problem = {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  blurb: string;
  statement: string;
  starter: Record<Lang, string>;
  solution: Record<Lang, string>;
  tests: TestCase[];
  explanation: Explanation;
};

export const LANGUAGES: { key: Lang; label: string }[] = [
  { key: "python", label: "Python" },
  { key: "c", label: "C" },
  { key: "cpp", label: "C++" },
  { key: "java", label: "Java" },
];

export const problems: Problem[] = [
  {
    slug: "sum-two-numbers",
    title: "Sum of Two Numbers",
    difficulty: "Easy",
    topic: "warm-up",
    blurb: "Read two integers and print their sum. The classic first program.",
    statement:
      "Read two integers `a` and `b` from standard input (they may be on one line separated by a space, or on two lines) and print their sum.\n\nInput: two integers a and b.\nOutput: a single integer, a + b.",
    starter: {
      python: `a, b = map(int, input().split())\n# print their sum\n`,
      c: `#include <stdio.h>\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    // print their sum\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // print their sum\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt(), b = sc.nextInt();\n        // print their sum\n    }\n}\n`,
    },
    solution: {
      python: `a, b = map(int, input().split())\nprint(a + b)\n`,
      c: `#include <stdio.h>\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", a + b);\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt(), b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}\n`,
    },
    tests: [
      { stdin: "2 3", expected: "5" },
      { stdin: "10 20", expected: "30" },
      { stdin: "-4 9", expected: "5", hidden: true },
      { stdin: "0 0", expected: "0", hidden: true },
    ],
    explanation: {
      intuition:
        "There's no algorithm here — the point is the input/output contract every later problem builds on: read from stdin, compute, print to stdout. Get comfortable with how your language reads numbers.",
      approach:
        "Read the two integers with your language's standard input reader, add them, and print the result followed by a newline.",
      walkthrough:
        "`split()` (Python) / `scanf`/`cin`/`Scanner` (C/C++/Java) tokenise the input into two integers regardless of whether they're on one line or two. Adding them is `a + b`. Printing adds the trailing newline the checker expects.",
      complexity: "O(1) time and O(1) space — a fixed amount of work no matter the input values.",
    },
  },
  {
    slug: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "Easy",
    topic: "loops & conditionals",
    blurb: "Print 1..n, but Fizz for multiples of 3, Buzz for 5, FizzBuzz for both.",
    statement:
      "Read an integer `n`. For each number from 1 to n, print on its own line:\n\n- `Fizz` if it's divisible by 3,\n- `Buzz` if it's divisible by 5,\n- `FizzBuzz` if it's divisible by both,\n- otherwise the number itself.",
    starter: {
      python: `n = int(input())\nfor i in range(1, n + 1):\n    # decide what to print\n    pass\n`,
      c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        // decide what to print\n    }\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    for (int i = 1; i <= n; i++) {\n        // decide what to print\n    }\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        int n = new Scanner(System.in).nextInt();\n        for (int i = 1; i <= n; i++) {\n            // decide what to print\n        }\n    }\n}\n`,
    },
    solution: {
      python: `n = int(input())\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)\n`,
      c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        if (i % 15 == 0) printf("FizzBuzz\\n");\n        else if (i % 3 == 0) printf("Fizz\\n");\n        else if (i % 5 == 0) printf("Buzz\\n");\n        else printf("%d\\n", i);\n    }\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    for (int i = 1; i <= n; i++) {\n        if (i % 15 == 0) cout << "FizzBuzz\\n";\n        else if (i % 3 == 0) cout << "Fizz\\n";\n        else if (i % 5 == 0) cout << "Buzz\\n";\n        else cout << i << "\\n";\n    }\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        int n = new Scanner(System.in).nextInt();\n        for (int i = 1; i <= n; i++) {\n            if (i % 15 == 0) System.out.println("FizzBuzz");\n            else if (i % 3 == 0) System.out.println("Fizz");\n            else if (i % 5 == 0) System.out.println("Buzz");\n            else System.out.println(i);\n        }\n    }\n}\n`,
    },
    tests: [
      { stdin: "5", expected: "1\n2\nFizz\n4\nBuzz" },
      { stdin: "15", expected: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" },
      { stdin: "3", expected: "1\n2\nFizz", hidden: true },
    ],
    explanation: {
      intuition:
        "The trap is checking 3 and 5 separately and missing the both-case. The clean fix is to test the most specific condition first: divisible by 15 (i.e. by both 3 and 5) before either alone.",
      approach:
        "Loop i from 1 to n. Check `i % 15 == 0` first, then `i % 3`, then `i % 5`, else print i. Order matters — the FizzBuzz check must come before Fizz and Buzz.",
      walkthrough:
        "Divisible by both 3 and 5 is the same as divisible by 15, so a single `i % 15 == 0` captures the FizzBuzz case. Because it's checked first, 15, 30, 45… never fall through to the Fizz-only or Buzz-only branches. Everything else prints the number.",
      complexity: "O(n) time — one pass from 1 to n — and O(1) extra space.",
    },
  },
  {
    slug: "max-of-array",
    title: "Maximum of an Array",
    difficulty: "Easy",
    topic: "arrays & iteration",
    blurb: "Read n numbers and print the largest — the pattern behind every 'find the best' problem.",
    statement:
      "The first line contains an integer `n`. The second line contains `n` space-separated integers. Print the maximum value.",
    starter: {
      python: `n = int(input())\nnums = list(map(int, input().split()))\n# find and print the maximum\n`,
      c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d", &n);\n    int x, best;\n    // read n numbers, track the largest\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    // read n numbers, track the largest\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        // read n numbers, track the largest\n    }\n}\n`,
    },
    solution: {
      python: `n = int(input())\nnums = list(map(int, input().split()))\nprint(max(nums))\n`,
      c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d", &n);\n    int x, best = 0;\n    for (int i = 0; i < n; i++) {\n        scanf("%d", &x);\n        if (i == 0 || x > best) best = x;\n    }\n    printf("%d\\n", best);\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    int x, best = 0;\n    for (int i = 0; i < n; i++) {\n        cin >> x;\n        if (i == 0 || x > best) best = x;\n    }\n    cout << best << endl;\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int best = 0;\n        for (int i = 0; i < n; i++) {\n            int x = sc.nextInt();\n            if (i == 0 || x > best) best = x;\n        }\n        System.out.println(best);\n    }\n}\n`,
    },
    tests: [
      { stdin: "5\n3 7 2 9 4", expected: "9" },
      { stdin: "1\n42", expected: "42" },
      { stdin: "4\n-5 -2 -9 -1", expected: "-1", hidden: true },
      { stdin: "3\n10 10 10", expected: "10", hidden: true },
    ],
    explanation: {
      intuition:
        "Scanning for the biggest value is the template for every 'find the best' problem: hold a running champion, and challenge it against each new item. The only subtlety is where the champion starts.",
      approach:
        "Keep a variable `best`. Seed it with the first element (not 0 — negatives would break that), then for each remaining number, replace `best` when you see something larger.",
      walkthrough:
        "Initialising `best` to 0 is the classic bug: an all-negative array would wrongly report 0. Seeding with the first element (`i == 0 || x > best`) fixes it. Each comparison is O(1), and one pass visits every element once. Python's `max()` does exactly this under the hood.",
      complexity: "O(n) time — one comparison per element — and O(1) extra space beyond the input.",
    },
  },
  {
    slug: "reverse-string",
    title: "Reverse a String",
    difficulty: "Easy",
    topic: "strings",
    blurb: "Read a word and print it backwards. Meet your language's string tools.",
    statement: "Read a single word (no spaces) from input and print it reversed.",
    starter: {
      python: `s = input()\n# print s reversed\n`,
      c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[1001];\n    scanf("%s", s);\n    // print the characters in reverse\n    return 0;\n}\n`,
      cpp: `#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    // reverse and print\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        String s = new Scanner(System.in).next();\n        // print s reversed\n    }\n}\n`,
    },
    solution: {
      python: `s = input()\nprint(s[::-1])\n`,
      c: `#include <stdio.h>\n#include <string.h>\nint main() {\n    char s[1001];\n    scanf("%s", s);\n    for (int i = strlen(s) - 1; i >= 0; i--) putchar(s[i]);\n    putchar('\\n');\n    return 0;\n}\n`,
      cpp: `#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    reverse(s.begin(), s.end());\n    cout << s << endl;\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        String s = new Scanner(System.in).next();\n        System.out.println(new StringBuilder(s).reverse().toString());\n    }\n}\n`,
    },
    tests: [
      { stdin: "hello", expected: "olleh" },
      { stdin: "abc", expected: "cba" },
      { stdin: "racecar", expected: "racecar", hidden: true },
      { stdin: "a", expected: "a", hidden: true },
    ],
    explanation: {
      intuition: "Reversing is really just reading the characters from the last index down to the first. Every language gives you a shortcut, but they all do the same walk under the hood.",
      approach: "Read the word, then output its characters in reverse order — via a slice, a built-in reverse, or a manual loop from the end.",
      walkthrough: "Python's `s[::-1]` slices from end to start with step -1. C++ `reverse` swaps characters in place. Java's `StringBuilder.reverse()` does the same. The C version loops the index from `strlen(s)-1` down to 0 and prints each char.",
      complexity: "O(n) time for n characters, and O(n) space to hold the string (O(1) extra if you print char-by-char like the C version).",
    },
  },
  {
    slug: "count-vowels",
    title: "Count the Vowels",
    difficulty: "Easy",
    topic: "strings",
    blurb: "Count how many vowels are in a word — a first taste of scanning and counting.",
    statement: "Read a single lowercase word and print how many of its letters are vowels (a, e, i, o, u).",
    starter: {
      python: `s = input()\n# count vowels in s\n`,
      c: `#include <stdio.h>\nint main() {\n    char s[1001];\n    scanf("%s", s);\n    int count = 0;\n    // count the vowels\n    printf("%d\\n", count);\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    int count = 0;\n    // count the vowels\n    cout << count << endl;\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        String s = new Scanner(System.in).next();\n        int count = 0;\n        // count the vowels\n        System.out.println(count);\n    }\n}\n`,
    },
    solution: {
      python: `s = input()\nprint(sum(1 for c in s if c in "aeiou"))\n`,
      c: `#include <stdio.h>\nint main() {\n    char s[1001];\n    scanf("%s", s);\n    int count = 0;\n    for (int i = 0; s[i]; i++)\n        if (s[i]=='a'||s[i]=='e'||s[i]=='i'||s[i]=='o'||s[i]=='u') count++;\n    printf("%d\\n", count);\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    string s; cin >> s;\n    int count = 0;\n    for (char c : s) if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++;\n    cout << count << endl;\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        String s = new Scanner(System.in).next();\n        int count = 0;\n        for (char c : s.toCharArray()) if ("aeiou".indexOf(c) >= 0) count++;\n        System.out.println(count);\n    }\n}\n`,
    },
    tests: [
      { stdin: "hello", expected: "2" },
      { stdin: "sky", expected: "0" },
      { stdin: "education", expected: "5", hidden: true },
      { stdin: "aeiou", expected: "5", hidden: true },
    ],
    explanation: {
      intuition: "Counting matches is the bread-and-butter of string work: walk every character, and bump a counter whenever it's one you care about.",
      approach: "Start a counter at 0. For each character, check if it's one of a, e, i, o, u; if so, add one. Print the total.",
      walkthrough: "Each solution iterates the characters once. The check is a membership test — `c in \"aeiou\"` (Python), `\"aeiou\".indexOf(c) >= 0` (Java), or an explicit OR chain (C). The counter accumulates and is printed at the end.",
      complexity: "O(n) time for n characters and O(1) extra space — just the counter.",
    },
  },
  {
    slug: "factorial",
    title: "Factorial",
    difficulty: "Easy",
    topic: "loops & math",
    blurb: "Compute n! — your first look at how quickly numbers grow (and overflow).",
    statement: "Read an integer n (0 ≤ n ≤ 20) and print n! (the product 1×2×…×n). Note 0! = 1.",
    starter: {
      python: `n = int(input())\n# print n!\n`,
      c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d", &n);\n    long long f = 1;\n    // multiply 1..n\n    printf("%lld\\n", f);\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    long long f = 1;\n    // multiply 1..n\n    cout << f << endl;\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        int n = new Scanner(System.in).nextInt();\n        long f = 1;\n        // multiply 1..n\n        System.out.println(f);\n    }\n}\n`,
    },
    solution: {
      python: `n = int(input())\nf = 1\nfor i in range(2, n + 1):\n    f *= i\nprint(f)\n`,
      c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d", &n);\n    long long f = 1;\n    for (int i = 2; i <= n; i++) f *= i;\n    printf("%lld\\n", f);\n    return 0;\n}\n`,
      cpp: `#include <iostream>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    long long f = 1;\n    for (int i = 2; i <= n; i++) f *= i;\n    cout << f << endl;\n    return 0;\n}\n`,
      java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        int n = new Scanner(System.in).nextInt();\n        long f = 1;\n        for (int i = 2; i <= n; i++) f *= i;\n        System.out.println(f);\n    }\n}\n`,
    },
    tests: [
      { stdin: "5", expected: "120" },
      { stdin: "0", expected: "1" },
      { stdin: "10", expected: "3628800", hidden: true },
      { stdin: "1", expected: "1", hidden: true },
    ],
    explanation: {
      intuition: "A factorial is a running product: start at 1 and keep multiplying by the next number. The empty product (for 0!) is 1, which is why the loop starting at 2 handles 0 and 1 for free.",
      approach: "Initialise `f = 1`, loop i from 2 to n multiplying `f` by i each time, then print `f`.",
      walkthrough: "Seeding `f` at 1 means n = 0 and n = 1 both correctly print 1 (the loop body never runs or runs once with i beyond range). For larger n, `f` accumulates the product. Use a 64-bit type (`long`/`long long`) because factorials overflow a 32-bit int past 12!.",
      complexity: "O(n) time — one multiply per step — and O(1) space. Python integers are arbitrary-precision, so they never overflow; C/C++/Java need 64-bit and still overflow past 20!.",
    },
  },
];

export function getProblem(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}
