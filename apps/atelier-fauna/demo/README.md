# Standalone demo pages

Two self-contained pages — no build step, no dependencies. Open either
directly in a browser, or publish anywhere that serves static files.

| File | What it is | Published |
|---|---|---|
| `site.html` | **The website** — all six routes, navigable | [link](https://claude.ai/code/artifact/caec1cd4-6a00-4838-8703-682bba65af92) |
| `index.html` | A one-page explainer *about* the product | [link](https://claude.ai/code/artifact/c5e43db8-554a-462a-9a1d-2a30ed6f0c87) |
| `economics.html` | The business case — market research, pricing correction, unit economics | [link](https://claude.ai/code/artifact/739663d8-1e61-4326-9fb5-54e9fdf16dc9) |

`site.html` is the one to show someone who asks "what does the site look
like" — it reproduces the real app's routes (home, Viewing Room, Journal,
article, Custodianship, Register) with hash routing, the dossier modal,
the concierge drawer, and live species screening. `index.html` is a
narrative page *about* the build, not the build itself.

Every figure in `economics.html` traces to `../docs/MARKET-RESEARCH.md`,
which carries the full sources. If a number changes there, change it in
both.

## These are separate implementations, not build output

`site.html` reproduces the app's pages and specimen animations in plain
HTML/CSS/JS so it runs from one file — the app uses React, Framer Motion
and real API routes. Consequences worth knowing:

- **Specimen data lives in two places** (`../src/data/faunaData.ts` and
  inline in each demo file). Change one, change the others.
- **The animations live in two places** (`SpecimenAnimation.tsx` uses
  Framer Motion; the demos use CSS `@keyframes`). The SVG path data is
  identical; only the mechanism differs.
- **Screening logic is duplicated** in `site.html` so the Register
  demo works offline. It mirrors `../src/server/speciesScreening.ts`
  including the reject-only contract — if you add an exclusion rule to
  the server, add it here too or the demo will under-report.
- **Nothing in the demos is submitted anywhere.** No network calls.

## What it's for

Showing the concept without running the Next.js app: the five exhibits
with their behavioural animations, the exhibit switcher, real care
specs, and what the species-screening API actually returns.

## How it relates to the app

It is a **separate implementation of the same design**, not a build
output. The app uses React + Framer Motion; this page reproduces the
same specimen loops in plain CSS keyframes so it can run from a single
file.

That means **the animations exist in two places**:

- `src/components/specimens/SpecimenAnimation.tsx` — the real one, used
  by the site
- `demo/index.html` — the standalone copy

If you change a specimen's animation, change it in both, or the demo
will drift out of sync with the product. The SVG path data is identical
between them; only the animation mechanism differs (Framer Motion
`animate` props vs. CSS `@keyframes`).

The API response shown in the demo is a real recorded response from
`POST /api/species-intake`, not invented — but it is static text on this
page. The demo makes no network calls.
