import PageHero from "@/components/PageHero";
import VolunteerForm from "@/components/VolunteerForm";
import { Khatam } from "@/components/Motifs";
import { getF } from "@/lib/dict/features";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.volunteer.title);

export default async function Volunteer({ params }: LangParams) {
  const { lang } = await pageLang(params);
  const F = getF(lang).vol;
  return (
    <>
      <PageHero lang={lang} title={F.heroT}>{F.heroD}</PageHero>
      <section id="form" className="mx-auto max-w-5xl scroll-mt-28 px-5 pt-14">
        <ul className="mb-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[15px] font-semibold text-teal-900">
          {F.perks.map((p) => <li key={p} className="flex items-center gap-2"><Khatam className="h-5 w-5" color="#3aafc9" /> {p}</li>)}
        </ul>
        <VolunteerForm />
      </section>
    </>
  );
}
