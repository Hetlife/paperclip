# Session — 2026-08-28 — Cross-check, playbook, templates

Second session of the day. Founder asked for a step-by-step plan, a
cross-check of everything for errors, and any files that would make
future sessions more efficient.

## Errors found and fixed

**1. Sequencing error in the previous task list (significant).**
The earlier `goal-and-tasks.md` had "register the new separate entity"
as an unblocked `critical` task with no dependencies — effectively step
one. That would have spent money and weeks on IEC/MPEDA registration
*before* knowing whether a single US buyer would take a call.

Fixed: registration moved to Phase 4, after the go/no-go decision. You
do not need an IEC to hold a discovery conversation. This is the single
biggest efficiency gain in this session.

**2. Invalid dependency expression.** Task B4 was "blocked by B3
(partial)", which is not a resolvable state. Rewritten as an explicit
trigger: mid-point synthesis at 10 calls.

**3. No done-criteria.** No task said what "done" meant, so a future
session could not verify completion. Every task now has a
`Done when` column.

**4. No sequencing across tracks.** The three tracks ran in parallel
with no ordering or stop conditions. Replaced with five phases, each
ending in an explicit kill gate.

**5. Unverified claims treated as settled.** The brief's legal and
market facts came from a general AI chat, not primary sources, and some
are load-bearing for compliance decisions. Created
`verification-queue.md` with 12 tracked claims and the primary source
each must be checked against. None were verified in this session — that
is deliberate; V6 (Lacey Act intermediary liability) needs US counsel,
not a web search.

## New finding — market size

Cross-checked the brief's "USD 1.43M in 2017" figure. Recent trade data
puts India's total national ornamental fish exports at roughly **USD
4.97M (2023)** and **USD 2.11M (2024)**.

Two consequences, both recorded in `verification-queue.md` V9:

- **The year-one target may be arithmetically unreachable under the
  brokerage model.** ₹1–1.5L/month gross margin at 10% commission
  requires ~USD 170k/year in shipment value — about **8% of India's
  entire national export trade**, as a first-time exporter with no US
  relationships. Under exporter-of-record at 30% it drops to ~2.7%,
  which is ambitious but arguable. This is a new argument for
  converting to exporter-of-record earlier than the brief proposed.
- **The market is volatile.** A ~58% year-over-year drop is a different
  risk profile than "small but stable," and the brief does not account
  for it. Worth asking every supplier and buyer in Phases 1–2 *why* it
  fell.

## Files created

- `AGENTS.md` — constraints + session protocol, so a future session
  starts correct without the founder re-explaining
- `PLAYBOOK.md` — five phases, five kill gates, ordered so the cheapest
  kill signals arrive first
- `verification-queue.md` — 12 unverified claims with primary sources
- `templates/README.md` — field conventions for the logs
- `templates/buyer-log.csv` — Gate 2 evidence
- `templates/supplier-quote-log.csv` — Gate 3 evidence
- `templates/species-legality-check.md` — Gate 1 and Gate 4 evidence

## Files rewritten

- `goal-and-tasks.md` — rebuilt around phases, with owners, dependencies
  and done-criteria
- `README.md` — now a status index with a live status table

## Checks run

- Confirmed `.github/workflows/pr.yml` only triggers on PRs to `master`
  and contains no lint or structure check that markdown/CSV files under
  a new top-level `ventures/` directory could fail
- Confirmed `ventures/` is not gitignored
- Confirmed the repo uses `AGENTS.md` (not `CLAUDE.md`) — matched that
  convention for the venture context file

## Open for next session

- Nothing is blocked. Phase 1 tasks 1.1, 1.2, 1.3, 1.4 are all
  unblocked and can start immediately.
- 1.1, 1.2, 1.4 are agent-doable now. 1.3 needs the co-founder.
- Still undecided by the founder: entity name, broker vs
  exporter-of-record (now informed by the V9 finding), hard deadlines,
  bookkeeping ownership.
