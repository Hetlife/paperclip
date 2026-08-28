"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useFaunaStore } from "@/store/useFaunaStore";

export function AudioAmbienceToggle() {
  const isAudioMuted = useFaunaStore((s) => s.isAudioMuted);
  const toggleAudio = useFaunaStore((s) => s.toggleAudio);

  return (
    <button
      onClick={toggleAudio}
      aria-label={isAudioMuted ? "Enable ambient soundscape" : "Mute ambient soundscape"}
      className="glass-surface flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
    >
      {isAudioMuted ? (
        <VolumeX strokeWidth={1.5} size={18} />
      ) : (
        <Volume2 strokeWidth={1.5} size={18} />
      )}
    </button>
  );
}
