"use client";

import { motion } from "framer-motion";
import { BIOMES, BIOME_ORDER } from "@/data/faunaData";
import { useFaunaStore } from "@/store/useFaunaStore";
import { APPLE_SPRING } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function BiomePillSelector() {
  const activeBiome = useFaunaStore((s) => s.activeBiome);
  const setActiveBiome = useFaunaStore((s) => s.setActiveBiome);

  return (
    <nav
      aria-label="Select environmental biome"
      className="glass-surface flex items-center gap-1 rounded-full p-1"
    >
      {BIOME_ORDER.map((biomeId) => {
        const biome = BIOMES[biomeId];
        const isActive = biomeId === activeBiome;

        return (
          <button
            key={biomeId}
            onClick={() => setActiveBiome(biomeId)}
            aria-pressed={isActive}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors",
              isActive
                ? "text-neutral-900 dark:text-neutral-900"
                : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="active-biome-pill"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={APPLE_SPRING}
                style={{ backgroundColor: "#ffffff" }}
              />
            )}
            <span className="relative z-10">{biome.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
