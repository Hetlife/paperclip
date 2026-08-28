import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FBFBFD",
        sanctuary: "#090A0C",
        sanctuaryAlt: "#121316",
        biome: {
          hydroLight: "#F0F6FA",
          hydroLightAlt: "#E3EFF7",
          hydroDark: "#0B1116",
          hydroAccent: "#4B8BA6",
          aetherLight: "#F5F7FA",
          aetherLightAlt: "#EAEFF5",
          aetherDark: "#101216",
          aetherAccent: "#8293A6",
          microLight: "#FAF8F2",
          microLightAlt: "#F2EFE6",
          microDark: "#141310",
          microAccent: "#B59B63",
          terraLight: "#FAF5F0",
          terraLightAlt: "#F4EBE1",
          terraDark: "#14110E",
          terraAccent: "#B87A54",
          sylvanLight: "#F2F7F4",
          sylvanLightAlt: "#E5EFEA",
          sylvanDark: "#0C130E",
          sylvanAccent: "#5E8B6D",
        },
      },
      backdropBlur: {
        "2xl": "40px",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "monospace"],
      },
      transitionTimingFunction: {
        "apple-decel": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.9",
            boxShadow: "0 0 0 0 rgba(74, 222, 128, 0.4)",
          },
          "50%": {
            transform: "scale(1.15)",
            opacity: "1",
            boxShadow: "0 0 14px 4px rgba(74, 222, 128, 0.25)",
          },
        },
      },
      animation: {
        breathe: "breathe 3s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
