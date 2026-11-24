import Link from "next/link";
import { Suspense } from "react";
import QuickDonate from "@/components/QuickDonate";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { DomeOfTheRock, GivingRings, GivingWaves, Khatam } from "@/components/Motifs";
import { IconArrow, IconBank, IconRepeat, IconShield } from "@/components/Icons";
import { ProjectCover } from "@/components/ProjectCard";
import StoriesBar from "@/components/StoriesBar";
import JerusalemClock from "@/components/JerusalemClock";
import Lamps from "@/components/Lamps";
import Reveal from "@/components/Reveal";
import VideoCard from "@/components/VideoCard";
import SmartImg from "@/components/SmartImg";
import { news, projectPath, projects, stats, videos } from "@/lib/data";
import { fmt, getDict, isLang, lhref, tx, type Lang } from "@/lib/i18n";
import { notFound } from "next/navigation";


function SectionHead({ kicker, title, children, action }: { kicker: string; title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-accent-600">
          <Khatam className="h-5 w-5" color="#3aafc9" /> {kicker}
        </p>
        <h2 className="text-balance font-kufi text-3xl font-bold leading-tight text-teal-900 md:text-[42px]">{title}</h2>
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
  const btnOutline = "flex h-12 items-center gap-2 rounded-full border border-teal-900/20 px-6 font-bold text-teal-900 hover:bg-teal-50";

  return (
    <>
      <StoriesBar lang={lang} />

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="pattern-khatam absolute inset-0 opacity-[.09]" />
        <GivingRings className="pointer-events-none absolute -bottom-40 -start-40 w-[520px] lg:hidden" rings={7} opacity={0.22} />
        <div className="relative mx-auto grid max-w-7xl items-end gap-8 px-5 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <div className="pb-20 lg:pb-40">
            <p className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-accent-300/40 bg-white/5 px-4 py-2 text-sm font-semibold text-accent-300">
              <Khatam className="h-4 w-4" color="#8acbda" /> {t.hero.since}
            </p>
            <h1 className="rise-2 text-balance font-kufi text-[40px] font-bold leading-[1.25] md:text-[60px]">
              {t.hero.title1}
              <span className="block text-accent-300">{t.hero.title2}</span>
            </h1>
            <p className="rise-3 mt-6 max-w-xl text-lg leading-9 text-teal-100/90 md:text-xl">{t.hero.text}</p>
            <div className="rise-3 mt-9 flex flex-wrap gap-3">
              <Link href="#donate" className="flex h-14 items-center gap-2 rounded-full bg-accent-500 px-8 text-lg font-bold text-white hover:bg-accent-600">
                {t.common.donateNow} <IconArrow size={20} />
              </Link>
              <Link href={h("/projects?region=quds")} className="flex h-14 items-center gap-2 rounded-full border border-white/25 px-7 text-lg font-semibold hover:border-accent-300 hover:text-accent-300">
                {t.hero.cta2}
              </Link>
            </div>
            <div className="rise-3 mt-8">
              <JerusalemClock />
            </div>
          </div>
          <div className="relative mx-auto hidden w-full max-w-[640px] self-end lg:block">
            <GivingRings className="pointer-events-none absolute -bottom-[30%] left-1/2 w-[150%] -translate-x-1/2" rings={8} opacity={0.32} />
            <DomeOfTheRock className="relative block w-full" label={t.hero.domeAlt} />
          </div>
        </div>
      </section>

      {/* ========== تبرع سريع + العاجل ========== */}
      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-5 lg:-mt-28">
        <div className="grid gap-6 lg:grid-cols-[440px_1fr]">
          <QuickDonate />
          <div className="grid gap-6 lg:pt-28">
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
      <section className="relative mt-24 overflow-hidden bg-teal-900 text-white">
        <div className="pattern-khatam absolute inset-0 opacity-[.12]" />
        <GivingWaves className="pointer-events-none absolute -bottom-6 start-[-40px] h-[340px] w-auto" rings={8} opacity={0.18} palette={["#c5e5f1", "#8acbda", "#64b6d0", "#3aafc9"]} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold text-accent-300">{H.impactKicker}</p>
            <h2 className="font-kufi text-3xl font-bold leading-tight md:text-4xl">{H.impactTitle}</h2>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {stats.lifetime.map((s) => (
                <div key={s.value}>
                  <p className="num text-2xl font-bold text-accent-300 md:text-3xl" dir="ltr">{s.value}</p>
                  <p className="mt-1 text-sm text-teal-100">{tx(s.label, lang)}</p>
                </div>
              ))}
            </div>
            <Link href={h("/reports")} className="mt-6 inline-flex items-center gap-1.5 font-bold text-accent-300 hover:underline">
              {t.nav.reports} <IconArrow size={18} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.annual.map((s) => (
              <div key={s.value} className="arch border border-accent-300/30 bg-white/[.04] px-6 pb-8 pt-12 text-center">
                <p className="num text-5xl font-bold text-white md:text-6xl">{fmt(s.value)}</p>
                <p className="mt-3 text-lg text-teal-100">{tx(s.label, lang)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-white/10 px-5 py-5 text-[15px] font-semibold text-teal-100">
          <span className="flex items-center gap-2"><IconShield size={20} /> {H.trust1}</span>
          <span className="flex items-center gap-2"><IconBank size={20} /> {H.trust2}</span>
          <span className="flex items-center gap-2"><Khatam className="h-5 w-5" color="#8acbda" /> {H.trust3}</span>
          <Link href={h("/reports")} className="flex items-center gap-1.5 text-accent-300 hover:underline">{H.howCta} <IconArrow size={16} /></Link>
        </div>
        <div className="crenellation text-stone-50" />
      </section>

      {/* ========== قناديل الأقصى ========== */}
      <div className="mt-24">
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
          <VideoCard id={videos[0].id} title={videos[0].title} big />
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
        <div className="relative overflow-hidden rounded-3xl bg-accent-500 p-8 text-white md:p-14">
          <div className="pattern-khatam-teal absolute inset-0 opacity-70" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-3 flex items-center gap-2 font-bold text-teal-900"><IconRepeat size={20} /> {H.ctaKicker}</p>
              <h2 className="font-kufi text-3xl font-bold leading-tight md:text-5xl">{H.ctaTitle}</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-night/80">{H.ctaText}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href={h("/projects?monthly=1")} className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-teal-900 px-8 text-lg font-bold text-white hover:bg-teal-700">
                {H.ctaMonthly} <IconArrow size={20} />
              </Link>
              <Link href={h("/volunteer")} className="flex h-14 items-center justify-center rounded-2xl border-2 border-night/20 px-8 text-lg font-bold hover:bg-white/30">
                {H.ctaVolunteer}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
