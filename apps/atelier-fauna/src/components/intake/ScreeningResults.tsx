import { ShieldAlert, CircleDashed } from "lucide-react";
import type { ScreeningResult } from "@/server/speciesScreening";

/**
 * Renders per-entry screening verdicts.
 *
 * The wording here is load-bearing. `needs_review` must never be presented
 * as approval — no green check, no "cleared", no reassuring language. It
 * means only that no exclusion rule matched. Presenting it as a pass would
 * misrepresent what the screen can actually establish, and a buyer could
 * reasonably act on that.
 */
export function ScreeningResults({ results }: { results: ScreeningResult[] }) {
  const excluded = results.filter((r) => r.verdict === "excluded");
  const review = results.filter((r) => r.verdict === "needs_review");

  return (
    <div className="flex flex-col gap-6">
      {excluded.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
            Cannot be sourced — {excluded.length}{" "}
            {excluded.length === 1 ? "entry" : "entries"}
          </h3>

          {excluded.map((r) => (
            <div
              key={r.input}
              className="flex gap-3 rounded-xl border border-red-200 bg-red-50/70 p-4"
            >
              <ShieldAlert
                size={17}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-red-600"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-neutral-900">{r.input}</p>
                <p className="text-sm leading-relaxed text-neutral-700">
                  {r.reason}
                </p>
                {r.authority && (
                  <p className="font-mono text-xs text-neutral-500">
                    {r.authority}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {review.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
            Passed to research — {review.length}{" "}
            {review.length === 1 ? "entry" : "entries"}
          </h3>

          <div className="rounded-xl border border-black/[0.08] bg-neutral-50 p-4">
            <div className="flex gap-3">
              <CircleDashed
                size={17}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-neutral-400"
              />
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {review.map((r) => (
                    <span
                      key={r.input}
                      className="rounded-lg bg-white px-2.5 py-1 text-sm text-neutral-800 ring-1 ring-black/[0.06]"
                    >
                      {r.input}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-neutral-600">
                  No exclusion rule matched these.{" "}
                  <strong className="font-medium text-neutral-800">
                    This is not a clearance
                  </strong>{" "}
                  — it means only that our automated screen found no known
                  prohibition. Whether any of them can lawfully be sourced,
                  kept, or shipped to you is determined per species and per
                  jurisdiction, by a person, before anything is offered.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <p className="border-l-2 border-neutral-200 pl-4 text-xs leading-relaxed text-neutral-500">
        Automated screening can only reject known-prohibited species. It
        never establishes that a species is legal to import, keep, or sell.
        Our exclusion list covers taxa we have researched directly — it is
        not exhaustive, and an entry passing it carries no assurance.
      </p>
    </div>
  );
}
