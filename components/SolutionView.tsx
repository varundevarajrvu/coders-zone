"use client";

import { useState } from "react";
import {
  LANGUAGE_LABELS,
  LANGUAGES,
  type LanguageKey,
  type SolveResponse,
} from "@/lib/schema";

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="czs-sechead">
      <span className="czs-secnum">{n}</span>
      <h3 className="czs-sectitle">{title}</h3>
    </div>
  );
}

/* PRD §9 / FIG. 04: self-consistency and ground-truth verification must never
   look the same. Freeform questions have no known answer, so this badge is
   always the amber ◇ kind — or red when the adversarial pass found problems. */
function VerificationBadge({ result }: { result: SolveResponse }) {
  const { verification } = result;
  if (verification.consistent) {
    return (
      <div className="cz-vcard cz-vcard-amber">
        <div className="cz-vlabel cz-vlabel-amber">
          <span>◇</span> SELF-CONSISTENCY CHECKED
          {result.cached && <span className="czs-cache">FROM CACHE</span>}
        </div>
        <p className="cz-vcard-p">
          An adversarial second pass checked that all four solutions implement the same algorithm,
          agree on edge cases, and that the complexity claims hold. That&apos;s strong confidence —
          not proof against known ground truth. Trace it yourself before you rely on it.
        </p>
      </div>
    );
  }
  return (
    <div className="cz-vcard cz-vcard-red">
      <div className="cz-vlabel cz-vlabel-red">
        <span>✕</span> CONSISTENCY CHECK FLAGGED ISSUES
      </div>
      <p className="cz-vcard-p">
        The adversarial review pass found problems — treat this solution with extra suspicion:
      </p>
      <ul className="czs-issues">
        {verification.issues.map((issue, i) => (
          <li key={i}>
            <span className="czs-issue-where">{issue.where}</span> — {issue.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SolutionView({ result }: { result: SolveResponse }) {
  const [lang, setLang] = useState<LanguageKey>("python");
  const { solution, verification } = result;
  const active = solution.solutions.find((s) => s.language === lang);

  return (
    <div className="czs-stack">
      <VerificationBadge result={result} />

      <section>
        <SectionHead n="01" title="Problem restated" />
        <div className="czs-body-in">
          <p className="czs-prose">{solution.restatement}</p>
        </div>
      </section>

      <section>
        <SectionHead n="02" title="Approach & intuition" />
        <div className="czs-body-in">
          <p className="czs-prose">{solution.approach}</p>
          <p className="czs-predict">
            before scrolling on: can you roughly predict what the code will look like?
          </p>
        </div>
      </section>

      <section>
        <SectionHead n="03" title="The code" />
        <div className="cz-panel">
          <div className="cz-explorer-head">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`cz-tabbtn ${lang === l ? "cz-tabbtn-active" : ""}`}
              >
                {LANGUAGE_LABELS[l]}
              </button>
            ))}
          </div>
          {active && <pre className="czs-pre">{active.code}</pre>}
          <div className={`czs-panel-foot ${verification.consistent ? "czs-foot-amber" : "czs-foot-red"}`}>
            <span className="czs-foot-label">
              <span>{verification.consistent ? "◇" : "✕"}</span>
              {verification.consistent
                ? "self-consistency checked — not verified against ground truth"
                : "check flagged issues — see above"}
            </span>
            {active && (
              <span className="cz-complexity">
                {active.complexity.time} time · {active.complexity.space} space — why ↓
              </span>
            )}
          </div>
        </div>
      </section>

      {active && (
        <>
          <section>
            <SectionHead n="04" title={`Line-by-line walkthrough (${LANGUAGE_LABELS[lang]})`} />
            <div className="czs-body-in czs-wrows">
              {active.walkthrough.map((step, i) => (
                <div key={i} className="czs-wrow">
                  <span className="czs-wlines">{step.lines}</span>
                  <p className="czs-wtext">{step.explanation}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHead n="05" title={`Complexity, with the why (${LANGUAGE_LABELS[lang]})`} />
            <div className="czs-body-in">
              <div className="czs-chips-row">
                <span className="czs-chip">time: {active.complexity.time}</span>
                <span className="czs-chip">space: {active.complexity.space}</span>
              </div>
              <p className="czs-prose">{active.complexity.justification}</p>
            </div>
          </section>
        </>
      )}

      <section>
        <SectionHead n="06" title="Takeaways + the mistake" />
        <div className="czs-body-in">
          <ul className="czs-takeaways">
            {solution.summary.takeaways.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <div className="czs-mistake">
            <div className="czs-mistake-label">THE MISTAKE EVERYONE MAKES ON THIS PATTERN</div>
            <p>{solution.summary.commonMistake}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
