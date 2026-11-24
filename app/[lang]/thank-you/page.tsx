import PageHero from "@/components/PageHero";
import ThankYou from "@/components/ThankYou";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.thanks.title);

export default async function ThankYouPage({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  return (
    <>
      <PageHero lang={lang} title={t.thanks.kicker} />
      <section className="px-5 pt-12"><ThankYou /></section>
    </>
  );
}
