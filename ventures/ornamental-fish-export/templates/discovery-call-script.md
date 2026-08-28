# Buyer discovery call script (draft)

Drafted ahead of Gate 1 as prep — costs nothing, and the founder should
have this ready before making the first call. **This is a discovery
call, not a sales call.** The goal is information, specifically: will
this buyer ever say yes, and why. Do not pitch, do not quote a price,
do not promise a timeline. If a call turns into a real sales
conversation, that itself is a strong interest signal — log it as such.

**Human makes these calls.** See `PLAYBOOK.md` Phase 2 — this is
relationship-building in a trust-sensitive trade, not something to
delegate to a bot.

---

## Opening (30 seconds)

"Hi [name], this is [founder name] — I'm working on sourcing captive-bred
freshwater ornamental fish out of India, and I'm trying to understand
the US side of the market before I commit to anything. Do you have five
minutes? I'm not selling anything today, just trying to learn."

If they're busy: "No problem — is there a better time, or would email
work better for a couple of quick questions?"

## Core questions (in order — earlier answers shape later ones)

1. **"What do you currently import, and from where?"**
   Listen for: Sri Lanka, Thailand, Singapore, Indonesia, Malaysia,
   or domestic US breeders. This is the actual competitor.

2. **"How long have you worked with your current supplier(s), and how
   did that relationship start?"**
   Reveals how switching actually happens in this trade — cold outreach,
   referral, trade show, etc. Useful for channel strategy later.

3. **"What would make you try a new supplier, especially a new one from
   India?"**
   The single most important question. Do not suggest answers — let
   them name it. Common categories to listen for (don't prompt):
   price, species availability, documentation/health certs,
   responsiveness, DOA handling, minimum order size.

4. **"What's a typical order size and frequency for you?"**
   Confirms whether they fit the $2-6k specialist-retailer profile or
   the larger wholesaler profile — and whether our supply side could
   even fill it.

5. **"How do you usually handle payment with a new/first-time
   supplier?"**
   This is the V6/trust question in disguise — wire transfer, escrow,
   LC, net terms, COD on arrival. If every buyer says "we only pay
   established suppliers after several trial shipments on our terms,"
   that's a hard constraint on the whole plan, not a detail.

6. **"What do you expect on DOA (dead-on-arrival) — replacement,
   credit, refund? What's normal in this trade?"**
   Feeds directly into `templates/species-legality-check.md` scope and
   the DOA policy in `brief.md` Track A.

7. **"If I had [species type, once we know what we can source] available
   at a competitive price with clean documentation, would that be
   interesting enough to try a trial order?"**
   Only ask this near the end, and only if the conversation has gone
   well. This is the closest thing to a direct ask in a discovery call —
   log the answer verbatim in `differentiator_cited` / `notes`.

## Closing

"This has been really useful — thank you. Would it be okay if I follow
up once I have firmer pricing and species availability?" Get a yes/no,
not just politeness — a "sure, feel free" is not the same as "yes,
please do."

## Logging (immediately after the call, in `buyer-log.csv`)

- `status` → `conversation_held`
- `interest_level` → `none` / `polite` / `concrete` (see conventions in
  `templates/README.md` — be strict, "polite interest" is the most
  common false positive in this trade)
- `differentiator_cited` → their words, not a summary in your words
- `current_source`, `typical_order_usd`, `payment_terms_stated`,
  `doa_expectation` → fill from their answers
- `notes` → anything that doesn't fit a column, especially anything
  that sounded like a real objection

## What NOT to do on this call

- Don't quote a price. Nothing is priced yet (Phase 3).
- Don't promise a species list. Nothing is legally verified yet
  (Phase 1.1/4.5).
- Don't commit to a delivery timeline.
- Don't oversell the India angle before you've heard their answer to
  question 3 — you want their unprompted reason, not their polite
  agreement with yours.
