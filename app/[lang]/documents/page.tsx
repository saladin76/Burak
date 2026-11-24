import PageHero from "@/components/PageHero";
import DocsView from "@/components/DocsView";
import { getF } from "@/lib/dict/features";
import { pageLang, type LangParams } from "@/lib/page";
import { isLang } from "@/lib/i18n";

export async function generateMetadata({ params }: LangParams) {
  const { lang } = await params;
  return { title: getF(isLang(lang) ? lang : "ar").docs.title, robots: { index: false } };
}

export default async function Documents({ params }: LangParams) {
  const { lang } = await pageLang(params);
  const D = getF(lang).docs;
  return (
    <>
      <PageHero lang={lang} title={D.title} kicker={D.kicker} />
      <section className="mx-auto max-w-6xl px-5 pt-10"><DocsView /></section>
    </>
  );
}
