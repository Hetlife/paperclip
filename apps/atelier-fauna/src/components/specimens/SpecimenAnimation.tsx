"use client";

import { motion } from "framer-motion";
import type { BiomeId } from "@/types/fauna";
import { BIOMES } from "@/data/faunaData";

/**
 * Hand-authored line-art specimen animations — one per exhibit.
 *
 * These are DEMO animations standing in for the eventual generated 3D
 * models (see ROADMAP.md). They are deliberately abstract line art rather
 * than attempted photorealism: at this fidelity an elegant silhouette
 * reads as intentional design, whereas a not-quite-real 3D animal reads
 * as broken. Each loop is built from the species' actual resting
 * behavior, per the spec's "ambient presence, not commercial animation"
 * principle.
 */
export function SpecimenAnimation({
  biomeId,
  className,
}: {
  biomeId: BiomeId;
  className?: string;
}) {
  const accent = BIOMES[biomeId].themeColor.accent;

  const Renderer = {
    hydro: AltumAngelfish,
    aether: Lorikeet,
    micro: OrchidMantis,
    terra: EmeraldBoa,
    sylvan: GoldenMantella,
  }[biomeId];

  return (
    <div className={className}>
      <Renderer accent={accent} />
    </div>
  );
}

const STROKE = { strokeWidth: 1.25, fill: "none", strokeLinecap: "round" as const };

/** Hydro — slow vertical drift with continuous fin undulation. */
function AltumAngelfish({ accent }: { accent: string }) {
  return (
    <motion.svg
      viewBox="0 0 200 240"
      className="h-full w-full"
      animate={{ y: [0, -8, 0, 6, 0] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
    >
      <g stroke={accent} {...STROKE}>
        {/* Dorsal fin — tall, sweeping up and back from the body's crest */}
        <motion.path
          d="M96 84 C104 56 116 34 134 18 C130 42 122 66 116 88"
          animate={{ d: [
            "M96 84 C104 56 116 34 134 18 C130 42 122 66 116 88",
            "M96 84 C106 56 120 32 140 14 C134 40 124 65 116 88",
            "M96 84 C104 56 116 34 134 18 C130 42 122 66 116 88",
          ] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Anal fin — mirrors the dorsal, sweeping down and back */}
        <motion.path
          d="M96 156 C104 184 116 206 134 222 C130 198 122 174 116 152"
          animate={{ d: [
            "M96 156 C104 184 116 206 134 222 C130 198 122 174 116 152",
            "M96 156 C106 184 120 208 140 226 C134 200 124 175 116 152",
            "M96 156 C104 184 116 206 134 222 C130 198 122 174 116 152",
          ] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        {/* Body — tall laterally-compressed diamond, snout to the right */}
        <path d="M150 120 C142 104 126 88 106 82 C92 92 84 106 84 120 C84 134 92 148 106 158 C126 152 142 136 150 120 Z" />
        {/* Trailing ventral filaments — the Altum's signature streamers */}
        <motion.path
          d="M112 158 C114 182 112 202 106 220"
          animate={{ d: [
            "M112 158 C114 182 112 202 106 220",
            "M112 158 C118 182 118 204 114 224",
            "M112 158 C114 182 112 202 106 220",
          ] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        {/* Caudal fin — the slow beat driving the drift */}
        <motion.path
          d="M84 120 C70 108 58 102 48 100 C54 112 54 128 48 140 C58 138 70 132 84 120 Z"
          animate={{ rotate: [0, -8, 0, 8, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "84px 120px" }}
        />
        {/* Pectoral fin — faster, independent flutter */}
        <motion.path
          d="M124 126 C132 132 136 142 133 150"
          animate={{ rotate: [0, 14, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "124px 126px" }}
        />
        {/* Snout and eye */}
        <path d="M150 120 C146 116 142 114 138 114" opacity={0.6} />
        <circle cx="136" cy="112" r="2.6" fill={accent} stroke="none" />
        {/* Vertical banding — the species' dark bars */}
        <path d="M124 92 C120 110 120 132 124 150" opacity={0.32} />
        <path d="M108 84 C104 106 104 136 108 158" opacity={0.32} />
      </g>
    </motion.svg>
  );
}

/** Aether — perch sway with periodic wing lift and head turns. */
function Lorikeet({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full">
      <g stroke={accent} {...STROKE}>
        {/* Perch */}
        <path d="M40 196 L160 196" opacity={0.5} />
        <motion.g
          animate={{ rotate: [0, 1.6, 0, -1.6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 196px" }}
        >
          {/* Body */}
          <path d="M100 96 C122 96 134 122 132 150 C130 176 116 192 100 192 C84 192 70 176 68 150 C66 122 78 96 100 96 Z" />
          {/* Head — periodic alert turn */}
          <motion.g
            animate={{ rotate: [0, 0, 14, 14, 0, 0, -11, -11, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.24, 0.38, 0.47, 0.62, 0.71, 0.85, 1] }}
            style={{ transformOrigin: "100px 96px" }}
          >
            <circle cx="100" cy="76" r="21" />
            <path d="M118 70 C128 72 132 78 128 84 C124 88 118 86 116 82" />
            <circle cx="108" cy="70" r="2.4" fill={accent} stroke="none" />
          </motion.g>
          {/* Wing — occasional settle-lift */}
          <motion.path
            d="M92 112 C74 122 66 146 72 168 C80 162 88 146 92 128"
            animate={{ rotate: [0, 0, -20, 0, 0], scaleY: [1, 1, 1.1, 1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 0.65, 0.75, 1] }}
            style={{ transformOrigin: "92px 112px" }}
          />
          {/* Tail */}
          <motion.path
            d="M100 190 C104 208 106 222 104 234"
            animate={{ rotate: [0, 3.5, 0, -3.5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "100px 190px" }}
          />
          {/* Feet */}
          <path d="M94 192 L92 197 M106 192 L108 197" />
        </motion.g>
      </g>
    </svg>
  );
}

/** Micro — near-total stillness, broken by the species' signature sway. */
function OrchidMantis({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full">
      <motion.g
        stroke={accent}
        {...STROKE}
        // The "wind sway" — a mantis mimicking a petal moving in a breeze.
        animate={{ rotate: [0, 2.4, -1.4, 2.0, 0, 0, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.08, 0.14, 0.2, 0.28, 0.7, 1] }}
        style={{ transformOrigin: "100px 200px" }}
      >
        {/* Stem */}
        <path d="M100 200 L100 232" opacity={0.5} />
        {/* Abdomen */}
        <path d="M100 200 C88 190 84 172 90 158 C96 146 108 146 113 158 C119 172 114 190 100 200 Z" />
        {/* Thorax */}
        <path d="M100 156 L100 122" />
        {/* Petal-mimic lobes on the legs */}
        <path d="M90 176 C74 178 64 170 66 158 C76 154 88 162 90 172" />
        <path d="M113 176 C129 178 139 170 137 158 C127 154 115 162 113 172" />
        <path d="M92 150 C78 148 70 138 74 128 C84 128 92 138 93 146" />
        <path d="M111 150 C125 148 133 138 129 128 C119 128 111 138 110 146" />
        {/* Head */}
        <motion.g
          // Slow tracking turn — the only "decision" the animation makes.
          animate={{ rotate: [0, 0, 0, 16, 16, 0, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.4, 0.5, 0.66, 0.76, 1] }}
          style={{ transformOrigin: "100px 122px" }}
        >
          <path d="M100 122 C93 122 89 116 91 110 C95 105 105 105 109 110 C111 116 107 122 100 122 Z" />
          <circle cx="94" cy="111" r="1.9" fill={accent} stroke="none" />
          <circle cx="106" cy="111" r="1.9" fill={accent} stroke="none" />
          <path d="M95 105 C92 96 90 90 91 84 M105 105 C108 96 110 90 109 84" />
        </motion.g>
        {/* Raptorial forelimbs — held, then a single fast strike-fold */}
        <motion.path
          d="M94 128 C84 132 78 142 80 152"
          animate={{ rotate: [0, 0, 0, 0, -26, 0, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeOut", times: [0, 0.5, 0.55, 0.56, 0.585, 0.63, 1] }}
          style={{ transformOrigin: "94px 128px" }}
        />
        <motion.path
          d="M109 128 C119 132 125 142 123 152"
          animate={{ rotate: [0, 0, 0, 0, 26, 0, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeOut", times: [0, 0.5, 0.55, 0.56, 0.585, 0.63, 1] }}
          style={{ transformOrigin: "109px 128px" }}
        />
      </motion.g>
    </svg>
  );
}

/** Terra — coil held still; only slow respiratory expansion and a tongue flick. */
function EmeraldBoa({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full">
      <g stroke={accent} {...STROKE}>
        {/* Branch the coils are draped over */}
        <path d="M22 116 C74 106 128 106 180 116" opacity={0.45} strokeWidth={2} />
        <motion.g
          // Respiration: the whole coil expands a few percent, very slowly.
          // This is the only continuous motion — everything else is stillness.
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 155px" }}
        >
          {/* Three draped loops hanging from the branch, back to front */}
          <path d="M70 112 C50 140 54 178 80 186 C106 194 120 168 106 146" opacity={0.55} />
          <path d="M100 110 C80 140 84 180 110 187 C136 194 149 166 134 144" opacity={0.75} />
          <path d="M130 112 C114 138 118 172 140 178" opacity={0.55} />
          {/* Head resting across the front coil */}
          <motion.g
            animate={{ rotate: [0, 0, 2.5, 0, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", times: [0, 0.42, 0.5, 0.58, 1] }}
            style={{ transformOrigin: "96px 152px" }}
          >
            <path d="M96 152 C110 144 128 145 138 154 C128 163 110 163 96 158 Z" />
            <circle cx="127" cy="151" r="2.3" fill={accent} stroke="none" />
            {/* Tongue flick — the one sharp motion in an otherwise still loop */}
            <motion.path
              d="M138 155 L150 155 M150 155 L156 151 M150 155 L156 159"
              animate={{ opacity: [0, 0, 1, 0, 0, 1, 0, 0] }}
              transition={{ duration: 13, repeat: Infinity, times: [0, 0.44, 0.465, 0.49, 0.52, 0.545, 0.57, 1] }}
            />
          </motion.g>
        </motion.g>
      </g>
    </svg>
  );
}

/** Sylvan — grounded stillness with a constant throat pulse and rare blink. */
function GoldenMantella({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full">
      <g stroke={accent} {...STROKE}>
        {/* Leaf litter ground line */}
        <path d="M34 186 C70 180 130 180 166 186" opacity={0.45} />
        <motion.g
          // Whole-body settle — amphibian micro-adjustment, not a hop.
          animate={{ y: [0, -1.5, 0], scaleY: [1, 1.012, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 186px" }}
        >
          {/* Body */}
          <path d="M100 122 C126 122 142 146 142 164 C142 178 128 186 100 186 C72 186 58 178 58 164 C58 146 74 122 100 122 Z" />
          {/* Throat — continuous respiratory pulse, the species' tell */}
          <motion.path
            d="M84 168 C92 176 108 176 116 168"
            animate={{ scaleY: [1, 1.55, 1], y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "100px 168px" }}
          />
          {/* Eyes with a rare blink */}
          <circle cx="82" cy="136" r="7" />
          <circle cx="118" cy="136" r="7" />
          <motion.g
            animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", times: [0, 0.72, 0.75, 0.78, 1] }}
            style={{ transformOrigin: "100px 136px" }}
          >
            <circle cx="82" cy="136" r="3" fill={accent} stroke="none" />
            <circle cx="118" cy="136" r="3" fill={accent} stroke="none" />
          </motion.g>
          {/* Forelimbs planted */}
          <path d="M70 178 C64 184 60 190 62 194 M130 178 C136 184 140 190 138 194" />
          {/* Hind limb folded */}
          <path d="M138 168 C150 170 156 180 152 190" />
        </motion.g>
      </g>
    </svg>
  );
}
