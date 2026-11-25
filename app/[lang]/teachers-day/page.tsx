import TeacherGift from "@/components/TeacherGift";
import { GivingRings, Khatam} from "@/components/Motifs";
import { KindIcon } from "@/components/Icons";
import { getF } from "@/lib/dict/features";
import { isLang } from "@/lib/i18n";
import { pageLang, type LangParams } from "@/lib/page";

export async function generateMetadata({ params }: LangParams) {
  const { lang } = await params;
  const T = getF(isLang(lang) ? lang : "ar").teach;
  return { title: T.navLabel, description: T.text };
}

export default async function TeachersDay({ params }: LangParams) {
  const { lang } = await pageLang(params);
  const T = getF(lang).teach;
  return (
    <>
      <section data-hero className="relative overflow-hidden bg-teal-500 text-white">
        <GivingRings className="pointer-events-none absolute -end-[12%] top-1/2 w-[680px] -translate-y-1/2" opacity={0.45} palette={["#52a6c0", "#3aafc9", "#64b6d0", "#8acbda", "#aeddec", "#c5e5f1", "#ffffff"]} />
        <div className="pattern-khatam absolute inset-0 opacity-10" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <p className="rise inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
              <Khatam className="h-4 w-4" color="#8acbda" /> {T.badge}
            </p>
            <h1 className="rise-2 mt-6 text-balance font-kufi text-5xl font-bold leading-[1.15] md:text-7xl">{T.title}</h1>
            <p className="rise-2 mt-3 font-kufi text-2xl text-accent-300 md:text-3xl">{T.sub}</p>
            <p className="rise-3 mt-6 max-w-2xl text-lg leading-9 text-white">{T.text}</p>
            <a href="#gift" className="rise-3 mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-accent-500 px-8 py-3 text-center leading-snug text-lg font-bold text-white hover:bg-accent-600">{T.cta}</a>
          </div>
          <figure className="rise-3 relative rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur">
            <span className="absolute -top-6 start-8 grid h-12 w-12 place-items-center rounded-full bg-accent-500 text-white"><KindIcon kind="education" size={26} /></span>
            <blockquote className="font-naskh text-2xl leading-[2] md:text-[26px]">{T.hadith}</blockquote>
            <figcaption className="mt-3 text-sm text-white">{T.hadithSrc}</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-14">
        <ol className="grid gap-4 md:grid-cols-3">
          {T.steps.map((s, i) => (
            <li key={s.t} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5">
              <span className="num grid h-12 w-12 shrink-0 place-items-center rounded-b-md rounded-t-full bg-teal-500 text-xl font-bold text-white">{i + 1}</span>
              <span><b className="block font-kufi text-lg text-teal-900">{s.t}</b><span className="text-muted">{s.d}</span></span>
            </li>
          ))}
        </ol>
      </section>

      <section id="gift" className="mx-auto max-w-7xl scroll-mt-28 px-5">
        <TeacherGift />
      </section>
    </>
  );
}
