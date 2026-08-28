import { NextResponse } from "next/server";
import { insert } from "@/server/store";
import { validateSpeciesIntake } from "@/server/validation";
import { rateLimit, clientKey } from "@/server/rateLimit";
import { screenSpecies } from "@/server/speciesScreening";
import { notify } from "@/server/notify";

export const runtime = "nodejs";

/**
 * POST /api/species-intake — a buyer submits species they'd like to see
 * in the collection.
 *
 * This is the entry point for the pipeline described in ROADMAP.md
 * (buyer list -> research -> imagery -> 3D model -> behavioral animation).
 * Today it does the first, cheapest, and most important step only:
 * captures the request and runs a hard-exclusion screen against species
 * that are outright illegal to import. Everything downstream of that is
 * unbuilt and explicitly not claimed here.
 *
 * The screen is a REJECT-ONLY filter. It can tell you "definitely not";
 * it can never tell you "yes, this is legal" — that requires
 * per-species, per-jurisdiction human/counsel review.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`species-intake:${clientKey(request)}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = validateSpeciesIntake(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }

  const screened = result.value.requestedSpecies.map(screenSpecies);
  const excluded = screened.filter((s) => s.verdict === "excluded");

  const saved = await insert("species-intake", {
    ...result.value,
    screening: screened,
    status: "pending_research" as const,
  });

  // After persistence; notify() never throws. Note this deliberately does
  // not forward `notes` — free text can contain anything, and the
  // recipient doesn't need it to decide whether to act.
  await notify({
    kind: "species-register",
    id: saved.id,
    email: saved.email,
    requested: saved.requestedSpecies,
    excluded: excluded.map((s) => s.input),
  });

  return NextResponse.json(
    {
      id: saved.id,
      status: saved.status,
      screening: screened,
      excludedCount: excluded.length,
      message:
        excluded.length > 0
          ? "Request received. Some entries are flagged as prohibited and will not be researched — see screening."
          : "Request received. Each entry requires human review before it can be catalogued; nothing here is confirmed available.",
      disclaimer:
        "Automated screening can only reject known-prohibited species. It never establishes that a species is legal to import, keep, or sell — that requires per-jurisdiction verification by a qualified human.",
    },
    { status: 201 },
  );
}
