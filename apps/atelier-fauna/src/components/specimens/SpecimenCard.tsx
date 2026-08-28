"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import type { Specimen } from "@/types/fauna";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SpecimenMedia } from "@/components/ui/SpecimenMedia";
import { useFaunaStore } from "@/store/useFaunaStore";

export function SpecimenCard({ specimen }: { specimen: Specimen }) {
  const openSpecimen = useFaunaStore((s) => s.openSpecimen);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 300,
    damping: 25,
  });
  const glareX = useTransform(x, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["20%", "80%"]);

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      layoutId={`card-${specimen.id}`}
      onClick={() => openSpecimen(specimen)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative w-full overflow-hidden rounded-3xl text-left shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_45px_-24px_rgba(0,0,0,0.25)]"
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

        {/* Specular glare overlay, follows cursor inversely for a glass feel */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`,
            ),
          }}
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-5">
          <div className="mb-2">
            <StatusBadge status={specimen.status} />
          </div>
          <h3 className="text-lg font-medium tracking-[-0.01em] text-white">
            {specimen.commonName}
          </h3>
          <p className="font-mono text-xs italic tracking-wide text-white/70">
            {specimen.scientificName}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}
