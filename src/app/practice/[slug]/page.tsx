import Link from "next/link";
import { notFound } from "next/navigation";
import { getProblem, problems } from "@/lib/problems";
import { ProblemWorkspace } from "@/components/problem-workspace";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = getProblem(slug);
  return { title: problem ? `${problem.title} — Coder's Zone` : "Coder's Zone" };
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) notFound();

  return (
    <main className="cz-container" style={{ padding: "clamp(24px,4vw,44px) clamp(16px,4vw,32px) 96px" }}>
      <Link href="/practice" className="cz-mono" style={{ fontSize: 12, color: "var(--cz-faint)", display: "inline-block", marginBottom: 24 }}>
        ← all problems
      </Link>
      <ProblemWorkspace problem={problem} />
    </main>
  );
}
