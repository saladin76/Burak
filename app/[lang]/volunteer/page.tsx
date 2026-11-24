import PageHero from "@/components/PageHero";
import VolunteerForm from "@/components/VolunteerForm";
import { GivingRings, Khatam } from "@/components/Motifs";
import { IconBank, IconGlobe, IconHeart } from "@/components/Icons";
import { getF } from "@/lib/dict/features";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.volunteer.title);

export default async function Volunteer({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  const V = t.volunteer;
  const F = getF(lang).vol;
  const icons = [<IconHeart key="a" size={30} />, <IconGlobe key="b" size={30} />, <IconBank key="c" size={30} />];
  return (
    <>
      <PageHero lang={lang} title={F.heroT} kicker={V.kicker}>{F.heroD}</PageHero>
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pt-14 md:grid-cols-3">
        {V.ways.map((w, i) => (
          <div key={w.t} className={`arch relative overflow-hidden border px-6 pb-8 pt-14 text-center ${i === 1 ? "border-teal-500 bg-teal-500 text-white" : "border-stone-200 bg-white"}`}>
            {i === 1 && <GivingRings className="pointer-events-none absolute -bottom-24 left-1/2 w-80 -translate-x-1/2" opacity={0.3} palette={["#8acbda", "#aeddec", "#c5e5f1", "#ffffff"]} />}
            <span className={`relative mx-auto grid h-16 w-16 place-items-center rounded-full ${i === 1 ? "bg-white/15 text-white" : "bg-teal-100 text-teal-700"}`}>{icons[i]}</span>
            <h2 className="relative mt-4 font-kufi text-2xl font-bold">{w.t}</h2>
            <p className={`relative mt-3 leading-8 ${i === 1 ? "text-white" : "text-muted"}`}>{w.d}</p>
          </div>
        ))}
      </section>
      <section id="form" className="mx-auto max-w-5xl scroll-mt-28 px-5 pt-14">
        <ul className="mb-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[15px] font-semibold text-teal-900">
          {F.perks.map((p) => <li key={p} className="flex items-center gap-2"><Khatam className="h-5 w-5" color="#3aafc9" /> {p}</li>)}
        </ul>
        <VolunteerForm />
      </section>
    </>
  );
}
