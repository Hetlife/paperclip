# Feature requirements — AI species intake & living exhibit pipeline

Requirements for the founder's stated direction: *an AI agent takes a
buyer's species list, researches the breed/species, sources images,
generates a 3D model with realistic looping behavior, and adds it to the
site.*

`../ROADMAP.md` describes the technical pipeline and its unsolved parts.
This document is the **requirements** layer: what each stage must
guarantee, what it must never do, and how "done" is judged.

Status key: **BUILT** · **PARTIAL** · **NOT BUILT**

---

## Scope decision: one animal per exhibit

**BUILT.** The collection carries exactly one specimen per biome — five
exhibits, five animals:

| Exhibit | Specimen | Status |
|---|---|---|
| Hydro | Orinoco Altum Angelfish (*Pterophyllum altum*) | available |
| Aether | Rainbow Lorikeet (*Trichoglossus moluccanus*) | sanctuary only |
| Micro | Pink Orchid Mantis (*Hymenopus coronatus*) | waitlist |
| Terra | Amazon Emerald Tree Boa (*Corallus caninus*) | available |
| Sylvan | Golden Mantella (*Mantella aurantiaca*) | waitlist |

Rationale: each exhibit gets a fully-realized specimen — real care specs,
its own journal essay, its own behavioral animation — rather than several
thin ones. Depth per exhibit is the product; a long catalogue is not.

Adding a second specimen to an exhibit is a deliberate decision, not a
default. Every added animal multiplies the research, legal-verification,
photography, and animation work described below.

---

## R1 — Buyer species intake

**BUILT.** `POST /api/species-intake`, reachable from `/register`
("The Register") via `SpeciesIntakeForm`.

Requirements:

- **R1.1** Accept a list of free-text species names (max 50 per
  submission) plus a contact email. ✅
- **R1.2** Validate and bound every field; reject malformed input with
  actionable errors. ✅
- **R1.3** Rate-limit per client. ✅
- **R1.4** Persist every submission — including rejected entries, which
  are signal about what buyers want. ✅
- **R1.5** Return per-entry screening results to the caller so a buyer
  learns immediately that a request is prohibited. ✅
- **R1.6** A buyer-facing form must reach the endpoint — chip-style entry
  with paste-splitting and dedupe, loading and error states. ✅
- **R1.7** The UI must not present `needs_review` as approval. No green
  check, no "cleared", no reassuring language — it is labelled "Passed to
  research" with "This is not a clearance" stated inline. ✅ See the note
  on wording in `ScreeningResults.tsx`; this is the one place where a
  cosmetic choice would misrepresent what the screen can establish.

## R2 — Legal screening

**PARTIAL — and permanently partial by design.**

- **R2.1** Reject species matching known hard-exclusion rules, citing the
  actual regulation. ✅
- **R2.2** **Never** return a verdict meaning "legal" or "approved." The
  type has no such value. ✅
- **R2.3** Err toward flagging. Crude, broad matching is correct here. ✅
- **R2.4** Every non-excluded entry routes to human review. ✅
- **R2.5** *Not built:* a maintained exclusion dataset. The current list
  covers taxa this project researched directly — it is not the USFWS
  injurious list (800+ entries) or CITES (thousands). **Requirement for
  going live: either ingest the authoritative lists or make it explicit
  to buyers that screening is indicative only.**
- **R2.6** *Not built:* destination-state rules. US reptile and
  live-animal law is state-level and varies widely. Federal screening
  alone is insufficient to ship an animal.

**Hard constraint:** no automated step may ever conclude a species is
legal. That is a human/counsel determination, per jurisdiction.

## R3 — Species research

**NOT BUILT.** Given a name, produce publishable care specs (temperature,
humidity, space, diet, lifespan) and behavioral notes.

- **R3.1** Every field must carry a source.
- **R3.2** No field is published without human sign-off. A wrong care
  spec is an animal-welfare failure, not a content bug.
- **R3.3** Reuse the pattern already proven in this repo:
  `ventures/ornamental-fish-export/templates/species-legality-check.md`
  — agent drafts, human signs off, nothing goes live unsigned.
- **R3.4** Conflicting sources must surface as a conflict, not be
  silently averaged.

## R4 — Reference imagery

**NOT BUILT.** Sourcing multi-angle photography.

- **R4.1** Every image must have documented usage rights before entering
  any pipeline. This is a licensing requirement, not a technical one.
- **R4.2** Buyer-supplied photos are typically single-angle and
  inconsistent — insufficient for reconstruction. Plan for licensed
  stock, supplier documentation, or commissioned photography.
- **R4.3** Reject/flag images that can't be attributed.

## R5 — 3D model generation

**NOT BUILT** (viewer side is BUILT — see R6).

- **R5.1** External generation service; not hand-written.
- **R5.2** Per-species tuning expected. A flat-bodied fish and a coiled
  snake are different reconstruction problems.
- **R5.3** Output must be a `.glb` with an `"Idle"` animation clip.
- **R5.4** Rigging will likely need a human for non-standard body plans
  (insects, snakes). Budget for it rather than assuming auto-rigging.

## R6 — Rendering and behavior

**PARTIAL.**

- **R6.1** Load a `.glb` and loop its `"Idle"` clip. ✅
  (`Specimen3DViewer.tsx`)
- **R6.2** Fall back gracefully: 3D → photo → animated line art. A
  missing model must never break the page. ✅ (`SpecimenMedia.tsx`, with
  an error boundary — a broken `.glb` throws inside the r3f tree where
  try/catch can't reach it.)
- **R6.3** Integration cost of a real model = setting one field
  (`assets.interactive3dModelUrl`). ✅
- **R6.4** No live WebGL in grid views. A page shows many cards at once;
  many simultaneous contexts is a real cost at thumbnail size. Live 3D is
  reserved for the hero and the on-demand dossier modal. ✅
- **R6.5** Demo behavioral animations exist for all five exhibits. ✅
  (`SpecimenAnimation.tsx`)
- **R6.6** *Not built:* pre-rendered turntable posters for grid cards
  once real models exist.

### On the demo animations (R6.5)

Each exhibit has a hand-authored line-art loop built from that species'
actual resting behavior:

| Exhibit | Behavior modeled |
|---|---|
| Hydro | Slow vertical drift; fin undulation; independent pectoral flutter |
| Aether | Perch sway; periodic alert head-turn; occasional wing settle |
| Micro | Near-total stillness; petal-mimic wind sway; one fast strike-fold |
| Terra | Slow respiratory expansion of the coil; periodic tongue flick |
| Sylvan | Continuous throat pulse; whole-body settle; rare blink |

They are **deliberately abstract line art, not attempted photorealism.**
At this fidelity an elegant silhouette reads as intentional design,
whereas a not-quite-right 3D animal reads as broken. This matches the
spec's "ambient presence, not commercial animation" principle — and it
means the site looks finished today rather than looking like it's
waiting for assets.

## R7 — Publication

**NOT BUILT.** Turning a researched species into a live specimen entry.

- **R7.1** Output a reviewable change (a PR), never a direct write to
  live data.
- **R7.2** Human review required before publication — including once the
  pipeline is reliable. A publicly wrong care spec or an uncanny
  animation damages the brand the site exists to project.
- **R7.3** Any specimen whose legality is unverified publishes as
  `sanctuary_only` at most — never `available`.

---

## Cross-cutting constraints

These hold at every stage and are not negotiable by a later
implementation:

1. **No automated legality clearance.** Ever. (R2.2)
2. **No unsigned care specs.** A human signs off before publication. (R3.2)
3. **No silent failure.** Missing assets degrade visibly-but-gracefully;
   they never break a page or fake a result. (R6.2)
4. **Server-side ethical gates.** The readiness checklist and
   sanctuary-only rules are enforced in the API, not just the UI —
   a client-side check is not a control. ✅ **BUILT**
5. **Rejected requests are still recorded.** They are the clearest signal
   of demand the business gets. ✅ **BUILT**

## Suggested next step

Per `../ROADMAP.md`: pick **one** specimen (recommend Hydro — simplest
body plan), source real photography by hand, run it through a generation
service manually, and drop the resulting `.glb` URL into `faunaData.ts`.
That validates the entire receiving pipeline with zero new code, and only
then is it worth deciding which of R3–R5 to automate.
