"use client";

import { useState } from "react";

export function QuestionInput({ onSubmit }: { onSubmit: (question: string) => void }) {
  const [value, setValue] = useState("");
  const canSubmit = value.trim().length > 10;

  return (
    <div className="czs-narrow">
      <div className="cz-eyebrow">STEP 01 — YOUR QUESTION</div>
      <h1 className="cz-h2">What are you working on?</h1>
      <p className="czs-lede">
        Paste a coding question — from an assignment, a textbook, or practice. You&apos;ll try it
        yourself first, then get the full worked solution in C, C++, Java, and Python.
      </p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={
          "e.g. Given an array of n integers (n ≤ 10^5) and a target k, return the indices of two numbers that add up to k..."
        }
        rows={8}
        className="czs-textarea"
      />
      <div>
        <button
          onClick={() => canSubmit && onSubmit(value.trim())}
          disabled={!canSubmit}
          className="cz-btn cz-btn-hero cz-btn-lift"
        >
          Continue → try it first
        </button>
      </div>
    </div>
  );
}
