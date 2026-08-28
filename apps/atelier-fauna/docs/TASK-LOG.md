# Task log

What has been built, what state it is in, and what is next. Append at the
top of "Session history"; keep "Current state" rewritten to the truth.

**Before starting work:** run `npm run verify`. If it fails on a clean
checkout, fix that before building anything new.

---

## Current state

**Phase:** working demo with a real backend. Not launched, no real
customer, no payment path.

| Area | State |
|---|---|
| Site (7 routes) | ✅ Built, all render, smoke-tested |
| Specimen collection | ✅ 5 specimens, one per exhibit |
| Behavioural animations | ✅ All 5, generated from one source |
| Sanctuary Journal | ✅ 5 essays, index + article pages |
| Viewing Room | ✅ Whole collection, click → dossier |
| The Register | ✅ Buyer intake wired to a real API |
| Concierge drawer | ✅ 3 steps, server-enforced gates |
| Backend | ✅ 2 routes, validation, rate limit, persistence |
| Notifications | ✅ Webhook, single-attempt (no retry) |
| Species screening | ⚠️ Works, but list is small — see gaps |
| Market research | ✅ Sourced, `docs/MARKET-RESEARCH.md` |
| Photography | ❌ None. Falls back to animated line art |
| 3D models | ⚠️ Viewer built, no models exist |
| Admin view | ❌ None. Read the JSON file directly |

### Next, in order

1. **Decide broker vs. biotope-commission positioning.** Research says
   the animal alone doesn't clear CAC on a first order — see
   `MARKET-RESEARCH.md` §3. This is a founder decision and it gates
   almost everything else.
2. **Wire a notification webhook.** One env var; see `.env.example`.
   Until it's set, submissions land in a JSON file and nobody is told.
3. **Per-species, per-state legality review.** Federal screening is not
   sufficient to ship a live animal in the US.
4. **Real photography for one specimen** (recommend Hydro), then run the
   3D pilot in `ROADMAP.md`.

---

## Automation — what runs itself now

| Command | Does |
|---|---|
| `npm run verify` | The whole pipeline: typecheck → drift check → build → smoke. **Use this before and after any change.** |
| `npm run sync` | Regenerates the demo pages from app source |
| `npm run sync:check` | Fails if demos are stale (CI-safe, exits 1) |
| `npm run smoke` | 19 browser + API checks against a real production build |

**Single source of truth.** Specimen data, journal, SVG art, screening
rules and status labels live in `src/`. `scripts/sync-demo.mjs` generates
the demo pages from them. Editing a price, adding an exclusion rule, or
fixing a fin reaches every surface after `npm run sync` — and
`sync:check` fails the build if you forget.

Every check in `scripts/smoke.mjs` exists because something actually
broke. Don't delete one without understanding which bug it guards.

---

## Session history

### 2026-08-28 · Session 8 — automation & logs
- Made `src/` the single source of truth. Extracted SVG art from JSX into
  `src/data/specimenArt.ts` as data; React and the demo generator now both
  render from it. Moved status labels into `faunaData.ts`. Exported the
  screening rules.
- Built `scripts/sync-demo.mjs` (+ `--check`) and `scripts/smoke.mjs`.
  Wired `npm run verify`.
- Moved specimen animation from Framer Motion props to CSS keyframes in
  `globals.css` — cheaper for continuous loops, and shared with the demos.
- **Bugs found and fixed in the harness itself:** `server.kill()` didn't
  propagate through `npx`, orphaning servers that held rate-limit state
  and served deleted builds; all API checks shared one rate-limit bucket.
  Added a port guard that refuses to run against a foreign server.

### 2026-08-28 · Session 7 — the website
- Built `demo/site.html`: all routes, hash routing, dossier modal,
  concierge drawer, live screening. Published.
- Fixed: chip commit on blur re-rendered mid-event and threw.

### 2026-08-28 · Session 6 — research & economics
- Market research, sourced. **Found the plan's prices were 3–8× over
  market**; corrected in `faunaData.ts`.
- **Found Golden Mantella is IUCN Critically Endangered / CITES II with
  export suspended since 2010.** It was listed as requestable. Moved to
  `sanctuary_only` and added to the screening exclusions.
- Built the economics brief artifact. Added `/collection`.
- **Fixed: `src/data/` had never been committed** — the repo root
  `.gitignore` has a broad `data/` rule that swallowed it. The app in the
  repo could not build. Local builds hid it.

### 2026-08-28 · Session 5 — notifications
- Provider-agnostic webhook (`ATELIER_NOTIFY_WEBHOOK`). Verified across
  four paths; never fails a submission; excludes free-text notes.

### 2026-08-28 · Session 4 — The Register
- Buyer-facing species intake at `/register` with chip input,
  paste-splitting, and live screening results.

### 2026-08-28 · Session 3 — backend & animations
- Two API routes with server-enforced ethical gates. Reject-only species
  screening. Five behavioural animations. Scoped to one animal per exhibit.
- Fixed: media fallback used `relative` with no dimensions and collapsed
  to zero height, rendering nothing.

### 2026-08-28 · Session 2 — 3D viewer & roadmap
- `Specimen3DViewer` + graceful fallback chain. `ROADMAP.md` documenting
  what a real photo→3D→behaviour pipeline actually requires.

### 2026-08-28 · Session 1 — scaffold
- Next.js 15 app from the founder's 4-phase spec. Fixed a stale
  `useRef<number>()` type and Next 15's async `params` on dynamic routes.
