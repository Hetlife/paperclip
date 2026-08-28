#!/usr/bin/env node
/**
 * Generates the shared data block inside the standalone demo pages from the
 * app's own source of truth, so the demos can never silently drift from what
 * the site actually says.
 *
 * Before this existed, specimen data lived in three places, the SVG art in
 * two, and the screening rules in two. A price correction or a new exclusion
 * rule reached the app but not the pages anyone actually opens — which for a
 * legal screening rule is a real problem, not a cosmetic one.
 *
 *   node scripts/sync-demo.mjs            rewrite the demos from source
 *   node scripts/sync-demo.mjs --check    exit 1 if they are out of date
 *
 * --check is what CI and `npm run verify` use. It never writes.
 *
 * The demo files own their own layout and copy; only the region between the
 * GENERATED markers is managed here. Edit anything outside those markers
 * freely.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const START = "/* GENERATED:DATA — do not edit by hand. Run `npm run sync`. */";
const END = "/* END GENERATED:DATA */";

const TARGETS = ["demo/site.html"];

const { BIOMES, BIOME_ORDER, SPECIMENS, STATUS_LABELS } = await import(
  path.join(ROOT, "src/data/faunaData.ts")
);
const { JOURNAL_ARTICLES } = await import(
  path.join(ROOT, "src/data/journalArticles.ts")
);
const { HARD_EXCLUSIONS } = await import(
  path.join(ROOT, "src/server/speciesScreening.ts")
);
const { SPECIMEN_ART, artToSvgString } = await import(
  path.join(ROOT, "src/data/specimenArt.ts")
);

/** rgba() channel triple for a biome's accent, used for wash gradients. */
function accentChannels(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(",");
}

const j = (v) => JSON.stringify(v);

function buildBlock() {
  const biomes = Object.fromEntries(
    BIOME_ORDER.map((id) => {
      const b = BIOMES[id];
      return [
        id,
        {
          name: b.name,
          latin: b.latinName,
          tag: b.tagline,
          wash: accentChannels(b.themeColor.accent),
        },
      ];
    }),
  );

  const specimens = SPECIMENS.map((s) => {
    const spec = [
      ["Custodianship", s.careSpecs.difficulty],
      ["Space", s.careSpecs.spaceRequirement],
      ["Temperature", s.careSpecs.climate.tempRange],
      ["Humidity", s.careSpecs.climate.humidity],
      ["Light", s.careSpecs.climate.lumenLevel],
      ["Lifespan", s.careSpecs.lifespan],
    ];
    return {
      id: s.id,
      biome: s.biomeId,
      name: s.commonName,
      latin: s.scientificName,
      aura: s.auraTitle,
      status: s.status,
      price: s.estimatedContributionUSD,
      short: s.shortDescription,
      narrative: s.narrativeOverview,
      temperament: s.temperament,
      behaviour: s.behaviour,
      specs: spec,
      journal: s.mindfulnessLesson.journalSlug,
    };
  });

  const journal = JOURNAL_ARTICLES.map((a) => ({
    slug: a.slug,
    biome: a.biomeId,
    read: a.readTimeMinutes,
    title: a.title,
    dek: a.dek,
    insight: a.coreInsight,
    body: a.body,
  }));

  // Regex literals can't round-trip through JSON, so emit them as source.
  const exclusions = HARD_EXCLUSIONS.map(
    (r) =>
      `  { re:[${r.patterns.map((p) => p.toString()).join(",")}],\n` +
      `    reason:${j(r.reason)},\n` +
      `    authority:${j(r.authority)} }`,
  ).join(",\n");

  const art = BIOME_ORDER.map(
    (id) => `  ${id}: ${j(artToSvgString(SPECIMEN_ART[id]))}`,
  ).join(",\n");

  return [
    START,
    `/* Generated from src/data/faunaData.ts, src/data/journalArticles.ts,`,
    ` * src/data/specimenArt.ts and src/server/speciesScreening.ts.`,
    ` * Regenerate with: npm run sync */`,
    `const BIOMES = ${j(biomes)};`,
    `const STATUS = ${j(STATUS_LABELS)};`,
    `const ORDER = ${j(BIOME_ORDER)};`,
    `const SPECIMENS = ${j(specimens)};`,
    `const JOURNAL = ${j(journal)};`,
    `const EXCLUSIONS = [\n${exclusions}\n];`,
    `const ART = {\n${art}\n};`,
    END,
  ].join("\n");
}

const block = buildBlock();
let failed = false;

for (const rel of TARGETS) {
  const file = path.join(ROOT, rel);
  const src = readFileSync(file, "utf8");
  const a = src.indexOf(START);
  const b = src.indexOf(END);

  if (a === -1 || b === -1) {
    console.error(`✗ ${rel}: missing GENERATED:DATA markers`);
    failed = true;
    continue;
  }

  const next = src.slice(0, a) + block + src.slice(b + END.length);

  if (next === src) {
    console.log(`✓ ${rel} up to date`);
    continue;
  }

  if (process.argv.includes("--check")) {
    console.error(
      `✗ ${rel} is STALE — the app's data has changed since it was generated.\n` +
        `  Run: npm run sync`,
    );
    failed = true;
  } else {
    writeFileSync(file, next);
    console.log(`↻ ${rel} regenerated`);
  }
}

if (failed) process.exit(1);
