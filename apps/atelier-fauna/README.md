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

**Working end-to-end**, verified by build + a live browser pass this
session:
- 5 biomes (Hydro, Aether, Micro, Terra, Sylvan) with the sliding pill
  selector, theme-color background transitions, and per-biome canvas
  particle atmospheres
- 6 specimens (one extra per biome beyond the spec's original 3, so
  every biome has content) with 3D tilt cards, `layoutId` morph into a
  fullscreen dossier modal, and full care-spec tables
- 6 Sanctuary Journal essays (the spec's original 3, plus 3 more
  matching the added specimens), index + individual article pages
- The 3-step Custodianship Readiness & Consultation drawer (habitat
  review → readiness checklist → schedule request), with real
  client-side validation and step gating

**Not real yet — this is a frontend-only build:**
- **No backend.** The consultation drawer's final "Submit Inquest" step
  sets local UI state to "submitted" — it does not send an email, hit
  an API, or store anything. Wiring this to a real inbox/CRM is the
  next concrete step before this could take a real inquiry.
- **No photography.** `assets.heroImage` paths in `faunaData.ts` point
  to files that don't exist (`/images/specimens/*.jpg`). Every image
  slot gracefully falls back to a themed gradient card via
  `SpecimenMedia.tsx` rather than a broken image — replace the paths
  with real photography when it exists, no code changes needed.
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
