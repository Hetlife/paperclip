"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BiomeAtmosphere } from "./BiomeAtmosphere";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SpringButton } from "@/components/ui/SpringButton";
import { SpecimenMedia } from "@/components/ui/SpecimenMedia";
import { BIOMES, getSpecimensByBiome } from "@/data/faunaData";
import { useFaunaStore } from "@/store/useFaunaStore";
import { GENTLE_EASE } from "@/lib/motion";

export function HeroStage() {
  const activeBiome = useFaunaStore((s) => s.activeBiome);
  const openSpecimen = useFaunaStore((s) => s.openSpecimen);
  const openDrawer = useFaunaStore((s) => s.openDrawer);

  const biome = BIOMES[activeBiome];
  const featured = getSpecimensByBiome(activeBiome)[0];

  return (
    <section
      className="relative overflow-hidden rounded-[2.5rem] transition-colors duration-[800ms] ease-apple-decel"
      style={{
        background: `linear-gradient(160deg, ${biome.themeColor.bgLight}, ${biome.themeColor.bgDark}0D)`,
      }}
    >
      <BiomeAtmosphere biomeId={activeBiome} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeBiome}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={GENTLE_EASE}
          className="relative grid gap-10 px-6 py-16 sm:px-10 sm:py-20 md:grid-cols-2 md:items-center md:px-16"
        >
          <div>
            <p
              className="text-xs font-medium uppercase tracking-[0.15em]"
              style={{ color: biome.themeColor.accent }}
            >
              {biome.latinName} · {biome.tagline}
            </p>

            {featured && (
              <>
                <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-[-0.03em] text-neutral-900 md:text-7xl">
                  {featured.auraTitle}
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600 md:text-lg">
                  {featured.shortDescription}
                </p>

                <div className="mt-6">
                  <StatusBadge status={featured.status} />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <SpringButton
                    variant="primary"
                    onClick={() => openSpecimen(featured)}
                  >
                    Enter the Dossier
                  </SpringButton>
                  <SpringButton
                    variant="secondary"
                    onClick={() => openDrawer(featured)}
                  >
                    Begin Custodianship Inquest
                  </SpringButton>
                </div>
              </>
            )}
          </div>

          {featured && (
            <motion.div
              layoutId={`image-${featured.id}`}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
            >
              <SpecimenMedia
                src={featured.assets.heroImage}
                alt={featured.commonName}
                biomeId={featured.biomeId}
                priority
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
