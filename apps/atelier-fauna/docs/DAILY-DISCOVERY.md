# Daily discovery — standing brief

The protocol for the automated daily run that works toward finding
genuine interest and buyers. A Routine fires this once a day; each run
produces a dated report in `discovery/` and commits it.

**Read this whole file before running.** The constraints are not
optional and several of them exist because of specific legal exposure in
this trade.

---

## The goal

Find and qualify real demand for the collection, and surface it as
evidence a person can act on. Over time the reports should answer:

- Who is actually buying specimens like ours, and where do they look?
- What are comparable specimens really selling for, and is that moving?
- Which retailers, breeders and specialist communities are worth a
  direct approach?
- Is demand seasonal, growing, or flat?

The output is a **researched, reviewable report**. It is never an action
taken on the founder's behalf.

## Hard rules — never violate these

1. **Never contact anyone.** No emails, no forum posts, no DMs, no
   comments, no form submissions, no account creation. The run
   *researches and drafts*; a human decides whether anything is sent.
   Automated solicitation in the live-animal trade is both a spam problem
   and a regulatory one.
2. **Never state a species is legal.** Same reject-only contract as
   `speciesScreening.ts`. Research can surface a prohibition; it can
   never establish permission.
3. **Never record personal data.** Log businesses, public listings and
   public prices. Do not collect individuals' names, emails, phone
   numbers or social handles into the repo. A public storefront's
   general contact address is fine; a person's details are not.
4. **Cite everything.** Any figure entering a report carries a URL. An
   uncited number is worse than no number — that lesson cost this
   project a 3–8× pricing error.
5. **Never scrape aggressively.** Ordinary reading of public pages only.
   No bulk automation against any site, no circumventing access
   controls, no rate-limit evasion.
6. **Flag, don't launder.** If a listing looks like it is for a
   prohibited or threatened species, record it as a market observation
   with the concern noted. Never present it as an opportunity.

## What each run does

**1 · Read state.** `docs/TASK-LOG.md`, the most recent two files in
`discovery/`, and `docs/MARKET-RESEARCH.md`. Do not re-research what a
recent report already answered — build on it.

**2 · Price check** for the placeable collection — Altum Angelfish,
Orchid Mantis, Emerald Tree Boa. Record the observed range and where it
came from. Note any move against the last report; a stable price is
itself a finding worth one line, not a paragraph.

**3 · Demand signals.** Rotate through: specialist retailer stock and
sell-out patterns, hobbyist community activity, trade/expo calendars,
search-interest indicators, new entrants or exits. One or two per run,
in depth, beats a shallow sweep of all of them.

**4 · Prospect research.** Extend `discovery/prospects.csv` with real,
named businesses — specialist retailers, breeders, biotope and
aquascaping studios. Record what they sell, who they appear to source
from, and a specific reason they are a fit. **Never a personal contact
detail.** Deduplicate against existing rows.

**5 · One question answered properly.** Each run picks a single open
question from `docs/TASK-LOG.md` or a prior report and does real work on
it. Depth over breadth — this is the part that compounds.

**6 · Write the report.** `node scripts/new-discovery-log.mjs` scaffolds
the dated file. Fill every section. If a section has nothing, write
"nothing new" — do not invent activity to look productive.

**7 · Update state and commit.** If a finding changes the picture,
update `docs/TASK-LOG.md`. If it invalidates something in
`docs/MARKET-RESEARCH.md`, correct it there and say so in the report.
Then commit.

## Stopping conditions

End the run and say so plainly when:

- The day's research produces nothing new. A report saying "no change,
  here is what I checked" is a valid and useful outcome.
- A finding needs a decision only the founder can make. Record it under
  **Needs a human** and stop; do not guess and proceed.
- Anything suggests a legal problem. Record it, flag it prominently,
  and do not build on it.

## What this cannot do

Being explicit so nobody mistakes the reports for more than they are:

- It cannot tell you whether a species is legal to ship to a given US
  state. That still needs per-species, per-jurisdiction human review.
- It cannot generate demand. It finds and measures what exists.
- It cannot replace the twenty real conversations that actually test
  whether anyone will buy. Research narrows who to call; it is not a
  substitute for calling them.
- It sees public information only. Real wholesale prices, real margins
  and real sales volumes are not public and will not appear here.
