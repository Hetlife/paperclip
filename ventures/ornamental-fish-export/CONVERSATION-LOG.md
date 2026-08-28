# Conversation log

A chronological record of what was actually discussed and decided in
chat, separate from the task/status files. Those files (`README.md`,
`goal-and-tasks.md`, `decisions.md`, `verification-queue.md`,
`sessions/*.md`) are the working record of the venture; this file is
the record of the conversation that produced them, so nothing said gets
lost to chat history scrolling away.

**Convention going forward:** append a new dated entry here every
session, summarizing what was asked and what happened, before ending
the session. Do not edit past entries — append only.

---

## 2026-08-28 — Session 1: general business guidance

User asked what it takes to start an online business and what this
Paperclip app can help with. Answered both generically (idea →
validation → legal → build → go-to-market → operations) and specific
to Paperclip's own positioning (agent org chart, task manager, agent
training, agentic OS). Produced a discussion brief
(`online_business_brief.txt`, sent as a file) for the user to work
through with another AI chat and bring back filled in.

## 2026-08-28 — Session 2: brief intake + Paperclip setup pack

User returned the filled brief: **ornamental fish export, India → USA,
AI-operated**. Asked 4 clarifying questions on founder-level decisions
the brief left open; user answered:
- Target segment: both wholesalers and retailers, parallel discovery
- Entity: separate from SevaaConnect Solutions Pvt Ltd
- Goal scope: one combined goal with parallel task tracks
- Budget: ₹10,000–30,000 cap for the validation phase

Built and delivered a Paperclip setup pack (goal, task tracks, minimal
agent role, budget guardrail) as a .txt file, noting this session has
no live Paperclip company credentials to push it via API directly.

User then asked for this to be tracked in GitHub instead of only chat/
file handoffs. Created `ventures/ornamental-fish-export/` with
`README.md`, `brief.md`, `decisions.md`, `goal-and-tasks.md`,
`sessions/`. Committed and pushed to
`claude/online-business-startup-z69v71`.

Full detail: `sessions/2026-08-28-brief-and-setup.md`.

## 2026-08-28 — Session 3: cross-check, playbook, templates

User asked for a step-by-step plan, a cross-check of everything for
errors, and any files that would make future sessions more efficient.

Found and fixed a real sequencing error: entity registration and IEC/
MPEDA applications had been placed as step one, ahead of any buyer
validation — that would have spent money and weeks before knowing if a
single US buyer would take a call. Rebuilt the plan as five phases with
five kill gates, ordered so the cheapest disqualifying signal (a US
buyer saying no) arrives before any registration spend.

Also found, via web search:
- India's national ornamental fish export trade is ~USD 2–5M/year and
  fell ~58% between 2023 and 2024 — the year-one revenue target implies
  ~8% national share under the brokerage model, which argues for
  converting to exporter-of-record earlier than the brief proposed.

Created `PLAYBOOK.md`, `AGENTS.md`, `verification-queue.md` (12
tracked claims, most unverified against a primary source), and
`templates/` (buyer log, supplier quote log, species legality table).
Rewrote `goal-and-tasks.md` with owners and done-criteria per task.
Committed and pushed.

Full detail: `sessions/2026-08-28-cross-check-and-playbook.md`.

## 2026-08-28 — Session 4: Phase 1 task work (1.1, 1.2, 1.4)

User asked to work the tasks one by one. Worked the three agent-doable
Phase 1 items (1.3 needs the co-founder in person, untouched):

- **1.4** — closed 6 of 8 legal/compliance verification items against
  MPEDA's own site and credible secondary sources. Left V6 (Lacey Act
  liability for a commission-taking intermediary) open — flagged as
  needing real counsel, not a web search. Two new findings not in the
  original brief: **V13**, the entire Clariidae (walking catfish) and
  Channa (snakehead) families are outright-banned US injurious
  wildlife; **V14**, ~90% of India's ornamental exports route through
  Kolkata and Gujarat isn't a recognized export hub — added as a
  required question for the co-founder's supplier calls.
- **1.1** — drafted 15 candidate freshwater species with research notes,
  all correctly left `UNVERIFIED`/`FLAGGED` (only a human/counsel may
  mark a row verified).
- **1.2** — found 16 real named US buyer companies via web search, split
  across both segments. Flagged honestly as short of the 40–60 target.

Full detail: `sessions/2026-08-28-phase1-research.md`.

## 2026-08-28 — Session 5: buyer list extension + discovery script

User said "continue." Checked whether PIJAC (Pet Advocacy Network) or
OFI had public member directories to extend the buyer list — neither
does, membership required. Added 4 more real companies anyway (20
total), including one contact name for Segrest Farms sourced from a
data-aggregator site and explicitly flagged as unverified. Declared
open web search at diminishing returns for buyer discovery — further
growth needs the founder's own contacts, a paid directory, or a trade
show.

Drafted the discovery call script (task 2.1) ahead of schedule since
prep costs nothing — explicitly marked not-for-use until Gate 1 passes,
so it isn't mistaken for a go-ahead to start calling before the
species/supplier groundwork is done.

Full detail: `sessions/2026-08-28-buyer-list-and-script.md`.

## 2026-08-28 — Session 6: this session

User asked for a note of this session and an ongoing conversation log
kept in GitHub, separate from the task-tracking files. Created this
file (`CONVERSATION-LOG.md`) as that record, backfilled with the full
day's history so nothing from earlier sessions is lost, and established
the append-only convention above for future sessions.

**Current real state, for anyone picking this up cold:**
- Phase 1 (free intelligence) is in progress. 1.1 (species) and 1.4
  (verification) have usable first drafts. 1.2 (buyers) has 20 of a
  40–60 target and is stalled on open search.
- **1.3 (supplier vetting) is the actual blocker** — it needs the
  co-founder, in person, in Gujarat. Nothing else in Phase 1 can close
  without it, and Phase 2 (the real kill test — buyer discovery calls)
  can't meaningfully start without knowing what's actually sourceable.
- No money has been spent. No buyer has been contacted. No entity has
  been registered. That's all correct per the plan — see `PLAYBOOK.md`.

Awaiting direction on what to work on next.
