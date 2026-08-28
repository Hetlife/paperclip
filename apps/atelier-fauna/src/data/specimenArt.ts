import type { BiomeId } from "@/types/fauna";

/**
 * Specimen line art as DATA, not JSX.
 *
 * Why: the art previously lived only as JSX inside SpecimenAnimation.tsx,
 * which meant the standalone demo pages had to re-implement every path by
 * hand. That is exactly the kind of duplication that drifts silently — a
 * fixed fin in the app would not reach the demo anyone actually looks at.
 *
 * As plain data, one definition feeds both: React renders it in the app,
 * and scripts/sync-demo.mjs serialises the same values into the demo
 * pages. Editing a path here updates every surface after `npm run sync`.
 *
 * Animation is applied by CSS/Framer class names (`cls`), not encoded
 * here — the app drives them with Framer Motion and the demos with CSS
 * keyframes, but both key off the same class names.
 */

export interface ArtPath {
  kind: "path";
  d: string;
  cls?: string;
  opacity?: number;
  strokeWidth?: number;
}

export interface ArtCircle {
  kind: "circle";
  cx: number;
  cy: number;
  r: number;
  cls?: string;
  /** Solid fill in the accent colour (eyes, pupils) rather than stroked. */
  filled?: boolean;
}

export interface ArtGroup {
  kind: "group";
  cls?: string;
  children: ArtElement[];
}

export type ArtElement = ArtPath | ArtCircle | ArtGroup;

/** viewBox every specimen is drawn in. */
export const ART_VIEWBOX = "0 0 200 240";

export const SPECIMEN_ART: Record<BiomeId, ArtElement[]> = {
  // Hydro — slow vertical drift, fin undulation, independent pectoral flutter.
  hydro: [
    {
      kind: "group",
      cls: "hydro-body",
      children: [
        { kind: "path", cls: "hydro-dorsal", d: "M96 84 C104 56 116 34 134 18 C130 42 122 66 116 88" },
        { kind: "path", cls: "hydro-anal", d: "M96 156 C104 184 116 206 134 222 C130 198 122 174 116 152" },
        { kind: "path", d: "M150 120 C142 104 126 88 106 82 C92 92 84 106 84 120 C84 134 92 148 106 158 C126 152 142 136 150 120 Z" },
        { kind: "path", d: "M112 158 C114 182 112 202 106 220" },
        { kind: "path", cls: "hydro-caudal", d: "M84 120 C70 108 58 102 48 100 C54 112 54 128 48 140 C58 138 70 132 84 120 Z" },
        { kind: "path", cls: "hydro-pect", d: "M124 126 C132 132 136 142 133 150" },
        { kind: "path", d: "M150 120 C146 116 142 114 138 114", opacity: 0.6 },
        { kind: "circle", cx: 136, cy: 112, r: 2.6, filled: true },
        { kind: "path", d: "M124 92 C120 110 120 132 124 150", opacity: 0.32 },
        { kind: "path", d: "M108 84 C104 106 104 136 108 158", opacity: 0.32 },
      ],
    },
  ],

  // Aether — perch sway, periodic alert head-turn, occasional wing settle.
  aether: [
    { kind: "path", d: "M40 196 L160 196", opacity: 0.5 },
    {
      kind: "group",
      cls: "aeth-body",
      children: [
        { kind: "path", d: "M100 96 C122 96 134 122 132 150 C130 176 116 192 100 192 C84 192 70 176 68 150 C66 122 78 96 100 96 Z" },
        {
          kind: "group",
          cls: "aeth-head",
          children: [
            { kind: "circle", cx: 100, cy: 76, r: 21 },
            { kind: "path", d: "M118 70 C128 72 132 78 128 84 C124 88 118 86 116 82" },
            { kind: "circle", cx: 108, cy: 70, r: 2.4, filled: true },
          ],
        },
        { kind: "path", cls: "aeth-wing", d: "M92 112 C74 122 66 146 72 168 C80 162 88 146 92 128" },
        { kind: "path", cls: "aeth-tail", d: "M100 190 C104 208 106 222 104 234" },
        { kind: "path", d: "M94 192 L92 197 M106 192 L108 197" },
      ],
    },
  ],

  // Micro — near-total stillness, petal-mimic wind sway, one fast strike-fold.
  micro: [
    {
      kind: "group",
      cls: "micro-all",
      children: [
        { kind: "path", d: "M100 200 L100 232", opacity: 0.5 },
        { kind: "path", d: "M100 200 C88 190 84 172 90 158 C96 146 108 146 113 158 C119 172 114 190 100 200 Z" },
        { kind: "path", d: "M100 156 L100 122" },
        { kind: "path", d: "M90 176 C74 178 64 170 66 158 C76 154 88 162 90 172" },
        { kind: "path", d: "M113 176 C129 178 139 170 137 158 C127 154 115 162 113 172" },
        { kind: "path", d: "M92 150 C78 148 70 138 74 128 C84 128 92 138 93 146" },
        { kind: "path", d: "M111 150 C125 148 133 138 129 128 C119 128 111 138 110 146" },
        {
          kind: "group",
          cls: "micro-head",
          children: [
            { kind: "path", d: "M100 122 C93 122 89 116 91 110 C95 105 105 105 109 110 C111 116 107 122 100 122 Z" },
            { kind: "circle", cx: 94, cy: 111, r: 1.9, filled: true },
            { kind: "circle", cx: 106, cy: 111, r: 1.9, filled: true },
            { kind: "path", d: "M95 105 C92 96 90 90 91 84 M105 105 C108 96 110 90 109 84" },
          ],
        },
        { kind: "path", cls: "micro-armL", d: "M94 128 C84 132 78 142 80 152" },
        { kind: "path", cls: "micro-armR", d: "M109 128 C119 132 125 142 123 152" },
      ],
    },
  ],

  // Terra — slow respiratory expansion of the coil, periodic tongue flick.
  terra: [
    { kind: "path", d: "M22 116 C74 106 128 106 180 116", opacity: 0.45, strokeWidth: 2 },
    {
      kind: "group",
      cls: "terra-coil",
      children: [
        { kind: "path", d: "M70 112 C50 140 54 178 80 186 C106 194 120 168 106 146", opacity: 0.55 },
        { kind: "path", d: "M100 110 C80 140 84 180 110 187 C136 194 149 166 134 144", opacity: 0.75 },
        { kind: "path", d: "M130 112 C114 138 118 172 140 178", opacity: 0.55 },
        {
          kind: "group",
          cls: "terra-head",
          children: [
            { kind: "path", d: "M96 152 C110 144 128 145 138 154 C128 163 110 163 96 158 Z" },
            { kind: "circle", cx: 127, cy: 151, r: 2.3, filled: true },
            { kind: "path", cls: "terra-tongue", d: "M138 155 L150 155 M150 155 L156 151 M150 155 L156 159" },
          ],
        },
      ],
    },
  ],

  // Sylvan — continuous throat pulse, whole-body settle, rare blink.
  sylvan: [
    { kind: "path", d: "M34 186 C70 180 130 180 166 186", opacity: 0.45 },
    {
      kind: "group",
      cls: "syl-body",
      children: [
        { kind: "path", d: "M100 122 C126 122 142 146 142 164 C142 178 128 186 100 186 C72 186 58 178 58 164 C58 146 74 122 100 122 Z" },
        { kind: "path", cls: "syl-throat", d: "M84 168 C92 176 108 176 116 168" },
        { kind: "circle", cx: 82, cy: 136, r: 7 },
        { kind: "circle", cx: 118, cy: 136, r: 7 },
        {
          kind: "group",
          cls: "syl-eyes",
          children: [
            { kind: "circle", cx: 82, cy: 136, r: 3, filled: true },
            { kind: "circle", cx: 118, cy: 136, r: 3, filled: true },
          ],
        },
        { kind: "path", d: "M70 178 C64 184 60 190 62 194 M130 178 C136 184 140 190 138 194" },
        { kind: "path", d: "M138 168 C150 170 156 180 152 190" },
      ],
    },
  ],
};

/**
 * Serialise art to an SVG inner-markup string. Used by the demo generator;
 * the React component renders the same data through JSX instead.
 * `accent` is emitted literally so callers can pass a CSS custom property.
 */
export function artToSvgString(elements: ArtElement[], accent = "var(--accent)"): string {
  const attrs = (e: ArtPath | ArtCircle) =>
    [
      e.cls ? ` class="${e.cls}"` : "",
      "opacity" in e && e.opacity !== undefined ? ` opacity="${e.opacity}"` : "",
      "strokeWidth" in e && e.strokeWidth !== undefined ? ` stroke-width="${e.strokeWidth}"` : "",
    ].join("");

  const render = (e: ArtElement): string => {
    if (e.kind === "group") {
      return `<g${e.cls ? ` class="${e.cls}"` : ""}>${e.children.map(render).join("")}</g>`;
    }
    if (e.kind === "circle") {
      const fill = e.filled ? ` fill="${accent}" stroke="none"` : "";
      return `<circle cx="${e.cx}" cy="${e.cy}" r="${e.r}"${attrs(e)}${fill}/>`;
    }
    return `<path d="${e.d}"${attrs(e)}/>`;
  };

  return elements.map(render).join("");
}
