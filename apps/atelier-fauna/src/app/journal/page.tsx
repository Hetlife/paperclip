import { Navbar } from "@/components/navigation/Navbar";
import { JournalCard } from "@/components/journal/JournalCard";
import { JOURNAL_ARTICLES } from "@/data/journalArticles";
import { CustodianDrawer } from "@/components/concierge/CustodianDrawer";

export const metadata = {
  title: "The Sanctuary Journal — Atelier Fauna",
};

export default function JournalIndexPage() {
  return (
    <main className="flex min-h-screen flex-col gap-16 pb-24">
      <Navbar />

      <div className="mx-auto w-full max-w-3xl px-4 pt-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-400">
          The Sanctuary Journal
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
          What the natural world teaches about a considered life
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-neutral-600">
          Every essay pairs an observed behavior in one of our biomes with a
          practice for the nervous system.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 md:grid-cols-2">
        {JOURNAL_ARTICLES.map((article) => (
          <JournalCard key={article.slug} article={article} />
        ))}
      </div>

      <CustodianDrawer />
    </main>
  );
}
