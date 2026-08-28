"use client";

import { motion } from "framer-motion";
import { SPECIMENS, BIOMES } from "@/data/faunaData";
import { useFaunaStore } from "@/store/useFaunaStore";
import { SpecimenMedia } from "@/components/ui/SpecimenMedia";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { staggerContainer, fadeUpVariants } from "@/lib/motion";

/**
 * The viewing room: every specimen in one grid, regardless of biome.
 * Clicking one opens the same dossier modal used elsewhere.
 *
 * Each tile shows whatever visual exists for that specimen — real
 * photography once `assets.heroImage` resolves, the animated line-art
 * specimen until then. That fallback chain lives in SpecimenMedia; this
 * component doesn't know or care which one it's getting.
 */
export function CollectionGallery() {
  const openSpecimen = useFaunaStore((s) => s.openSpecimen);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {SPECIMENS.map((specimen) => {
        const biome = BIOMES[specimen.biomeId];

        return (
          <motion.button
            key={specimen.id}
            variants={fadeUpVariants}
            layoutId={`card-${specimen.id}`}
            onClick={() => openSpecimen(specimen)}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="group overflow-hidden rounded-3xl border border-black/[0.06] bg-white text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_20px_45px_-24px_rgba(0,0,0,0.25)] dark:border-white/[0.08] dark:bg-neutral-900"
          >
            <motion.div
              layoutId={`image-${specimen.id}`}
              className="relative aspect-[4/5] w-full overflow-hidden"
            >
              <SpecimenMedia
                src={specimen.assets.heroImage}
                alt={specimen.commonName}
                biomeId={specimen.biomeId}
              />
            </motion.div>

            <div className="flex flex-col gap-2 p-5">
              <span
                className="text-xs font-medium uppercase tracking-[0.15em]"
                style={{ color: biome.themeColor.accent }}
              >
                {biome.name}
              </span>

              <div>
                <h3 className="text-lg font-medium tracking-[-0.01em] text-neutral-900 dark:text-white">
                  {specimen.commonName}
                </h3>
                <p className="font-mono text-xs italic text-neutral-500">
                  {specimen.scientificName}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {specimen.shortDescription}
              </p>

              <div className="mt-1">
                <StatusBadge status={specimen.status} />
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
