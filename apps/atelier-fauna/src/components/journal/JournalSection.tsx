import { JOURNAL_ARTICLES } from "@/data/journalArticles";
import { JournalCard } from "./JournalCard";

export function JournalSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-400">
        The Sanctuary Journal
      </p>
      <h2 className="mt-2 max-w-2xl text-3xl font-medium tracking-[-0.02em] text-neutral-900 md:text-4xl">
        What living biotopes teach about a considered life
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {JOURNAL_ARTICLES.map((article) => (
          <JournalCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
