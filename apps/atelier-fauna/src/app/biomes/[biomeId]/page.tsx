import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { BIOMES, BIOME_ORDER, getSpecimensByBiome } from "@/data/faunaData";
import { SpecimenCard } from "@/components/specimens/SpecimenCard";
import { SpecimenDossierModal } from "@/components/specimens/SpecimenDossierModal";
import { CustodianDrawer } from "@/components/concierge/CustodianDrawer";
import type { BiomeId } from "@/types/fauna";

export function generateStaticParams() {
  return BIOME_ORDER.map((biomeId) => ({ biomeId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ biomeId: string }>;
}) {
  const { biomeId } = await params;
  const biome = BIOMES[biomeId as BiomeId];
  return { title: biome ? `${biome.name} — Atelier Fauna` : "Atelier Fauna" };
}

export default async function BiomePage({
  params,
}: {
  params: Promise<{ biomeId: string }>;
}) {
  const { biomeId } = await params;
  const biome = BIOMES[biomeId as BiomeId];
  if (!biome) notFound();

  const specimens = getSpecimensByBiome(biome.id);

  return (
    <main
      className="flex min-h-screen flex-col gap-16 pb-24 transition-colors duration-[800ms] ease-apple-decel"
      style={{
        background: `linear-gradient(180deg, ${biome.themeColor.bgLight}, #FBFBFD 60%)`,
      }}
    >
      <Navbar />

      <div className="mx-auto w-full max-w-4xl px-4 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          All Biomes
        </Link>

        <p
          className="mt-8 text-xs font-medium uppercase tracking-[0.15em]"
          style={{ color: biome.themeColor.accent }}
        >
          {biome.latinName}
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
          {biome.name}
        </h1>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-neutral-600">
          {biome.tagline}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {specimens.map((specimen) => (
          <SpecimenCard key={specimen.id} specimen={specimen} />
        ))}
      </div>

      <SpecimenDossierModal />
      <CustodianDrawer />
    </main>
  );
}
