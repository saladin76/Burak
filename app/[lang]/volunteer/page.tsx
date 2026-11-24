import PageHero from "@/components/PageHero";
import VolunteerForm from "@/components/VolunteerForm";
import { GivingWaves } from "@/components/Motifs";
import { IconHeart, IconGlobe, IconBank } from "@/components/Icons";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.volunteer.title);

export default async function Volunteer({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  const V = t.volunteer;
  const icons = [<IconHeart key="a" size={30} />, <IconGlobe key="b" size={30} />, <IconBank key="c" size={30} />];
  return (
    <>
      <PageHero lang={lang} title={V.title} kicker={V.kicker}>{V.text}</PageHero>
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pt-14 md:grid-cols-3">
        {V.ways.map((w, i) => (
          <div key={w.t} className={`arch relative overflow-hidden border px-6 pb-8 pt-14 text-center ${i === 1 ? "border-teal-900 bg-teal-900 text-white" : "border-stone-200 bg-white"}`}>
            {i === 1 && <GivingWaves className="pointer-events-none absolute -bottom-4 left-1/2 h-48 -translate-x-1/2" opacity={0.2} palette={["#c5e5f1", "#8acbda", "#64b6d0"]} />}
            <span className={`relative mx-auto grid h-16 w-16 place-items-center rounded-full ${i === 1 ? "bg-white/10 text-gold-300" : "bg-teal-100 text-teal-700"}`}>{icons[i]}</span>
            <h2 className="relative mt-4 font-kufi text-2xl font-bold">{w.t}</h2>
            <p className={`relative mt-3 leading-8 ${i === 1 ? "text-teal-100" : "text-muted"}`}>{w.d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-4xl px-5 pt-16">
        <VolunteerForm />
      </section>
    </>
  );
}
