"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SpringButton } from "@/components/ui/SpringButton";

const TIME_SLOTS = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekend",
];

export function StepScheduleConsult({
  onBack,
  onSubmit,
  submitted,
}: {
  onBack: () => void;
  onSubmit: (data: { email: string; preferredWindow: string }) => void;
  submitted: boolean;
}) {
  const [email, setEmail] = useState("");
  const [preferredWindow, setPreferredWindow] = useState("");

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle2 className="text-green-600" size={40} strokeWidth={1.5} />
        <h3 className="text-2xl font-medium tracking-[-0.01em] text-neutral-900">
          Inquest Received
        </h3>
        <p className="max-w-sm text-sm text-neutral-500">
          An Atelier Biotope Architect will reach out within two business days
          to schedule your private consultation. No acquisition is finalized
          until that conversation happens.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
          Step 3 of 3
        </p>
        <h3 className="mt-1 text-2xl font-medium tracking-[-0.01em] text-neutral-900">
          Private Consultation
        </h3>
        <p className="mt-2 text-sm text-neutral-500">
          This reserves a conversation with an Atelier Concierge — it is not
          a purchase or a deposit.
        </p>
      </div>

      <label className="flex flex-col gap-2 text-sm text-neutral-700">
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-black/[0.08] p-3 text-sm text-neutral-800 outline-none focus:border-neutral-400"
          placeholder="you@domain.com"
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-neutral-700">
          Preferred consultation window
        </legend>
        {TIME_SLOTS.map((slot) => (
          <label
            key={slot}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/[0.08] p-3 text-sm text-neutral-700 has-[:checked]:border-neutral-900 has-[:checked]:bg-neutral-50"
          >
            <input
              type="radio"
              name="preferredWindow"
              value={slot}
              checked={preferredWindow === slot}
              onChange={(e) => setPreferredWindow(e.target.value)}
              className="accent-neutral-900"
            />
            {slot}
          </label>
        ))}
      </fieldset>

      <div className="flex justify-between">
        <SpringButton variant="ghost" onClick={onBack}>
          Back
        </SpringButton>
        <SpringButton
          variant="primary"
          disabled={!email || !preferredWindow}
          className="disabled:opacity-40"
          onClick={() => onSubmit({ email, preferredWindow })}
        >
          Submit Inquest
        </SpringButton>
      </div>
    </div>
  );
}
