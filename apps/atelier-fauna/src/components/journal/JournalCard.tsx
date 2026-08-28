import Link from "next/link";
import type { JournalArticle } from "@/types/fauna";
import { BIOMES } from "@/data/faunaData";

export function JournalCard({ article }: { article: JournalArticle }) {
  const biome = BIOMES[article.biomeId];

  return (
    <Link
      href={`/journal/${article.slug}`}
      className="group block rounded-3xl border border-black/[0.06] bg-white p-6 transition-colors hover:border-black/[0.12] dark:border-white/[0.08] dark:bg-neutral-900"
    >
      <p
        className="text-xs font-medium uppercase tracking-[0.15em]"
        style={{ color: biome.themeColor.accent }}
      >
        {biome.name} · {article.readTimeMinutes} min read
      </p>
      <h3 className="mt-3 text-xl font-medium leading-snug tracking-[-0.01em] text-neutral-900 group-hover:underline dark:text-white">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-500">
        {article.dek}
      </p>
      <p className="mt-4 font-mono text-xs italic text-neutral-400">
        &ldquo;{article.coreInsight}&rdquo;
      </p>
    </Link>
  );
}
