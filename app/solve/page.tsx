"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AttemptGate } from "@/components/AttemptGate";
import { ChatPanel } from "@/components/ChatPanel";
import { CzBackdrop } from "@/components/cz/CzBackdrop";
import { useCzTheme } from "@/components/cz/useCzTheme";
import { QuestionInput } from "@/components/QuestionInput";
import { SolutionView } from "@/components/SolutionView";
import { czFontClass } from "@/lib/fonts";
import type { SolveResponse } from "@/lib/schema";
import "./solve.css";

type Stage = "ask" | "attempt" | "solving" | "solution";

export default function Solve() {
  const { theme, toggleTheme } = useCzTheme();
  const [stage, setStage] = useState<Stage>("ask");
  const [question, setQuestion] = useState("");
  const [attempt, setAttempt] = useState<string | null>(null);
  const [result, setResult] = useState<SolveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Roadmap steps deep-link here with ?q=<problem>; the question arrives
  // preloaded but the attempt gate still comes first. Practice submissions
  // also stash the student's code in sessionStorage — that IS a logged
  // attempt (PRD §6.3), so the solution starts generating right away.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (!q || q.trim().length <= 10) return;
    const trimmed = q.trim();
    setQuestion(trimmed);
    let stored: string | null = null;
    try {
      stored = sessionStorage.getItem("cz-attempt");
      sessionStorage.removeItem("cz-attempt");
    } catch {
      /* private mode */
    }
    if (stored && stored.trim()) {
      setAttempt(stored);
      solve(trimmed, stored);
    } else {
      setStage("attempt");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function solve(q: string, a: string | null) {
    setStage("solving");
    setError(null);
    try {
      const res = await fetch("/api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, attempt: a ?? undefined, skipped: a === null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
      setResult(data as SolveResponse);
      setStage("solution");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStage("attempt");
    }
  }

  function reset() {
    setStage("ask");
    setQuestion("");
    setAttempt(null);
    setResult(null);
    setError(null);
  }

  return (
    <div data-cz data-cz-theme={theme} className={`cz-root ${czFontClass}`}>
      <CzBackdrop />

      <div className="cz-content">
        <nav className="cz-nav">
          <div className="cz-nav-inner">
            <Link href="/" className="cz-brand">
              <span className="cz-logo">CODER&apos;S&nbsp;ZONE</span>
              <span className="cz-beta">SOLVER</span>
            </Link>
            <div className="cz-nav-right">
              <Link href="/" className="cz-toggle">
                ← home
              </Link>
              {stage === "solution" && (
                <button onClick={reset} className="cz-toggle">
                  + new question
                </button>
              )}
              <button onClick={toggleTheme} aria-label="Toggle color mode" className="cz-toggle">
                {theme === "light" ? "◐" : "◑"} {theme}
              </button>
            </div>
          </div>
        </nav>

        <main className="czs-main">
          {stage === "ask" && (
            <QuestionInput
              onSubmit={(q) => {
                setQuestion(q);
                setStage("attempt");
              }}
            />
          )}

          {stage === "attempt" && (
            <div className="czs-narrow" style={{ gap: 0 }}>
              {error && (
                <div className="czs-error" style={{ marginBottom: 18 }}>
                  {error}
                </div>
              )}
              <AttemptGate
                question={question}
                onSubmit={(a) => {
                  setAttempt(a);
                  solve(question, a);
                }}
              />
            </div>
          )}

          {stage === "solving" && (
            <div className="czs-loading">
              <div className="cz-live">
                <span className="cz-live-dot" />
                RUNNING ALL FOUR LANGUAGES
              </div>
              <p className="czs-loading-t">Generating solutions in C, C++, Java and Python…</p>
              <p className="czs-loading-s">
                Then an adversarial second pass cross-checks them against each other before you see
                anything. This usually takes a minute or two.
              </p>
            </div>
          )}

          {stage === "solution" && result && (
            <div className="czs-grid">
              <div className="czs-stack">
                <div className="czs-qcard">
                  <div className="czs-qlabel">YOUR QUESTION</div>
                  <p className="czs-qtext">{question}</p>
                </div>
                <SolutionView result={result} />
              </div>
              <div className="czs-chatwrap">
                <ChatPanel question={question} attempt={attempt} solution={result.solution} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
