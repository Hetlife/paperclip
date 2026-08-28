/**
 * Hand-rolled validators. No schema library — the surface is two routes
 * and adding zod for that is weight without benefit. If a third route
 * appears, reconsider.
 */

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(
  value: unknown,
  field: string,
  { max, required = true }: { max: number; required?: boolean },
  errors: string[],
): string {
  if (value === undefined || value === null || value === "") {
    if (required) errors.push(`${field} is required`);
    return "";
  }
  if (typeof value !== "string") {
    errors.push(`${field} must be a string`);
    return "";
  }
  const trimmed = value.trim();
  if (trimmed.length > max) {
    errors.push(`${field} must be ${max} characters or fewer`);
    return trimmed.slice(0, max);
  }
  return trimmed;
}

export interface InquiryInput {
  email: string;
  specimenId?: string;
  availableSpace: string;
  experienceNote?: string;
  preferredWindow: string;
  acknowledgedChecklist: boolean;
}

export function validateInquiry(body: unknown): ValidationResult<InquiryInput> {
  const errors: string[] = [];
  if (typeof body !== "object" || body === null) {
    return { ok: false, errors: ["Request body must be a JSON object"] };
  }
  const b = body as Record<string, unknown>;

  const email = str(b.email, "email", { max: 254 }, errors);
  if (email && !EMAIL_RE.test(email)) errors.push("email is not a valid address");

  const value: InquiryInput = {
    email,
    specimenId: str(b.specimenId, "specimenId", { max: 64, required: false }, errors) || undefined,
    availableSpace: str(b.availableSpace, "availableSpace", { max: 200 }, errors),
    experienceNote:
      str(b.experienceNote, "experienceNote", { max: 2000, required: false }, errors) || undefined,
    preferredWindow: str(b.preferredWindow, "preferredWindow", { max: 100 }, errors),
    acknowledgedChecklist: b.acknowledgedChecklist === true,
  };

  // The readiness checklist is the ethical gate the whole flow exists for.
  // A request that skips it is rejected outright, not saved as a lead.
  if (!value.acknowledgedChecklist) {
    errors.push("acknowledgedChecklist must be true — the readiness checklist is required");
  }

  return errors.length ? { ok: false, errors } : { ok: true, value };
}

export interface SpeciesIntakeInput {
  email: string;
  requestedSpecies: string[];
  notes?: string;
}

export function validateSpeciesIntake(
  body: unknown,
): ValidationResult<SpeciesIntakeInput> {
  const errors: string[] = [];
  if (typeof body !== "object" || body === null) {
    return { ok: false, errors: ["Request body must be a JSON object"] };
  }
  const b = body as Record<string, unknown>;

  const email = str(b.email, "email", { max: 254 }, errors);
  if (email && !EMAIL_RE.test(email)) errors.push("email is not a valid address");

  let requestedSpecies: string[] = [];
  if (!Array.isArray(b.requestedSpecies)) {
    errors.push("requestedSpecies must be an array of species names");
  } else if (b.requestedSpecies.length === 0) {
    errors.push("requestedSpecies must contain at least one entry");
  } else if (b.requestedSpecies.length > 50) {
    errors.push("requestedSpecies is limited to 50 entries per submission");
  } else {
    requestedSpecies = b.requestedSpecies
      .map((s, i) => str(s, `requestedSpecies[${i}]`, { max: 200 }, errors))
      .filter(Boolean);
  }

  const value: SpeciesIntakeInput = {
    email,
    requestedSpecies,
    notes: str(b.notes, "notes", { max: 2000, required: false }, errors) || undefined,
  };

  return errors.length ? { ok: false, errors } : { ok: true, value };
}
