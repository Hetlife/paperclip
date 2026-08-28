import { NextResponse } from "next/server";
import { insert } from "@/server/store";
import { validateInquiry } from "@/server/validation";
import { rateLimit, clientKey } from "@/server/rateLimit";
import { getSpecimenById } from "@/data/faunaData";

export const runtime = "nodejs";

/**
 * POST /api/inquiries — a Custodianship Readiness & Consultation request.
 *
 * This is deliberately NOT an order endpoint. It records an intent to have
 * a conversation; no payment, no reservation, no animal is committed here.
 * See docs/BACKEND.md.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`inquiries:${clientKey(request)}`);
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

  const result = validateInquiry(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 422 });
  }

  // Reject an inquiry against a specimen that isn't placeable. A
  // sanctuary_only specimen is display/educational — accepting an
  // acquisition request for one would be a promise we can't keep.
  const specimen = result.value.specimenId
    ? getSpecimenById(result.value.specimenId)
    : undefined;

  if (result.value.specimenId && !specimen) {
    return NextResponse.json(
      { errors: ["specimenId does not match any catalogued specimen"] },
      { status: 422 },
    );
  }

  if (specimen?.status === "sanctuary_only") {
    return NextResponse.json(
      {
        errors: [
          `${specimen.commonName} is sanctuary-only and is not available for placement.`,
        ],
      },
      { status: 422 },
    );
  }

  const saved = await insert("inquiries", {
    ...result.value,
    specimenCommonName: specimen?.commonName,
    specimenStatusAtSubmission: specimen?.status,
    status: "pending_review" as const,
  });

  return NextResponse.json(
    {
      id: saved.id,
      status: saved.status,
      message:
        "Inquest received. An Atelier Biotope Architect will respond within two business days. No acquisition is finalized until that consultation.",
    },
    { status: 201 },
  );
}
