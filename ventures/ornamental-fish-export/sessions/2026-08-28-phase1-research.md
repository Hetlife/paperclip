# Session — 2026-08-28 — Phase 1 research (tasks 1.1, 1.2, 1.4)

Third session of the day. Founder asked to work through the tasks one by
one. Worked the three agent-doable Phase 1 items; skipped 1.3, which
needs the co-founder in person.

## Task 1.4 — Verification queue (worked first, since it de-risks the other two)

Closed 6 of 8 legal/compliance items to `CHECKED-INDICATIVE` (regulator's
own site or credible secondary sources, not yet counsel-confirmed):

- **V1** — seahorse/pipefish Schedule 1 ban confirmed indicatively. The
  brief's "11 marine species" framing could not be confirmed — noted as
  the weaker part of the claim.
- **V2, V3, V4** — all confirmed directly on mpeda.gov.in: 3-year OF
  validity, OF exporters excluded from live marine-for-consumption
  trade, IEC is a DGFT prerequisite for MPEDA registration.
- **V5** — **correction to the brief**: *Poecilotheria* tarantulas are
  CITES **Appendix II** (regulated/permitted trade), not an outright
  ban, and were added only in 2019. Doesn't change anything — they're
  out of scope regardless — but the file now states it accurately.
- **V9** — reconfirmed, unchanged from the previous session.

Still open, not attempted: **V6 (Lacey Act — needs real counsel), V7,
V8**. Also **V10, V11, V12** — need actual supplier conversations
(Phase 1.3), can't be resolved by search.

**Two new findings, not in the original brief:**

- **V13** — the entire *Clariidae* family (walking catfish) and 34
  *Channa*/*Parachanna* species (snakehead) are confirmed **US
  injurious wildlife** — live fish/eggs banned outright, no permit
  process. Both genera show up in India's ornamental trade. Added as
  `FLAGGED` rows to the species table so nobody sources or quotes them.
- **V14** — ~90% of India's ornamental fish exports move through
  **Kolkata** (8% Mumbai, 2% Chennai). Gujarat does not appear as a
  recognized export hub in the sources found. This doesn't block the
  venture, but it's a possible operational bottleneck the brief never
  raised — added as a required question for every Phase 1.3 supplier
  conversation: *how do you currently route exports to the
  airport/port?*

## Task 1.1 — Species eligibility table

Drafted 15 rows in `templates/species-legality-check.md`, covering the
species that dominate India's freshwater ornamental trade by volume
(guppy, molly, platy, swordtail, neon tetra, goldfish, zebra danio,
angelfish, discus, dwarf gourami, tiger barb, kuhli loach, bronze
corydoras) plus the two flagged families above.

13 rows are `UNVERIFIED` with research notes; 2 rows (`Clariidae`,
`Channa`) are `FLAGGED` based on the confirmed US injurious-wildlife
listing. **No row was set to `VERIFIED` — that stays a human/counsel
action per `AGENTS.md`.**

Limitation to flag: per-species WLPA and CITES status is marked "not
found in current appendices" or "likely N/A" based on search, not a
row-by-row primary-source check. That's still real work for whoever
signs off — this draft narrows the list, it doesn't clear it.

## Task 1.2 — US buyer list

Found 16 real, named companies via web search — 7 wholesalers, 6
retailers/online direct-to-consumer, plus a few with segment still
unclear. All logged in `templates/buyer-log.csv` with company, website,
apparent focus, and a specific next action, but **no named contact,
email, or phone for any of them** — that requires per-company
LinkedIn/site research or a direct call, which wasn't attempted this
session to avoid guessing contact details.

**Honest gap: 16 of the 40–60 target.** Open web search surfaces the
same set of large, visible companies repeatedly; it doesn't have access
to trade-association member directories (PIJAC, OFI) or smaller/newer
retailers that don't rank well in search. Getting to 40–60 real
candidates likely needs one of: a PIJAC/OFI membership list, a trade
show exhibitor list, or the founder's own network. Left this as
`in_progress`, not `done`, and named the next step in the task table.

One candidate (**A&M Aquatics**) is flagged as primarily marine/
Caribbean-focused — verify freshwater relevance before spending outreach
time. Another (**Imperial Tropicals**) breeds in-house rather than
importing — may not be a buyer at all, verify before contacting.

## Files changed

- `templates/species-legality-check.md` — 15 species rows added
- `templates/buyer-log.csv` — 16 buyer rows added (was empty template)
- `verification-queue.md` — V1–V5, V9 updated with findings; V13, V14
  added as new rows; sources list expanded
- `goal-and-tasks.md` — 1.1, 1.2, 1.4 moved to `in_progress` with
  specific progress notes and next steps
- `README.md` — status table updated to reflect real progress; added
  V14 (Gujarat hub risk) as a third top-line risk

## What's actually next

- **1.3 needs the co-founder** — nothing else in Phase 1 can close
  without named, vetted suppliers. This is the blocking item now.
- 1.2 can keep going if you want — I can try trade-show exhibitor pages
  or ask you for any existing contacts to seed the list further, but
  more open web search on the same query will likely just re-surface
  the same 16 companies.
- 1.1 is usably complete as a starting draft for the founder/counsel
  review step; expanding past 15 species has diminishing value until
  Phase 1.3 tells us which species suppliers can actually offer.
