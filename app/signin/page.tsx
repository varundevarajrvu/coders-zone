"use client";

import Link from "next/link";
import { CzBackdrop } from "@/components/cz/CzBackdrop";
import { useCzTheme } from "@/components/cz/useCzTheme";
import { czFontClass } from "@/lib/fonts";
import "./signin.css";

export default function SignIn() {
  const { theme, toggleTheme } = useCzTheme();

  return (
    <div data-cz data-cz-theme={theme} className={`cz-root ${czFontClass}`}>
      <CzBackdrop />

      <div className="cz-content">
        <nav className="cz-nav">
          <div className="cz-nav-inner">
            <Link href="/" className="cz-brand">
              <span className="cz-logo">CODER&apos;S&nbsp;ZONE</span>
              <span className="cz-beta">SIGN IN</span>
            </Link>
            <div className="cz-nav-right">
              <Link href="/" className="cz-toggle">
                ← home
              </Link>
              <button onClick={toggleTheme} aria-label="Toggle color mode" className="cz-toggle">
                {theme === "light" ? "◐" : "◑"} {theme}
              </button>
            </div>
          </div>
        </nav>

        <main className="czi-main">
          <div className="cz-eyebrow">FIG. 08 — SIGN IN</div>
          <h1 className="cz-h2">No account needed. Yet.</h1>
          <p className="czi-lede">
            Everything here is free and open while we&apos;re in beta — the solver, the roadmaps,
            the whole loop. We&apos;d rather you spend the sign-up minute on a problem instead.
            When accounts arrive they&apos;ll be one click with your college email, and honestly
            labeled like everything else.
          </p>

          <div className="czi-card">
            <div className="czi-card-label">WHAT SIGNING IN WILL ADD, WHEN IT SHIPS</div>
            <ul className="czi-list">
              <li>Your submission history per problem — the record your attempt-gate feeds.</li>
              <li>Roadmap progress that survives your browser, not just this device.</li>
              <li>Your own skip-to-answer count — visible to you, because honesty cuts both ways.</li>
              <li>The two-weeks-later retry: a similar problem, resurfaced when it counts.</li>
            </ul>
          </div>

          <div className="czi-cta">
            <Link href="/solve" className="cz-btn cz-btn-hero cz-btn-lift">
              Start with a problem →
            </Link>
            <Link href="/roadmaps" className="cz-ghost">
              or browse the roadmaps
            </Link>
          </div>
          <span className="czi-foot">
            free while in beta · no email harvested, no waitlist theater · C, C++, Java &amp; Python
          </span>
        </main>
      </div>
    </div>
  );
}
