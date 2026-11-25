import Link from "next/link";
import { Suspense } from "react";
import QuickDonate from "@/components/QuickDonate";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { GivingRings, Khatam } from "@/components/Motifs";
import { IconArrow, IconRepeat, KindIcon } from "@/components/Icons";
import { ProjectCover } from "@/components/ProjectCard";
import JerusalemClock from "@/components/JerusalemClock";
import Lamps from "@/components/Lamps";
import StoriesBar from "@/components/StoriesBar";
import ImpactStats from "@/components/ImpactStats";
import Reveal from "@/components/Reveal";
import VideoCard from "@/components/VideoCard";
import SmartImg from "@/components/SmartImg";
import { Marquee } from "@/components/Fx";
import { news, projectPath, projects, videos } from "@/lib/data";
import { getDict, isLang, lhref, tx, type Lang } from "@/lib/i18n";
import { notFound } from "next/navigation";


function SectionHead({ kicker, title, children, action }: { kicker: string; title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p className="brand-tag mb-4">
          <Khatam className="h-4 w-4" color="#ffffff" /> {kicker}
        </p>
        <h2 className="text-balance font-kufi text-3xl font-extrabold leading-tight text-teal-900 md:text-[42px]">{title}</h2>
        {children && <p className="mt-4 text-lg leading-8 text-muted">{children}</p>}
      </div>
      {action}
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  if (!isLang(l)) notFound();
  const lang: Lang = l;
  const t = getDict(lang);
  const H = t.home;
  const h = (p: string) => lhref(lang, p);
  const urgent = projects.filter((p) => p.urgent).slice(0, 2);
  const btnOutline = "flex h-12 items-center gap-2 rounded-lg border-2 border-accent-700 px-6 font-bold text-teal-900 hover:bg-teal-50";

  return (
    <>

      {/* ========== HERO ========== */}
      <section className="relative isolate overflow-hidden bg-accent-700 text-white">
        {/* صورة جوية للمسجد الأقصى المبارك والبلدة القديمة */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/brand/hero-aqsa-sm.jpg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/hero-aqsa.jpg" alt={t.hero.domeAlt} className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_55%]" fetchPriority="high" />
        </picture>
        <div className="absolute inset-0 -z-10 from-accent-700/95 via-accent-700/70 to-accent-700/10 ltr:bg-gradient-to-r rtl:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-accent-700/70 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 pt-14 lg:pt-24">
          <div className="max-w-2xl pb-24 lg:pb-44">
            <p className="rise brand-tag mb-6 !bg-white/15 ring-1 ring-white/25 backdrop-blur">
              <Khatam className="h-4 w-4" color="#ffffff" /> {t.hero.since}
            </p>
            <h1 className="rise-2 font-kufi text-[40px] font-extrabold leading-[1.35] md:text-[56px] xl:text-[64px]">
              <span className="block drop-shadow-[0_2px_12px_rgba(0,0,0,.35)]">{t.hero.title1}</span>
              <span className="brand-label mt-2 inline-block sm:whitespace-nowrap">{t.hero.title2}</span>
            </h1>
            <p className="rise-3 mt-6 max-w-xl text-lg leading-9 text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,.35)] md:text-xl">{t.hero.text}</p>
            <div className="rise-3 mt-9 flex flex-wrap gap-3">
              <Link href="#donate" className="btn-shine flex h-14 items-center gap-2 rounded-lg bg-accent-500 px-8 text-lg font-bold text-white shadow-[0_14px_30px_-14px_rgba(0,0,0,.6)] hover:bg-accent-600">
                {t.common.donateNow} <IconArrow size={20} />
              </Link>
              <Link href={h("/projects?region=quds")} className="flex h-14 items-center gap-2 rounded-lg border-2 border-white/70 px-7 text-lg font-bold text-white backdrop-blur-sm hover:bg-white hover:text-accent-700">
                {t.hero.cta2}
              </Link>
            </div>
            <div className="rise-3 mt-8">
              <JerusalemClock />
            </div>
          </div>
        </div>
      </section>

      {/* ========== الوصول السريع ========== */}
      <StoriesBar lang={lang} />

      {/* ========== تبرع سريع + العاجل ========== */}
      <section className="relative z-10 mx-auto mt-10 max-w-7xl px-5">
        <div className="grid gap-6 lg:grid-cols-[440px_1fr]">
          <QuickDonate />
          <div className="grid content-start gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-kufi text-2xl font-bold text-teal-900">{H.urgentTitle}</h2>
              <Link href={h("/projects")} className="flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-900">
                {t.common.allProjects} <IconArrow size={18} />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {urgent.map((p) => (
                <Link key={p.slug} href={h(projectPath(p.slug))} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white hover:shadow-[0_24px_60px_-30px_rgba(0,61,85,.5)]">
                  <ProjectCover p={p} lang={lang} />
                  <div className="p-5">
                    <h3 className="font-kufi text-xl font-bold text-teal-900">{tx(p.title, lang)}</h3>
                    <p className="mt-2 line-clamp-2 leading-7 text-muted">{tx(p.summary, lang)}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-accent-600 group-hover:gap-2.5">
                      {H.joinCampaign} <IconArrow size={18} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== شريط المشاريع المتحرك ========== */}
      <div className="mt-20 -rotate-1 bg-accent-500 py-4 text-white shadow-[0_20px_40px_-25px_rgba(0,61,85,.6)]">
        <Marquee
          className="font-kufi text-lg font-bold"
          items={projects.map((p) => (
            <Link key={p.slug} href={h(projectPath(p.slug))} className="flex items-center gap-2 hover:text-accent-100"><KindIcon kind={p.kind} size={20} /> {tx(p.title, lang)}</Link>
          ))}
        />
      </div>

      {/* ========== المشاريع ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-24">
        <SectionHead kicker={H.projectsKicker} title={H.projectsTitle} action={<Link href={h("/projects")} className={btnOutline}>{H.viewAll} <IconArrow size={18} /></Link>}>
          {H.projectsText}
        </SectionHead>
        <Suspense>
          <ProjectsExplorer limit={6} />
        </Suspense>
      </section>

      {/* ========== الأثر ========== */}
      <ImpactStats lang={lang} />

      {/* ========== قناديل الأقصى ========== */}
      <div className="border-t border-white/10">
        <Lamps />
      </div>

      {/* ========== المرئيات ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-24">
        <Reveal>
          <SectionHead kicker={H.mediaKicker} title={H.mediaTitle} action={<Link href={h("/media")} className={btnOutline}>{H.mediaAll} <IconArrow size={18} /></Link>}>
            {H.mediaText}
          </SectionHead>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <VideoCard id={videos[0].id} title={videos[0].title} big className="lg:flex lg:flex-col [&>div]:lg:flex-1 [&>div]:lg:aspect-auto" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {videos.slice(4, 6).map((v) => (
              <VideoCard key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== الأخبار ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-24">
        <SectionHead kicker={H.newsKicker} title={H.newsTitle} action={<Link href={h("/news")} className={btnOutline}>{H.newsAll} <IconArrow size={18} /></Link>} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {news.map((n, i) => (
            <article key={n.slug} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <Link href={h(`/news/${n.slug}`)} className="block">
                <div className={`relative h-44 overflow-hidden ${i % 2 ? "bg-teal-700" : "bg-night-2"}`}>
                  <SmartImg src={n.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-900">{tx(n.tag, lang)}</span>
                </div>
                <h3 className="p-5 font-semibold leading-8 text-teal-900 group-hover:text-teal-700">{tx(n.title, lang)}</h3>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ========== كن داعماً ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-24">
        <div className="relative isolate overflow-hidden rounded-2xl bg-accent-700 p-8 text-white md:p-14">
          <GivingRings className="pointer-events-none absolute -end-32 -top-32 -z-10 w-[520px]" rings={7} opacity={0.18} palette={["#3aafc9", "#64b6d0", "#8acbda", "#aeddec", "#3aafc9", "#64b6d0", "#8acbda"]} />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="brand-tag mb-4 !bg-white/15 ring-1 ring-white/20"><IconRepeat size={16} /> {H.ctaKicker}</p>
              <h2 className="text-balance font-kufi text-3xl font-extrabold leading-tight md:text-5xl">{H.ctaTitle}</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-accent-100">{H.ctaText}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href={h("/monthly")} className="btn-shine flex min-h-14 items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-center text-lg font-bold text-accent-700 hover:bg-accent-100">
                {H.ctaMonthly} <IconArrow size={20} />
              </Link>
              <Link href={h("/volunteer")} className="flex min-h-14 items-center justify-center rounded-lg border-2 border-white/50 px-8 py-3 text-center text-lg font-bold text-white hover:border-white hover:bg-white/10">
                {H.ctaVolunteer}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
