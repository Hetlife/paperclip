# Handoff — resume here

Written by `npm run checkpoint`. **Regenerated, not hand-edited** — put
durable decisions in `docs/TASK-LOG.md` instead, which this does not
touch.

_Last checkpoint: 2026-08-29 19:55 UTC_

## What was in progress

Session 9 complete: daily discovery Routine live (trig_011kYQKR4DYX81eB4KmeaMs5, 06:00 UTC), MARKETPLACE-MODEL.md written, checkpoint/handoff system built. Next: founder decision on positioning (TASK-LOG item 1).

## Repository state

- **Branch:** `claude/online-business-startup-z69v71`
- **Unpushed commits:** 0
- **Demo pages:** in sync

**Uncommitted changes:**

```
M apps/atelier-fauna/.gitignore
 M apps/atelier-fauna/AGENTS.md
 M apps/atelier-fauna/docs/FEEDBACK-LOG.md
 M apps/atelier-fauna/docs/TASK-LOG.md
 M apps/atelier-fauna/package.json
?? apps/atelier-fauna/discovery/
?? apps/atelier-fauna/docs/DAILY-DISCOVERY.md
?? apps/atelier-fauna/docs/HANDOFF.md
?? apps/atelier-fauna/docs/MARKETPLACE-MODEL.md
?? apps/atelier-fauna/scripts/checkpoint.mjs
?? apps/atelier-fauna/scripts/new-discovery-log.mjs
```

**Recent commits:**

```
92cb469 Make src/ the single source of truth; add verify pipeline and session logs
49dc6ed Add a navigable website demo covering all six routes
a5a4983 Add market research, economics brief, Viewing Room; fix ignored src/data
1310b24 Announce new submissions to a configurable webhook
9797639 Add The Register: buyer-facing species intake at /register
957101c Add standalone demo page for the five animated exhibits
e6274e1 Add backend, requirements docs, and per-exhibit behavioral animations
dc3b090 Wire a 3D model viewer and document the real pipeline it needs
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
