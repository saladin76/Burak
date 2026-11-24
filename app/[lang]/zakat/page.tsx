import PageHero from "@/components/PageHero";
import RegionGive from "@/components/RegionGive";
import ZakatCalculator from "@/components/ZakatCalculator";
import Faq from "@/components/Faq";
import { getF } from "@/lib/dict/features";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.zakat.title);

export default async function ZakatPage({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  const F = getF(lang);
  const Z = F.prog.z;
  return (
    <>
      <PageHero lang={lang} title={Z.title} kicker={Z.kicker}>
        {Z.text}
        <p className="mt-5 inline-flex flex-wrap items-baseline gap-2 rounded-lg border-s-4 border-accent-500 bg-white/80 px-4 py-3 font-naskh text-xl text-teal-900">
          {Z.ayah} <span className="font-sans text-xs text-muted">{Z.ayahSrc}</span>
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 pt-12">
        <RegionGive mode="zakat" />
      </section>

      <section id="calculator" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-20">
        <div className="mb-8 max-w-2xl">
          <p className="brand-tag mb-3">{t.zakat.title}</p>
          <h2 className="font-kufi text-3xl font-extrabold text-teal-900">{Z.calcT}</h2>
          <p className="mt-2 text-lg leading-8 text-muted">{Z.calcD}</p>
        </div>
        <ZakatCalculator />
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-20">
        <div className="rounded-2xl bg-gradient-to-b from-white to-[#dff1f7] p-8 md:p-10">
          <h2 className="text-center font-kufi text-3xl font-extrabold text-teal-900">{Z.asnafT}</h2>
          <p className="mt-2 text-center text-sm text-muted">{Z.asnafSrc}</p>
          <ol className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {Z.asnaf.map((a, i) => (
              <li key={a} className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4">
                <span className="num grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent-500 text-sm font-bold text-white">{i + 1}</span>
                <span className="font-semibold text-teal-900">{a}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq title={F.lamps.faqT} items={Z.faq} />
    </>
  );
}
