import { Navbar } from "@/components/navigation/Navbar";
import { CustodianDrawer } from "@/components/concierge/CustodianDrawer";

export const metadata = {
  title: "Custodianship Charter — Atelier Fauna",
};

const PRINCIPLES = [
  {
    title: "Captive-Bred Provenance Only",
    body: "Every specimen in the Atelier lineage traces to a documented captive-breeding program. We do not source wild-caught specimens under any circumstance, and provenance documentation is provided at consultation, not withheld.",
  },
  {
    title: "No Instant Acquisition",
    body: "There is no cart, no checkout, no same-day delivery. Every placement begins with a Custodianship Readiness & Consultation — a private conversation, not a transaction — because a living creature is not an impulse purchase.",
  },
  {
    title: "Habitat Before Animal",
    body: "We verify enclosure size, climate control, and diet logistics are ready before any specimen is placed. If your space isn't ready, we'll tell you — and help you build toward readiness rather than compromise the animal's welfare.",
  },
  {
    title: "Species-Appropriate Boundaries",
    body: "Some species we display for educational purposes only, never for placement (marked 'Sanctuary Only'). Regulatory status, welfare complexity, and lifespan commitment all factor into what is available for custodianship at all.",
  },
  {
    title: "Ongoing Relationship, Not a Sale",
    body: "Post-placement, custodians retain access to our Biotope Architects for husbandry questions, health concerns, and enclosure evolution — for the life of the animal, not just the transaction.",
  },
];

export default function CustodianshipPage() {
  return (
    <main className="flex min-h-screen flex-col gap-16 pb-24">
      <Navbar />

      <div className="mx-auto w-full max-w-2xl px-4 pt-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-400">
          Ethical Care Charter
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
          Custodianship, Not Ownership
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-neutral-600">
          Atelier Fauna exists on the premise that a living specimen deserves
          more friction than a product, and more commitment than a purchase.
          This is the charter behind every placement.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4">
        {PRINCIPLES.map((principle, i) => (
          <div key={principle.title} className="flex gap-5">
            <span className="font-mono text-sm text-neutral-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-xl font-medium tracking-[-0.01em] text-neutral-900">
                {principle.title}
              </h2>
              <p className="mt-2 leading-relaxed text-neutral-600">
                {principle.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <CustodianDrawer />
    </main>
  );
}
