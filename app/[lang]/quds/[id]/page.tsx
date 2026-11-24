import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AqsaMap from "@/components/AqsaMap";
import ProjectCard from "@/components/ProjectCard";
import { Khatam } from "@/components/Motifs";
import { getLandmark, getProject, landmarks, projects } from "@/lib/data";
import { isLang, locales, tx } from "@/lib/i18n";
import { pageLang } from "@/lib/page";

type P = { params: Promise<{ lang: string; id: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => landmarks.map((l) => ({ lang, id: l.id })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, id } = await params;
  const l = getLandmark(id);
  return l ? { title: tx(l.title, isLang(lang) ? lang : "ar") } : {};
}

export default async function LandmarkPage({ params }: P) {
  const { id } = await params;
  const { lang, t, h } = await pageLang(params);
  const lm = getLandmark(id);
  if (!lm) notFound();
  const main = lm.project ? getProject(lm.project) : undefined;
  const rel = [main, ...projects.filter((p) => p.region === "quds" && p.slug !== main?.slug)].filter(Boolean).slice(0, 3) as NonNullable<typeof main>[];

  return (
    <>
      <PageHero lang={lang} title={tx(lm.title, lang)} kicker={t.quds.landmarks} crumbs={[{ href: "/quds", label: t.quds.title }]}>
        {tx(lm.text, lang)}
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 pt-14">
        <AqsaMap initial={lm.id} />
      </section>
      <section className="mx-auto max-w-7xl px-5 pt-16">
        <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900">{t.quds.related}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rel.map((p) => <ProjectCard key={p.slug} p={p} lang={lang} />)}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pt-16">
        <h2 className="mb-6 font-kufi text-2xl font-bold text-teal-900">{t.quds.others}</h2>
        <div className="flex flex-wrap gap-2">
          {landmarks.filter((x) => x.id !== lm.id).map((x) => (
            <Link key={x.id} href={h(`/quds/${x.id}`)} className="flex h-11 items-center gap-2 rounded-full border border-stone-300 bg-white px-4 font-semibold text-teal-900 hover:border-teal-500">
              <Khatam className="h-4 w-4" color="#3aafc9" /> {tx(x.title, lang)}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
