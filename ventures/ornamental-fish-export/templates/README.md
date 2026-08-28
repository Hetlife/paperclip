# Templates

Working logs. Copy or fill these directly — they are the actual
deliverables of Phases 1–3, not illustrations.

| File | Feeds | Filled during |
|---|---|---|
| `buyer-log.csv` | Gate 2 (the kill test) | Phase 1.2, 2.2, 2.3 |
| `supplier-quote-log.csv` | Gate 3 (pricing reality) | Phase 1.3, 3.1 |
| `species-legality-check.md` | Gate 1 and Gate 4 | Phase 1.1, verified in 4.5 |
| `discovery-call-script.md` | Gate 2 | Drafted ahead of schedule (task 2.1); do not use until Gate 1 passes |

## Field conventions

**`buyer-log.csv`**

- `segment` — `retailer` or `wholesaler`. Keep both populated; the
  parallel-segment split is a logged founder decision.
- `status` — `not_contacted` → `contacted` → `conversation_held` →
  `interested` → `trial_discussed` → `committed` / `declined` / `no_response`
- `interest_level` — `none` / `polite` / `concrete`. Only `concrete`
  counts toward Gate 2. "Polite interest" is the most common false
  positive in this trade; be strict.
- `differentiator_cited` — **what the buyer said, in their words**, not
  what you hope they meant. Blank is a valid and informative answer.
- `current_source` — which country they import from today. This is the
  competitor you actually have to beat.

**`supplier-quote-log.csv`**

- `fob_price_usd` — per unit, at the quantity in `moq_units`.
- `landed_cost_usd` — computed, not quoted: FOB + freight + packing/
  oxygen + health cert + customs both ends + FX + DOA provision.
- `doa_provision_pct` — use 15% unless a supplier gives you real route
  data that justifies lower. Do not model the optimistic case.
- `benchmark_landed_usd` — what buyers said they pay today for the
  equivalent. Gate 3 compares against this column.

**`species-legality-check.md`**

Every row starts `UNVERIFIED`. An agent may fill the research columns.
Only a human or counsel may move a row to `VERIFIED`, and the sign-off
column must name who and when. A species with no signed-off row cannot
be quoted, ordered, or shipped.
