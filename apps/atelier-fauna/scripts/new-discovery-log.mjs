#!/usr/bin/env node
/**
 * Scaffolds the dated report for a daily discovery run.
 *
 *   node scripts/new-discovery-log.mjs            today
 *   node scripts/new-discovery-log.mjs 2026-09-01  a specific date
 *
 * The structure is fixed on purpose: a run that has to fill the same
 * headings every day cannot quietly drift into writing only about
 * whatever was most interesting. "Nothing new" is a valid entry — an
 * empty section is not.
 *
 * Never overwrites an existing report.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "discovery");

const arg = process.argv[2];
const date = /^\d{4}-\d{2}-\d{2}$/.test(arg || "")
  ? arg
  : new Date().toISOString().slice(0, 10);

mkdirSync(DIR, { recursive: true });
const file = path.join(DIR, `${date}.md`);

if (existsSync(file)) {
  console.log(`✓ discovery/${date}.md already exists — appending to it, not replacing`);
  process.exit(0);
}

// Point the new report at the previous one so a run builds on it rather
// than re-researching the same ground.
const previous = readdirSync(DIR)
  .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
  .sort()
  .pop();

const priorOpen = (() => {
  if (!previous) return "_No prior report — this is the first run._";
  const text = readFileSync(path.join(DIR, previous), "utf8");
  const m = text.match(/## Open questions carried forward\n([\s\S]*?)(\n## |$)/);
  const carried = m?.[1]?.trim();
  return carried && !/^_/.test(carried)
    ? carried
    : `_See discovery/${previous} — nothing explicitly carried forward._`;
})();

const template = `# Discovery — ${date}

Automated daily run. Protocol: \`docs/DAILY-DISCOVERY.md\`.
Previous report: ${previous ? `\`discovery/${previous}\`` : "none"}

## Summary

_One paragraph. What changed today, or "no material change" if nothing did._

## Price check

| Species | Observed range | vs. last report | Source |
|---|---|---|---|
| Altum Angelfish (*P. altum*) | | | |
| Orchid Mantis (*H. coronatus*) | | | |
| Emerald Tree Boa (*C. caninus*) | | | |

## Demand signals

_Which signals were checked this run, and what they showed. One or two in
depth, not a shallow sweep. Cite every claim._

## Prospects added

_Businesses appended to \`discovery/prospects.csv\` this run, and why each
is a fit. Businesses only — never a person's contact details._

## The one question

**Question:** _picked from TASK-LOG or a prior report_

**Work done:**

**Answer, or what is still missing:**

## Needs a human

_Decisions only the founder can make, and anything with a legal
dimension. Empty is fine; guessing is not._

## Open questions carried forward

_These are read by tomorrow's run. Be specific enough to act on._

## Sources

_Every URL relied on above._
`;

writeFileSync(file, template);
console.log(`✓ created discovery/${date}.md`);
if (previous) {
  console.log(`\nCarried forward from ${previous}:\n${priorOpen}\n`);
}
