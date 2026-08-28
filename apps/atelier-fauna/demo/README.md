# Standalone demo page

`index.html` is a single self-contained page — no build step, no
dependencies. Open it directly in a browser, or publish it anywhere that
serves static files.

Published version:
https://claude.ai/code/artifact/c5e43db8-554a-462a-9a1d-2a30ed6f0c87

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
