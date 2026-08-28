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
| V1 | Seahorses and pipefish are Schedule 1 protected under the Wild Life Protection Act; trade prohibited | CHECKED-INDICATIVE | Confirmed via secondary sources (conservation research, Project Seahorse): India placed all seahorses and pipefish under Schedule I in 2001, banning capture and trade. The "11 marine species" framing in the original brief is unconfirmed — treat the seahorse/pipefish ban as the solid part of this claim. Not primary-source (bare Act text) verified. |
| V2 | MPEDA registration under the "Ornamental Fish Exporter (OF)" category is valid three years | CHECKED-INDICATIVE | Confirmed on mpeda.gov.in itself: OF certificate valid 3 years from issue, renewal fee ₹1,000. Source is the regulator's own site, not the gazetted regulation text — close to primary but not counsel-confirmed. |
| V3 | OF registrants may not export live marine products for human consumption | CHECKED-INDICATIVE | Confirmed on mpeda.gov.in: "An Ornamental Fish Exporter (OF) is an exporter who exports only ornamental fish but not an exporter of live marine products for human consumption." |
| V4 | IEC from DGFT is required for this trade | CHECKED-INDICATIVE | Confirmed on mpeda.gov.in: valid IEC from DGFT is a prerequisite for MPEDA OF registration. |
| V5 | Indian tarantulas (*Poecilotheria*) are CITES/Schedule listed | CHECKED-INDICATIVE | **Correction to the brief:** all 15 *Poecilotheria* species were added to **CITES Appendix II** in 2019 (regulated trade, permit system — not an outright ban). Before that listing, India's WLPA did not list the genus at all. Scope exclusion in `brief.md` stands regardless — tarantulas are out of scope either way. |
| V6 | Lacey Act creates liability for a commission-taking intermediary | UNVERIFIED | 16 U.S.C. §3371 et seq. — **still needs US counsel, not a web search. Not attempted this session.** |
| V7 | Under the WLPA 2022 amendment, burden of proof for legal possession sits on the holder | UNVERIFIED | WLPA amendment text — not attempted this session |
| V8 | Destination-country health certificate requirements for live freshwater fish into the US | UNVERIFIED | USFWS + APHIS import requirements — not attempted this session |
| V13 | Entire *Clariidae* family (walking catfish) and 34 species of *Channa*/*Parachanna* (snakehead) are listed as US injurious wildlife — live fish/eggs banned from import | CHECKED-INDICATIVE | Confirmed via USFWS's own injurious-wildlife summary and eCFR 50 CFR Part 16. **New finding, not in the original brief.** Both genera appear in the Indian ornamental trade — added as `FLAGGED` rows to `templates/species-legality-check.md`. Exclude from any US buyer conversation. |

**V6 is still the one to take most seriously.** It sits under the whole
brokerage model, and a web search is not adequate diligence for federal
wildlife liability. Budget for a consultation before shipment one. **Not
resolved this session — still open.**

---

## Market / commercial

| # | Claim | Status | Finding |
|---|---|---|---|
| V9 | India's ornamental fish export trade was ~USD 1.43M in 2017 | CHECKED-INDICATIVE | Directionally consistent with later trade data. Recent figures: **~USD 4.97M (2023), ~USD 2.11M (2024)**. The "small pond" conclusion **holds and strengthens**. |
| V10 | Industry-normal live-shipment mortality is 5–20% | UNVERIFIED | Confirm with the vetted exporters in Phase 1.3 — they have real route data |
| V11 | Broker commission of 5–15% of FOB is the market norm | UNVERIFIED | Confirm during Phase 1.3 supplier conversations |
| V12 | Indian exporter net margin is ~20%, so a 10% commission takes half of it | UNVERIFIED | Same — ask suppliers directly |

| V14 | Gujarat is a viable base for ornamental fish export logistics | CHECKED-INDICATIVE | **New risk finding, not in the original brief.** Research indicates ~90% of India's ornamental fish exports move through **Kolkata**, ~8% through **Mumbai**, ~2% through **Chennai**. Gujarat does not appear as a recognized export hub in the sources found. This does not block the venture — captive-bred stock and MPEDA registration are not geographically restricted — but it means the co-founder's Gujarat supplier relationships may lack the freight consolidators, live-cargo air handling, and MPEDA handling-centre infrastructure that exist around Kolkata. **Ask every supplier in task 1.3 how they currently route shipments to the airport/port and who handles international freight** — this may turn out to be the actual operational bottleneck, separate from the buyer-side question Gate 2 is testing. |

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
- [MPEDA — Become an Exporter](https://mpeda.gov.in/?page_id=436)
- [MPEDA — Exporters](https://mpeda.gov.in/exporters/?page_id=1608)
- [MPEDA — Ornamental Fish Handling Centre registration guidelines (PDF)](https://mpeda.gov.in/wp-content/uploads/2023/08/Guidelines_for_registration_of_Ornamental_Fish_Handling_Centre.pdf)
- [Project Seahorse — catch and trade of seahorses in India pre-ban](https://projectseahorse.org/resource/the-catch-and-trade-of-seahorses-in-india-pre-ban/)
- [CITES — Inclusion of all Poecilotheria species in Appendix II (CoP18 Prop.46)](https://cites.org/sites/default/files/eng/cop/18/prop/060319/E-CoP18-Prop-46.pdf)
- [Arachnoboards — All Poecilotheria Species Added to CITES](https://arachnoboards.com/threads/all-poecilotheria-species-are-added-to-cites.323849/)
- [USFWS — Summary of Species Currently Listed as Injurious Wildlife](https://www.fws.gov/page/summary-of-species-currently-listed-as-injurious-wildlife)
- [eCFR — 50 CFR Part 16, Injurious Wildlife](https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-16)
- [Present status, challenges and scope of ornamental fish trade in India (ResearchGate)](https://www.researchgate.net/publication/317741564_Present_status_challenges_and_scope_of_ornamental_fish_trade_in_India)

*Exchange rate used for the share calculations: ~₹88/USD. Recompute if
the rate has moved materially.*

## New findings this session not in the original brief

- **V13** — Clariidae (walking catfish) and Channa/Parachanna
  (snakehead) are US-injurious, banned outright. Both appear in the
  Indian trade. Now flagged in the species table.
- **V14** — ~90% of India's ornamental exports route through Kolkata;
  Gujarat is not a recognized hub. Possible operational bottleneck
  independent of the buyer-side risk. Added to Phase 1.3 guidance.
