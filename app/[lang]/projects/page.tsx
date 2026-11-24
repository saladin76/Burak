import Link from "next/link";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { Progress, ProjectCover } from "@/components/ProjectCard";
import { IconArrow } from "@/components/Icons";
import { Khatam } from "@/components/Motifs";
import { projectPath, projects } from "@/lib/data";
import { getF } from "@/lib/dict/features";
import { tx } from "@/lib/i18n";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.projectsPage.title);

export default async function ProjectsPage({ params }: LangParams) {
  const { lang, t, h } = await pageLang(params);
  const C = getF(lang).cards;
  const spot = projects.filter((p) => p.featured || p.urgent).slice(0, 6);
  return (
    <>
      <PageHero lang={lang} title={t.projectsPage.title} kicker={t.projectsPage.kicker}>{t.projectsPage.text}</PageHero>

      {/* مشاريع في الواجهة — شريط أفقي */}
      <section className="mx-auto max-w-7xl px-5 pt-12">
        <h2 className="mb-5 flex items-center gap-2 font-kufi text-2xl font-bold text-teal-900"><Khatam className="h-6 w-6" color="#c99a2e" /> {C.spotlight}</h2>
        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:thin]">
          {spot.map((p) => (
            <Link key={p.slug} href={h(projectPath(p.slug))} className="group relative w-[85%] shrink-0 snap-start overflow-hidden rounded-[28px] bg-night text-white sm:w-[480px]">
              <ProjectCover p={p} lang={lang} className="!h-72" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/85 to-transparent p-6 pt-20">
                <h3 className="font-kufi text-2xl font-bold">{tx(p.title, lang)}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-teal-100">{tx(p.summary, lang)}</p>
                {p.raised != null && <div className="mt-3 [&_*]:!text-white [&_.bg-stone-200]:!bg-white/20"><Progress p={p} lang={lang} /></div>}
                <span className="mt-2 inline-flex items-center gap-1.5 font-bold text-gold-300">{t.common.donateNow} <IconArrow size={18} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-10">
        <Suspense>
          <ProjectsExplorer />
        </Suspense>
      </section>
    </>
  );
}
