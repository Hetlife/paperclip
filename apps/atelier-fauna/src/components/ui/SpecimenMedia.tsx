"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useState, type ReactNode } from "react";
import type { BiomeId } from "@/types/fauna";
import { BIOMES } from "@/data/faunaData";
import { SpecimenAnimation } from "@/components/specimens/SpecimenAnimation";
import { cn } from "@/lib/cn";

// three.js + fiber are heavy; only pull them into the bundle for specimens
// that actually ship a 3D model. Every specimen today falls through to the
// image/gradient path below.
const Specimen3DViewer = dynamic(
  () => import("./Specimen3DViewer").then((m) => m.Specimen3DViewer),
  { ssr: false, loading: () => null },
);

/**
 * Resolves a specimen's visual: a rigged 3D model if one exists
 * (assets.interactive3dModelUrl), else a photo, else a themed gradient
 * card. This is the one place that fallback chain lives — nothing else
 * in the app should reach for <Image> or Specimen3DViewer directly.
 */
export function SpecimenMedia({
  src,
  model3dUrl,
  alt,
  biomeId,
  className,
  priority,
}: {
  src: string;
  model3dUrl?: string;
  alt: string;
  biomeId: BiomeId;
  className?: string;
  priority?: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [modelFailed, setModelFailed] = useState(false);
  const biome = BIOMES[biomeId];

  if (model3dUrl && !modelFailed) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        <ModelErrorBoundary onError={() => setModelFailed(true)}>
          <Specimen3DViewer modelUrl={model3dUrl} />
        </ModelErrorBoundary>
      </div>
    );
  }

  if (imageFailed || (!src && !model3dUrl)) {
    return (
      <div
        // absolute inset-0, not relative: callers size the parent (aspect
        // ratio or min-height) and pass no dimensions here, matching how
        // next/image `fill` positions itself. A relative box collapses to
        // zero height and renders nothing.
        className={cn("absolute inset-0 overflow-hidden", className)}
        style={{
          background: `radial-gradient(120% 120% at 30% 20%, ${biome.themeColor.glow}, transparent 60%), linear-gradient(160deg, ${biome.themeColor.bgLight}, ${biome.themeColor.bgDark}22)`,
        }}
        aria-label={alt}
        role="img"
      >
        <SpecimenAnimation
          biomeId={biomeId}
          className="absolute inset-0 flex items-center justify-center p-8"
        />
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
      onError={() => setImageFailed(true)}
    />
  );
}

/**
 * A missing/broken .glb throws inside the r3f render tree, which a normal
 * try/catch or onError can't catch — only a class-based error boundary can.
 * Catches that and lets SpecimenMedia drop back to the image/gradient path.
 */
class ModelErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
