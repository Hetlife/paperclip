import type { SpecimenCareSpecs } from "@/types/fauna";

export function CareMetricsTable({ specs }: { specs: SpecimenCareSpecs }) {
  const rows: Array<[string, string]> = [
    ["Custodianship Level", specs.difficulty],
    ["Space Requirement", specs.spaceRequirement],
    ["Temperature Range", specs.climate.tempRange],
    ["Humidity", specs.climate.humidity],
    ["Light Regimen", specs.climate.lumenLevel],
    ["Diet", specs.diet],
    ["Expected Lifespan", specs.lifespan],
  ];

  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/[0.06] bg-black/[0.06] sm:grid-cols-2 dark:border-white/[0.08] dark:bg-white/[0.08]">
      {rows.map(([label, value]) => (
        <div key={label} className="bg-white px-5 py-4 dark:bg-neutral-900">
          <dt className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400">
            {label}
          </dt>
          <dd className="mt-1 text-sm font-medium text-neutral-800 dark:text-neutral-100">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
