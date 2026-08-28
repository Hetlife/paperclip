"use client";

import { useState } from "react";
import type { Specimen } from "@/types/fauna";
import { SpringButton } from "@/components/ui/SpringButton";

const SPACE_OPTIONS = [
  "Under 20 gallon / small vivarium",
  "20–90 gallon / medium enclosure",
  "90+ gallon / large enclosure",
  "Walk-in aviary or custom architectural build",
];

export function StepHabitatReview({
  specimen,
  onNext,
}: {
  specimen: Specimen | null;
  onNext: (data: { availableSpace: string }) => void;
}) {
  const [availableSpace, setAvailableSpace] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Step 1 of 3
        </p>
        <h3 className="mt-1 text-2xl font-medium tracking-[-0.01em] text-neutral-900">
          Habitat Compatibility Review
        </h3>
        {specimen && (
          <p className="mt-2 text-sm text-neutral-500">
            Recommended for {specimen.commonName}:{" "}
            <span className="font-medium text-neutral-700">
              {specimen.careSpecs.spaceRequirement}
            </span>
          </p>
        )}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-neutral-700">
          What space do you currently have available?
        </legend>
        {SPACE_OPTIONS.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/[0.08] p-3 text-sm text-neutral-700 has-[:checked]:border-neutral-900 has-[:checked]:bg-neutral-50"
          >
            <input
              type="radio"
              name="availableSpace"
              value={option}
              checked={availableSpace === option}
              onChange={(e) => setAvailableSpace(e.target.value)}
              className="accent-neutral-900"
            />
            {option}
          </label>
        ))}
      </fieldset>

      <SpringButton
        variant="primary"
        disabled={!availableSpace}
        className="self-end disabled:opacity-40"
        onClick={() => onNext({ availableSpace })}
      >
        Continue
      </SpringButton>
    </div>
  );
}
