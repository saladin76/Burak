import ImmersiveHero from "@/components/ImmersiveHero";
import RegionGive from "@/components/RegionGive";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { Marquee, MonthsOrbit } from "@/components/Fx";
import { KindIcon } from "@/components/Icons";
import { projects } from "@/lib/data";
import { getF } from "@/lib/dict/features";
import { getDict, isLang, tx } from "@/lib/i18n";
import { pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = async ({ params }: LangParams) => {
  const { lang } = await params;
  return { title: getF(isLang(lang) ? lang : "ar").prog.m.title };
};

export default async function MonthlyPage({ params }: LangParams) {
  const { lang } = await pageLang(params);
  const F = getF(lang);
  const M = F.prog.m;
  const t = getDict(lang);
  const monthly = projects.filter((p) => p.monthly);
  return (
    <>
      <ImmersiveHero
        lang={lang}
        kicker={M.kicker}
        title={M.title}
        text={M.text}
        quote={M.hadith}
        quoteSrc={M.hadithSrc}
        cta={{ href: "#give", label: M.start }}
        chips={[...M.chips]}
        crumbs={[{ href: "/projects", label: t.projectsPage.title }]}
        visual={<MonthsOrbit label={M.orbitL} sub={M.orbitS} />}
      />

      <div className="relative z-10 -mt-px bg-accent-500 py-4 text-white">
        <Marquee
          className="font-kufi text-lg font-bold"
          items={monthly.map((p) => (
            <span key={p.slug} className="flex items-center gap-2"><KindIcon kind={p.kind} size={20} /> {tx(p.title, lang)}</span>
          ))}
        />
      </div>

      <section className="mx-auto max-w-7xl px-5 pt-14">
        <RegionGive mode="monthly" />
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-24">
        <Reveal>
          <p className="brand-tag mx-auto mb-4 !flex w-fit">{M.kicker}</p>
          <h2 className="text-center font-kufi text-3xl font-extrabold text-teal-900 md:text-[42px]">{M.whyT}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {M.why.map((w, i) => (
            <Reveal key={w.t} delay={i * 120}>
              <div className="lift group relative h-full overflow-hidden rounded-2xl border border-stone-200 bg-white p-7">
                <span className="num pointer-events-none absolute end-5 -top-3 font-kufi text-[96px] font-extrabold leading-none text-accent-100 transition-colors group-hover:text-accent-300/40">{i + 1}</span>
                <span className="relative grid h-12 w-12 place-items-center rounded-lg bg-accent-500 text-white">
                  <KindIcon kind={(["support", "education", "zakat"] as const)[i]} size={26} />
                </span>
                <h3 className="relative mt-5 font-kufi text-xl font-bold text-teal-900">{w.t}</h3>
                <p className="relative mt-2 leading-8 text-muted">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grain relative mt-24 overflow-hidden bg-accent-700 py-20 text-white">
        <div className="relative mx-auto max-w-7xl px-5">
          <h2 className="text-center font-kufi text-3xl font-extrabold md:text-[42px]">{M.howT}</h2>
          <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
            <svg className="pointer-events-none absolute inset-x-[16%] top-7 hidden h-2 w-[68%] md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden="true">
              <line x1="0" y1="1" x2="100" y2="1" stroke="#3aafc9" strokeWidth="2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            </svg>
            {M.how.map((s, i) => (
              <Reveal key={s.t} delay={i * 150} className="relative text-center">
                <span className="num relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-500 font-kufi text-2xl font-extrabold ring-8 ring-accent-700">{i + 1}</span>
                <h3 className="mt-5 font-kufi text-xl font-bold">{s.t}</h3>
                <p className="mx-auto mt-2 max-w-xs leading-8 text-accent-100/90">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq title={F.lamps.faqT} items={M.faq} />
    </>
  );
}
