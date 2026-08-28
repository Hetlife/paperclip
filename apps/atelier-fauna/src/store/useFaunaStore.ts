import { create } from "zustand";
import type { BiomeId, Specimen } from "@/types/fauna";

interface FaunaStore {
  activeBiome: BiomeId;
  setActiveBiome: (biome: BiomeId) => void;

  selectedSpecimen: Specimen | null;
  openSpecimen: (specimen: Specimen) => void;
  closeSpecimen: () => void;

  isDrawerOpen: boolean;
  openDrawer: (specimen?: Specimen) => void;
  closeDrawer: () => void;

  isAudioMuted: boolean;
  toggleAudio: () => void;
}

export const useFaunaStore = create<FaunaStore>((set) => ({
  activeBiome: "hydro",
  setActiveBiome: (biome) => set({ activeBiome: biome }),

  selectedSpecimen: null,
  openSpecimen: (specimen) => set({ selectedSpecimen: specimen }),
  closeSpecimen: () => set({ selectedSpecimen: null }),

  isDrawerOpen: false,
  openDrawer: (specimen) =>
    set((state) => ({
      isDrawerOpen: true,
      selectedSpecimen: specimen ?? state.selectedSpecimen,
    })),
  closeDrawer: () => set({ isDrawerOpen: false }),

  isAudioMuted: true,
  toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),
}));
