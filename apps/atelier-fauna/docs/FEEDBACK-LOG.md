# Feedback log

Corrections and preferences from the founder, and mistakes worth not
repeating. Read this before starting work — it is cheaper than being
corrected again.

Append at the top. Never delete an entry: a preference that stops
applying gets a new entry saying so, not a quiet edit.

---

## Standing preferences

Derived from repeated corrections. Treat these as defaults.

1. **Do the research before presenting numbers.** Asked directly to
   "make sure you have done the research." Every figure shown to anyone
   must trace to a source. An unsourced number is worse than no number —
   the spec's prices were 3–8× over market and nobody had checked.
2. **Deliver the thing, not a description of the thing.** Asked for a
   "website" after being given a one-page explainer *about* the website.
   When the ask is a site, build the navigable site.
3. **Depth over breadth.** "One animal per exhibit" — five fully-realised
   specimens beat fifteen thin ones. Adding a second specimen to an
   exhibit is a deliberate decision, not a default.
4. **Everything goes in the repo.** Chat scrollback is not storage.
   Decisions, research, session notes, and logs all get committed.
5. **Don't be lazy — fix causes, not symptoms.** When duplication was
   flagged, the ask was to automate it away, not document it more
   thoroughly.
6. **Say what is not done.** Every honest-gap section has survived review
   unchanged. Keep writing them.

---

## Entries

### 2026-08-28 — "make a task log and one feedback log … automate this work as much as possible and don't be lazy"

**Read:** the duplication flagged in the previous session was the work to
automate — not something to document better. Documenting a manual process
you could delete is the lazy answer.

**Done:** made `src/` the single source of truth and generated the demo
pages from it; built a 19-check smoke suite and one `npm run verify`
pipeline. Three places to update became one.

**Lesson:** when a hand-off note says "change it in both places," that
note is a bug report about the architecture.

### 2026-08-28 — "Give me website"

**Read:** the previously published demo was a narrative page *about* the
product. The ask was the product.

**Done:** built the actual navigable site — every route, working
navigation, modal, drawer, live screening.

**Lesson:** "demo" was ambiguous and I resolved it toward explaining
rather than building. When someone asks to see a thing, show them the
thing.

### 2026-08-28 — "make sure you have done the research and have a separate dashboard to explain the business and its numbers"

**Read:** "make sure you have done the research" was a correction. The
price points in the app had come from the original spec and had never
been checked.

**Found:** prices 3–8× over market; and Golden Mantella, listed as
requestable, is Critically Endangered with pet-trade collection a named
cause of its decline.

**Lesson:** data inherited from a spec is not verified data. Treat
unsourced numbers in inherited material as claims, and check them before
building anything on top.

### 2026-08-28 — "Let's start with one animal per exhibit"

Sent mid-turn while a larger build was running. Scope cut from six
specimens to five, one per biome.

**Lesson:** mid-turn messages are steering. Act on them in that turn.

### 2026-08-28 — "Add this feature planning and requirements in files and also create the backend … Give me demo website with demo animations"

Three deliverables in one line. Worth splitting explicitly rather than
picking the most interesting one.

**Note:** "demo animations" was satisfied with hand-authored line art,
not generated 3D — a deliberate call, explained at the time and accepted.
At this fidelity an elegant silhouette reads as designed where a
not-quite-right 3D animal reads as broken.

### 2026-08-28 — "keep log of everything we talk about in GitHub"

Established `CONVERSATION-LOG.md` in the fish venture; this file and
`TASK-LOG.md` are the same instinct applied to the app.

---

## Mistakes to not repeat

Each of these shipped or nearly shipped. The smoke suite now guards most
of them; the rest are judgement.

| Mistake | Guard now |
|---|---|
| Committed an app whose `src/data/` was gitignored by a broad root rule — it could not build from a clean clone | `.gitignore` negation; would show as a failed build |
| Media fallback used `relative` with no dimensions, collapsed to zero height, rendered nothing. I saw empty cards in screenshots and read it as working | Smoke: "specimen art has real dimensions" |
| Listed a Critically Endangered species as requestable | Screening exclusion + smoke check |
| Wrote data in three places and documented the duplication instead of removing it | `sync:check` fails the build |
| Test harness orphaned servers that then served deleted builds — produced 200s with empty bodies that looked like app regressions | Port guard in `smoke.mjs` |
| Chose a red/green diverging palette that measured ΔE 5.4 for deutan viewers | Run the dataviz validator, never eyeball |
| Assumed a screenshot proved a thing worked without checking what was actually in it | Assert on measurements, not appearance |
