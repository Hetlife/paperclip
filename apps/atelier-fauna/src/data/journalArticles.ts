import type { JournalArticle } from "@/types/fauna";

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "the-art-of-non-resistance",
    title: "The Dignity of Buoyancy — What Deep Waters Teach About Anxiety",
    biomeId: "hydro",
    dek: "Emotional decompression & nervous system regulation.",
    readTimeMinutes: 4,
    coreInsight:
      "When current meets mass, resistance creates drag. True grace yields to the flow.",
    body: [
      "In the vertical calm of the Orinoco tributary, the Altum does not battle current; it adjusts its internal air bladder by micro-fractions to find equilibrium.",
      "Human anxiety is often the exhausting act of tensing against inevitable drift. By constructing living aquatic biotopes in domestic spaces, we introduce a steady, 60-beat-per-minute visual cadence that measurably lowers salivary cortisol.",
    ],
  },
  {
    slug: "constant-motion-without-chaos",
    title: "Constant Motion Without Chaos",
    biomeId: "aether",
    dek: "Why sustained energy and calm aren't opposites.",
    readTimeMinutes: 4,
    coreInsight: "Sustained energy is not the enemy of calm — erratic energy is.",
    body: [
      "The lorikeet is rarely still, yet it is never frantic. Its motion has a rhythm — feeding, calling, wheeling through the canopy — that repeats rather than escalates.",
      "Modern busyness is often mistaken for productivity because both look like motion. The distinction that matters is whether the motion has a rhythm you could sustain indefinitely, or whether it's accelerating toward a crash.",
    ],
  },
  {
    slug: "the-four-second-pause",
    title: "The Four-Second Pause — The Geometry of Orchid Mantis Stillness",
    biomeId: "micro",
    dek: "Strategic patience and breaking reaction addiction.",
    readTimeMinutes: 5,
    coreInsight:
      "Patience is not inactive waiting; it is calibrated readiness without anxiety.",
    body: [
      "The modern digital cortex is trained to respond to stimuli in under 200 milliseconds. The Orchid Mantis, perched upon white petals, exists in extended stretches of unbroken contemplation.",
      "It moves only when intentional movement guarantees success. Adopting the 'Mantis Pause' — four deliberate breaths before replying to any high-stakes inquiry — restores executive autonomy to the mind.",
    ],
  },
  {
    slug: "thermal-centering",
    title: "Thermal Anchoring — Maintaining Core Equilibrium in Cold Environments",
    biomeId: "terra",
    dek: "Boundary setting and protecting emotional bandwidth.",
    readTimeMinutes: 6,
    coreInsight:
      "External noise cannot penetrate an internal system anchored in self-awareness.",
    body: [
      "Cold-blooded creatures do not generate internal warmth through chaotic metabolism; they position themselves deliberately beneath direct thermal rays. They do not allow their environment to dictate their inner energy.",
      "In human relationships, thermal anchoring is the conscious decision to choose calm over absorbed drama — to find your own gradient rather than matching the temperature of whatever room you're in.",
    ],
  },
  {
    slug: "visible-without-apology",
    title: "Visible Without Apology",
    biomeId: "sylvan",
    dek: "Confidence and camouflage are both valid strategies — but they are not the same one.",
    readTimeMinutes: 4,
    coreInsight:
      "Standing out is not the same as being unsafe. Confidence and camouflage are both valid strategies — choose deliberately.",
    body: [
      "Against a forest floor built for concealment, the Golden Mantella does the opposite of blend in. Its color is a declared fact, not a mistake it's trying to correct.",
      "Most of us default to camouflage because it feels safer, without checking whether it's actually the right strategy for the moment we're in. Sometimes the mantella's answer — be unmistakably visible — is the one that actually works.",
    ],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}
