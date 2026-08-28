import type {
  AvailabilityStatus,
  BiomeConfig,
  BiomeId,
  Specimen,
} from "@/types/fauna";

export const BIOMES: Record<BiomeId, BiomeConfig> = {
  hydro: {
    id: "hydro",
    name: "Hydro",
    tagline: "Abyssal Equilibrium & Fluid Motion",
    latinName: "Regnum Aquaticum",
    themeColor: {
      bgLight: "#F0F6FA",
      bgDark: "#0B1116",
      accent: "#4B8BA6",
      glow: "rgba(75, 139, 166, 0.18)",
    },
  },
  aether: {
    id: "aether",
    name: "Aether",
    tagline: "Weightless Resonances & Sky Lineages",
    latinName: "Regnum Avium",
    themeColor: {
      bgLight: "#F5F7FA",
      bgDark: "#101216",
      accent: "#8293A6",
      glow: "rgba(130, 147, 166, 0.16)",
    },
  },
  micro: {
    id: "micro",
    name: "Micro",
    tagline: "Sculptural Stillness & Metamorphosis",
    latinName: "Regnum Insectorum",
    themeColor: {
      bgLight: "#FAF8F2",
      bgDark: "#141310",
      accent: "#B59B63",
      glow: "rgba(181, 155, 99, 0.18)",
    },
  },
  terra: {
    id: "terra",
    name: "Terra",
    tagline: "Ancient Grounding & Thermal Poise",
    latinName: "Regnum Reptilia",
    themeColor: {
      bgLight: "#FAF5F0",
      bgDark: "#14110E",
      accent: "#B87A54",
      glow: "rgba(184, 122, 84, 0.18)",
    },
  },
  sylvan: {
    id: "sylvan",
    name: "Sylvan",
    tagline: "Canopy Density & Primeval Flora",
    latinName: "Regnum Silvestre",
    themeColor: {
      bgLight: "#F2F7F4",
      bgDark: "#0C130E",
      accent: "#5E8B6D",
      glow: "rgba(94, 139, 109, 0.18)",
    },
  },
};

export const BIOME_ORDER: BiomeId[] = ["hydro", "aether", "micro", "terra", "sylvan"];

export const SPECIMENS: Specimen[] = [
  {
    id: "hydro-altum",
    biomeId: "hydro",
    commonName: "Orinoco Altum Angelfish",
    scientificName: "Pterophyllum altum",
    auraTitle: "The Dignity of Buoyancy",
    shortDescription:
      "Towering lateral symmetry that drifts through zero-current waters.",
    narrativeOverview:
      "The Altum commands space without friction. Observing its slow vertical drift trains the human nervous system to abandon hurry.",
    temperament: ["Contemplative", "Fluid", "Serene"],
    behaviour:
      "Slow vertical drift; fin undulation; independent pectoral flutter.",
    status: "available",
    // Researched 2026-08: US retail for P. altum runs ~$17–320 depending on
    // locale/size, typically $45–130. The original spec figure of $380 sat
    // above every listing found. See docs/MARKET-RESEARCH.md.
    estimatedContributionUSD: 110,
    careSpecs: {
      difficulty: "Mindful",
      spaceRequirement: "120 Gallon Vertical Biotope",
      climate: {
        tempRange: "28°C – 30°C",
        humidity: "100% (Submerged)",
        lumenLevel: "Low Diffused",
      },
      diet: "Micro-crustaceans, living planktonic fauna",
      lifespan: "10–12 Years",
    },
    assets: {
      heroImage: "/images/specimens/altum.jpg",
      macroImages: ["/images/specimens/altum-macro-1.jpg"],
    },
    mindfulnessLesson: {
      title: "The Art of Non-Resistance: What Deep Waters Teach About Tension",
      coreInsight:
        "When current meets mass, resistance creates drag. True grace yields to the flow.",
      readTimeMinutes: 4,
      journalSlug: "the-art-of-non-resistance",
    },
  },
  {
    id: "aether-lorikeet",
    biomeId: "aether",
    commonName: "Rainbow Lorikeet",
    scientificName: "Trichoglossus moluccanus",
    auraTitle: "Weightless Color in Motion",
    shortDescription: "A spectrum given wings, never still, never frantic.",
    narrativeOverview:
      "Its motion is constant but never chaotic — proof that energy and calm are not opposites.",
    temperament: ["Expressive", "Social", "Bright"],
    behaviour:
      "Perch sway; periodic alert head-turn; occasional wing settle.",
    status: "sanctuary_only",
    estimatedContributionUSD: 0,
    careSpecs: {
      difficulty: "Master Custodian",
      spaceRequirement: "Walk-in Aviary, min. 3m span",
      climate: {
        tempRange: "20°C – 28°C",
        humidity: "50% – 65%",
        lumenLevel: "Natural Diurnal",
      },
      diet: "Nectar, pollen, soft fruit",
      lifespan: "20–30 Years",
    },
    assets: {
      heroImage: "/images/specimens/lorikeet.jpg",
      macroImages: [],
    },
    mindfulnessLesson: {
      title: "Constant Motion Without Chaos",
      coreInsight:
        "Sustained energy is not the enemy of calm — erratic energy is.",
      readTimeMinutes: 4,
      journalSlug: "constant-motion-without-chaos",
    },
  },
  {
    id: "micro-mantis",
    biomeId: "micro",
    commonName: "Pink Orchid Mantis",
    scientificName: "Hymenopus coronatus",
    auraTitle: "The Architecture of Disguise",
    shortDescription:
      "Living flora mimicry that turns patience into supreme art.",
    narrativeOverview:
      "Motionless for hours, it moves only when the wind stirs surrounding leaves. It teaches that not every moment requires a human reaction.",
    temperament: ["Hyper-Focused", "Delicate", "Solitary"],
    behaviour:
      "Near-total stillness; petal-mimic wind sway; one fast strike-fold.",
    status: "waitlist",
    // Researched 2026-08: US retail for H. coronatus nymphs runs ~$50–100.
    // The original spec figure of $420 was 4–8x market.
    estimatedContributionUSD: 85,
    careSpecs: {
      difficulty: "Intermediate",
      spaceRequirement: "Minimalist 20x20x30cm Frosted Vivarium",
      climate: {
        tempRange: "25°C – 28°C",
        humidity: "70% – 85%",
        lumenLevel: "Low Diffused",
      },
      diet: "Flying pollinators, nectar-fed insects",
      lifespan: "8–12 Months",
    },
    assets: {
      heroImage: "/images/specimens/mantis.jpg",
      macroImages: ["/images/specimens/mantis-macro-1.jpg"],
    },
    mindfulnessLesson: {
      title: "The Four-Second Pause: Metamorphosis and Deliberate Stillness",
      coreInsight:
        "Patience is not inactive waiting; it is calibrated readiness without anxiety.",
      readTimeMinutes: 5,
      journalSlug: "the-four-second-pause",
    },
  },
  {
    id: "terra-boa",
    biomeId: "terra",
    commonName: "Amazon Emerald Tree Boa",
    scientificName: "Corallus caninus",
    auraTitle: "Coiled Thermal Balance",
    shortDescription:
      "Sculptural emerald coils draped across ancient mahogany branches.",
    narrativeOverview:
      "A masterclass in quiet presence. It exists in equilibrium, breathing with slow deliberate intervals that soothe overstimulated environments.",
    temperament: ["Solitary", "Poised", "Observant"],
    behaviour:
      "Slow respiratory expansion of the coil; periodic tongue flick.",
    status: "available",
    // Researched 2026-08: captive-bred C. caninus retails ~$150–550 in the
    // US. The original spec figure of $1450 was roughly 3x market.
    estimatedContributionUSD: 495,
    careSpecs: {
      difficulty: "Master Custodian",
      spaceRequirement: "Arboreal Glass Terrarium 90x60x120cm",
      climate: {
        tempRange: "26°C – 31°C Gradient",
        humidity: "75% – 90%",
        lumenLevel: "Natural Diurnal",
      },
      diet: "Ethically sourced whole nutrition",
      lifespan: "15–20 Years",
    },
    assets: {
      heroImage: "/images/specimens/boa.jpg",
      macroImages: ["/images/specimens/boa-macro-1.jpg"],
    },
    mindfulnessLesson: {
      title: "Thermal Centering: Maintaining Core Energy Amid Exterior Cold",
      coreInsight:
        "External noise cannot penetrate an internal system anchored in self-awareness.",
      readTimeMinutes: 6,
      journalSlug: "thermal-centering",
    },
  },
  {
    id: "sylvan-mantella",
    biomeId: "sylvan",
    commonName: "Golden Mantella",
    scientificName: "Mantella aurantiaca",
    auraTitle: "A Small Fire in Green Shade",
    shortDescription:
      "An ember-bright amphibian moving through the density of the forest floor.",
    narrativeOverview:
      "Its color is not aggression — it is confidence, unhidden and unapologetic, against a canopy that asks everything to blend in.",
    temperament: ["Bright", "Grounded", "Alert"],
    behaviour:
      "Continuous throat pulse; whole-body settle; rare blink.",
    // IUCN Critically Endangered — area of occupancy under 10 km². CITES
    // Appendix II with an annual export quota in the low hundreds, and
    // export suspended since 2010 pending non-detriment findings.
    // Overcollection for the pet trade is a named driver of its decline.
    // Not placeable at any price; display and education only.
    status: "sanctuary_only",
    estimatedContributionUSD: 0,
    careSpecs: {
      difficulty: "Intermediate",
      spaceRequirement: "Bioactive Paludarium 45x45x60cm",
      climate: {
        tempRange: "22°C – 26°C",
        humidity: "80% – 100%",
        lumenLevel: "Low Diffused",
      },
      diet: "Fruit flies, springtails, micro-invertebrates",
      lifespan: "6–8 Years",
    },
    assets: {
      heroImage: "/images/specimens/mantella.jpg",
      macroImages: [],
    },
    mindfulnessLesson: {
      title: "Visible Without Apology",
      coreInsight:
        "Standing out is not the same as being unsafe. Confidence and camouflage are both valid strategies — choose deliberately.",
      readTimeMinutes: 4,
      journalSlug: "visible-without-apology",
    },
  },
];

export function getSpecimensByBiome(biomeId: BiomeId): Specimen[] {
  return SPECIMENS.filter((s) => s.biomeId === biomeId);
}

export function getSpecimenById(id: string): Specimen | undefined {
  return SPECIMENS.find((s) => s.id === id);
}

/**
 * Display labels for availability. Lives here rather than in StatusBadge so
 * the demo pages can be generated with the same wording — a specimen
 * described as "waitlist" in the app and "available" in the demo someone
 * actually opens is exactly the drift this file exists to prevent.
 */
export const STATUS_LABELS: Record<
  AvailabilityStatus,
  { label: string; live: boolean }
> = {
  available: { label: "Available for placement", live: true },
  waitlist: { label: "In sanctuary lineage · waitlist", live: false },
  sanctuary_only: { label: "Sanctuary only · not placeable", live: false },
};
