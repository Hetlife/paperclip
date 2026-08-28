import { Navbar } from "@/components/navigation/Navbar";
import { CustodianDrawer } from "@/components/concierge/CustodianDrawer";
import { SpeciesIntakeForm } from "@/components/intake/SpeciesIntakeForm";

export const metadata = {
  title: "The Register — Atelier Fauna",
  description:
    "Tell us which species you would like to see in the collection. Every entry is screened, then reviewed by a person.",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col gap-16 pb-24">
      <Navbar />

      <div className="mx-auto w-full max-w-2xl px-4 pt-10">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-400">
          The Register
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
          Tell us what you’d like to see
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600">
          The collection grows from what custodians actually ask for. Submit
          the species you’re interested in and we’ll research what can be
          responsibly and lawfully offered.
        </p>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4">
        <SpeciesIntakeForm />
      </div>

      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="rounded-2xl border border-black/[0.06] bg-neutral-50 p-6">
          <h2 className="text-sm font-medium text-neutral-900">
            What happens to your list
          </h2>
          <ol className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-neutral-600">
            <li>
              <span className="font-medium text-neutral-800">
                1 · Immediate screening.
              </span>{" "}
              Each entry is checked against species we know to be
              prohibited. You see those results straight away.
            </li>
            <li>
              <span className="font-medium text-neutral-800">
                2 · Human research.
              </span>{" "}
              Everything else goes to a person, who establishes whether it
              can be lawfully and ethically sourced — per species, and for
              where you are.
            </li>
            <li>
              <span className="font-medium text-neutral-800">
                3 · We write back.
              </span>{" "}
              Either way. A “no” with the reason is a more useful answer
              than silence.
            </li>
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-neutral-500">
            Submitting a list places you under no obligation and reserves
            nothing. We never take payment before a consultation.
          </p>
        </div>
      </div>

      <CustodianDrawer />
    </main>
  );
}
