"use client";

import type { BiomeId } from "@/types/fauna";
import { BIOMES } from "@/data/faunaData";
import {
  SPECIMEN_ART,
  ART_VIEWBOX,
  type ArtElement,
} from "@/data/specimenArt";

/**
 * Renders a specimen's line art with its ambient behavioural loop.
 *
 * The geometry comes from `@/data/specimenArt` — shared with the demo
 * pages via scripts/sync-demo.mjs, so a path edited once reaches every
 * surface. This component only handles rendering and applying the
 * animation classes; motion itself is defined in globals.css keyframes,
 * which the demos reuse verbatim.
 *
 * Each loop is built from the species' actual resting behaviour, per the
 * spec's "ambient presence, not commercial animation" principle. They are
 * deliberately abstract line art rather than attempted photorealism: at
 * this fidelity a silhouette reads as intentional design, where a
 * not-quite-right 3D animal reads as broken.
 */
export function SpecimenAnimation({
  biomeId,
  className,
}: {
  biomeId: BiomeId;
  className?: string;
}) {
  const accent = BIOMES[biomeId].themeColor.accent;

  return (
    <div className={className}>
      <svg
        viewBox={ART_VIEWBOX}
        className="h-full w-full"
        role="img"
        aria-label={`${BIOMES[biomeId].name} specimen`}
      >
        <g
          fill="none"
          stroke={accent}
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {SPECIMEN_ART[biomeId].map((el, i) => (
            <ArtNode key={i} el={el} accent={accent} />
          ))}
        </g>
      </svg>
    </div>
  );
}

function ArtNode({ el, accent }: { el: ArtElement; accent: string }) {
  if (el.kind === "group") {
    return (
      <g className={el.cls}>
        {el.children.map((child, i) => (
          <ArtNode key={i} el={child} accent={accent} />
        ))}
      </g>
    );
  }

  if (el.kind === "circle") {
    return (
      <circle
        cx={el.cx}
        cy={el.cy}
        r={el.r}
        className={el.cls}
        {...(el.filled ? { fill: accent, stroke: "none" } : {})}
      />
    );
  }

  return (
    <path
      d={el.d}
      className={el.cls}
      opacity={el.opacity}
      strokeWidth={el.strokeWidth}
    />
  );
}
