import { Navbar } from "@/components/navigation/Navbar";
import { HeroStage } from "@/components/hero/HeroStage";
import { SpecimenGrid } from "@/components/specimens/SpecimenGrid";
import { SpecimenDossierModal } from "@/components/specimens/SpecimenDossierModal";
import { JournalSection } from "@/components/journal/JournalSection";
import { CustodianDrawer } from "@/components/concierge/CustodianDrawer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col gap-20 pb-24">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 pt-6">
        <HeroStage />
      </div>

      <SpecimenGrid />
      <JournalSection />

      <SpecimenDossierModal />
      <CustodianDrawer />
    </main>
  );
}
