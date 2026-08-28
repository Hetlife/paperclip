#!/usr/bin/env node
/**
 * Browser smoke test. Boots the production build, drives the real UI, and
 * asserts the behaviours that have actually broken in this project before —
 * every check below exists because something regressed or shipped wrong:
 *
 *   - a zero-height media fallback that rendered nothing (caught visually,
 *     not by any type or build check)
 *   - a blur handler that re-rendered mid-event and threw
 *   - Next 15's async `params` breaking dynamic routes
 *   - the readiness checklist being enforced only in the UI
 *   - a species whose exclusion rule existed server-side but not in the demo
 *
 * Run: npm run smoke   (or `npm run verify` for the whole pipeline)
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = process.env.SMOKE_PORT || 4399;
const BASE = `http://localhost:${PORT}`;

const results = [];
const check = (name, pass, detail = "") => {
  results.push({ name, pass, detail });
  console.log(`${pass ? "  ✓" : "  ✗"} ${name}${detail ? ` — ${detail}` : ""}`);
};

/**
 * Refuse to run against a server we did not start.
 *
 * An orphaned `next start` squatting on the port produced the single most
 * misleading failure in this project's history: every page returned 200 with
 * an empty body, because the orphan was serving from a `.next` that had since
 * been deleted and rebuilt. The checks failed in a way that looked like an
 * app regression and was not. Fail loudly instead.
 */
async function portInUse() {
  try {
    await fetch(BASE, { signal: AbortSignal.timeout(1500) });
    return true;
  } catch {
    return false;
  }
}

if (await portInUse()) {
  console.error(
    `✗ Port ${PORT} is already serving something.\n` +
      `  This is almost always an orphaned 'next start' from an earlier run,\n` +
      `  which will serve a stale build and produce confusing failures.\n` +
      `  Fix: pkill -f 'next-server'   (or set SMOKE_PORT to a free port)`,
  );
  process.exit(1);
}

console.log("Starting production server…");
// detached so the whole process group can be killed: `npx` does not forward
// SIGTERM to the next-server child, which left orphaned servers holding the
// port — and, worse, holding in-memory rate-limit state, so a second run
// silently got 429s that looked like route failures.
const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  cwd: ROOT,
  stdio: "ignore",
  detached: true,
  env: { ...process.env, ATELIER_DATA_DIR: path.join(ROOT, ".data-smoke") },
});

function stopServer() {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill("SIGKILL");
  }
}
process.on("exit", stopServer);

/**
 * Each request gets a unique client IP so the per-client rate limiter never
 * conflates checks with each other or with a previous run. The limiter is
 * exercised deliberately below instead.
 */
let ipCounter = 0;
const api = (route, body, ip) =>
  fetch(BASE + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip || `10.0.0.${++ipCounter}`,
    },
    body: JSON.stringify(body),
  });

async function waitForServer(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return true;
    } catch {
      /* not up yet */
    }
    await sleep(500);
  }
  return false;
}

let browser;
try {
  if (!(await waitForServer())) throw new Error(`server never came up on ${PORT}`);

  /* ---------- API contract ---------- */
  console.log("\nAPI");

  const ok = await api("/api/inquiries", {
    email: "smoke@example.com",
    availableSpace: "90+ gallon / large enclosure",
    preferredWindow: "Weekday mornings",
    acknowledgedChecklist: true,
    specimenId: "terra-boa",
  });
  check("inquiry with checklist acknowledged → 201", ok.status === 201, `got ${ok.status}`);

  const noAck = await api("/api/inquiries", {
    email: "smoke@example.com",
    availableSpace: "x",
    preferredWindow: "Weekend",
    acknowledgedChecklist: false,
  });
  check("inquiry without checklist → 422 (gate is server-side)", noAck.status === 422, `got ${noAck.status}`);

  const sanctuary = await api("/api/inquiries", {
    email: "smoke@example.com",
    availableSpace: "x",
    preferredWindow: "Weekend",
    acknowledgedChecklist: true,
    specimenId: "aether-lorikeet",
  });
  check("sanctuary-only specimen refused → 422", sanctuary.status === 422, `got ${sanctuary.status}`);

  const intake = await api("/api/species-intake", {
    email: "smoke@example.com",
    requestedSpecies: ["Neon Tetra", "Walking Catfish", "Channa marulius", "Golden Mantella"],
    notes: "CANARY_NOTES_MUST_NOT_LEAK",
  });
  const body = await intake.json();
  const excluded = (body.screening || []).filter((s) => s.verdict === "excluded").map((s) => s.input);
  check("intake → 201", intake.status === 201, `got ${intake.status}`);
  check(
    "three prohibited taxa excluded (Clariidae, Channa, Mantella)",
    excluded.length === 3,
    `excluded: ${excluded.join(", ") || "none"}`,
  );
  check(
    "no verdict is ever an approval",
    !JSON.stringify(body).match(/"verdict":"(approved|clear|ok)"/i),
  );

  // Deliberately exhaust one client's bucket; every other check uses a fresh
  // IP so this cannot bleed into them.
  const burstIp = "10.9.9.9";
  const codes = [];
  for (let i = 0; i < 7; i++) {
    const r = await api("/api/species-intake", { email: "burst@example.com", requestedSpecies: ["Guppy"] }, burstIp);
    codes.push(r.status);
  }
  check("rate limiter engages on a burst", codes.includes(429), `codes: ${codes.join(",")}`);

  /* ---------- pages ---------- */
  console.log("\nPages");
  browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium",
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));

  const routes = [
    ["/", "home"],
    ["/collection", "viewing room"],
    ["/journal", "journal index"],
    ["/journal/thermal-centering", "journal article"],
    ["/custodianship", "custodianship"],
    ["/register", "register"],
    ["/biomes/hydro", "biome page"],
  ];
  for (const [route, label] of routes) {
    const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
    const h1 = await page.locator("h1").first().count();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    check(`${label} renders`, res.status() === 200 && h1 > 0 && !overflow,
      `status ${res.status()}, h1 ${h1}, overflow ${overflow}`);
  }

  /* ---------- the visual regression that types can't catch ---------- */
  console.log("\nRendering");
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  const artBox = await page.locator("main section svg").first().boundingBox();
  check(
    "specimen art has real dimensions (guards the zero-height fallback bug)",
    !!artBox && artBox.width > 40 && artBox.height > 40,
    artBox ? `${Math.round(artBox.width)}×${Math.round(artBox.height)}` : "no box",
  );

  // The animation classes come from src/data/specimenArt.ts via the React
  // renderer. If the art refactor ever drops them the shapes still draw but
  // sit perfectly still, which no other check would notice.
  const animated = await page.locator("main svg [class*='hydro-']").count();
  check("specimen art carries its animation classes", animated > 0, `${animated} animated nodes`);

  await page.goto(BASE + "/collection", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  // Scope to cards specifically — `main button` also matches nav and pills.
  const cardSel = "main button:has(h3)";
  const cards = await page.locator(cardSel).count();
  check("viewing room lists every specimen", cards >= 5, `${cards} cards`);
  await page.locator(cardSel).first().click();
  await page.waitForTimeout(800);
  check("dossier modal opens", (await page.locator('[role="dialog"]').count()) === 1);
  await page.keyboard.press("Escape");

  check("no uncaught page errors", pageErrors.length === 0, pageErrors.join(" | "));
} catch (err) {
  check("smoke run completed", false, err.message);
} finally {
  await browser?.close();
  stopServer();
}

const failed = results.filter((r) => !r.pass);
console.log(
  `\n${results.length - failed.length}/${results.length} checks passed` +
    (failed.length ? ` — FAILED: ${failed.map((f) => f.name).join("; ")}` : ""),
);
process.exit(failed.length ? 1 : 0);
