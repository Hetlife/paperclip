# Market research — Atelier Fauna

Researched 2026-08-28. Every figure below has a source. Where a number is
an assumption rather than a finding, it says so.

**Why this exists:** the price points in the original spec were not
sourced. Researching them found they sat 3–8× above real market, which
changes the unit economics materially. That finding is the reason to
read this before showing anyone a revenue projection.

---

## 1. Market size — the categories are real

| Metric | Figure | Source |
|---|---|---|
| US ornamental fish market | **$1.84 B** (2025 est.) | Future Market Insights |
| US households with freshwater fish | **11.1 M** (3rd most popular pet after dogs, cats) | Future Market Insights |
| Freshwater share of global ornamental market | **46.2%** by value | Future Market Insights |
| US reptile market | **$1.2–1.5 B** annually (animals + enclosures + supplies) | Multiple; see sources |
| US households owning reptiles | **6 M** (~4%), owning ~12 M reptiles | PetsNerd / APPA-derived |
| Reptile household growth since 2016 | **+38%** — fastest-growing pet category by percentage | PetsNerd |
| Average reptile owner annual spend | **$480** (APPA 2025) | APPA |
| Engaged hobbyist annual spend | **~$1,500** | *Reptiles* Magazine reader survey |

**Read:** both categories are genuine, billion-dollar, growing markets
with millions of households. Demand is not the problem.

---

## 2. Real price points — the correction

Retail prices found for the exact species in the collection:

| Species | Researched US retail | Original spec figure | Delta |
|---|---|---|---|
| *Pterophyllum altum* (Altum Angelfish) | $17–320, typically **$45–130** | $380 | Above every listing found |
| *Hymenopus coronatus* (Orchid Mantis) | **$50–100** | $420 | **4–8× over** |
| *Corallus caninus* (Emerald Tree Boa) | **$150–550** | $1,450 | **~3× over** |
| *Mantella aurantiaca* (Golden Mantella) | Not lawfully placeable — see §4 | $260 | Should never have had a price |

Sources are per-species retail listings from active US sellers
(Imperial Tropicals, Aqua Imports, Wet Spot, Shoreline Aquatics,
Backwater Reptiles, Big Apple Herp, Bugs In Cyberspace, USMantis,
Mantis Universe). These are asking prices, not transaction prices.

`faunaData.ts` has been corrected to the mid-range of each researched
band. A "luxury" brand can price above market — but it has to know what
market is, and be able to say what the premium buys.

---

## 3. Funnel economics — where this gets hard

Benchmarks (sourced):

| Metric | Figure | Source |
|---|---|---|
| DTC median conversion rate | **1.17%** (spread 0.20–7.12%) | Top Growth Marketing, 19 stores / ~17 M sessions, Jul 2025–Jun 2026 |
| DTC top-quartile conversion | **>1.52%** | Same |
| Luxury goods average CAC | **$175** (range $120–400) | Retainful / industry benchmarks |
| Luxury CAC:LTV ratio | **5.2×** — best of any e-commerce category | Retainful |
| CAC increase 2023 → 2025 | **+40–60%** | Industry benchmarks |

### The problem, stated plainly

**Assumption** (not researched): gross margin on livestock at 40%.
Live-animal retail carries mortality, holding, and freight costs that
push this down, so 40% is generous.

| Product | Real price | Gross @ 40% | Less $175 CAC | First-order result |
|---|---|---|---|---|
| Orchid Mantis | $85 | $34 | **−$141** | Loses money |
| Altum Angelfish | $110 | $44 | **−$131** | Loses money |
| Emerald Tree Boa | $495 | $198 | **+$23** | Roughly break-even |

At the spec's original prices this looked healthy. At researched prices,
**selling animals alone does not clear paid-acquisition cost on the
first order.** Three ways out, and they are not equally good:

1. **Repeat purchase / LTV.** Luxury's 5.2× CAC:LTV is the best in
   e-commerce, so this is plausible — but it requires customers who buy
   repeatedly, and an emerald tree boa is a 15–20 year commitment. This
   category has structurally low repeat rates on the animal itself.
2. **Cheap acquisition.** Content, SEO, organic. Slow, but this category
   has genuine editorial substance to work with — which is what the
   Sanctuary Journal already is.
3. **Raise order value beyond the animal.** The enclosure, the install,
   and ongoing maintenance. See below.

---

## 4. Legal constraint found during research

**Golden Mantella (*Mantella aurantiaca*)** was listed in the collection
as `waitlist` — requestable. Research found:

- **IUCN Critically Endangered**; area of occupancy under 10 km²
- **CITES Appendix II**, annual export quota in the low hundreds
- **Export suspended since 2010** pending non-detriment findings
- **Overcollection for the pet trade** is a named driver of its decline

Offering it for placement would contradict the custodianship charter the
site is built around. Changed to `sanctuary_only` and added to the
screening exclusion list so it cannot be requested via the Register.

This is the concrete argument for why per-species research has to precede
listing, not follow it.

---

## 5. The strategic read

The animal is the *cheapest* part of what this business actually sells.
Researched figures put a specimen at $85–495, while an engaged hobbyist
spends **~$1,500/year** and the reptile market counts **enclosures and
supplies** inside its $1.2–1.5 B.

A "living biotope" — custom enclosure, planting, installation, ongoing
maintenance — is a materially larger order value than livestock, has
recurring revenue, carries no live-animal mortality risk on the hardware
portion, and sits directly on the founder's architecture and design
background.

That is also, notably, the aquarium/habitat design studio idea that was
deliberately parked in the ornamental fish venture dossier
(`ventures/ornamental-fish-export/brief.md` §8, flagged for
re-examination). Two independent lines of research now point at the same
conclusion. **Recommendation: treat the animal as the entry point to a
biotope commission, not as the product.**

---

## 6. What is still unknown

Honest gaps — none of these were researched and none should be presented
as known:

- **Wholesale cost** for any species. The 40% margin above is an
  assumption, not a finding. Real margin needs supplier quotes.
- **Mortality/DOA rate** on the actual shipping routes.
- **State-level legality** per species per destination. Federal screening
  is not sufficient to ship a live animal in the US.
- **Whether a premium over market clears.** No evidence yet that buyers
  in this category pay above the researched band for presentation and
  documentation.
- **Real conversion rate for this offer.** The 1.17% median is across all
  DTC; a consultation-gated, no-cart flow will convert very differently
  and could be better or far worse.
- **Biotope commission pricing.** The §5 recommendation is a direction,
  not a costed model.

---

## Sources

- [USA Ornamental Fish Market Size & Trends 2025-2035 — Future Market Insights](https://www.futuremarketinsights.com/reports/united-states-ornamental-fish-market)
- [U.S. Ornamental Fish Market Report — Grand View Research](https://www.grandviewresearch.com/industry-analysis/us-ornamental-fish-market-report)
- [Reptile Ownership Statistics — PetsNerd](https://petsnerd.com/statistics/reptile-ownership-statistics/)
- [APPA — Fish & Reptile Ownership 2025](https://americanpetproducts.org/news/from-bigger-tanks-to-stronger-bonds-fish-reptile-ownership-evolves-in-2025)
- [Ecommerce Conversion Rate Benchmark — Top Growth Marketing](https://topgrowthmarketing.com/dtc-ecommerce-benchmarks/ecommerce-conversion-rate/)
- [Customer Acquisition Cost in Ecommerce — Retainful](https://www.retainful.com/blog/customer-acquisition-cost-ecommerce)
- [Golden mantella — CITES](https://cites.org/eng/gallery/species/amphibian/golden_mantella.html)
- [Species Conservation Strategy for *Mantella aurantiaca* — IUCN](https://portals.iucn.org/library/sites/library/files/documents/2018-043.pdf)
- [Altum Angelfish listings — Aqua Imports](https://www.aqua-imports.com/product/altum-angel/) · [Imperial Tropicals](https://imperialtropicals.com/products/rio-vichada-altum-angelfish) · [Wet Spot](https://www.wetspottropicalfish.com/product/pterophyllum-altum-3/)
- [Emerald Tree Boa listings — Backwater Reptiles](https://www.backwaterreptiles.com/boas/emerald-tree-boa-for-sale.html) · [Big Apple Herp](https://www.bigappleherp.com/products/emerald-tree-boas)
- [Orchid Mantis listings — Bugs In Cyberspace](https://bugsincyberspace.com/product/buy-orchid-mantis-live-pet/) · [USMANTIS](https://usmantis.com/products/hymenopus-coronatus-orchid-flower-mantis)
