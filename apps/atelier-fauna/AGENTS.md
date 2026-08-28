# Agent context — Atelier Fauna

Read this before working in `apps/atelier-fauna/`.

## Start every session with these three

1. **`docs/FEEDBACK-LOG.md`** — standing preferences and mistakes already
   made here. Cheaper to read than to be corrected again.
2. **`docs/TASK-LOG.md`** — what exists, what state it's in, what's next.
3. **`npm run verify`** — typecheck → demo drift check → build → 19 smoke
   checks. If it fails on a clean checkout, fix that first.

## End every session with

```bash
npm run verify        # must pass before committing
```

Then append to `docs/TASK-LOG.md` (session history) and, if the founder
corrected or redirected anything, `docs/FEEDBACK-LOG.md`. Both are
append-at-top. Commit; the repo is the record, not the chat.

## Single source of truth

`src/` is authoritative. The standalone demo pages are **generated**:

| Source | Feeds |
|---|---|
| `src/data/faunaData.ts` | Specimens, biomes, status labels |
| `src/data/journalArticles.ts` | Journal |
| `src/data/specimenArt.ts` | SVG geometry (data, not JSX) |
| `src/server/speciesScreening.ts` | Exclusion rules |
| `src/app/globals.css` | Animation keyframes |

`scripts/sync-demo.mjs` writes these into `demo/site.html` between
`GENERATED:DATA` markers. **Never hand-edit inside those markers.** After
changing any source above, run `npm run sync`. `npm run verify` fails if
you forget.

Everything outside the markers — layout, copy, styling — is hand-written
and safe to edit.

## Hard constraints — do not violate

1. **No automated legality clearance, ever.** `speciesScreening.ts` is
   reject-only by design: there is no "approved" verdict in the type and
   there must never be one. It can say "definitely prohibited"; it can
   never say "legal." That is per-species, per-jurisdiction, and human.
   The UI must never present `needs_review` as approval — no green check,
   no "cleared." See requirement R1.7.
2. **Ethical gates live in the API, not the UI.** The readiness checklist
   and the sanctuary-only refusal are enforced server-side because a
   client-side check is not a control. Smoke-tested.
3. **No unsourced numbers.** Anything shown to a person traces to
   `docs/MARKET-RESEARCH.md`. Assumptions are labelled as assumptions.
4. **Care specs need human sign-off.** A wrong one is an animal-welfare
   failure, not a content bug.
5. **Never fail a submission because a notification failed.** The record
   is already saved; losing the alert is bad, losing the request is worse.
6. **No live WebGL in grid views.** Many simultaneous contexts for
   thumbnail-sized art is a real cost. Live 3D is for the hero and the
   on-demand dossier only.

## Scope

One animal per exhibit — five total. Adding a second to any exhibit is a
deliberate decision, not a default; every added animal multiplies
research, legal verification, photography and animation work.

Captive-bred freshwater and terrestrial specimens within the declared
collection only. Never marine, never wild-caught, never CITES-listed or
IUCN-threatened as placeable stock.

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run verify` | **The one to run.** Full pipeline. |
| `npm run sync` | Regenerate demos from source |
| `npm run sync:check` | Fail if demos are stale |
| `npm run smoke` | Browser + API checks against a real build |

`npm run smoke` refuses to run if the port is already busy — an orphaned
server serving a deleted build once produced 200s with empty bodies that
looked exactly like an app regression. If it complains:
`pkill -f 'next-server'`.

## Documents

| File | What |
|---|---|
| `README.md` | What's real vs. not |
| `docs/TASK-LOG.md` | State and history |
| `docs/FEEDBACK-LOG.md` | Preferences and past mistakes |
| `docs/REQUIREMENTS.md` | R1–R7 with BUILT/PARTIAL/NOT BUILT |
| `docs/MARKET-RESEARCH.md` | Every sourced figure |
| `docs/BACKEND.md` | API reference and gaps |
| `ROADMAP.md` | The photo→3D→behaviour pipeline |
| `demo/README.md` | The published pages |

## A live-animal business, not a storefront

This sells live reptiles and insects direct-to-consumer. US live-animal
sales are regulated at state level and vary widely; federal screening
alone is not sufficient to ship. Nothing here should take a payment or
ship an animal before per-species, per-destination legality is verified
by a person.

Branch: `claude/online-business-startup-z69v71`. No model names in commit
messages.
