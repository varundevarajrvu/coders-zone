# Coder's Zone

An attempt-first AI coding mentor for engineering students — built for C, C++, Java and Python curricula.

**One sentence:** a verified, attempt-gated, syllabus-literate code explainer — with just enough of a practice loop to close it, not a LeetCode competitor.

## What it does

- **Solver** (`/solve`) — paste a coding question, *try it yourself first* (or skip honestly — it's counted), then get one worked solution in all four languages in a fixed six-part teaching format: problem restated → approach & intuition → code → line-by-line walkthrough → complexity with reasons → takeaways + the common mistake. Solutions favor the **simplest approach that passes the constraints** — clever alternatives get a takeaway mention, not an implementation.
- **Honest verification** — an adversarial second pass cross-checks all four solutions against each other before you see anything. The badge says *self-consistency checked*, never "verified correct" — those are different things and the UI never blurs them.
- **Doubt chat** — a mentor grounded in the exact problem, your attempt, and the code on screen. Socratic by default when debugging your code.
- **Practice** (`/practice`) — curated stdin/stdout problems with an in-browser editor; submissions run against sample + hidden tests on a real execution engine ([Wandbox](https://wandbox.org)). Wrong answer? The worked solution is one click away, with your attempt logged.
- **Roadmaps** (`/roadmaps`) — three syllabus-ordered tracks that deep-link into the solver's attempt gate.

## Run it locally

```bash
npm install
```

Create `.env.local` with an [NVIDIA NIM](https://build.nvidia.com) API key (models used: `z-ai/glm-5.2`):

```
NVIDIA_API_KEY=nvapi-...
# Optional overrides:
# SOLVER_MODEL=z-ai/glm-5.2
# CHAT_MODEL=z-ai/glm-5.2
```

Then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

Next.js (App Router) + TypeScript + CSS-variable design system (two skins: "Blueprint lab" light / "Obsidian starfield" dark) · LLM via NVIDIA NIM's OpenAI-compatible API · code execution via Wandbox · file-based solution cache keyed by question hash.

## Design principles (non-negotiable)

- The solver is never the front door — an attempt or an honest, tracked opt-out comes first.
- Explanation is never skippable. There is no code-only mode.
- "Self-consistency checked" and "verified correct" never look the same.
- Simple beats clever: the simplest solution that passes the constraints, every time.
