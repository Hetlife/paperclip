"use client";

import { useState } from "react";
import { SpringButton } from "@/components/ui/SpringButton";

const CHECKLIST_ITEMS = [
  "I can commit to a consistent daily observation and care rhythm.",
  "I understand this species' full adult size and lifespan before acquiring it.",
  "I have a plan for veterinary/specialist care access in my region.",
  "I understand acquisition is a multi-year custodianship, not a purchase.",
];

export function StepCustodianChecklist({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (data: { experienceNote: string; acknowledged: boolean }) => void;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [experienceNote, setExperienceNote] = useState("");

  const allChecked = CHECKLIST_ITEMS.every((item) => checked[item]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Step 2 of 3
        </p>
        <h3 className="mt-1 text-2xl font-medium tracking-[-0.01em] text-neutral-900">
          Custodian Readiness Checklist
        </h3>
      </div>

      <fieldset className="flex flex-col gap-2">
        {CHECKLIST_ITEMS.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-black/[0.08] p-3 text-sm text-neutral-700 has-[:checked]:border-neutral-900 has-[:checked]:bg-neutral-50"
          >
            <input
              type="checkbox"
              checked={!!checked[item]}
              onChange={(e) =>
                setChecked((prev) => ({ ...prev, [item]: e.target.checked }))
              }
              className="mt-0.5 accent-neutral-900"
            />
            {item}
          </label>
        ))}
      </fieldset>

      <label className="flex flex-col gap-2 text-sm text-neutral-700">
        Prior experience with this or a related species (optional)
        <textarea
          value={experienceNote}
          onChange={(e) => setExperienceNote(e.target.value)}
          rows={3}
          className="rounded-xl border border-black/[0.08] p-3 text-sm text-neutral-800 outline-none focus:border-neutral-400"
          placeholder="e.g. I've kept a 90 gallon planted biotope for 4 years..."
        />
      </label>

      <div className="flex justify-between">
        <SpringButton variant="ghost" onClick={onBack}>
          Back
        </SpringButton>
        <SpringButton
          variant="primary"
          disabled={!allChecked}
          className="disabled:opacity-40"
          onClick={() => onNext({ experienceNote, acknowledged: allChecked })}
        >
          Continue
        </SpringButton>
      </div>
    </div>
  );
}
