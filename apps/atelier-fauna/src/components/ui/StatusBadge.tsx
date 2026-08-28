import type { AvailabilityStatus } from "@/types/fauna";
import { STATUS_LABELS } from "@/data/faunaData";
import { cn } from "@/lib/cn";

export function StatusBadge({ status }: { status: AvailabilityStatus }) {
  const { label, live } = STATUS_LABELS[status];

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/60 px-3 py-1 text-xs font-medium tracking-wide text-neutral-600 backdrop-blur-md dark:border-white/[0.12] dark:bg-white/5 dark:text-neutral-300">
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full",
            live ? "bg-green-400 animate-breathe" : "bg-neutral-400",
          )}
        />
      </span>
      {label}
    </span>
  );
}
