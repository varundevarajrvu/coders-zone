import Link from "next/link";
import { LanguageExplorer } from "@/components/language-explorer";

const HERO_CODE = `# Approach — one pass, one hashmap
def two_sum(nums, target):
    seen = {}                       # value -> index
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i`;

const LOOP = [
  { n: "01", title: "Your attempt", tag: "", body: "Write it, paste it, or honestly skip. Skipping is a real button, never a trick — and it's counted." },
  { n: "02", title: "Verdict", tag: "", body: "Accepted, wrong answer, or too slow — judged by a real execution engine, not vibes." },
  { n: "03", title: "The why", tag: "TESTED FIRST", body: "The full six-part explanation unlocks — intuition, code in four languages, a line-by-line walkthrough, complexity with reasons." },
];

const FORMAT = [
  ["Intuition", "The plain-language idea before any code — what problem shape this is and why the approach works."],
  ["Approach", "The plan in words: the data structure, the invariant, the one move repeated until you're done."],
  ["Code", "Runnable in C, C++, Java and Python — the exact program that passed the tests, nothing hand-waved."],
  ["Walkthrough", "Line by line, in prose. Not comments — an explanation you could hand to a friend."],
  ["Complexity", "Time and space, with the reason for each, not just the big-O letters."],
  ["Retry", "A similar problem, later, solved unaided — the only metric we actually brag about."],
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <header className="cz-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(340px,100%),1fr))", gap: "clamp(28px,4vw,48px)", padding: "clamp(48px,7vw,78px) clamp(16px,4vw,32px) clamp(40px,6vw,70px)", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div className="cz-mono" style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 9, fontSize: 11.5, letterSpacing: ".1em", color: "var(--cz-green)", border: "1px solid var(--cz-green-line)", background: "var(--cz-green-bg)", borderRadius: 99, padding: "7px 15px" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "var(--cz-green)", animation: "czPulse 2.4s infinite" }} />
            EVERY SOLUTION EXECUTED BEFORE IT&apos;S SHOWN
          </div>
          <h1 style={{ margin: 0, fontFamily: "var(--cz-display)", fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.06, letterSpacing: "-.022em", fontWeight: 700 }}>
            Answers you can <span style={{ color: "var(--cz-accent)", textShadow: "var(--cz-hglow,none)" }}>defend</span>,<br />not just submit.
          </h1>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: "var(--cz-soft)", maxWidth: 500 }}>
            You&apos;ll try the problem first — right, wrong, or halfway. Then we&apos;ll show you code that&apos;s been run against real tests, in C, C++, Java and Python, explained line by line until it actually makes sense.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <Link href="/practice" className="cz-btn" style={{ fontSize: 15, padding: "14px 27px" }}>Start with a problem →</Link>
            <Link href="#loop" className="cz-btn-ghost" style={{ fontSize: 15 }}>How the loop works</Link>
          </div>
          <div className="cz-mono" style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", fontSize: 12, color: "var(--cz-faint)" }}>
            <span>your languages:</span>
            {["C", "C++", "Java", "Python"].map((l) => (
              <span key={l} style={{ border: "1px solid var(--cz-line)", padding: "3px 10px", borderRadius: 99, background: "var(--cz-chip-bg)" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* solver panel */}
        <div>
          <div className="cz-card" style={{ overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid var(--cz-panel-line)", padding: "0 14px", overflowX: "auto" }}>
              <div style={{ display: "flex", gap: 6, marginRight: 14 }}>
                {[0, 1, 2].map((i) => <span key={i} style={{ width: 9, height: 9, borderRadius: 99, background: "var(--cz-line)" }} />)}
              </div>
              {["C", "C++", "Java"].map((l) => <span key={l} className="cz-mono" style={{ fontSize: 12.5, padding: "12px 15px", color: "var(--cz-faint)" }}>{l}</span>)}
              <span className="cz-mono" style={{ fontSize: 12.5, padding: "12px 15px", color: "var(--cz-fg)", borderBottom: "2px solid var(--cz-accent)" }}>Python</span>
              <span className="cz-mono" style={{ marginLeft: "auto", padding: "0 8px", fontSize: 11, color: "var(--cz-faint)", whiteSpace: "nowrap" }}>two_sum · arrays</span>
            </div>
            <pre className="cz-mono" style={{ margin: 0, padding: "clamp(14px,3vw,22px)", fontSize: 13, lineHeight: 1.75, color: "var(--cz-syn-plain)", overflowX: "auto" }}>{HERO_CODE}</pre>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--cz-panel-line)", padding: "12px 22px", background: "var(--cz-green-bg)" }}>
              <span className="cz-mono" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 500, color: "var(--cz-green)" }}>✓ passed 12/12 test cases before you saw it</span>
              <span className="cz-mono" style={{ fontSize: 11.5, color: "var(--cz-faint)" }}>O(n) time · O(n) space</span>
            </div>
          </div>
        </div>
      </header>

      {/* THE LOOP */}
      <section id="loop" style={{ borderTop: "1px solid var(--cz-line)", padding: "clamp(56px,9vw,96px) 0" }}>
        <div className="cz-container">
          <div className="cz-mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--cz-accent)", marginBottom: 14 }}>FIG. 01 — THE LEARNING LOOP</div>
          <h2 style={{ margin: "0 0 12px", fontFamily: "var(--cz-display)", fontSize: "clamp(28px,3.8vw,40px)", lineHeight: 1.12, letterSpacing: "-.02em", maxWidth: 640, fontWeight: 700 }}>
            The answer is the second step, not the first.
          </h2>
          <p style={{ margin: "0 0 52px", fontSize: 16, lineHeight: 1.6, color: "var(--cz-soft)", maxWidth: 560 }}>
            Most tools hand you a solution and call it a day. Ours is built around what happens before and after.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 18, alignItems: "stretch" }}>
            {LOOP.map((c, i) => (
              <div key={c.n} className="cz-card" style={{ padding: "22px 24px", ...(i === 1 ? { background: "var(--cz-btn-bg)", color: "var(--cz-btn-fg)" } : {}) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span className="cz-mono" style={{ fontSize: 12, letterSpacing: ".1em", opacity: 0.85 }}>{c.n} · {c.title.toUpperCase()}</span>
                  {c.tag ? <span className="cz-mono" style={{ fontSize: 10, color: "var(--cz-green)" }}>● {c.tag}</span> : <span style={{ opacity: 0.5 }}>→</span>}
                </div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: i === 1 ? "var(--cz-btn-fg)" : "var(--cz-soft)", opacity: i === 1 ? 0.92 : 1 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGE EXPLORER */}
      <section style={{ borderTop: "1px solid var(--cz-line)", background: "var(--cz-alt)", padding: "clamp(56px,9vw,96px) 0" }}>
        <div className="cz-container"><LanguageExplorer /></div>
      </section>

      {/* FORMAT */}
      <section id="about" style={{ borderTop: "1px solid var(--cz-line)", padding: "clamp(56px,9vw,96px) 0" }}>
        <div className="cz-container">
          <div className="cz-mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--cz-accent)", marginBottom: 14 }}>FIG. 03 — THE EXPLANATION FORMAT</div>
          <h2 style={{ margin: "0 0 40px", fontFamily: "var(--cz-display)", fontSize: "clamp(28px,3.8vw,40px)", lineHeight: 1.12, letterSpacing: "-.02em", maxWidth: 640, fontWeight: 700 }}>
            Six parts, every time. Non-skippable.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 18 }}>
            {FORMAT.map(([title, body], i) => (
              <div key={title} className="cz-card" style={{ padding: "22px 24px" }}>
                <div className="cz-mono" style={{ fontSize: 11, color: "var(--cz-accent)", marginBottom: 10 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--cz-display)", fontSize: 19, fontWeight: 600 }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--cz-soft)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: "1px solid var(--cz-line)", padding: "clamp(64px,10vw,120px) 0" }}>
        <div className="cz-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, textAlign: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--cz-display)", fontSize: "clamp(32px,5.5vw,54px)", lineHeight: 1.08, letterSpacing: "-.022em", fontWeight: 700 }}>
            Bring a problem.<br />Leave with the <span style={{ color: "var(--cz-accent)", textShadow: "var(--cz-hglow,none)" }}>why</span>.
          </h2>
          <Link href="/practice" className="cz-btn" style={{ fontSize: 16, padding: "16px 34px" }}>Start with a problem →</Link>
          <span className="cz-mono" style={{ fontSize: 12, color: "var(--cz-faint)" }}>free while in beta · sign in with your college email · C, C++, Java &amp; Python</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--cz-line)", padding: "32px 0" }}>
        <div className="cz-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <span className="cz-mono" style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".08em" }}>CODER&apos;S&nbsp;ZONE</span>
          <span className="cz-mono" style={{ fontSize: 10.5, color: "var(--cz-faint)" }}>built for C · C++ · Java · Python curricula</span>
        </div>
      </footer>
    </main>
  );
}
