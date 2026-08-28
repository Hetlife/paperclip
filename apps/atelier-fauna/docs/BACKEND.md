# Backend

Two API routes, a file-backed store, validation, and rate limiting. All
verified working end-to-end this session (real requests, real responses,
real persisted records).

## Routes

### `POST /api/inquiries`

A Custodianship Readiness & Consultation request. **This is not an order
endpoint** — it records an intent to have a conversation. No payment, no
reservation, no animal is committed.

Request:

```json
{
  "email": "buyer@example.com",
  "availableSpace": "90+ gallon / large enclosure",
  "preferredWindow": "Weekday mornings",
  "acknowledgedChecklist": true,
  "experienceNote": "optional, max 2000 chars",
  "specimenId": "terra-boa"
}
```

Responses:

| Status | When |
|---|---|
| `201` | Accepted; returns `{ id, status: "pending_review", message }` |
| `400` | Body isn't valid JSON |
| `422` | Validation failed; returns `{ errors: string[] }` |
| `429` | Rate limited; `Retry-After` header set |

**Two ethical gates enforced server-side, not just in the UI:**

1. `acknowledgedChecklist` must be `true`. The readiness checklist is the
   entire reason this flow exists — a request that skips it is rejected
   outright, not quietly saved as a lead.
2. A `specimenId` whose status is `sanctuary_only` is rejected. Those
   specimens are display/educational; accepting an acquisition request
   for one would be a promise that can't be kept.

Both are enforced in the route because a client-side-only check is not a
control — anyone can POST directly.

### `POST /api/species-intake`

A buyer submits species they'd like to see in the collection. This is the
entry point for the pipeline in `../ROADMAP.md`.

```json
{
  "email": "buyer@example.com",
  "requestedSpecies": ["Neon Tetra", "Channa marulius"],
  "notes": "optional"
}
```

Returns `201` with a per-entry `screening` array. Each entry gets one of
two verdicts:

- **`excluded`** — matched a hard-exclusion rule. Includes `reason` and
  `authority` (the actual regulation).
- **`needs_review`** — no exclusion rule matched. **This is not a
  clearance.**

## The screening model — read this before extending it

`src/server/speciesScreening.ts` is **reject-only by design**. There is
deliberately no "approved" verdict in the type. It can tell you
"definitely not"; it can never tell you "yes, this is legal."

Legality is a per-species, per-jurisdiction determination. In the US it
turns on federal law (Lacey Act, 50 CFR 16 injurious wildlife), CITES,
*and* the destination state's own rules, which vary widely. No automated
check can settle that.

The exclusion list is small on purpose — it covers taxa confirmed during
this project's own research (Clariidae, Channa/Parachanna, seahorses and
pipefish, Poecilotheria; see
`ventures/ornamental-fish-export/verification-queue.md` findings V1 and
V13). The USFWS injurious list alone runs past 800 entries and CITES adds
thousands. **An empty exclusion result means nothing was matched, not
that a species is safe.**

Matching is intentionally crude (genus/substring patterns against free
text) and errs toward flagging. A false exclusion costs a human one
minute of review; a false clearance could mean importing a prohibited
animal. Don't narrow the patterns without adding a human review step.

## Storage

`src/server/store.ts` — a JSON file store under `.data/`, gitignored
because it holds real submitted email addresses.

Writes go to a temp file then `rename()`, so a crash mid-write can't
truncate the file and lose every prior record.

There's no database because one is premature before the site takes its
first real inquiry. Everything is written so swapping in Postgres means
replacing that one file — routes never touch the filesystem directly.

## Notifications

`src/server/notify.ts` POSTs a JSON payload to whatever URL is in
`ATELIER_NOTIFY_WEBHOOK`. That one variable covers Slack, Discord,
Zapier, Make, n8n and most CRM intake endpoints — pick a provider by
setting the env var, not by editing code. Copy `.env.example` to
`.env.local` to configure it.

Payload shape:

```json
{
  "text": "New species register — 2 entries, 1 excluded by screening — from buyer@example.com",
  "event": "species-register",
  "id": "6ccd15bd-…",
  "email": "buyer@example.com",
  "requested": ["Neon Tetra", "Walking Catfish"],
  "excluded": ["Walking Catfish"]
}
```

`text` is what Slack and Discord render directly; the structured fields
are for consumers that branch on them. An inquiry sends `specimen` and
`availableSpace` in place of `requested`/`excluded`.

Three rules this module holds to, verified by test:

1. **A failed notification never fails the submission.** The record is
   already persisted by the time notify runs. Losing the alert is bad;
   losing the buyer's request is worse. `notify()` returns a result
   object and throws on no path.
2. **Data minimisation.** The payload carries the submitter's email —
   you have to be able to reply — but never the free-text `notes` field,
   which can contain anything. Confirmed by test: a submission whose
   notes read `SECRET NOTE SHOULD NOT LEAK` produced a payload with no
   trace of it.
3. **Unconfigured is a normal state.** With no webhook set, the summary
   logs to stdout and the submission succeeds as usual.

Verified behaviour across all four paths:

| Situation | Submission | Notify outcome |
|---|---|---|
| No webhook configured | `201` | `skipped`, summary logged |
| Webhook accepts | `201` | `sent` |
| Webhook returns `500` | `201` | `failed`, summary logged |
| Webhook host unreachable | `201` | `failed`, summary logged |

Delivery is best-effort and single-attempt, with a 5s timeout. There is
no retry queue and no dead-letter — a webhook that is down when a
submission lands loses that alert, though never the record. If alerts
become load-bearing, add a queue rather than raising the timeout.

## Before this handles real traffic

Honest list of what's missing:

- **No auth on reads.** There is no endpoint to list inquiries — read the
  JSON directly. Add authentication before building an admin view.
- **Notification delivery is not guaranteed.** Single attempt, no retry
  (see above). Records are always safe; alerts are not.
- **Single-instance only.** Both the file store (last write wins) and the
  in-memory rate limiter reset per instance and don't coordinate. Move
  to Postgres + a shared limiter (Redis, or the platform's own) before
  running more than one instance.
- **No spam protection beyond rate limiting.** No CAPTCHA, no email
  verification. A determined bot can still submit.
- **No GDPR/data-retention policy.** You are storing personal data
  (emails). Decide retention and deletion before collecting at scale.

## Testing it locally

```bash
npm run build && npx next start -p 4180

curl -X POST http://localhost:4180/api/inquiries \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@b.co","availableSpace":"90+ gallon / large enclosure",
       "preferredWindow":"Weekday mornings","acknowledgedChecklist":true,
       "specimenId":"terra-boa"}'

curl -X POST http://localhost:4180/api/species-intake \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@b.co","requestedSpecies":["Neon Tetra","Walking Catfish"]}'
```
