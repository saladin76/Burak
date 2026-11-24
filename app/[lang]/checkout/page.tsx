import PageHero from "@/components/PageHero";
import Checkout from "@/components/Checkout";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.checkout.title);

export default async function CheckoutPage({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  return (
    <>
      <PageHero lang={lang} title={t.checkout.title} kicker={t.checkout.kicker} crumbs={[{ href: "/cart", label: t.cart.title }]} />
      <section className="mx-auto max-w-7xl px-5 pt-12"><Checkout /></section>
    </>
  );
}
