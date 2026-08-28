# Agent context — Ornamental Fish Export venture

Read this before doing any work in `ventures/ornamental-fish-export/`.
It exists so a future session starts correct without the founder
re-explaining the venture.

## What this is

A pre-revenue, pre-validation venture: exporting captive-bred freshwater
ornamental fish from India (Gujarat) to the USA. Nothing has been sold.
No buyer has been contacted. No shipment has been made.

## Hard constraints — do not violate

1. **No build-ahead.** No website, brand, marketing site, or AI agent
   infrastructure until after shipment three. If a task starts to look
   like "build the platform," stop and re-read `PLAYBOOK.md`.
2. **Humans decide, agents draft.** Species legality, animal welfare,
   pricing commitments, and anything legally binding are human
   decisions. An agent may research and draft; it may never conclude.
   Never state a species is legal to export — state what the sources say
   and mark it for human/counsel verification.
3. **Budget.** ₹10,000–30,000 total for the validation phase. Any single
   item over ₹5,000 needs founder approval first. No agent infra spend.
4. **Entity.** This venture runs under a new entity, separate from
   SevaaConnect Solutions Pvt Ltd. Never file, register, or invoice
   under SevaaConnect.
5. **Species scope.** Captive-bred freshwater fish and aquatic plants
   only. Never marine species, never wild-caught, never CITES/Schedule
   listed, never reptiles or invertebrates.

## Where things live

| File | What it is |
|---|---|
| `README.md` | Index + current status at a glance |
| `PLAYBOOK.md` | **Start here.** Phased step-by-step with kill gates |
| `goal-and-tasks.md` | Task list with owners, done-criteria, dependencies |
| `brief.md` | Full business brief (background, reasoning) |
| `decisions.md` | Append-only founder decisions log |
| `verification-queue.md` | Unverified claims that must be checked before use |
| `templates/` | Working logs — buyer, supplier, species |
| `sessions/` | One file per work session |

## How to start a session

1. Read `README.md` (status) and `PLAYBOOK.md` (current phase).
2. Check `goal-and-tasks.md` for what is `in_progress` / unblocked.
3. Check `verification-queue.md` — never build on an unverified claim.
4. Do the work.
5. Write a session file in `sessions/YYYY-MM-DD-topic.md`.
6. Update task statuses and `README.md`'s status line. Commit.

## How to end a session

Every session must leave: updated task statuses, a session file, a new
dated entry appended to `CONVERSATION-LOG.md` (append-only, never edit
past entries), and a clear next action. Never leave a task ambiguous
about who owns the next step.

## Commit convention

Branch: `claude/online-business-startup-z69v71`. Do not push elsewhere.
Do not put model names in commit messages.
