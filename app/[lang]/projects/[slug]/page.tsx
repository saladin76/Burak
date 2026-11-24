import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import QuickDonate from "@/components/QuickDonate";
import ProjectCard, { ProjectCover, Progress } from "@/components/ProjectCard";
import { IconBank, IconGift, IconRepeat, IconShield } from "@/components/Icons";
import { getProject, kindLabel, projects, regionLabel } from "@/lib/data";
import { isLang, locales, tx } from "@/lib/i18n";
import { pageLang } from "@/lib/page";

type P = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  const l = isLang(lang) ? lang : "ar";
  return p ? { title: tx(p.title, l), description: tx(p.summary, l), openGraph: { images: p.image ? [p.image] : [] } } : {};
}

export default async function ProjectPage({ params }: P) {
  const { slug } = await params;
  const { lang, t, h } = await pageLang(params);
  const p = getProject(slug);
  if (!p) notFound();
  const P = t.projectsPage;
  const related = projects.filter((x) => x.slug !== p.slug && (x.region === p.region || x.kind === p.kind)).slice(0, 3);

  return (
    <>
      <PageHero lang={lang} title={tx(p.title, lang)} kicker={`${tx(regionLabel[p.region], lang)} · ${tx(kindLabel[p.kind], lang)}`} crumbs={[{ href: "/projects", label: t.nav.projects }]} image={p.image}>
        {tx(p.summary, lang)}
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-12 lg:grid-cols-[1fr_440px]">
        <div>
          <div className="group overflow-hidden rounded-2xl border border-stone-200">
            <ProjectCover p={p} lang={lang} tall />
          </div>
          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
            <Progress p={p} lang={lang} />
            <h2 className="font-kufi text-2xl font-bold text-teal-900">{P.about}</h2>
            <p className="mt-4 text-lg leading-9 text-ink/85">{tx(p.summary, lang)}</p>
        <hr className="my-8 border-stone-200" />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: <IconShield size={24} />, t: P.f1t, d: P.f1d },
                { icon: <IconRepeat size={24} />, t: p.monthly ? P.f2t : P.f2tOnce, d: P.f2d },
                { icon: <IconGift size={24} />, t: P.f3t, d: P.f3d },
              ].map((f) => (
                <div key={f.t} className="rounded-2xl bg-stone-100 p-4">
                  <span className="text-teal-700">{f.icon}</span>
                  <p className="mt-2 font-bold text-teal-900">{f.t}</p>
                  <p className="text-sm text-muted">{f.d}</p>
                </div>
              ))}
            </div>
            <Link href={h("/contact#bank")} className="mt-6 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900">
              <IconBank size={20} /> {P.bankQ}
            </Link>
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Suspense>
            <QuickDonate initial={p} lockProject />
          </Suspense>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pt-20">
          <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900">{P.related}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ProjectCard key={r.slug} p={r} lang={lang} />)}
          </div>
        </section>
      )}
    </>
  );
}
