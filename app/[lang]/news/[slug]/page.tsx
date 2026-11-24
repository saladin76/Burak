import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SmartImg from "@/components/SmartImg";
import ProjectCard from "@/components/ProjectCard";
import { getNews, getProject, news } from "@/lib/data";
import { isLang, locales, tx } from "@/lib/i18n";
import { pageLang } from "@/lib/page";

type P = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => news.map((n) => ({ lang, slug: n.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const n = getNews(slug);
  const l = isLang(lang) ? lang : "ar";
  return n ? { title: tx(n.title, l), openGraph: { images: [n.image] } } : {};
}

export default async function NewsDetail({ params }: P) {
  const { slug } = await params;
  const { lang, t, h } = await pageLang(params);
  const n = getNews(slug);
  if (!n) notFound();
  const proj = n.project ? getProject(n.project) : undefined;
  return (
    <>
      <PageHero lang={lang} title={tx(n.title, lang)} kicker={tx(n.tag, lang)} crumbs={[{ href: "/news", label: t.news.title }]} image={n.image} />
      <article className="mx-auto grid max-w-7xl gap-10 px-5 pt-12 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-night-2">
            <div className="pattern-khatam absolute inset-0 opacity-40" />
            <SmartImg src={n.image} alt={tx(n.title, lang)} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="mt-8 space-y-5 text-lg leading-9 text-ink/85">
            {tx(n.body, lang).split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
          </div>
        <hr className="my-8 border-stone-200" />
        </div>
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          {proj && (
            <div>
              <p className="mb-3 font-kufi text-xl font-bold text-teal-900">{t.news.support}</p>
              <ProjectCard p={proj} lang={lang} />
            </div>
          )}
          <div>
            <p className="mb-3 font-kufi text-xl font-bold text-teal-900">{t.news.related}</p>
            <ul className="space-y-3">
              {news.filter((x) => x.slug !== n.slug).map((x) => (
                <li key={x.slug}>
                  <Link href={h(`/news/${x.slug}`)} className="block rounded-2xl border border-stone-200 bg-white p-4 font-semibold leading-7 text-teal-900 hover:border-teal-500">
                    {tx(x.title, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </article>
    </>
  );
}
