"use client";

import { useState } from "react";

type Lang = "c" | "cpp" | "java" | "python";

const TABS: { key: Lang; label: string }[] = [
  { key: "c", label: "C" },
  { key: "cpp", label: "C++" },
  { key: "java", label: "Java" },
  { key: "python", label: "Python" },
];

const CODE: Record<Lang, string> = {
  c: `struct Node *reverse_list(struct Node *head) {
    struct Node *prev = NULL, *nxt;
    while (head != NULL) {
        nxt = head->next;   /* save where we're going */
        head->next = prev;  /* flip the arrow */
        prev = head;
        head = nxt;
    }
    return prev;
}`,
  cpp: `ListNode* reverse_list(ListNode* head) {
    ListNode* prev = nullptr;
    while (head != nullptr) {
        ListNode* nxt = head->next;  // save where we're going
        head->next = prev;           // flip the arrow
        prev = head;
        head = nxt;
    }
    return prev;
}`,
  java: `static Node reverseList(Node head) {
    Node prev = null;
    while (head != null) {
        Node nxt = head.next;   // save where we're going
        head.next = prev;       // flip the arrow
        prev = head;
        head = nxt;
    }
    return prev;
}`,
  python: `def reverse_list(head):
    prev = None
    while head:
        nxt = head.next          # save where we're going
        head.next = prev         # flip the arrow
        prev, head = head, nxt   # swap without a temp
    return prev`,
};

const NOTES: Record<Lang, string> = {
  c: "In C you're holding raw pointers — note the -> arrows and explicit NULL checks. Nothing cleans up after you.",
  cpp: "C++ says nullptr, not NULL — and in real code you'd think about who owns each node. The walkthrough goes there.",
  java: "Java has references, not pointers. Same rewiring — but the garbage collector quietly sweeps up whatever you drop.",
  python: "Python's tuple assignment swaps prev and head without a temp variable. Same algorithm, fewer moving parts.",
};

export function LanguageExplorer() {
  const [lang, setLang] = useState<Lang>("python");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: "clamp(28px,4vw,56px)", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div className="cz-mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--cz-accent)" }}>FIG. 02 — FOUR DIALECTS, ONE IDEA</div>
        <h2 style={{ margin: 0, fontFamily: "var(--cz-display)", fontSize: "clamp(28px,3.8vw,40px)", lineHeight: 1.12, letterSpacing: "-.02em", fontWeight: 700 }}>
          Your whole syllabus speaks here.
        </h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--cz-soft)" }}>
          The same algorithm, side by side in every language your curriculum uses. Reversing a linked list is one idea — flip one arrow per step — but each language says it differently.
        </p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, fontWeight: 500, color: "var(--cz-fg)" }}>{NOTES[lang]}</p>
      </div>

      <div className="cz-card" style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid var(--cz-panel-line)", padding: "0 12px", overflowX: "auto" }}>
          {TABS.map((t) => {
            const active = t.key === lang;
            return (
              <button
                key={t.key}
                onClick={() => setLang(t.key)}
                className="cz-mono"
                style={{
                  fontSize: 12.5, fontWeight: 500, padding: "13px 17px", background: "transparent", border: "none",
                  cursor: "pointer", whiteSpace: "nowrap",
                  color: active ? "var(--cz-fg)" : "var(--cz-faint)",
                  borderBottom: active ? "2px solid var(--cz-accent)" : "2px solid transparent",
                }}
              >
                {t.label}
              </button>
            );
          })}
          <span className="cz-mono" style={{ marginLeft: "auto", padding: "0 8px", fontSize: 11, color: "var(--cz-faint)", whiteSpace: "nowrap" }}>reverse_list · linked lists</span>
        </div>
        <pre className="cz-mono" style={{ margin: 0, padding: "clamp(14px,3vw,22px)", fontSize: 13, lineHeight: 1.8, color: "var(--cz-syn-plain)", overflowX: "auto", minHeight: 300 }}>
          {CODE[lang]}
        </pre>
        <div style={{ display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid var(--cz-panel-line)", padding: "12px 22px", background: "var(--cz-green-bg)" }}>
          <span className="cz-mono" style={{ fontSize: 12, fontWeight: 500, color: "var(--cz-green)" }}>✓ all four versions ran against the same 9 test cases</span>
        </div>
      </div>
    </div>
  );
}
