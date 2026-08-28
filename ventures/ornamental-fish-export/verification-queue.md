# Verification queue

Claims currently treated as fact somewhere in this folder that **have
not been verified against a primary source**. Most originated from a
general AI chat during the brief-writing stage, which is not a
sufficient basis for a legal or financial decision.

**Rule: nothing in `status: UNVERIFIED` may be used in a buyer quote, a
regulatory filing, a supplier commitment, or a go/no-go decision.**

Status values: `UNVERIFIED` · `CHECKED-INDICATIVE` (non-primary source
consulted, directionally supported, still not authoritative) ·
`VERIFIED` (primary source or counsel confirmed — record the source and
date).

---

## Legal / compliance — all human-or-counsel verification required

| # | Claim | Status | Primary source to check |
|---|---|---|---|
| V1 | 11 marine species plus all seahorses and pipefish are Schedule 1 protected under the Wild Life Protection Act; trade prohibited | UNVERIFIED | WLPA 1972 schedules as amended 2022, via MoEFCC |
| V2 | MPEDA registration under the "Ornamental Fish Exporter (OF)" category is valid three years | UNVERIFIED | mpeda.gov.in registration guidelines |
| V3 | OF registrants may not export live marine products for human consumption | UNVERIFIED | MPEDA registration terms |
| V4 | IEC from DGFT is required for this trade | UNVERIFIED | dgft.gov.in |
| V5 | Indian tarantulas (*Poecilotheria*) are CITES/Schedule listed | UNVERIFIED | CITES appendices + WLPA schedules |
| V6 | Lacey Act creates liability for a commission-taking intermediary | UNVERIFIED | 16 U.S.C. §3371 et seq. — **needs US counsel, not a web search** |
| V7 | Under the WLPA 2022 amendment, burden of proof for legal possession sits on the holder | UNVERIFIED | WLPA amendment text |
| V8 | Destination-country health certificate requirements for live freshwater fish into the US | UNVERIFIED | USFWS + APHIS import requirements |

**V6 is the one to take most seriously.** It sits under the whole
brokerage model, and a web search is not adequate diligence for federal
wildlife liability. Budget for a consultation before shipment one.

---

## Market / commercial

| # | Claim | Status | Finding |
|---|---|---|---|
| V9 | India's ornamental fish export trade was ~USD 1.43M in 2017 | CHECKED-INDICATIVE | Directionally consistent with later trade data. Recent figures: **~USD 4.97M (2023), ~USD 2.11M (2024)**. The "small pond" conclusion **holds and strengthens**. |
| V10 | Industry-normal live-shipment mortality is 5–20% | UNVERIFIED | Confirm with the vetted exporters in Phase 1.3 — they have real route data |
| V11 | Broker commission of 5–15% of FOB is the market norm | UNVERIFIED | Confirm during Phase 1.3 supplier conversations |
| V12 | Indian exporter net margin is ~20%, so a 10% commission takes half of it | UNVERIFIED | Same — ask suppliers directly |

### Two findings from V9 that change the plan

**1. The year-1 target implies an implausible national market share.**

The year-1 goal of ₹1L–1.5L/month gross margin, run against India's
actual total national ornamental fish exports:

| Model | Shipment value needed | Share of India's 2024 national exports |
|---|---|---|
| Broker @ 10% | ~USD 170k/year | **~8%** |
| Exporter-of-record @ 30% | ~USD 57k/year | **~2.7%** |

Capturing 8% of an entire country's export trade in year one, as a
first-time exporter with no US relationships, is not a realistic plan.
At 2.7% it is ambitious but arguable.

**This is an argument for converting to exporter-of-record earlier than
the brief suggests** — not just because brokerage margin decays, but
because the brokerage target is arithmetically out of reach. Flag for
the Phase 4.2 decision.

**2. The market is volatile, and the brief does not account for it.**

National exports fell roughly 58% between 2023 and 2024. A market that
halves year-over-year is a materially different risk than a small-but-
stable one. Understanding *why* it fell is worth asking every supplier
and buyer in Phase 1 and 2 — it may reveal a structural problem that no
amount of execution fixes.

---

## How to close an item

Replace the status, add the source URL or counsel name and the date
checked, and note anything that contradicts the original claim. If a
verification changes a decision, add an entry to `decisions.md`.

## Sources consulted

- [Ornamental Fish Export From India 2026: Market Insights](https://deepbeez.com/trade-flow/ornamental-fish-export-from-india)
- [Export performance of Indian ornamental fish — growth, destination and diversity](https://www.researchgate.net/publication/271707321_Export_performance_of_Indian_ornamental_fish_-_an_analysis_of_growth_destination_and_diversity)
- [MPEDA](https://mpeda.gov.in/)

*Exchange rate used for the share calculations: ~₹88/USD. Recompute if
the rate has moved materially.*
