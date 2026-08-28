# Goal & tasks

Source of truth for task state. Update the `Status` column as work
happens. The phase ordering and kill gates live in `PLAYBOOK.md` —
this file is the task-level detail underneath it.

Status values: `todo` · `in_progress` · `blocked` · `done` · `killed`

---

## Goal

**Get to shipment one — or a documented kill decision.**

Validate whether a US-bound ornamental fish export business from India
is viable before building any brand, website, or agent infrastructure.
No revenue target this phase. Budget ₹10k–30k total, ₹5k approval gate
per item.

**Complete when all four are true:**
1. Species eligibility verified by a human/counsel
2. 20+ US buyer conversations held across both segments
3. 3+ Indian exporters quoted with real FOB numbers
4. One buyer committed to a trial consignment — **or** a written kill
   decision with reasons

---

## Phase 1 — Free intelligence

| # | Task | Owner | Status | Blocked by | Done when |
|---|---|---|---|---|---|
| 1.1 | Draft species eligibility table | Agent draft | in_progress | — | `templates/species-legality-check.md` has ≥15 candidate rows, all researched, none marked VERIFIED by an agent. **15 rows drafted 2026-08-28, 13 UNVERIFIED + 2 FLAGGED (injurious, excluded). Remaining: human/counsel sign-off (blocked on founder/counsel time, not agent work) and CITES/WLPA checks are still "likely" not confirmed per-species.** |
| 1.2 | Build US buyer list, both segments | Agent | in_progress | — | `templates/buyer-log.csv` has 40–60 rows with contact + current source populated. **16 real named companies found 2026-08-28 (7 wholesaler, 6 retailer, 3 unresolved segment) via web search — all missing named contact/email/phone. Short of the 40–60 target; open web search surfaces a finite set of large/visible players. Next: trade directories (PIJAC, OFI member lists), LinkedIn sourcing for named contacts at the 16 found, and direct ask at any trade show.** |
| 1.3 | Vet 3+ Gujarat exporters/breeders | Co-founder | todo | — | 3+ named suppliers in `supplier-quote-log.csv`, MPEDA status recorded, willing to engage. **Also ask each: how do you currently route shipments to the airport/port for export — see V14, Gujarat is not a recognized export hub in available data.** |
| 1.4 | Close the free items in the verification queue | Agent draft / Human confirm | in_progress | — | V2, V4, V9–V12 moved off `UNVERIFIED`. **Done 2026-08-28: V1, V2, V3, V4, V5, V9 confirmed CHECKED-INDICATIVE. New findings V13 (injurious species) and V14 (Kolkata export concentration) added. Still open: V6 (Lacey Act — needs counsel), V7, V8, V10, V11, V12 (need supplier conversations, Phase 1.3/2).** |

**🚦 Gate 1** — ≥10 plausibly sellable species **and** ≥40 named buyers
**and** ≥3 willing suppliers. Any failure stops the venture here.

---

## Phase 2 — The kill test

| # | Task | Owner | Status | Blocked by | Done when |
|---|---|---|---|---|---|
| 2.1 | Draft discovery call script | Agent draft | todo | 1.2 | Script covers: current source, switch triggers, order size, payment terms, DOA expectations |
| 2.2 | Hold 20+ discovery conversations | **Founder (human)** | todo | 2.1, Gate 1 | 20+ rows at `conversation_held` or beyond, split across both segments |
| 2.3 | Log every conversation outcome | Agent | todo | 2.2 | Every contacted row has `interest_level` and `differentiator_cited` filled |
| 2.4 | Mid-point synthesis at 10 calls | Agent | todo | 2.2 (10 calls) | Written summary: which segment responds, what differentiators are actually cited |

**🚦 Gate 2 — the decisive gate.** ≥3 buyers at `interest_level:
concrete` **and** ≥1 differentiator cited by buyers in their own words.
Failure here kills the venture — see `PLAYBOOK.md` Phase 2.

---

## Phase 3 — Pricing reality

| # | Task | Owner | Status | Blocked by | Done when |
|---|---|---|---|---|---|
| 3.1 | Get real FOB quotes for species buyers asked about | Founder | todo | Gate 2, 1.3 | ≥3 suppliers quoted on overlapping species, dated and valid |
| 3.2 | Build landed-cost model with 15% DOA provision | Agent draft / Founder verify | todo | 3.1 | `landed_cost_usd` computed for every quoted line |
| 3.3 | Benchmark against what buyers say they pay | Agent | todo | 3.2, 2.3 | `benchmark_landed_usd` and `margin_vs_benchmark` filled |

**🚦 Gate 3** — landed cost competitive with incumbent South Asian
sources at equivalent quality, DOA already priced in.

---

## Phase 4 — Decide, then register

Registration is deliberately **after** the decision. IEC and MPEDA cost
money and weeks; neither is needed to hold a discovery conversation.

| # | Task | Owner | Status | Blocked by | Done when |
|---|---|---|---|---|---|
| 4.1 | Go/no-go decision, documented | **Founder** | todo | Gate 3 | Written decision + reasons in `decisions.md` |
| 4.2 | Broker vs exporter-of-record for shipment one | Founder | todo | 4.1 | Decision logged. **See `verification-queue.md` V9** — the brokerage revenue target may be arithmetically unreachable |
| 4.3 | Register the new separate entity | Founder | todo | 4.1 = GO | Entity registered, GST active, name in `decisions.md` |
| 4.4 | Apply for IEC (DGFT) + MPEDA "OF" | Founder | todo | 4.3 | Both applications submitted, reference numbers logged |
| 4.5 | Finalize DOA policy, buyer terms, supplier agreement | Agent draft / Counsel finalize | todo | 4.1 = GO | Counsel-reviewed versions saved; species table rows signed off |
| 4.6 | *(If NO-GO)* Post-mortem + reopen design studio option | Founder | todo | 4.1 = NO-GO | Written post-mortem in `sessions/`; studio option re-evaluated |

**🚦 Gate 4** — entity, IEC, MPEDA, verified species list, and final
terms all in hand. **Never ship before this gate.**

---

## Phase 5 — Shipment one

| # | Task | Owner | Status | Blocked by | Done when |
|---|---|---|---|---|---|
| 5.1 | Close one buyer on a trial consignment | Founder | todo | Gate 4 | Written terms agreed, payment method settled |
| 5.2 | Place the order | Founder | todo | 5.1 | PO issued to vetted exporter |
| 5.3 | Inspect stock and packing pre-dispatch | Co-founder | todo | 5.2 | Physical inspection done, welfare standards confirmed |
| 5.4 | Ship, track, record every real cost | Founder | todo | 5.3 | Every actual cost logged against the model |
| 5.5 | Record actual DOA, margin, customs friction | Both | todo | 5.4 | Real numbers captured at delivery |
| 5.6 | Post-shipment review vs the Phase 3 model | Agent draft / Founder review | todo | 5.5 | Written variance analysis: where the model was wrong |

**🚦 Gate 5** — DOA under ~15%, margin near model, buyer reorders.
Three such shipments before any automation work begins.

---

## Agent roles

**Research/Ops Agent** — owns 1.1, 1.2, 1.4, 2.1, 2.3, 2.4, 3.2, 3.3,
4.5 (drafts), 5.6 (draft). Research, drafting, logging, synthesis only.
No legal, financial, welfare, or pricing decisions.

Do not hire marketing, website, or support agents. Out of scope until
after shipment three.

## Not in scope this phase

Website · brand · content · domestic India retail · marine species ·
reptiles · invertebrates · breeding operations · experience centre ·
the multi-agent architecture · the aquarium/habitat design studio
(parked, revisited only at task 4.6)
