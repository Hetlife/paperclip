# The marketplace model — economics and one serious problem

Researched 2026-08-28, in response to: *"what does the profit look like if
we connect them through encrypted messages."*

Short version: **the marketplace half is a good idea and fixes a real
problem. The encrypted-messaging half is the one design choice that makes
this business both harder to run and harder to defend, and it should be
dropped.** Detail below, with the arithmetic and the sources.

---

## 1. Why a marketplace is worth considering at all

`MARKET-RESEARCH.md` §3 found that selling animals directly does not
clear paid customer acquisition on a first order at real prices. A
marketplace — connect breeders to buyers, take a cut — is a genuine
response to that, because it removes the two worst costs of the retail
model:

- **No inventory.** You never buy an animal you might not sell.
- **No mortality risk.** DOA is the seller's exposure, not yours.
- **No holding cost.** No enclosures, no feeding, no husbandry staff.

That is a real improvement in risk, and it is why the model deserves a
serious look rather than a quick no.

## 2. The take rate

Marketplace commission benchmarks (sourced):

| Marketplace | Take rate |
|---|---|
| Typical range across marketplaces | **10–30%** |
| Niche / luxury with specialised service | **up to 25%** |
| Etsy | 6.5% transaction + 3% payment + $0.20 listing |
| eBay | ~10% final value (0.5–15% by category) |
| Grailed (niche fashion) | 9% + 3.49–4.99% payment |
| Airbnb / Turo (service-heavy) | ~15% / up to 25% |

A specialist live-animal marketplace with real vetting could plausibly
defend the upper half of that band. **Model at 15%**, with 25% as the
optimistic case.

## 3. The arithmetic — and why it is worse per transaction, not better

Using researched specimen prices ($85–495; call the mix **$250 average
transaction**) and the researched luxury CAC of **$175**:

| Model | Revenue per transaction | Less $175 CAC | First-transaction result |
|---|---|---|---|
| Retail — Emerald Tree Boa | $198 gross (40% of $495) | −$175 | **+$23** |
| Marketplace @ 15% on $250 | $37.50 | −$175 | **−$137.50** |
| Marketplace @ 15% on $495 | $74 | −$175 | **−$101** |
| Marketplace @ 25% on $495 | $124 | −$175 | **−$51** |

**A marketplace is worse per first transaction than retail, at every take
rate.** That is not an argument against it — it is the normal shape of a
marketplace. The bet is that CAC collapses over time because sellers
bring their own buyers and the catalogue itself becomes the acquisition
channel. Marketplaces are a volume-and-network-effects business, not a
margin business.

What that means concretely: at 15% on a $250 average, you need
**roughly 5 transactions per acquired buyer** just to recover acquisition
cost. In a category where a single animal is a 10–20 year commitment,
repeat purchase is structurally rare.

**You are also acquiring two sides.** Every marketplace pays twice —
once for buyers, once for sellers — and cannot transact until both exist
in the same niche at the same time. The cold-start problem is the usual
reason niche marketplaces fail, and it is not solved by anything in the
current plan.

## 4. Leakage — and why encryption makes it worse, not better

The structural failure mode of any marketplace is **disintermediation**:
the two sides meet on your platform, then transact off it, and you earn
nothing on every subsequent deal.

This category is close to the worst case for leakage:

- **High value per transaction** — a large absolute fee to avoid
- **Low frequency** — few enough deals that a private arrangement is easy
- **Relationship-based** — buyer and seller *want* an ongoing direct
  relationship, since husbandry support continues for years

This is not speculation. The ornamental fish export research in this
same repo reached the identical conclusion from the supply side:
*"10% is roughly half the Indian exporter's own net margin, so both sides
are motivated to cut us out by shipment four"*
(`ventures/ornamental-fish-export/brief.md` §2).

**Now add encrypted direct messaging.** Giving the two sides a private
channel you cannot see is handing them the exact tool they need to leave.
You cannot detect leakage, cannot measure it, and cannot intervene. The
feature intended to make the platform feel premium is the feature that
guts its revenue model.

Marketplaces that survive leakage do it by making the platform worth the
fee — escrow, dispute resolution, health guarantees, verified provenance,
insured shipping. Every one of those requires the platform to *see and
record* the transaction.

## 5. The compliance problem — read this part carefully

This is the finding that matters most, and it is specific rather than
general hand-wringing.

Federal enforcement material on online wildlife trade describes the
trafficking pattern as: list on a public platform, then **"off-site
buyers to other encrypted or less regulated platforms like messaging
applications to complete transactions."**

That is a description of the proposed architecture. Not something
adjacent to it — the same shape: public listing, private encrypted
channel, transaction completed where the platform cannot see it. It is
also, per the same sources, the pattern automated detection systems are
specifically built to find.

At the same time, the stated expectation for a legitimate platform runs
in the opposite direction. Platforms in this trade are expected to
**verify seller identity, remove illegal listings quickly, preserve
digital evidence, report suspected trafficking, and share transaction
data with wildlife regulators.**

You cannot do any of those for transactions you have deliberately made
unreadable. The two goals are in direct conflict:

| Encrypted-transaction design | What a compliant platform must do |
|---|---|
| Platform cannot read the deal | Preserve records of the deal |
| No transaction data retained | Share transaction data with regulators |
| Parties self-identify privately | Verify seller identity |
| No listing oversight after connect | Remove illegal listings rapidly |

And the Lacey Act baseline underneath all of it: a state or foreign law
prohibiting the sale or possession of a species makes selling that
species in interstate commerce a **federal** violation. A platform that
connected the parties, took a fee, and kept no record is not obviously
outside that chain — and would be unable to produce anything in its own
defence.

**This is not a reason to abandon the marketplace. It is a reason to drop
the encryption-as-a-feature framing.**

## 6. What to build instead

The legitimate version of the same intuition:

1. **Private, not opaque.** Messaging that is confidential *from other
   users* and encrypted in transit and at rest — while the platform
   retains transaction records. That is what every serious marketplace
   does, and it is what buyers of a $500 animal actually want. "Nobody
   else can see my purchase" is the real desire; "nobody can ever see it"
   is not a feature anyone asked for.
2. **Make the record the product.** Verified provenance, health
   documentation, a permanent custodianship record for the animal. In a
   trade where the buyer's own legal safety depends on documentation,
   *keeping* records is a selling point, not overhead.
3. **Escrow, and release on live arrival.** Solves the DOA dispute that
   is the single most negotiated term in this trade, gives both sides a
   concrete reason to transact on-platform, and makes leakage costly
   rather than free.
4. **Charge for the thing that cannot be disintermediated.** Fees on the
   connection leak. Fees on escrow, insured live shipping, compliance
   documentation, and the biotope installation do not.

Note that (4) lands in the same place as `MARKET-RESEARCH.md` §5: the
money is in the service around the animal, not a percentage of the animal.

## 7. Honest gaps

- **No US counsel has reviewed any of this.** Everything above is
  research, not legal advice, and platform liability for facilitating a
  wildlife transaction is exactly the question that needs a lawyer.
- **No take rate has been tested** with a real breeder. Whether suppliers
  in this category will accept 15% is unknown.
- **The $250 average transaction is an assumption**, derived from the
  researched $85–495 spread, not from observed sales.
- **Two-sided cold start is unmodelled.** No estimate exists for what it
  costs to reach liquidity in this niche.

---

## Sources

- [Marketplace commission / take rate benchmarks — Sharetribe](https://www.sharetribe.com/marketplace-glossary/commission-take-rate/)
- [Take rate guide — Dittofi](https://www.dittofi.com/learn/what-is-take-rate)
- [Marketplace take rate guide — Origami](https://origami-marketplace.com/en-gb/marketplace-take-rate-a-guide-for-marketplace-operators/)
- [Wildlife Trafficking and the Growing Online Marketplace — U.S. Fish & Wildlife Service](https://www.fws.gov/testimony/wildlife-trafficking-and-growing-online-marketplace)
- [Online Wildlife Trafficking Marketplace — U.S. Department of the Interior](https://www.doi.gov/ocl/online-wildlife-trafficking-marketplace)
- [How Illegal Wildlife Trafficking Evades Online Platforms — Resolver](https://www.resolver.com/blog/illegal-wildlife-trafficking-platforms/)
- [The Lacey Act: Prohibitions, Penalties, and Enforcement — LegalClarity](https://legalclarity.org/the-lacey-act-prohibitions-penalties-and-enforcement/)
