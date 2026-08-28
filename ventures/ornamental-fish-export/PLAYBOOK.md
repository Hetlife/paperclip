# Playbook — step by step to shipment one (or a clean kill)

**Current phase: Phase 1, not yet started.**

The ordering principle: **spend nothing until the free signals come
back.** Every phase below is ordered so the cheapest information that
could kill the venture arrives first. Do not skip ahead — the whole
point is to avoid spending money and registration effort on a business
that twenty phone calls would have told you not to start.

Each phase ends in a **gate**. A gate is a real stop: if the gate fails,
you either kill the venture or change it, and you do not proceed to the
next phase on hope.

---

## Phase 0 — Setup (done)

Brief captured, decisions logged, tracking files created. No spend.

**Status: complete** (2026-08-28)

---

## Phase 1 — Free intelligence (Weeks 1–2)

Nothing here costs money. All three run in parallel.

| Step | Task | Owner |
|---|---|---|
| 1.1 | Draft species eligibility table — freshwater captive-bred candidates, each cross-checked against WLPA schedules, CITES appendices, and the US injurious wildlife list. **Draft only, marked unverified.** | Agent drafts |
| 1.2 | Build list of 40–60 named US buyers across both segments, with contact, apparent current supply source, and species focus | Agent |
| 1.3 | Vet 3+ Gujarat MPEDA-eligible exporters/breeders willing to work on brokerage terms | Co-founder |
| 1.4 | Resolve the load-bearing items in `verification-queue.md` that are free to check | Agent drafts / human confirms |

Output: `templates/species-legality-check.md` filled, `templates/buyer-log.csv`
populated with 40–60 rows, 3+ suppliers named.

### 🚦 Gate 1 — Is there anything to sell, to anyone, from anyone?

Pass requires **all three**:
- A legally sellable species set exists (≥10 species that look clearly
  permissible, pending verification)
- ≥40 real named US buyers identified
- ≥3 Indian suppliers willing to engage

**If any fails → stop.** Most likely failure: the species you can
actually source are restricted. That is a real kill, not a setback.

---

## Phase 2 — The kill test (Weeks 2–4)

This is the phase that decides the venture. Everything before it was
preparation; everything after it depends on it.

| Step | Task | Owner |
|---|---|---|
| 2.1 | Draft the discovery script: what do you import from South Asia now, what would make you try an Indian source, typical order size, payment terms, DOA expectations | Agent drafts |
| 2.2 | Hold 20+ discovery conversations, split across wholesalers and specialist retailers | **Founder — human calls** |
| 2.3 | Log every conversation outcome in `templates/buyer-log.csv` as it happens | Agent logs |
| 2.4 | After 10 calls, mid-point synthesis: which segment responds, what differentiator is actually being cited | Agent |

**Do not automate 2.2.** These are relationship-building calls from an
unknown supplier in a trust-sensitive trade. A bot doing this actively
destroys the asset you are trying to build.

### 🚦 Gate 2 — Will anyone actually buy? (THE gate)

Pass requires **both**:
- ≥3 buyers express concrete interest (willing to discuss a trial
  consignment, not just polite interest)
- ≥1 credible, repeatable differentiator is named **by buyers, not by
  you** — species availability, price, documentation, responsiveness

**If this fails → kill the venture.** The brief already identifies this
as the existential risk: no proven reason for a US buyer to leave Sri
Lanka, Thailand, or Singapore. Twenty conversations answering "no" is
the cheapest possible version of that answer. Take it and move on to the
aquarium/habitat design studio alternative.

---

## Phase 3 — Pricing reality (Weeks 4–5)

Only reached if Gate 2 passed.

| Step | Task | Owner |
|---|---|---|
| 3.1 | Get real FOB quotes from the vetted exporters, for species buyers actually asked about | Founder |
| 3.2 | Build a landed-cost model: FOB + freight + packing/oxygen + health cert + customs both ends + FX + DOA provision at 15% | Agent drafts / Founder verifies |
| 3.3 | Benchmark that landed cost against what buyers said they pay today | Agent |

### 🚦 Gate 3 — Can the numbers work?

Pass requires: landed cost at equivalent quality is **competitive with
the incumbent South Asian sources**, with the DOA provision already
priced in — not competitive only if everything goes perfectly.

**If this fails → kill or reposition.** Repositioning means finding the
niche where India has a genuine supply advantage rather than competing
on the same species everyone else ships.

---

## Phase 4 — Decide, then register (Weeks 5–6)

**Registration comes after the decision, not before.** This is
deliberate: IEC and MPEDA registration cost money and weeks of effort,
and neither is needed to hold a discovery conversation. Do not spend
them on an unvalidated venture.

| Step | Task | Owner |
|---|---|---|
| 4.1 | Go/no-go decision, documented with reasons either way | **Founder** |
| 4.2 | Decide broker vs exporter-of-record for shipment one | Founder |
| 4.3 | *(If GO)* Register the new separate entity — name, structure, GST | Founder |
| 4.4 | *(If GO)* Apply for IEC (DGFT) and MPEDA "OF" registration | Founder |
| 4.5 | *(If GO)* Finalize DOA policy, buyer terms, supplier agreement with counsel | Agent drafts / Counsel finalizes |
| 4.6 | *(If NO-GO)* Write the post-mortem and re-open the aquarium/habitat design studio option | Founder |

### 🚦 Gate 4 — Legally cleared to ship

Pass requires: entity registered, IEC and MPEDA in hand, species list
verified by counsel, DOA policy and buyer terms finalized.

**Never ship before this gate.** A single mis-declared species creates
Lacey Act liability in the US and WLPA liability in India, and under the
2022 amendment the burden of proof sits on the holder.

---

## Phase 5 — Shipment one (Weeks 6–12)

Manual. Spreadsheet and phone. No software, no agents, no website.

| Step | Task | Owner |
|---|---|---|
| 5.1 | Close one buyer on a trial consignment with written terms | Founder |
| 5.2 | Place the order with the vetted exporter | Founder |
| 5.3 | Co-founder inspects stock and packing before dispatch | Co-founder |
| 5.4 | Ship, track, and record every real cost as it lands | Founder |
| 5.5 | Record actual DOA rate, actual margin, actual customs friction | Both |
| 5.6 | Post-shipment review against the Phase 3 model — where was the model wrong? | Agent drafts / Founder reviews |

### 🚦 Gate 5 — Repeat or stop

Pass requires: DOA under ~15%, margin close to model, and the buyer
willing to reorder. Only after **three** such shipments does building
any AI/automation layer become justified.

---

## What comes after (not now)

Shipments 2–3 manually. Then, and only then, revisit the automation
layer — stocklist parsing, buyer follow-up, documentation drafting.
AI multiplies a margin; it cannot create demand. With no deal flow,
every rupee spent on agent infrastructure returns zero.
