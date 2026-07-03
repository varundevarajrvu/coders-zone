"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { CzBackdrop } from "@/components/cz/CzBackdrop";
import { useCzTheme } from "@/components/cz/useCzTheme";
import { czFontClass } from "@/lib/fonts";
import { PROBLEMS, STARTER_CODE, type PracticeProblem } from "@/lib/problems";
import { LANGUAGE_LABELS, LANGUAGES, type LanguageKey } from "@/lib/schema";
import "./practice.css";

interface JudgeResult {
  verdict: "accepted" | "wrong_answer" | "runtime_error" | "compile_error";
  passed: number;
  total: number;
  failed?: { index: number; input: string; expected?: string; got?: string; isSample: boolean };
  detail?: string;
}

export default function Practice() {
  const { theme, toggleTheme } = useCzTheme();
  const router = useRouter();
  const [problem, setProblem] = useState<PracticeProblem>(PROBLEMS[0]);
  const [lang, setLang] = useState<LanguageKey>("python");
  const [judging, setJudging] = useState(false);
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  // one buffer per problem+language so switching never loses work
  const buffers = useRef<Record<string, string>>({});
  const [code, setCode] = useState<string>(STARTER_CODE.python);

  function bufferKey(p: string, l: LanguageKey) {
    return `${p}:${l}`;
  }

  function switchTo(nextProblem: PracticeProblem, nextLang: LanguageKey) {
    buffers.current[bufferKey(problem.id, lang)] = code;
    setProblem(nextProblem);
    setLang(nextLang);
    setCode(buffers.current[bufferKey(nextProblem.id, nextLang)] ?? STARTER_CODE[nextLang]);
    setResult(null);
    setError(null);
  }

  async function submit() {
    if (judging || code.trim().length === 0) return;
    setJudging(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId: problem.id, language: lang, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Judge failed (${res.status})`);
      setResult(data as JudgeResult);
      if (data.verdict === "accepted") {
        setSolved((s) => new Set(s).add(problem.id));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setJudging(false);
    }
  }

  // The practice attempt IS the logged attempt (PRD §6.3) — carry the
  // student's code into the solver as their attempt.
  function viewSolution() {
    try {
      sessionStorage.setItem("cz-attempt", code);
    } catch {
      /* private mode */
    }
    router.push(`/solve?q=${encodeURIComponent(problem.solverPrompt)}`);
  }

  function handleTab(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const ta = e.currentTarget;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const next = code.slice(0, start) + "    " + code.slice(end);
    setCode(next);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + 4;
    });
  }

  return (
    <div data-cz data-cz-theme={theme} className={`cz-root ${czFontClass}`}>
      <CzBackdrop />

      <div className="cz-content">
        <nav className="cz-nav">
          <div className="cz-nav-inner">
            <Link href="/" className="cz-brand">
              <span className="cz-logo">CODER&apos;S&nbsp;ZONE</span>
              <span className="cz-beta">PRACTICE</span>
            </Link>
            <div className="cz-nav-right">
              <Link href="/" className="cz-toggle">
                ← home
              </Link>
              <Link href="/roadmaps" className="cz-toggle">
                roadmaps →
              </Link>
              <button onClick={toggleTheme} aria-label="Toggle color mode" className="cz-toggle">
                {theme === "light" ? "◐" : "◑"} {theme}
              </button>
            </div>
          </div>
        </nav>

        <main className="czp-main">
          <div className="czp-head">
            <div className="cz-eyebrow">FIG. 09 — PRACTICE</div>
            <h1 className="cz-h2">Type it. Run it. Defend it.</h1>
            <p className="czp-lede">
              Pick a problem, write a complete program that reads stdin and prints stdout, and
              submit — a real execution engine runs it against sample and hidden tests, not vibes.
              Wrong answer? The worked solution is one honest click away, with your attempt logged.
            </p>
          </div>

          <div className="czp-grid">
            <div className="czp-list">
              <div className="czp-list-head">PROBLEMS · {PROBLEMS.length}</div>
              {PROBLEMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => switchTo(p, lang)}
                  className={`czp-item ${p.id === problem.id ? "czp-item-active" : ""}`}
                >
                  <div className="czp-item-title">
                    {solved.has(p.id) && <span className="czp-item-done">✓</span>}
                    {p.title}
                  </div>
                  <div className="czp-item-meta">
                    {p.topic} · {p.difficulty}
                  </div>
                </button>
              ))}
            </div>

            <div className="czp-work">
              <div className="czp-statement">
                <div className="czp-title-row">
                  <h2 className="czp-title">{problem.title}</h2>
                  <span className="czp-tag">{problem.topic}</span>
                  <span className="czp-tag">{problem.difficulty}</span>
                </div>
                <p className="czp-text">{problem.statement}</p>
                <div className="czp-io">
                  <span><b>input</b> — {problem.inputFormat}</span>
                  <span><b>output</b> — {problem.outputFormat}</span>
                </div>
                <div className="czp-samples">
                  {problem.samples.map((s, i) => (
                    <div key={i} className="czp-sample">
                      <div className="czp-sample-label">SAMPLE {i + 1} — STDIN → STDOUT</div>
                      <pre>{s.input.trimEnd()}</pre>
                      <pre>{s.output}</pre>
                    </div>
                  ))}
                </div>
              </div>

              <div className="czp-editor">
                <div className="czp-editor-head">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l}
                      onClick={() => switchTo(problem, l)}
                      className={`cz-tabbtn ${lang === l ? "cz-tabbtn-active" : ""}`}
                    >
                      {LANGUAGE_LABELS[l]}
                    </button>
                  ))}
                  <span className="cz-pmeta" style={{ padding: "0 8px" }}>
                    {problem.id} · {lang === "java" ? "use 'class Main' (not public)" : "stdin → stdout"}
                  </span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleTab}
                  spellCheck={false}
                  className="czp-ta"
                  aria-label="Code editor"
                />
                <div className="czp-editor-foot">
                  <span className="czp-foot-note">
                    judged by a real execution engine — samples first, then hidden tests
                  </span>
                  <button
                    onClick={submit}
                    disabled={judging || code.trim().length === 0}
                    className="cz-btn cz-btn-lift"
                  >
                    {judging ? "running against tests…" : "Submit → run the tests"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="czp-verdict czp-verdict-red">
                  <div className="czp-verdict-label">✕ JUDGE UNAVAILABLE</div>
                  <p className="czp-verdict-sub">{error}</p>
                </div>
              )}

              {result?.verdict === "accepted" && (
                <div className="czp-verdict czp-verdict-green">
                  <div className="czp-verdict-label">
                    ✓ ACCEPTED — {result.passed}/{result.total} TESTS PASSED
                  </div>
                  <p className="czp-verdict-sub">
                    Your program ran against every test case and matched. Could you defend the
                    complexity in a viva? The worked explanation covers it.
                  </p>
                  <div className="czp-verdict-actions">
                    <button onClick={viewSolution} className="cz-toggle">
                      see the worked explanation →
                    </button>
                  </div>
                </div>
              )}

              {result && result.verdict !== "accepted" && (
                <div className="czp-verdict czp-verdict-red">
                  <div className="czp-verdict-label">
                    ✕ {result.verdict === "wrong_answer"
                      ? `WRONG ANSWER — TEST ${result.failed?.index} OF ${result.total}`
                      : result.verdict === "runtime_error"
                        ? `RUNTIME ERROR — TEST ${result.failed?.index} OF ${result.total}`
                        : "COMPILE ERROR"}
                  </div>
                  <p className="czp-verdict-sub">
                    {result.passed} of {result.total} tests passed
                    {result.failed && !result.failed.isSample && " — it broke on a hidden test"}.
                  </p>
                  {result.verdict === "wrong_answer" && result.failed && (
                    <div className="czp-fail-detail">
                      <div className="czp-fail-cell">
                        <div className="czp-fail-cell-label">STDIN</div>
                        <pre>{result.failed.input.trimEnd()}</pre>
                      </div>
                      <div className="czp-fail-cell">
                        <div className="czp-fail-cell-label">EXPECTED</div>
                        <pre>{result.failed.expected}</pre>
                      </div>
                      <div className="czp-fail-cell">
                        <div className="czp-fail-cell-label">YOUR OUTPUT</div>
                        <pre>{result.failed.got || "(empty)"}</pre>
                      </div>
                    </div>
                  )}
                  {result.detail && <pre className="czp-errpre">{result.detail}</pre>}
                  <div className="czp-verdict-actions">
                    <button onClick={viewSolution} className="cz-btn cz-btn-lift">
                      view the solution →
                    </button>
                    <span className="czp-foot-note">
                      your attempt is logged — that&apos;s the honest unlock, not a skip
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
