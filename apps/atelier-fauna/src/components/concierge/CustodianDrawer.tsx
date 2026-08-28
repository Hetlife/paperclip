"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { useFaunaStore } from "@/store/useFaunaStore";
import { StepHabitatReview } from "./StepHabitatReview";
import { StepCustodianChecklist } from "./StepCustodianChecklist";
import { StepScheduleConsult } from "./StepScheduleConsult";
import { GENTLE_EASE } from "@/lib/motion";

interface InquestData {
  availableSpace?: string;
  experienceNote?: string;
  email?: string;
  preferredWindow?: string;
}

export function CustodianDrawer() {
  const isDrawerOpen = useFaunaStore((s) => s.isDrawerOpen);
  const closeDrawer = useFaunaStore((s) => s.closeDrawer);
  const specimen = useFaunaStore((s) => s.selectedSpecimen);

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<InquestData>({});

  function handleClose() {
    closeDrawer();
    // Reset after the exit animation has time to play.
    setTimeout(() => {
      setStep(0);
      setSubmitted(false);
      setData({});
    }, 400);
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex justify-end"
          role="dialog"
          aria-modal
          aria-label="Custodianship Readiness & Consultation"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={GENTLE_EASE}
            className="glass-surface relative z-10 flex h-full w-full max-w-md flex-col overflow-y-auto p-6 sm:p-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
                  Atelier Concierge & Biotope Architects
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  {specimen ? specimen.commonName : "General Inquest"}
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-neutral-700 hover:bg-white"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="mb-8 flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-neutral-900" : "bg-neutral-200"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={submitted ? "done" : step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={GENTLE_EASE}
              >
                {step === 0 && (
                  <StepHabitatReview
                    specimen={specimen}
                    onNext={(d) => {
                      setData((prev) => ({ ...prev, ...d }));
                      setStep(1);
                    }}
                  />
                )}
                {step === 1 && (
                  <StepCustodianChecklist
                    onBack={() => setStep(0)}
                    onNext={(d) => {
                      setData((prev) => ({ ...prev, ...d }));
                      setStep(2);
                    }}
                  />
                )}
                {step === 2 && (
                  <StepScheduleConsult
                    submitted={submitted}
                    onBack={() => setStep(1)}
                    onSubmit={(d) => {
                      setData((prev) => ({ ...prev, ...d }));
                      // No backend wired yet — this is a UI-complete flow.
                      // See apps/atelier-fauna/README.md for what's needed
                      // to make submission real (API route + storage/CRM).
                      setSubmitted(true);
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
