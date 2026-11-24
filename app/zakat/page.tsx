import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ZakatCalculator from "@/components/ZakatCalculator";

export const metadata: Metadata = { title: "حاسبة الزكاة", description: "احسب زكاة مالك وذهبك وفضتك وأخرجها لأهل القدس وغزة." };

export default function ZakatPage() {
  return (
    <>
      <PageHero title="حاسبة الزكاة" kicker="﴿وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ﴾">
        احسب زكاة مالك في دقيقة، ثم أوصلها إلى مستحقيها من الأسر المقدسية وأهل غزة.
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 pt-14">
        <ZakatCalculator />
      </section>
    </>
  );
}
