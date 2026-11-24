import Link from "next/link";
import LampsBuilder from "@/components/LampsBuilder";
import { GivingRings, Khatam, OrnamentDivider } from "@/components/Motifs";
import { IconArrow, KindIcon } from "@/components/Icons";
import { getF } from "@/lib/dict/features";
import { isLang } from "@/lib/i18n";
import { pageLang, type LangParams } from "@/lib/page";

export async function generateMetadata({ params }: LangParams) {
  const { lang } = await params;
  const L = getF(isLang(lang) ? lang : "ar").lamps;
  return { title: L.title, description: L.text };
}

const drops = [60, 120, 80, 170, 100, 210, 130, 230, 140, 200, 110, 180, 90, 140, 70];

export default async function LampsPage({ params }: LangParams) {
  const { lang, t, h } = await pageLang(params);
  const L = getF(lang).lamps;
  const icons = ["aqsa", "rebuild", "water"] as const;
  return (
    <>
      <section data-hero className="relative overflow-hidden bg-night text-white">
        <div className="pattern-khatam absolute inset-0 opacity-[.07]" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(50% 55% at 50% 30%, rgba(235,205,122,.25), transparent 70%)" }} />
        <GivingRings className="pointer-events-none absolute -bottom-[60%] left-1/2 w-[1100px] -translate-x-1/2" opacity={0.22} palette={["#3aafc9", "#64b6d0", "#8acbda", "#3aafc9", "#64b6d0", "#8acbda", "#dff1f7"]} />
        {/* قناديل معلّقة */}
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto flex max-w-7xl justify-between px-5" aria-hidden="true">
          {drops.map((d, i) => (
            <span key={i} className={`flex flex-col items-center ${i % 3 === 1 ? "hidden md:flex" : "flex"}`}>
              <span className="w-px bg-brass/50" style={{ height: d }} />
              <span className={`twinkle h-12 w-8 rounded-b-full rounded-t-lg border border-brass bg-flame shadow-[0_0_30px_rgba(235,205,122,.9)]`} style={{ animationDelay: `${i * 0.35}s` }} />
            </span>
          ))}
        </div>
        <div className="relative mx-auto max-w-4xl px-5 pb-24 pt-72 text-center">
          <p className="rise inline-flex items-center gap-2 rounded-full border border-accent-300/40 bg-white/5 px-4 py-2 text-sm font-semibold text-accent-300">
            <Khatam className="h-4 w-4" color="#8acbda" /> {L.kicker}
          </p>
          <h1 className="rise-2 mt-6 font-kufi text-6xl font-bold text-accent-300 md:text-8xl">{L.title}</h1>
          <p className="rise-2 mt-6 font-naskh text-2xl leading-[1.9] text-teal-50 md:text-3xl">{L.hadith}</p>
          <p className="rise-3 mx-auto mt-6 max-w-2xl text-lg leading-9 text-teal-100/90">{L.text}</p>
          <a href="#light" className="rise-3 mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-accent-500 px-8 text-lg font-bold text-white shadow-[0_0_50px_-6px_rgba(0,125,165,.9)] hover:bg-accent-600">{L.cta} <IconArrow size={20} /></a>
        </div>
        <div className="crenellation text-stone-50" />
      </section>

      <section id="light" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-16">
        <LampsBuilder />
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-20">
        <h2 className="text-center font-kufi text-3xl font-bold text-teal-900 md:text-4xl">{L.whereT}</h2>
        <OrnamentDivider className="mx-auto my-6 h-5 w-56" />
        <div className="grid gap-5 md:grid-cols-3">
          {L.where.map((w, i) => (
            <div key={w.t} className="arch border border-stone-200 bg-white px-6 pb-8 pt-12 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-100 text-accent-700"><KindIcon kind={icons[i]} size={30} /></span>
              <h3 className="mt-4 font-kufi text-xl font-bold text-teal-900">{w.t}</h3>
              <p className="mt-2 leading-8 text-muted">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pt-20">
        <h2 className="mb-6 font-kufi text-3xl font-bold text-teal-900">{L.faqT}</h2>
        <div className="grid gap-3">
          {L.faq.map((x) => (
            <details key={x.q} className="rounded-2xl border border-stone-200 bg-white p-5 open:border-teal-500">
              <summary className="cursor-pointer list-none font-bold text-teal-900">{x.q}</summary>
              <p className="mt-3 leading-8 text-muted">{x.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={h("/projects?region=quds")} className="inline-flex items-center gap-2 font-bold text-teal-700 hover:underline">{t.hero.cta2} <IconArrow size={18} /></Link>
        </div>
      </section>
    </>
  );
}
