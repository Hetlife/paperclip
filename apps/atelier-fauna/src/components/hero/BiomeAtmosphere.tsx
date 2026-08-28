"use client";

import { useEffect, useRef } from "react";
import { BIOMES } from "@/data/faunaData";
import type { BiomeId } from "@/types/fauna";

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
}

const PARTICLE_COUNT = 36;

/**
 * A lightweight canvas particle field, restyled per biome:
 * hydro = rising caustics/bubbles, aether = drifting motes,
 * micro = shimmering flare, terra = slow thermal waves,
 * sylvan = falling mist.
 */
export function BiomeAtmosphere({ biomeId }: { biomeId: BiomeId }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.4 + 0.6,
      speed: Math.random() * 0.4 + 0.15,
      drift: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.35 + 0.15,
    }));

    const accent = BIOMES[biomeId].themeColor.accent;
    const rgb = hexToRgb(accent);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        // Hydro/Aether/Micro/Sylvan drift upward or laterally; Terra pulses.
        const isRising = biomeId !== "terra";
        p.y -= isRising ? p.speed : 0;
        p.x += p.drift * (biomeId === "sylvan" ? 1.4 : 0.6);

        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [biomeId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}
