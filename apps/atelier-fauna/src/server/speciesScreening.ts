/**
 * Reject-only species screening.
 *
 * IMPORTANT — read before extending this file:
 *
 * This function has exactly one safe output: "excluded". A `needs_review`
 * verdict means only that no hard-exclusion rule matched — it is NOT a
 * clearance, an approval, or an indication of legality. There is
 * deliberately no "approved" verdict in the type, because no automated
 * check can establish that a species is legal to import, keep, or sell.
 * That is a per-species, per-jurisdiction determination requiring a
 * qualified human, and in the US it turns on federal law (Lacey Act,
 * 50 CFR 16 injurious wildlife), CITES, AND the destination state's own
 * rules, which vary widely.
 *
 * The exclusion list below is small on purpose. It covers taxa confirmed
 * during this project's research (see
 * ventures/ornamental-fish-export/verification-queue.md, findings V1 and
 * V13). It is NOT a complete list of prohibited species — the USFWS
 * injurious list alone runs to 800+ entries, and CITES adds thousands
 * more. Do not treat an empty result as meaningful.
 */

export type ScreeningVerdict = "excluded" | "needs_review";

export interface ScreeningResult {
  input: string;
  verdict: ScreeningVerdict;
  reason?: string;
  authority?: string;
}

interface ExclusionRule {
  /** Matched case-insensitively against the raw buyer input. */
  patterns: RegExp[];
  reason: string;
  authority: string;
}

const HARD_EXCLUSIONS: ExclusionRule[] = [
  {
    patterns: [/\bclarias\b/i, /\bclariidae\b/i, /walking\s+catfish/i],
    reason:
      "The entire Clariidae family (walking catfish) is listed as US injurious wildlife. Live specimens and viable eggs are prohibited from import, with no permit pathway for the pet trade.",
    authority: "USFWS — Lacey Act, 50 CFR Part 16",
  },
  {
    patterns: [/\bchanna\b/i, /\bparachanna\b/i, /\bsnakehead\b/i],
    reason:
      "Snakehead species (Channa and Parachanna, 34 listed species) are US injurious wildlife. Live specimens and viable eggs are prohibited from import.",
    authority: "USFWS — Lacey Act, 50 CFR Part 16",
  },
  {
    patterns: [/\bhippocampus\b/i, /\bseahorse/i, /\bpipefish/i, /\bsyngnathid/i],
    reason:
      "Seahorses and pipefish are Schedule I protected under India's Wild Life (Protection) Act; capture and trade are banned. Also CITES-listed. Out of scope regardless of source.",
    authority: "India WLPA 1972 (Schedule I) · CITES Appendix II",
  },
  {
    patterns: [/\bpoecilotheria\b/i],
    reason:
      "All Poecilotheria species are CITES Appendix II listed, requiring permits for international trade. Out of this collection's declared scope in any case.",
    authority: "CITES Appendix II (2019)",
  },
  {
    patterns: [
      /\bpython\b/i,
      /\bboa\s+constrictor\b/i,
      /\beunectes\b/i,
      /\banaconda\b/i,
    ],
    reason:
      "Several large constrictor species are US injurious wildlife with prohibited interstate transport. This match is broad and may catch permitted species — it is flagged for human review rather than silently allowed.",
    authority: "USFWS — Lacey Act, 50 CFR 16.15",
  },
];

/**
 * Screens one raw buyer-supplied species string.
 *
 * Matching is intentionally crude (substring/genus patterns against free
 * text). It errs toward flagging: a false exclusion costs a human one
 * minute of review, whereas a false clearance could mean importing a
 * prohibited animal. Do not "improve" this by making matches narrower
 * without a corresponding human review step.
 */
export function screenSpecies(input: string): ScreeningResult {
  const trimmed = input.trim();

  for (const rule of HARD_EXCLUSIONS) {
    if (rule.patterns.some((p) => p.test(trimmed))) {
      return {
        input: trimmed,
        verdict: "excluded",
        reason: rule.reason,
        authority: rule.authority,
      };
    }
  }

  return {
    input: trimmed,
    verdict: "needs_review",
    reason:
      "No hard-exclusion rule matched. This is NOT a clearance — legality has not been established and requires per-jurisdiction human review.",
  };
}
