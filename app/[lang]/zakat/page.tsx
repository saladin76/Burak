import PageHero from "@/components/PageHero";
import ZakatCalculator from "@/components/ZakatCalculator";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.zakat.title);

export default async function ZakatPage({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  return (
    <>
      <PageHero lang={lang} title={t.zakat.title} kicker={t.zakat.kicker}>{t.zakat.text}</PageHero>
      <section className="mx-auto max-w-7xl px-5 pt-14">
        <ZakatCalculator />
      </section>
    </>
  );
}
