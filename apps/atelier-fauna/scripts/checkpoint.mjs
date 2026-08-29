#!/usr/bin/env node
/**
 * Writes docs/HANDOFF.md — the "resume here" file.
 *
 *   node scripts/checkpoint.mjs "what I am mid-way through"
 *
 * Why this exists: a session that runs out of context loses everything
 * not written down. There is no reliable way to detect that limit from
 * inside, so the answer is not to detect it — it is to keep state
 * current continuously, so *any* reset is safe rather than only a
 * politely-announced one.
 *
 * Checkpoint after each meaningful step, not at the end. The end may not
 * arrive.
 *
 * Captures automatically: branch, last commits, working-tree state,
 * whether the demos are in sync, and unfinished markers in the tree.
 * The note argument supplies the part a machine cannot know — intent.
 */
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const note = process.argv.slice(2).join(" ").trim();

const sh = (cmd, fallback = "(unavailable)") => {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return fallback;
  }
};

const branch = sh("git rev-parse --abbrev-ref HEAD");
const commits = sh("git log --oneline -8");
const dirty = sh("git status --porcelain -- .");
const ahead = sh(`git rev-list --count origin/${branch}..HEAD`, "?");

// Demo drift: cheap to check, and a stale demo is invisible until someone
// opens the page and sees the wrong price.
let sync = "unknown — run `npm run sync:check`";
try {
  execSync("npm run sync:check", { cwd: ROOT, stdio: "ignore" });
  sync = "in sync";
} catch {
  sync = "**STALE — run `npm run sync`**";
}

const todos = sh(
  `grep -rn --include=*.ts --include=*.tsx --include=*.mjs -E "(TODO|FIXME|XXX)" src scripts | head -20`,
  "",
);

const body = `# Handoff — resume here

Written by \`npm run checkpoint\`. **Regenerated, not hand-edited** — put
durable decisions in \`docs/TASK-LOG.md\` instead, which this does not
touch.

_Last checkpoint: ${new Date().toISOString().replace("T", " ").slice(0, 16)} UTC_

## What was in progress

${note || "_No note given. Re-run: `npm run checkpoint \"what you were doing\"`_"}

## Repository state

- **Branch:** \`${branch}\`
- **Unpushed commits:** ${ahead}
- **Demo pages:** ${sync}

**Uncommitted changes:**

${dirty ? "```\n" + dirty + "\n```" : "_None — working tree clean._"}

**Recent commits:**

\`\`\`
${commits}
\`\`\`

${todos ? `**Unfinished markers in the tree:**\n\n\`\`\`\n${todos}\n\`\`\`\n` : ""}
## To pick this up

\`\`\`bash
cd apps/atelier-fauna
npm run verify     # must pass before you build on this
\`\`\`

Then read, in order:

1. \`docs/FEEDBACK-LOG.md\` — preferences and mistakes already made here
2. \`docs/TASK-LOG.md\` — state and what is next
3. This file's "What was in progress" above

If \`npm run verify\` fails on a clean checkout, fix that before anything
else — it means the last session left the tree broken.
`;

writeFileSync(path.join(ROOT, "docs/HANDOFF.md"), body);
console.log("✓ docs/HANDOFF.md updated");
if (!note) console.log("  (no note given — pass one so the next session knows your intent)");
if (sync.includes("STALE")) console.log("  ⚠ demos are stale — run `npm run sync`");
