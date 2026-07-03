"use client";

import { useState } from "react";

export function AttemptGate({
  question,
  onSubmit,
}: {
  question: string;
  onSubmit: (attempt: string | null) => void;
}) {
  const [attempt, setAttempt] = useState("");
  const canSubmit = attempt.trim().length > 0;

  return (
    <div className="czs-narrow">
      <div className="czs-qcard">
        <div className="czs-qlabel">YOUR QUESTION</div>
        <p className="czs-qtext">{question}</p>
      </div>

      <div className="cz-eyebrow" style={{ marginTop: 18 }}>STEP 02 — YOUR ATTEMPT</div>
      <h2 className="cz-h2">Give it a try first.</h2>
      <p className="czs-lede">
        Write or paste your attempt — pseudocode, partial code, or even just your idea of the
        approach. Right, wrong, or half-finished all count. This isn&apos;t graded; it&apos;s how
        the solution sticks.
      </p>
      <textarea
        value={attempt}
        onChange={(e) => setAttempt(e.target.value)}
        placeholder="My idea: sort the array first, then use two pointers from both ends..."
        rows={12}
        className="czs-textarea"
      />
      <div className="czs-row">
        <button
          onClick={() => canSubmit && onSubmit(attempt)}
          disabled={!canSubmit}
          className="cz-btn cz-btn-hero cz-btn-lift"
        >
          Submit my attempt → unlock the solution
        </button>
        {/* Honest opt-out (PRD §6.3): visible, never the default-styled button, tracked. */}
        <button
          onClick={() => onSubmit(null)}
          className="czs-skip"
          title="Skips are counted. Attempting first is how this app is meant to be used."
        >
          or skip honestly — we count it
        </button>
      </div>
    </div>
  );
}
