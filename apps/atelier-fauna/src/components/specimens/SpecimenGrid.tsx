"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getSpecimensByBiome } from "@/data/faunaData";
import { useFaunaStore } from "@/store/useFaunaStore";
import { SpecimenCard } from "./SpecimenCard";
import { staggerContainer, fadeUpVariants } from "@/lib/motion";

export function SpecimenGrid() {
  const activeBiome = useFaunaStore((s) => s.activeBiome);
  const specimens = getSpecimensByBiome(activeBiome);

  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-400">
        Curated Lineage
      </p>
      <h2 className="mt-2 text-3xl font-medium tracking-[-0.02em] text-neutral-900 md:text-4xl">
        Living Specimens in This Biome
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeBiome}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {specimens.length === 0 ? (
            <motion.p
              variants={fadeUpVariants}
              className="col-span-full text-neutral-500"
            >
              No specimens currently catalogued for this biome — the
              Sanctuary Journal for it is still worth a visit below.
            </motion.p>
          ) : (
            specimens.map((specimen) => (
              <motion.div key={specimen.id} variants={fadeUpVariants}>
                <SpecimenCard specimen={specimen} />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
