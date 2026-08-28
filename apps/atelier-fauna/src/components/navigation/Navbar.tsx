"use client";

import { BiomePillSelector } from "./BiomePillSelector";
import { AudioAmbienceToggle } from "./AudioAmbienceToggle";
import { SpringButton } from "@/components/ui/SpringButton";
import { useFaunaStore } from "@/store/useFaunaStore";

export function Navbar() {
  const openDrawer = useFaunaStore((s) => s.openDrawer);

  return (
    <header className="sticky top-4 z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4">
      <div className="glass-surface flex flex-1 items-center justify-between gap-4 rounded-full px-4 py-2 sm:px-6">
        <span className="text-sm font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
          Atelier Fauna
        </span>

        <div className="hidden md:block">
          <BiomePillSelector />
        </div>

        <div className="flex items-center gap-2">
          <AudioAmbienceToggle />
          <SpringButton
            variant="primary"
            className="hidden sm:inline-flex"
            onClick={() => openDrawer()}
          >
            Atelier Concierge
          </SpringButton>
        </div>
      </div>

      <div className="glass-surface block rounded-full px-2 py-2 md:hidden">
        <BiomePillSelector />
      </div>
    </header>
  );
}
