"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { CzBackdrop } from "@/components/cz/CzBackdrop";
import { useCzTheme } from "@/components/cz/useCzTheme";

type Lang = "c" | "cpp" | "java" | "python";

/* syntax token helpers — colors/weights come from the cz tokens */
const K = ({ children }: { children: ReactNode }) => <span className="cz-kw">{children}</span>;
const F = ({ children }: { children: ReactNode }) => <span className="cz-fn">{children}</span>;
const Cm = ({ children }: { children: ReactNode }) => <span className="cz-com">{children}</span>;
const T = ({ children }: { children: ReactNode }) => <span className="cz-type">{children}</span>;

const LANG_NOTES: Record<Lang, string> = {
  c: "In C you're holding raw pointers — note the -> arrows and explicit NULL checks. Nothing cleans up after you.",
  cpp: "C++ says nullptr, not NULL — and in real code you'd think about who owns each node. The walkthrough goes there.",
  java: "Java has references, not pointers. Same rewiring — but the garbage collector quietly sweeps up whatever you drop.",
  python: "Python's tuple assignment swaps prev and head without a temp variable. Same algorithm, fewer moving parts.",
};

const LANG_TABS: { key: Lang; label: string }[] = [
  { key: "c", label: "C" },
  { key: "cpp", label: "C++" },
  { key: "java", label: "Java" },
  { key: "python", label: "Python" },
];

function ExplorerCode({ lang }: { lang: Lang }) {
  if (lang === "c") {
    return (
      <>
        <div><T>struct</T> Node *<F>reverse_list</F>(<T>struct</T> Node *head) {"{"}</div>
        <div className="cz-ind-1"><T>struct</T> Node *prev = <K>NULL</K>, *nxt;</div>
        <div className="cz-ind-1"><K>while</K> (head != <K>NULL</K>) {"{"}</div>
        <div className="cz-ind-2">nxt = head-&gt;next;   <Cm>/* save where we&apos;re going */</Cm></div>
        <div className="cz-ind-2">head-&gt;next = prev;  <Cm>/* flip the arrow */</Cm></div>
        <div className="cz-ind-2">prev = head;</div>
        <div className="cz-ind-2">head = nxt;</div>
        <div className="cz-ind-1">{"}"}</div>
        <div className="cz-ind-1"><K>return</K> prev;</div>
        <div>{"}"}</div>
      </>
    );
  }
  if (lang === "cpp") {
    return (
      <>
        <div>ListNode* <F>reverse_list</F>(ListNode* head) {"{"}</div>
        <div className="cz-ind-1">ListNode* prev = <K>nullptr</K>;</div>
        <div className="cz-ind-1"><K>while</K> (head != <K>nullptr</K>) {"{"}</div>
        <div className="cz-ind-2">ListNode* nxt = head-&gt;next;  <Cm>// save where we&apos;re going</Cm></div>
        <div className="cz-ind-2">head-&gt;next = prev;           <Cm>// flip the arrow</Cm></div>
        <div className="cz-ind-2">prev = head;</div>
        <div className="cz-ind-2">head = nxt;</div>
        <div className="cz-ind-1">{"}"}</div>
        <div className="cz-ind-1"><K>return</K> prev;</div>
        <div>{"}"}</div>
      </>
    );
  }
  if (lang === "java") {
    return (
      <>
        <div><K>static</K> Node <F>reverseList</F>(Node head) {"{"}</div>
        <div className="cz-ind-1">Node prev = <K>null</K>;</div>
        <div className="cz-ind-1"><K>while</K> (head != <K>null</K>) {"{"}</div>
        <div className="cz-ind-2">Node nxt = head.next;   <Cm>// save where we&apos;re going</Cm></div>
        <div className="cz-ind-2">head.next = prev;       <Cm>// flip the arrow</Cm></div>
        <div className="cz-ind-2">prev = head;</div>
        <div className="cz-ind-2">head = nxt;</div>
        <div className="cz-ind-1">{"}"}</div>
        <div className="cz-ind-1"><K>return</K> prev;</div>
        <div>{"}"}</div>
      </>
    );
  }
  return (
    <>
      <div><K>def</K> <F>reverse_list</F>(head):</div>
      <div className="cz-ind-1">prev = <K>None</K></div>
      <div className="cz-ind-1"><K>while</K> head:</div>
      <div className="cz-ind-2">nxt = head.next          <Cm># save where we&apos;re going</Cm></div>
      <div className="cz-ind-2">head.next = prev         <Cm># flip the arrow</Cm></div>
      <div className="cz-ind-2">prev, head = head, nxt   <Cm># swap without a temp</Cm></div>
      <div className="cz-ind-1"><K>return</K> prev</div>
    </>
  );
}

export function Landing({ fontClass }: { fontClass: string }) {
  const { theme, toggleTheme } = useCzTheme();
  const [lang, setLang] = useState<Lang>("python");

  return (
    <div data-cz data-cz-theme={theme} className={`cz-root ${fontClass}`}>
      <CzBackdrop />

      <div className="cz-content">
        {/* ═══ NAV ═══ */}
        <nav className="cz-nav">
          <div className="cz-nav-inner">
            <Link href="/" className="cz-brand">
              <span className="cz-logo">CODER&apos;S&nbsp;ZONE</span>
              <span className="cz-beta">BETA</span>
            </Link>
            <div className="cz-nav-links">
              <Link href="/practice" className="cz-nav-link">Practice</Link>
              <Link href="/solve" className="cz-nav-link">Solver</Link>
              <Link href="/roadmaps" className="cz-nav-link">Roadmaps</Link>
              <Link href="/about" className="cz-nav-link">About</Link>
            </div>
            <div className="cz-nav-right">
              <button onClick={toggleTheme} aria-label="Toggle color mode" className="cz-toggle">
                {theme === "light" ? "◐" : "◑"} {theme}
              </button>
              <Link href="/signin" className="cz-btn">
                <span className="cz-signin-full">Sign in with college email</span>
                <span className="cz-signin-short">Sign in</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* ═══ HERO ═══ */}
        <header className="cz-hero">
          <div className="cz-hero-left">
            <div className="cz-live">
              <span className="cz-live-dot" />
              EVERY SOLUTION EXECUTED BEFORE IT&apos;S SHOWN
            </div>
            <h1 className="cz-h1">
              Answers you can <span className="cz-accent-glow">defend</span>,<br />not just submit.
            </h1>
            <p className="cz-hero-p">
              You&apos;ll try the problem first — right, wrong, or halfway. Then we&apos;ll show you
              code that&apos;s been run against real tests, in C, C++, Java and Python, explained
              line by line until it actually makes sense.
            </p>
            <div className="cz-cta-row">
              <Link href="/solve" className="cz-btn cz-btn-hero cz-btn-lift">Start with a problem →</Link>
              <a href="#loop" className="cz-ghost">How the loop works</a>
            </div>
            <div className="cz-chips">
              <span>your languages:</span>
              <span className="cz-chip">C</span>
              <span className="cz-chip">C++</span>
              <span className="cz-chip">Java</span>
              <span className="cz-chip">Python</span>
            </div>
          </div>

          {/* solver panel centerpiece */}
          <div className="cz-float">
            <div className="cz-panel">
              <div className="cz-panel-head">
                <div className="cz-window-dots">
                  <span className="cz-window-dot" />
                  <span className="cz-window-dot" />
                  <span className="cz-window-dot" />
                </div>
                <span className="cz-ptab">C</span>
                <span className="cz-ptab">C++</span>
                <span className="cz-ptab">Java</span>
                <span className="cz-ptab cz-ptab-active">Python</span>
                <span className="cz-pmeta">two_sum · arrays</span>
              </div>
              <div className="cz-code">
                <div><Cm># Approach — one pass, one hashmap</Cm></div>
                <div><K>def</K> <F>two_sum</F>(nums, target):</div>
                <div className="cz-ind-1">seen = {"{}"}  <Cm># value → index</Cm></div>
                <div className="cz-ind-1"><K>for</K> i, x <K>in</K> <F>enumerate</F>(nums):</div>
                <div className="cz-ind-2"><K>if</K> target - x <K>in</K> seen:</div>
                <div className="cz-ind-3"><K>return</K> [seen[target - x], i]</div>
                <div className="cz-ind-2">seen[x] = i<span className="cz-cursor" /></div>
              </div>
              <div className="cz-panel-foot">
                <span className="cz-pass"><span>✓</span> passed 12/12 test cases before you saw it</span>
                <span className="cz-complexity">O(n) time · O(n) space — why ↓</span>
              </div>
            </div>
            <div className="cz-skip-row">
              <div className="cz-skip-chip">
                unlocked by your attempt — <span style={{ color: "var(--cz-accent)" }}>or skip honestly, we count it</span>
              </div>
            </div>
          </div>
        </header>

        <div className="cz-scrollhint">
          <span>↓ HOW THE LOOP WORKS</span>
        </div>

        {/* ═══ THE LOOP ═══ */}
        <section id="loop" className="cz-section">
          <div className="cz-wrap">
            <div className="cz-eyebrow">FIG. 01 — THE LEARNING LOOP</div>
            <h2 className="cz-h2" style={{ maxWidth: 640 }}>The answer is the second step, not the first.</h2>
            <p className="cz-sub">Most tools hand you a solution and call it a day. Ours is built around what happens before and after.</p>

            <div className="cz-cards">
              <div className="cz-card">
                <div className="cz-card-head"><span>01 · YOUR ATTEMPT</span><span style={{ color: "var(--cz-accent)" }}>→</span></div>
                <p className="cz-card-p">Write it, paste it, or honestly skip. Skipping is a real button, never a trick — and it&apos;s counted.</p>
              </div>
              <div className="cz-card-inv">
                <div className="cz-card-head"><span>02 · VERDICT</span><span style={{ opacity: 0.7 }}>→</span></div>
                <p className="cz-card-p">Accepted, wrong answer, or too slow — judged by a real execution engine, not vibes.</p>
              </div>
              <div className="cz-card">
                <div className="cz-card-head" style={{ letterSpacing: 0 }}>
                  <span style={{ font: "600 13px var(--cz-mono)", letterSpacing: "0.06em" }}>03 · THE WHY</span>
                  <span className="cz-tested"><span className="cz-tested-dot" />TESTED FIRST</span>
                </div>
                <p className="cz-card-p">The full six-part explanation unlocks — intuition, code in four languages, a line-by-line walkthrough, complexity with reasons.</p>
              </div>
            </div>

            <div className="cz-dashrule">
              <span className="cz-dash-long" />
              <span>then: a similar problem, two weeks later, solved unaided — the only metric we brag about</span>
              <span className="cz-dash-short" />
            </div>
          </div>
        </section>

        {/* ═══ LANGUAGE EXPLORER ═══ */}
        <section className="cz-section cz-section-alt">
          <div className="cz-explorer">
            <div className="cz-explorer-left">
              <div className="cz-eyebrow">FIG. 02 — FOUR DIALECTS, ONE IDEA</div>
              <h2 className="cz-h2">Your whole syllabus speaks here.</h2>
              <p className="cz-explorer-p">
                The same algorithm, side by side in every language your curriculum uses. Reversing a
                linked list is one idea — flip one arrow per step — but each language says it
                differently. That difference is worth studying.
              </p>
              <p className="cz-lang-note">{LANG_NOTES[lang]}</p>
              <div className="cz-footnote">O(n) time · O(1) space — one pointer rewired per node, nothing allocated</div>
            </div>

            <div className="cz-panel">
              <div className="cz-explorer-head">
                {LANG_TABS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setLang(t.key)}
                    className={`cz-tabbtn ${lang === t.key ? "cz-tabbtn-active" : ""}`}
                  >
                    {t.label}
                  </button>
                ))}
                <span className="cz-pmeta" style={{ padding: "0 8px" }}>reverse_list · linked lists</span>
              </div>
              <div className="cz-code cz-code-lg">
                <ExplorerCode lang={lang} />
              </div>
              <div className="cz-explorer-foot">
                <span className="cz-pass" style={{ gap: 0 }}>✓ all four versions ran against the same 9 test cases</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ THE FORMAT ═══ */}
        <section className="cz-section">
          <div className="cz-format">
            <div className="cz-format-left">
              <div className="cz-eyebrow">FIG. 03 — THE FORMAT</div>
              <h2 className="cz-h2">Intuition before code. Every single time.</h2>
              <p className="cz-format-p">
                Every answer arrives in the same six-part shape — and the explanation can&apos;t be
                turned off. There is no code-only mode. If that&apos;s all you want, there are faster
                places.
              </p>
              <p className="cz-format-check">
                The built-in comprehension check: if you can read step 02 and roughly predict step
                03, it&apos;s working.
              </p>
            </div>
            <div className="cz-frows">
              <div className="cz-frow"><span className="cz-fnum">01</span><span className="cz-ftitle">Problem restated <span className="cz-fsub">— so we agree on the question</span></span></div>
              <div className="cz-frow"><span className="cz-fnum">02</span><span className="cz-ftitle">Approach &amp; intuition <span className="cz-fsub">— plain language, before any code</span></span></div>
              <div className="cz-frow">
                <span className="cz-fnum">03</span>
                <span className="cz-ftitle cz-ftitle-pills">
                  The code
                  <span className="cz-fpill">C</span>
                  <span className="cz-fpill">C++</span>
                  <span className="cz-fpill">Java</span>
                  <span className="cz-fpill">Py</span>
                </span>
              </div>
              <div className="cz-frow"><span className="cz-fnum">04</span><span className="cz-ftitle">Line-by-line walkthrough <span className="cz-fsub">— no jargon left unexplained</span></span></div>
              <div className="cz-frow"><span className="cz-fnum">05</span><span className="cz-ftitle">Complexity, with the why <span className="cz-fsub">— defendable in a viva</span></span></div>
              <div className="cz-frow cz-frow-last"><span className="cz-fnum">06</span><span className="cz-ftitle">Takeaways + the mistake everyone makes on this pattern</span></div>
            </div>
          </div>
        </section>

        {/* ═══ TRUST ═══ */}
        <section className="cz-section cz-section-alt">
          <div className="cz-wrap">
            <div className="cz-eyebrow">FIG. 04 — THE HONEST PART</div>
            <h2 className="cz-h2 cz-trust-h2">We don&apos;t blur &quot;checked&quot; and &quot;correct.&quot;</h2>
            <div className="cz-trust">
              <div className="cz-trust-left">
                <div className="cz-vcard cz-vcard-green">
                  <div className="cz-vlabel cz-vlabel-green"><span>✓</span> VERIFIED</div>
                  <p className="cz-vcard-p">For curated problems, solutions run against known ground-truth test cases. This label means the code passed. Full stop.</p>
                </div>
                <div className="cz-vcard cz-vcard-amber">
                  <div className="cz-vlabel cz-vlabel-amber"><span>◇</span> SELF-CONSISTENCY CHECKED</div>
                  <p className="cz-vcard-p">For questions you paste with no known answer, all four language versions must agree with each other and the constraints. That&apos;s strong confidence — not proof. So that&apos;s what the label says.</p>
                </div>
                <p className="cz-trust-footnote">these two labels are never allowed to look the same. anywhere.</p>
              </div>
              <div className="cz-trust-right">
                <div className="cz-trow">
                  <span className="cz-tmark">a.</span>
                  <div>
                    <div className="cz-ttitle">The attempt comes first</div>
                    <p className="cz-tp">The front door is a problem, not a prompt box. Solving starts with you — and if you skip to the answer, that&apos;s a visible choice we both can see in your history.</p>
                  </div>
                </div>
                <div className="cz-trow">
                  <span className="cz-tmark">b.</span>
                  <div>
                    <div className="cz-ttitle">Debugging is Socratic by default</div>
                    <p className="cz-tp">Paste your broken code and the mentor asks what you expected versus what you got — then points at the fault. It rewrites your code only when you explicitly ask.</p>
                  </div>
                </div>
                <div className="cz-trow cz-trow-last">
                  <span className="cz-tmark">c.</span>
                  <div>
                    <div className="cz-ttitle">Hints nudge, they don&apos;t hand over</div>
                    <p className="cz-tp">Stuck on practice? Hints arrive in tiers — a nudge, a bigger nudge, then the unlock. You always know which tier you&apos;re taking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="cz-cta">
          <div className="cz-cta-inner">
            <h2 className="cz-cta-h2">
              Bring a problem.<br />Leave with the <span className="cz-accent-glow">why</span>.
            </h2>
            <Link href="/solve" className="cz-btn cz-btn-cta cz-btn-lift">Start with a problem →</Link>
            <span className="cz-cta-foot">free while in beta · sign in with your college email · C, C++, Java &amp; Python</span>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="cz-footer">
          <div className="cz-footer-inner">
            <div className="cz-footer-brand">
              <span className="cz-footer-logo">CODER&apos;S&nbsp;ZONE</span>
              <span className="cz-footer-tag">built for C · C++ · Java · Python curricula</span>
            </div>
            <div className="cz-footer-links">
              <Link href="/practice" className="cz-nav-link">Practice</Link>
              <Link href="/solve" className="cz-nav-link">Solver</Link>
              <Link href="/roadmaps" className="cz-nav-link">Roadmaps</Link>
              <Link href="/contact" className="cz-nav-link">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
