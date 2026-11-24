import PageHero from "@/components/PageHero";
import CartView from "@/components/CartView";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.cart.title);

export default async function CartPage({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  return (
    <>
      <PageHero lang={lang} title={t.cart.title} kicker={t.cart.kicker} />
      <section className="mx-auto max-w-7xl px-5 pt-12"><CartView /></section>
    </>
  );
}
