import { Navbar } from "@/components/navigation/Navbar";
import { CollectionGallery } from "@/components/collection/CollectionGallery";
import { SpecimenDossierModal } from "@/components/specimens/SpecimenDossierModal";
import { CustodianDrawer } from "@/components/concierge/CustodianDrawer";
import { SPECIMENS } from "@/data/faunaData";

export const metadata = {
  title: "The Viewing Room — Atelier Fauna",
  description:
    "Every specimen in the collection, across all five exhibits. Select one for its full dossier.",
};

export default function CollectionPage() {
  const placeable = SPECIMENS.filter((s) => s.status !== "sanctuary_only");

  return (
    <main className="flex min-h-screen flex-col gap-14 pb-24">
      <Navbar />

      <div className="mx-auto w-full max-w-2xl px-4 pt-10">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-400">
          The Viewing Room
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
          The whole collection
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600">
          Every specimen across all five exhibits. Select any one for its
          full dossier — care specifications, temperament, and the Sanctuary
          Journal essay drawn from how it lives.
        </p>
        <p className="mt-3 text-sm text-neutral-500">
          {SPECIMENS.length} specimens · {placeable.length} available for
          custodianship · {SPECIMENS.length - placeable.length} display and
          education only
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        <CollectionGallery />
      </div>

      <SpecimenDossierModal />
      <CustodianDrawer />
    </main>
  );
}
