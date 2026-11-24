import PageHero from "@/components/PageHero";
import RegionGive from "@/components/RegionGive";
import Faq from "@/components/Faq";
import { IconRepeat } from "@/components/Icons";
import { getF } from "@/lib/dict/features";
import { getDict, isLang } from "@/lib/i18n";
import { pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = async ({ params }: LangParams) => {
  const { lang } = await params;
  return { title: getF(isLang(lang) ? lang : "ar").prog.m.title };
};

export default async function MonthlyPage({ params }: LangParams) {
  const { lang } = await pageLang(params);
  const M = getF(lang).prog.m;
  const t = getDict(lang);
  return (
    <>
      <PageHero lang={lang} title={M.title} kicker={M.kicker} crumbs={[{ href: "/projects", label: t.projectsPage.title }]}>
        {M.text}
        <p className="mt-5 inline-flex flex-wrap items-baseline gap-2 rounded-lg border-s-4 border-accent-500 bg-white/80 px-4 py-3 font-naskh text-xl text-teal-900">
          {M.hadith} <span className="font-sans text-xs text-muted">{M.hadithSrc}</span>
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 pt-12">
        <RegionGive mode="monthly" />
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-20">
        <h2 className="text-center font-kufi text-3xl font-extrabold text-teal-900">{M.whyT}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {M.why.map((w, i) => (
            <div key={w.t} className="rounded-2xl border border-stone-200 bg-white p-6">
              <span className="num grid h-11 w-11 place-items-center rounded-lg bg-accent-100 font-kufi text-lg font-extrabold text-accent-600">0{i + 1}</span>
              <h3 className="mt-4 font-kufi text-xl font-bold text-teal-900">{w.t}</h3>
              <p className="mt-2 leading-8 text-muted">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 bg-accent-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="flex items-center justify-center gap-3 text-center font-kufi text-3xl font-extrabold"><IconRepeat size={28} /> {M.howT}</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {M.how.map((s, i) => (
              <li key={s.t} className="relative rounded-2xl border border-white/15 bg-white/5 p-6">
                <span className="num absolute -top-4 start-6 grid h-9 w-9 place-items-center rounded-md bg-accent-500 font-bold">{i + 1}</span>
                <h3 className="mt-2 font-kufi text-xl font-bold">{s.t}</h3>
                <p className="mt-2 leading-8 text-accent-100/90">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq title={getF(lang).lamps.faqT} items={M.faq} />
    </>
  );
}
