import ImmersiveHero from "@/components/ImmersiveHero";
import RegionGive from "@/components/RegionGive";
import ZakatCalculator from "@/components/ZakatCalculator";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { AsnafStar, Marquee, ZakatGauge } from "@/components/Fx";
import { GivingRings } from "@/components/Motifs";
import { getF } from "@/lib/dict/features";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.zakat.title);

export default async function ZakatPage({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  const F = getF(lang);
  const Z = F.prog.z;
  return (
    <>
      <ImmersiveHero
        lang={lang}
        kicker={Z.kicker}
        title={Z.title}
        text={Z.text}
        quote={Z.ayah}
        quoteSrc={Z.ayahSrc}
        cta={{ href: "#give", label: F.prog.giveOnce }}
        cta2={{ href: "#calculator", label: Z.calcCta }}
        visual={<ZakatGauge label={Z.gaugeL} sub={Z.gaugeS} />}
      />

      <div className="relative z-10 -mt-px bg-accent-500 py-4 text-white">
        <Marquee className="font-kufi text-lg font-bold" items={Z.asnaf.map((a) => <span key={a}>{a}</span>)} />
      </div>

      <section className="mx-auto max-w-7xl px-5 pt-14">
        <RegionGive mode="zakat" />
      </section>


      <section className="relative mt-24 overflow-hidden bg-gradient-to-b from-white to-[#dff1f7] py-20">
        <GivingRings live className="pointer-events-none absolute -start-40 -top-40 w-[620px]" rings={7} opacity={0.25} palette={["#8acbda", "#aeddec", "#64b6d0", "#c5e5f1", "#8acbda", "#aeddec", "#64b6d0"]} />
        <div className="relative mx-auto max-w-7xl px-5">
          <Reveal>
            <h2 className="text-center font-kufi text-3xl font-extrabold text-teal-900 md:text-[42px]">{Z.asnafT}</h2>
            <p className="mt-2 text-center text-sm text-muted">{Z.asnafSrc}</p>
          </Reveal>
          <div className="mt-10">
            <AsnafStar items={Z.asnaf} center={Z.asnafCenter} />
          </div>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-24">
        <Reveal className="mb-8 max-w-2xl">
          <p className="brand-tag mb-3">{t.zakat.title}</p>
          <h2 className="font-kufi text-3xl font-extrabold text-teal-900 md:text-[42px]">{Z.calcT}</h2>
          <p className="mt-2 text-lg leading-8 text-muted">{Z.calcD}</p>
        </Reveal>
        <ZakatCalculator />
      </section>

      <Faq title={F.lamps.faqT} items={Z.faq} />
    </>
  );
}
