# Roadmap: buyer-list → researched species → 3D behavioral model

The founder's stated future direction: an AI agent takes a buyer's
species interest list, researches the breed/species, sources images,
generates a 3D model, and produces realistic looping behavioral
animation — automatically added to the site.

This is real and buildable, but it's several distinct hard problems
stacked together, not one feature. Nothing below is built yet except
where marked. Written now so the next session (or the future agent
itself) knows what "done" actually requires instead of discovering it
mid-build.

---

## What's already wired to receive the output (done)

- `Specimen.assets.interactive3dModelUrl` — the data field a generated
  model slots into. Already in `src/types/fauna.ts`.
- `Specimen3DViewer.tsx` — loads a `.glb`, plays its `"Idle"` animation
  clip in a loop via `@react-three/fiber` + `@react-three/drei`. If the
  model ships no clip, falls back to a gentle procedural sway rather
  than sitting dead-still.
- `SpecimenMedia.tsx` — the single fallback chain every specimen visual
  goes through: **3D model → photo → themed gradient card**. Set
  `interactive3dModelUrl` on any specimen and the hero + dossier modal
  pick it up automatically, no other code changes.
- An error boundary around the 3D viewer, so a broken/missing `.glb`
  degrades to the photo/gradient path instead of crashing the page.
- Grid cards deliberately excluded from live 3D (see below).

This means: **the day a real pipeline produces a working `.glb` with an
Idle clip, dropping its URL into `faunaData.ts` is the entire
integration step.** That part is not the hard part.

## What's NOT built — the actual hard problems

### 1. Species research from a buyer's list
Given "I want a Pink Orchid Mantis" or a loose buyer description, an
agent needs to resolve it to a scientific name, verify captive-bred
availability, and pull care-spec data (temperature, humidity, diet,
lifespan) reliably enough to publish. This is a research/verification
task, not a generation task — same shape as the species-legality work
already done for the ornamental fish venture
(`ventures/ornamental-fish-export/templates/species-legality-check.md`),
reusable as a pattern: agent drafts, human/expert signs off before
anything goes live, because a wrong care spec is an animal-welfare
failure, not just a content bug.

### 2. Sourcing reference imagery
Multi-angle reference photos are the actual input every downstream
step depends on. Buyer-supplied photos are usually one angle, mixed
lighting, and inconsistent quality — not enough for reliable 3D
reconstruction. Realistic options: stock/licensed species photography
APIs, the supplier's own documentation photos (Track A/C material in
the fish venture, if this ever converges with that sourcing network),
or commissioning real photography per species. **This step has a
licensing dimension, not just a technical one** — verify usage rights
before feeding any image into a generation pipeline.

### 3. Image-to-3D generation
This is the part the request describes as "study the images and make a
3D model" — it means running a photogrammetry or AI mesh-generation
service (e.g. a multi-view-to-mesh pipeline) against the reference set.
This is an external paid API/service integration, not something to
hand-write. Output quality varies a lot by species (a flat-bodied fish
is a very different reconstruction problem than a coiled snake or a
mantis with fine limbs) — expect per-species tuning, not a single
pipeline that works uniformly.

### 4. Rigging
A raw generated mesh has no skeleton or animatable joints. Rigging is
either manual (an artist, per species) or an auto-rigging tool, and
auto-rigging quality on non-standard body plans (insects, snakes) is
inconsistent — this is realistically the step most likely to need a
human in the loop even in an otherwise automated pipeline.

### 5. Realistic behavior, not just motion
"Realistic behavior in a loop" is a research question in itself: what
does *this species* actually do at rest — a mantis's stillness-then-
sudden-shift, a boa's slow coil-breathing, a fish's fin motion against
current. Getting this right requires either real behavioral reference
(video of the actual species) or a domain-specific animation library —
not something a generic "idle animation" generator produces
convincingly. A wrong-feeling loop is worse than the current gradient
fallback, because it reads as fake rather than honestly unfinished.

### 6. The orchestration agent itself
Once steps 1–5 each work in isolation, wiring "buyer list in → PR-ready
specimen entry out" is the most mechanical part — Track A/B pattern
from the fish venture applies again: agent drafts, `interactive3dModelUrl`
+ specs get set, a human reviews before it goes live to buyers. Do not
skip the review step even once the pipeline works reliably — a
publicly wrong care spec or an uncanny-valley animation on a luxury
site actively damages the brand it's built to project.

---

## Where NOT to render live 3D

Grid/card views (`SpecimenCard.tsx`) intentionally stay on the flat
image path even after models exist. A page can show a dozen+ cards at
once; a dozen simultaneous WebGL contexts is a real performance and
battery cost for no benefit at thumbnail size. When real 3D assets
exist, the efficient path is a **pre-rendered turntable poster image or
short video loop** for the grid, reserving the live interactive
`Specimen3DViewer` for the hero (one specimen) and the dossier modal
(opened on demand, one at a time). This is a follow-up build item, not
done yet — grid cards currently only understand static images.

## Suggested build order, when this becomes active work

1. Pick one specimen as the pilot (recommend a fish — simpler body plan
   than the mantis or boa, and the site's Hydro biome is the natural
   first target).
2. Manually source/commission real multi-angle photography for that one
   specimen — don't build the sourcing pipeline before proving the
   generation step is worth it.
3. Run one specimen through a 3D generation service by hand, rig it
   (manually if needed), export a `.glb` with an `"Idle"` clip, and drop
   the URL into `faunaData.ts`. This validates the entire receiving-end
   pipeline built above with zero new code.
4. Only after that pilot looks right on the live site — decide whether
   automating steps 1–3 is worth building, and for which parts.
