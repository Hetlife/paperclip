"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpeciesChipInput } from "./SpeciesChipInput";
import { ScreeningResults } from "./ScreeningResults";
import { SpringButton } from "@/components/ui/SpringButton";
import { GENTLE_EASE, fadeUpVariants } from "@/lib/motion";
import type { ScreeningResult } from "@/server/speciesScreening";

interface IntakeResponse {
  id: string;
  screening: ScreeningResult[];
  excludedCount: number;
  message: string;
}

export function SpeciesIntakeForm() {
  const [email, setEmail] = useState("");
  const [species, setSpecies] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IntakeResponse | null>(null);

  const canSubmit = email.trim() !== "" && species.length > 0 && !submitting;

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/species-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          requestedSpecies: species,
          notes: notes.trim() || undefined,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          payload?.errors?.join(" ") ||
            payload?.error ||
            "Something went wrong submitting your list. Please try again.",
        );
        return;
      }

      setResult(payload as IntakeResponse);
    } catch {
      setError(
        "Could not reach the Atelier. Check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setResult(null);
    setSpecies([]);
    setNotes("");
    setError(null);
  }

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={GENTLE_EASE}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                Register received
              </p>
              <h2 className="text-2xl font-medium tracking-[-0.02em] text-neutral-900">
                {result.excludedCount > 0
                  ? "Some entries can’t be sourced"
                  : "Your list is with our researchers"}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-neutral-600">
                {result.message}
              </p>
            </div>

            <ScreeningResults results={result.screening} />

            <div className="flex flex-wrap gap-3">
              <SpringButton variant="secondary" onClick={reset}>
                Submit another list
              </SpringButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={GENTLE_EASE}
            className="flex flex-col gap-6"
          >
            <motion.label
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 text-sm font-medium text-neutral-700"
            >
              Which species would you like to see?
              <SpeciesChipInput
                value={species}
                onChange={setSpecies}
                disabled={submitting}
              />
            </motion.label>

            <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
              Email
              <input
                type="email"
                required
                value={email}
                disabled={submitting}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="rounded-xl border border-black/[0.08] p-3 text-sm font-normal text-neutral-800 outline-none focus:border-neutral-400"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-neutral-700">
              Anything else we should know?{" "}
              <span className="font-normal text-neutral-400">Optional</span>
              <textarea
                value={notes}
                disabled={submitting}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                maxLength={2000}
                placeholder="Existing setup, timeline, particular lineages…"
                className="rounded-xl border border-black/[0.08] p-3 text-sm font-normal text-neutral-800 outline-none focus:border-neutral-400"
              />
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <SpringButton
                variant="primary"
                disabled={!canSubmit}
                className="disabled:opacity-40"
                onClick={handleSubmit}
              >
                {submitting ? "Screening…" : "Submit Register"}
              </SpringButton>
              <p className="text-xs text-neutral-500">
                This is a request, not an order. Nothing is reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
