"use client";

import Image from "next/image";
import { useState } from "react";
import type { BiomeId } from "@/types/fauna";
import { BIOMES } from "@/data/faunaData";
import { cn } from "@/lib/cn";

/**
 * Renders a specimen's hero image, falling back to a themed gradient when
 * the asset hasn't been uploaded yet (the spec ships no real photography).
 */
export function SpecimenMedia({
  src,
  alt,
  biomeId,
  className,
  priority,
}: {
  src: string;
  alt: string;
  biomeId: BiomeId;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const biome = BIOMES[biomeId];

  if (failed) {
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{
          background: `radial-gradient(120% 120% at 30% 20%, ${biome.themeColor.glow}, transparent 60%), linear-gradient(160deg, ${biome.themeColor.bgLight}, ${biome.themeColor.bgDark}22)`,
        }}
        aria-label={alt}
        role="img"
      >
        <span
          className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.15em] font-medium"
          style={{ color: biome.themeColor.accent }}
        >
          {biome.name} Specimen
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
