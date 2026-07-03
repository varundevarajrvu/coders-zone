"use client";

import Link from "next/link";
import { CzBackdrop } from "@/components/cz/CzBackdrop";
import { useCzTheme } from "@/components/cz/useCzTheme";
import { czFontClass } from "@/lib/fonts";
import "./contact.css";

const EMAIL = "varundevaraj29@gmail.com";

const ROUTES = [
  {
    mark: "a.",
    title: "Found a bug?",
    body: "A wrong verdict, a flagged solution that looks fine, a page that broke — send it over with the question you used. Bugs in the verification pipeline jump the queue.",
    subject: "[coder's zone] bug: ",
    go: "report it →",
  },
  {
    mark: "b.",
    title: "A problem we should add?",
    body: "The roadmaps stay small on purpose — dozens, not thousands — but if your syllabus has a topic we're missing, that's exactly the curation we want to hear about.",
    subject: "[coder's zone] roadmap suggestion: ",
    go: "suggest it →",
  },
  {
    mark: "c.",
    title: "Everything else",
    body: "Feedback on the explanations, a college that might want this, or just how the loop is working for you. The unaided-retry stories are the ones we read twice.",
    subject: "[coder's zone] hello: ",
    go: "say hi →",
  },
];

export default function Contact() {
  const { theme, toggleTheme } = useCzTheme();

  return (
    <div data-cz data-cz-theme={theme} className={`cz-root ${czFontClass}`}>
      <CzBackdrop />

      <div className="cz-content">
        <nav className="cz-nav">
          <div className="cz-nav-inner">
            <Link href="/" className="cz-brand">
              <span className="cz-logo">CODER&apos;S&nbsp;ZONE</span>
              <span className="cz-beta">CONTACT</span>
            </Link>
            <div className="cz-nav-right">
              <Link href="/" className="cz-toggle">
                ← home
              </Link>
              <Link href="/about" className="cz-toggle">
                about →
              </Link>
              <button onClick={toggleTheme} aria-label="Toggle color mode" className="cz-toggle">
                {theme === "light" ? "◐" : "◑"} {theme}
              </button>
            </div>
          </div>
        </nav>

        <main className="czc-main">
          <div className="czc-head">
            <div className="cz-eyebrow">FIG. 07 — CONTACT</div>
            <h1 className="cz-h2">Talk to a person, not a portal.</h1>
            <p className="czc-lede">
              Coder&apos;s Zone is in beta and built by a small team you can actually reach. No
              ticket numbers, no chatbot answering for us — mail lands in a real inbox and gets
              read.
            </p>
          </div>

          <div className="czc-rows">
            {ROUTES.map((r, i) => (
              <a
                key={r.mark}
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(r.subject)}`}
                className={`czc-row ${i === ROUTES.length - 1 ? "czc-row-last" : ""}`}
              >
                <span className="cz-tmark">{r.mark}</span>
                <div>
                  <div className="cz-ttitle">{r.title}</div>
                  <p className="cz-tp">{r.body}</p>
                </div>
                <span className="czc-go">{r.go}</span>
              </a>
            ))}
          </div>

          <a href={`mailto:${EMAIL}`} className="czc-mail">
            <span>✉</span> {EMAIL}
          </a>
          <p className="czc-foot">
            replies usually within a day or two — it&apos;s a small team and the solver comes
            first. campus ambassadors and college partnerships: same inbox, subject
            &quot;campus&quot;.
          </p>
        </main>
      </div>
    </div>
  );
}
