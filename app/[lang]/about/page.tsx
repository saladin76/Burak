import Link from "next/link";
import PageHero from "@/components/PageHero";
import VideoCard from "@/components/VideoCard";
import { GivingWaves, Khatam} from "@/components/Motifs";
import { IconArrow } from "@/components/Icons";
import { introVideo, stats } from "@/lib/data";
import { fmt, tx } from "@/lib/i18n";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.about.title);

export default async function About({ params }: LangParams) {
  const { lang, t, h } = await pageLang(params);
  const A = t.about;
  return (
    <>
      <PageHero lang={lang} title={A.title} kicker={t.meta.org}>{A.lead}</PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-14 lg:grid-cols-[1.2fr_1fr]">
        <div className="text-lg leading-9 text-ink/85">
          <p>{A.p1}</p>
          <h2 className="mt-10 font-kufi text-3xl font-bold text-teal-900">{A.startTitle}</h2>
          <p className="mt-4">{A.start}</p>
          <p className="mt-6 font-kufi text-2xl text-accent-600">{t.common.slogan}</p>
        </div>
        <div className="grid content-start gap-4">
          <p className="font-kufi text-xl font-bold text-teal-900">{A.film}</p>
          <VideoCard id={introVideo} title="Burak Derneği Tanıtım Videosu" big />
          <div className="grid grid-cols-3 gap-3">
            {stats.lifetime.map((s) => (
              <div key={s.value} className="rounded-2xl border border-stone-200 bg-white p-4 text-center">
                <p className="num text-xl font-bold text-teal-900" dir="ltr">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{tx(s.label, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-20">
        <div className="relative overflow-hidden rounded-3xl bg-teal-900 p-8 text-white md:p-14">
          <div className="pattern-khatam absolute inset-0 opacity-15" />
          <GivingWaves className="pointer-events-none absolute -bottom-8 end-[-30px] h-72 w-auto" opacity={0.2} rings={7} palette={["#c5e5f1", "#8acbda", "#64b6d0"]} />
          <div className="relative">
            <p className="text-sm font-bold text-accent-300">{A.visionK}</p>
            <p className="mt-4 max-w-4xl font-kufi text-2xl leading-[1.8] md:text-3xl">{A.vision}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-20">
        <h2 className="font-kufi text-3xl font-bold text-teal-900 md:text-4xl">{A.goalsT}</h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {A.goals.map((g, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-6">
              <span className="num grid h-12 w-12 shrink-0 place-items-center rounded-b-md rounded-t-full bg-accent-100 text-xl font-bold text-accent-700">{i + 1}</span>
              <p className="leading-8">{g}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-stone-200 bg-white p-6">
          <p className="flex items-center gap-3 text-lg">
            <Khatam className="h-6 w-6" color="#3aafc9" />
            {A.thisYear.replace("{p}", String(stats.annual[0].value)).replace("{b}", fmt(stats.annual[1].value))}
          </p>
          <Link href={h("/projects")} className="flex h-12 items-center gap-2 rounded-lg bg-accent-500 px-6 font-bold text-white hover:bg-accent-600">
            {A.contribute} <IconArrow size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
