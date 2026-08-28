"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useFaunaStore } from "@/store/useFaunaStore";
import { SpecimenMedia } from "@/components/ui/SpecimenMedia";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SpringButton } from "@/components/ui/SpringButton";
import { CareMetricsTable } from "./CareMetricsTable";
import { SMOOTH_MORPH, fadeUpVariants, staggerContainer } from "@/lib/motion";

export function SpecimenDossierModal() {
  const specimen = useFaunaStore((s) => s.selectedSpecimen);
  const closeSpecimen = useFaunaStore((s) => s.closeSpecimen);
  const openDrawer = useFaunaStore((s) => s.openDrawer);

  return (
    <AnimatePresence>
      {specimen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal
          aria-labelledby="dossier-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeSpecimen}
            className="absolute inset-0 bg-black/40 backdrop-blur-2xl"
          />

          <motion.div
            layoutId={`card-${specimen.id}`}
            transition={SMOOTH_MORPH}
            className="glass-surface relative z-10 grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-[2rem] md:grid-cols-2"
          >
            <button
              onClick={closeSpecimen}
              aria-label="Close dossier"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-neutral-700 hover:bg-white"
            >
              <X size={16} strokeWidth={1.5} />
            </button>

            <motion.div
              layoutId={`image-${specimen.id}`}
              className="relative min-h-[280px] md:min-h-full"
            >
              <SpecimenMedia
                src={specimen.assets.heroImage}
                model3dUrl={specimen.assets.interactive3dModelUrl}
                alt={specimen.commonName}
                biomeId={specimen.biomeId}
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6 p-6 sm:p-10"
            >
              <motion.div variants={fadeUpVariants}>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                  Anatomical & Biotope Prerequisites
                </p>
                <h2
                  id="dossier-title"
                  className="mt-2 text-3xl font-medium tracking-[-0.02em] text-neutral-900"
                >
                  {specimen.auraTitle}
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  {specimen.commonName} ·{" "}
                  <span className="font-mono italic">
                    {specimen.scientificName}
                  </span>
                </p>
              </motion.div>

              <motion.div variants={fadeUpVariants}>
                <StatusBadge status={specimen.status} />
              </motion.div>

              <motion.p
                variants={fadeUpVariants}
                className="text-base leading-relaxed text-neutral-600"
              >
                {specimen.narrativeOverview}
              </motion.p>

              <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-2">
                {specimen.temperament.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/[0.08] px-3 py-1 text-xs text-neutral-600"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={fadeUpVariants}>
                <CareMetricsTable specs={specimen.careSpecs} />
              </motion.div>

              <motion.div
                variants={fadeUpVariants}
                className="rounded-2xl border border-black/[0.06] bg-neutral-50 p-5"
              >
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                  Sanctuary Journal
                </p>
                <Link
                  href={`/journal/${specimen.mindfulnessLesson.journalSlug}`}
                  className="mt-1 block text-base font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
                >
                  {specimen.mindfulnessLesson.title}
                </Link>
                <p className="mt-1 text-sm text-neutral-500">
                  {specimen.mindfulnessLesson.readTimeMinutes} min read
                </p>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-3">
                <SpringButton
                  variant="primary"
                  onClick={() => openDrawer(specimen)}
                >
                  Begin Custodianship Inquest
                </SpringButton>
                <SpringButton variant="secondary" onClick={closeSpecimen}>
                  Close
                </SpringButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
