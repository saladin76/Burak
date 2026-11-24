import Link from "next/link";
import PageHero from "@/components/PageHero";
import SmartImg from "@/components/SmartImg";
import { IconArrow } from "@/components/Icons";
import { news } from "@/lib/data";
import { tx } from "@/lib/i18n";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.news.title);

export default async function NewsPage({ params }: LangParams) {
  const { lang, t, h } = await pageLang(params);
  const [first, ...rest] = news;
  return (
    <>
      <PageHero lang={lang} title={t.news.title} kicker={t.news.kicker}>{t.news.text}</PageHero>
      <section className="mx-auto max-w-7xl px-5 pt-14">
        <Link href={h(`/news/${first.slug}`)} className="group grid overflow-hidden rounded-2xl border border-stone-200 bg-white lg:grid-cols-2">
          <div className="relative min-h-72 overflow-hidden bg-night-2">
            <div className="pattern-khatam absolute inset-0 opacity-40" />
            <SmartImg src={first.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="w-fit rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-900">{tx(first.tag, lang)}</span>
            <h2 className="mt-4 font-kufi text-3xl font-bold leading-snug text-teal-900">{tx(first.title, lang)}</h2>
            <p className="mt-4 line-clamp-3 text-lg leading-8 text-muted">{tx(first.body, lang)}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-bold text-accent-600">{t.common.readMore} <IconArrow size={18} /></span>
          </div>
        </Link>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((n) => (
            <Link key={n.slug} href={h(`/news/${n.slug}`)} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <div className="relative h-52 overflow-hidden bg-teal-700">
                <div className="pattern-khatam absolute inset-0 opacity-40" />
                <SmartImg src={n.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-900">{tx(n.tag, lang)}</span>
              </div>
              <div className="p-5">
                <h3 className="font-kufi text-xl font-bold leading-snug text-teal-900">{tx(n.title, lang)}</h3>
                <p className="mt-2 line-clamp-2 leading-7 text-muted">{tx(n.body, lang)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
