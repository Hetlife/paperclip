# Atelier Fauna

A luxury, interactive Next.js site for captive-bred living biotopes,
paired with the Sanctuary Journal (a mindfulness/self-help curriculum
tied to each biome). Built from the founder's own spec across 4 phases:
setup, navigation, hero/specimen showcase, journal + concierge drawer.

**Standalone app, not part of the Paperclip pnpm workspace** — it has
its own `package.json` and lockfile and isn't listed in
`pnpm-workspace.yaml`, so it won't affect Paperclip's own build/CI.

## Running it

```bash
cd apps/atelier-fauna
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## What's real vs. not yet

**Docs:** `docs/REQUIREMENTS.md` (feature requirements for the AI species
pipeline, with what's built vs. not) · `docs/BACKEND.md` (API reference +
gaps) · `ROADMAP.md` (the photo-to-3D pipeline).

**Working end-to-end**, verified by build + live browser and API passes
this session:
- 5 biomes (Hydro, Aether, Micro, Terra, Sylvan) with the sliding pill
  selector, theme-color background transitions, and per-biome canvas
  particle atmospheres
- **One specimen per exhibit** (5 total) with 3D tilt cards, `layoutId`
  morph into a fullscreen dossier modal, and full care-spec tables
- **A behavioral animation for each of the 5 exhibits**, hand-authored
  from each species' real resting behavior (`docs/REQUIREMENTS.md` R6.5)
  — deliberately abstract line art, not attempted photorealism
- 5 Sanctuary Journal essays, one per exhibit; index + article pages
- The 3-step Custodianship Readiness & Consultation drawer (habitat
  review → readiness checklist → schedule request), wired to a real API
  with loading and error states
- **The Register** (`/register`) — the buyer-facing species intake form:
  chip entry with paste-splitting and dedupe, live screening results, and
  an explicit "this is not a clearance" on anything that merely passed
- **Backend**: `POST /api/inquiries` and `POST /api/species-intake` with
  validation, rate limiting, file-backed persistence, and server-side
  ethical gates — the readiness checklist is required and sanctuary-only
  specimens are rejected in the API, not just the UI. See
  `docs/BACKEND.md`.

**Not real yet:**
- **No photography.** `assets.heroImage` paths in `faunaData.ts` point
  to files that don't exist (`/images/specimens/*.jpg`). Every image
  slot falls back to an animated line-art specimen over a themed
  gradient via `SpecimenMedia.tsx` rather than a broken image — replace
  the paths with real photography when it exists, no code changes
  needed.
- **No retry on notifications.** Submissions now announce to a webhook
  (`ATELIER_NOTIFY_WEBHOOK` — see `.env.example`), but delivery is
  single-attempt with no queue. A webhook that's down when a submission
  lands loses that alert; the record itself is never lost. See
  `docs/BACKEND.md` → "Before this handles real traffic".
- **No real 3D models yet, but the viewer is wired.**
  `Specimen3DViewer.tsx` (react-three-fiber) loads a `.glb` and loops
  its `"Idle"` animation clip; `SpecimenMedia.tsx` prefers it over the
  flat photo automatically once `assets.interactive3dModelUrl` is set
  on a specimen. No specimen sets it yet, so every current view uses
  the photo/gradient path — the three.js bundle is dynamically
  imported and doesn't load until a model URL exists (confirmed:
  bundle size didn't move when this was added). See `ROADMAP.md` for
  what a real photo-to-3D-to-behavior pipeline actually requires —
  it's several hard, mostly-manual problems, not one feature.
- **No ambient audio.** The mute/unmute toggle in the navbar is wired
  to Zustand state but there's no actual audio element yet — `BiomeConfig.ambientAudioUrl`
  is typed but unused.
- **No dark mode toggle**, though the color tokens for it exist in
  `tailwind.config.ts` and `globals.css` (`prefers-color-scheme` only,
  no manual switch).

## A flag worth reading before this goes live

This site sells live reptiles and insects direct-to-consumer
("Custodianship"). That's a materially different regulatory situation
from an ordinary product business:
- Reptile sales in the US are regulated at the **state** level and vary
  widely — some states restrict or ban specific species, require
  permits, or regulate interstate shipping of live animals. This has
  not been researched per-species or per-state.
- Insects (the Orchid Mantis, for instance) can carry their own
  import/interstate movement restrictions depending on species and
  origin.
- The `custodianship/page.tsx` charter states "captive-bred provenance
  only" and "no wild-caught" as a policy — but nothing in this codebase
  verifies that claim against real supplier documentation. That's an
  operational/legal control, not a frontend feature.

None of this blocks building or previewing the site. It does mean:
**don't take a real payment or ship a real animal through this before
someone checks per-species, per-destination-state legality** — the
same category of work this session already did for the separate
ornamental fish export venture (see `ventures/ornamental-fish-export/`
in the repo root) would need to happen here too, for a different
species list and a different regulatory regime (interstate US, not
international).

## File structure

Matches the spec's own architecture doc
(`06_IMPLEMENTATION_PROMPTS_FOR_AI_AGENT.txt`, phases 1-4):

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── navigation/          # Navbar, biome pill selector, audio toggle
│   ├── hero/                 # Hero stage + canvas particle atmosphere
│   ├── specimens/            # Grid, 3D-tilt card, dossier modal, care table
│   ├── journal/               # Sanctuary Journal index + card
│   ├── concierge/             # 3-step Custodianship drawer
│   └── ui/                    # GlassCard, StatusBadge, SpringButton, SpecimenMedia
├── data/                    # Mock biomes, specimens, journal articles
├── store/                   # Zustand global state
├── types/                   # Shared TypeScript contracts
└── lib/                     # Motion presets (Apple-style springs), cn() helper
```
