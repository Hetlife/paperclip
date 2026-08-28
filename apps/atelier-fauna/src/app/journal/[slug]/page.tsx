import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { JOURNAL_ARTICLES, getArticleBySlug } from "@/data/journalArticles";
import { BIOMES } from "@/data/faunaData";
import { CustodianDrawer } from "@/components/concierge/CustodianDrawer";

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return { title: article ? `${article.title} — Atelier Fauna` : "Atelier Fauna" };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const biome = BIOMES[article.biomeId];

  return (
    <main className="flex min-h-screen flex-col gap-12 pb-24">
      <Navbar />

      <article className="mx-auto w-full max-w-2xl px-4 pt-6">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          The Sanctuary Journal
        </Link>

        <p
          className="mt-8 text-xs font-medium uppercase tracking-[0.15em]"
          style={{ color: biome.themeColor.accent }}
        >
          {biome.name} · {article.readTimeMinutes} min read
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.03em] text-neutral-900 md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-600">
          {article.dek}
        </p>

        <div className="prose prose-neutral mt-10 max-w-none prose-p:leading-relaxed">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <blockquote className="mt-10 border-l-2 border-neutral-300 pl-5 font-mono text-sm italic text-neutral-500">
          {article.coreInsight}
        </blockquote>
      </article>

      <CustodianDrawer />
    </main>
  );
}
