export type BiomeId = "hydro" | "aether" | "micro" | "terra" | "sylvan";

export type AvailabilityStatus =
  | "available" // Ready for immediate placement
  | "waitlist" // Custom habitat / seasonal lineage in development
  | "sanctuary_only"; // Display only, educational conservation

export interface BiomeThemeColor {
  bgLight: string;
  bgDark: string;
  accent: string;
  glow: string;
}

export interface BiomeConfig {
  id: BiomeId;
  name: string;
  tagline: string;
  latinName: string;
  themeColor: BiomeThemeColor;
  ambientAudioUrl?: string;
}

export interface SpecimenCareSpecs {
  difficulty: "Mindful" | "Intermediate" | "Master Custodian";
  spaceRequirement: string;
  climate: {
    tempRange: string;
    humidity: string;
    lumenLevel: "Low Diffused" | "Basking Gradient" | "Natural Diurnal";
  };
  diet: string;
  lifespan: string;
}

export interface SpecimenAssets {
  interactive3dModelUrl?: string;
  lottieAnimationUrl?: string;
  heroImage: string;
  macroImages: string[];
}

export interface MindfulnessLesson {
  title: string;
  coreInsight: string;
  readTimeMinutes: number;
  journalSlug: string;
}

export interface Specimen {
  id: string;
  biomeId: BiomeId;
  commonName: string;
  scientificName: string;
  auraTitle: string; // e.g., "The Architecture of Disguise"
  shortDescription: string;
  narrativeOverview: string;
  temperament: string[];
  status: AvailabilityStatus;
  estimatedContributionUSD: number;
  careSpecs: SpecimenCareSpecs;
  assets: SpecimenAssets;
  mindfulnessLesson: MindfulnessLesson;
}

export interface JournalArticle {
  slug: string;
  title: string;
  biomeId: BiomeId;
  dek: string;
  readTimeMinutes: number;
  coreInsight: string;
  body: string[];
}
