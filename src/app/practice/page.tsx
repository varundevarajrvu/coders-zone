import Link from "next/link";
import { problems } from "@/lib/problems";

export const metadata = { title: "Practice — Coder's Zone" };

const DIFF_COLOR: Record<string, string> = {
  Easy: "var(--cz-green)",
  Medium: "var(--cz-amber)",
  Hard: "var(--cz-red)",
};

export default function PracticeList() {
  return (
    <main className="cz-container" style={{ padding: "clamp(40px,6vw,72px) clamp(16px,4vw,32px) 96px" }}>
      <div className="cz-mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--cz-accent)", marginBottom: 14 }}>PRACTICE</div>
      <h1 style={{ margin: "0 0 12px", fontFamily: "var(--cz-display)", fontSize: "clamp(30px,4.5vw,48px)", lineHeight: 1.1, letterSpacing: "-.02em", fontWeight: 700 }}>
        Pick a problem. Try it first.
      </h1>
      <p style={{ margin: "0 0 40px", fontSize: 16, lineHeight: 1.6, color: "var(--cz-soft)", maxWidth: 560 }}>
        Write your attempt, run it against real tests in C, C++, Java or Python. The worked solution and its explanation unlock once you&apos;ve had a genuine go — or honestly skipped.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(320px,100%),1fr))", gap: 18 }}>
        {problems.map((p) => (
          <Link key={p.slug} href={`/practice/${p.slug}`} className="cz-card" style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="cz-mono" style={{ fontSize: 11, color: DIFF_COLOR[p.difficulty], letterSpacing: ".08em" }}>{p.difficulty.toUpperCase()}</span>
              <span className="cz-mono" style={{ fontSize: 11, color: "var(--cz-faint)" }}>{p.topic}</span>
            </div>
            <h2 style={{ margin: 0, fontFamily: "var(--cz-display)", fontSize: 21, fontWeight: 600 }}>{p.title}</h2>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--cz-soft)" }}>{p.blurb}</p>
            <span className="cz-mono" style={{ fontSize: 12, color: "var(--cz-accent)", marginTop: 4 }}>Solve →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
