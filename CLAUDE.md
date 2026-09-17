@AGENTS.md

# Portfolio — working rules

Kept short: this file is re-sent on every turn. The context-discipline rules
(`/clear` every task, `grep -n` then ranged reads, `notes.md` for analysis)
are global in `~/.claude/CLAUDE.md` and enforced by the global hook. Only
project-specific detail lives here.

## Why this matters here

Measured 2026-09-15: one 2,339-turn session on this repo re-sent 265M
cache-read tokens with context peaking at 199k — 127:1 input:output. The
cost was session length, not any single operation. `/clear` is the lever.

## Where the docs live

`research/` — gitignored, private. `handoff-<date>.md` is the baton: read the
latest one at the start of a session, rewrite it before you stop.
`lighthouse-<date>.md` holds perf numbers. `notes.md` at the root is the
scratch file for the task in flight — gitignored, overwrite freely.

**Grep, don't open** — these are reference and exceed the 300-line rule:
- `research/portfolio-skills-showcase.md` (445 lines)
- `research/real-portfolio-showcases.md` (367 lines)
- `data/work.ts` (412) and `data/index.ts` (409) — locate the entry with
  `grep -n`, read that range only.
- `components/ui/GridGlobe.tsx`, `GradientBg.tsx`, `FloatingNavbar.tsx`,
  `CanvasRevealEffect.tsx`, `Globe.tsx` — animation library ports; rarely
  need touching, never need reading whole.

## Before anything goes public

`data/work.ts` has `// REVIEW:` comments on paragraphs drafted beyond the
resume. Michael edits or deletes them; they are not facts yet.

## Stack

Next 16 (React 19.2, Turbopack), Tailwind 4 CSS-first in `app/globals.css`
(no `tailwind.config.ts`), `motion@12`, ESLint 9 flat config. Deploys to
Vercel from `main`.
