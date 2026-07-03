"use client";

import Link from "next/link";
import { CzBackdrop } from "@/components/cz/CzBackdrop";
import { useCzTheme } from "@/components/cz/useCzTheme";
import { czFontClass } from "@/lib/fonts";
import "./about.css";

export default function About() {
  const { theme, toggleTheme } = useCzTheme();

  return (
    <div data-cz data-cz-theme={theme} className={`cz-root ${czFontClass}`}>
      <CzBackdrop />

      <div className="cz-content">
        <nav className="cz-nav">
          <div className="cz-nav-inner">
            <Link href="/" className="cz-brand">
              <span className="cz-logo">CODER&apos;S&nbsp;ZONE</span>
              <span className="cz-beta">ABOUT</span>
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

        <main className="czb-main">
          <div className="czb-head">
            <div className="cz-eyebrow">FIG. 06 — ABOUT</div>
            <h1 className="cz-h2">Why this exists.</h1>
            <p className="czb-lede">
              Any student can paste a question into a chatbot and get code back. That was never the
              hard part. The hard part is what the copy-paste habit costs you twelve to eighteen
              months later — in the viva, the placement round, the internship screen. Coder&apos;s
              Zone is built around that gap: not access to answers, but the loop between seeing a
              solution, understanding why it works, and solving the next one without help.
            </p>
          </div>

          <p className="czb-section-label">WHAT MAKES IT DIFFERENT</p>
          <div className="czb-rows">
            <div className="cz-trow">
              <span className="cz-tmark">a.</span>
              <div>
                <div className="cz-ttitle">Checked before shown</div>
                <p className="cz-tp">
                  Every solution runs before you see it. For curated problems that means known
                  ground-truth test cases — the green ✓ VERIFIED label. For questions you paste
                  with no known answer, all four language versions must agree with each other and
                  the constraints — the amber ◇ SELF-CONSISTENCY CHECKED label. Strong confidence
                  is not proof, so the two labels are never allowed to look the same. Anywhere.
                </p>
              </div>
            </div>
            <div className="cz-trow">
              <span className="cz-tmark">b.</span>
              <div>
                <div className="cz-ttitle">One format, every single time</div>
                <p className="cz-tp">
                  Intuition before code. Then the code in C, C++, Java and Python — the four
                  languages your curriculum actually uses — a line-by-line walkthrough, complexity
                  with reasons, and the mistake everyone makes on the pattern. The explanation
                  can&apos;t be turned off. There is no code-only mode.
                </p>
              </div>
            </div>
            <div className="cz-trow cz-trow-last">
              <span className="cz-tmark">c.</span>
              <div>
                <div className="cz-ttitle">The answer isn&apos;t the end of the loop</div>
                <p className="cz-tp">
                  Your attempt comes first — right, wrong, or halfway — and skipping to the answer
                  is a real, counted choice, never a trick. A solution here feeds the next attempt.
                  The only metric we brag about: a similar problem, two weeks later, solved
                  unaided.
                </p>
              </div>
            </div>
          </div>

          <p className="czb-section-label">WHO IT&apos;S FOR</p>
          <p className="czb-p">
            First- to third-year engineering and CS students working through DSA in C, C++, Java
            and Python — coursework on one side, placement prep pressure on the other. Self-taught
            and bootcamp learners are just as welcome; the loop doesn&apos;t care where you enrolled.
          </p>
          <p className="czb-p">
            And to be clear about what this is not: it&apos;s not a paste-your-assignment answer
            machine. If that&apos;s all you want, there are faster places — and your future
            interviewer thanks you for using them elsewhere.
          </p>

          <div className="czb-cta">
            <Link href="/solve" className="cz-btn cz-btn-hero cz-btn-lift">
              Start with a problem →
            </Link>
            <span className="czb-foot">
              free while in beta · built for C · C++ · Java · Python curricula
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
