# Handoff — resume here

Written by `npm run checkpoint`. **Regenerated, not hand-edited** — put
durable decisions in `docs/TASK-LOG.md` instead, which this does not
touch.

_Last checkpoint: 2026-08-29 19:58 UTC_

## What was in progress

Stopped cleanly at founder's request. Nothing in progress. Resume at TASK-LOG 'Next, in order' item 1: the positioning decision (retail / marketplace / biotope commission) — that is a founder call and gates the rest.

## Repository state

- **Branch:** `claude/online-business-startup-z69v71`
- **Unpushed commits:** 0
- **Demo pages:** in sync

**Uncommitted changes:**

_None — working tree clean._

**Recent commits:**

```
a001572 Add daily discovery Routine, marketplace analysis, and handoff checkpoints
92cb469 Make src/ the single source of truth; add verify pipeline and session logs
49dc6ed Add a navigable website demo covering all six routes
a5a4983 Add market research, economics brief, Viewing Room; fix ignored src/data
1310b24 Announce new submissions to a configurable webhook
9797639 Add The Register: buyer-facing species intake at /register
957101c Add standalone demo page for the five animated exhibits
e6274e1 Add backend, requirements docs, and per-exhibit behavioral animations
```

**Unfinished markers in the tree:**

```
scripts/checkpoint.mjs:52:  `grep -rn --include=*.ts --include=*.tsx --include=*.mjs -E "(TODO|FIXME|XXX)" src scripts | head -20`,
```

## To pick this up

```bash
cd apps/atelier-fauna
npm run verify     # must pass before you build on this
```

Then read, in order:

1. `docs/FEEDBACK-LOG.md` — preferences and mistakes already made here
2. `docs/TASK-LOG.md` — state and what is next
3. This file's "What was in progress" above

If `npm run verify` fails on a clean checkout, fix that before anything
else — it means the last session left the tree broken.
