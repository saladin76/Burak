import Link from "next/link";
import PageHero from "@/components/PageHero";
import AqsaMap from "@/components/AqsaMap";
import { DomeOfTheRock, Khatam} from "@/components/Motifs";
import { IconArrow, IconBook, IconPlay, KindIcon } from "@/components/Icons";
import { landmarks, orgContent, qudsLibrary } from "@/lib/data";
import { tx } from "@/lib/i18n";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.quds.title);

export default async function Quds({ params }: LangParams) {
  const { lang, t, h } = await pageLang(params);
  const Q = t.quds;
  return (
    <>
      <PageHero lang={lang} title={Q.title} kicker={Q.kicker}>{Q.text}</PageHero>

      <section id="history" className="mx-auto grid max-w-7xl scroll-mt-28 items-center gap-12 px-5 pt-14 lg:grid-cols-2">
        <div>
          <h2 className="font-kufi text-3xl font-bold text-teal-900 md:text-4xl">{Q.history}</h2>
          <p className="font-naskh text-2xl leading-[2] text-teal-900" lang="ar" dir="rtl">{t.verse}</p>
          {t.verseTr && <p className="mt-3 italic leading-8 text-muted">{t.verseTr}</p>}
          {orgContent.history?.[lang] ? <p className="mt-5 text-lg leading-9 text-ink/85">{orgContent.history[lang]}</p> : <p className="mt-5 text-lg leading-9 text-ink/85">{t.about.p1}</p>}
        </div>
        <div className="overflow-hidden rounded-2xl bg-night p-6">
          <DomeOfTheRock className="w-full" label={t.hero.domeAlt} />
        </div>
      </section>

      <section id="landmarks" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-20">
        <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900 md:text-4xl">{Q.landmarks}</h2>
        <AqsaMap />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {landmarks.map((l) => (
            <Link key={l.id} href={h(`/quds/${l.id}`)} className="group flex gap-5 rounded-2xl border border-stone-200 bg-white p-6 hover:border-teal-500">
              <Khatam className="mt-1 h-8 w-8 shrink-0" color="#3aafc9" />
              <div>
                <h3 className="font-kufi text-2xl font-bold text-teal-900">{tx(l.title, lang)}</h3>
                <p className="mt-2 line-clamp-2 leading-8 text-muted">{tx(l.text, lang)}</p>
              </div>
              <IconArrow size={20} className="ms-auto mt-2 shrink-0 text-teal-500" />
            </Link>
          ))}
        </div>
      </section>

      <section id="library" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-20">
        <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900 md:text-4xl">{Q.library}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qudsLibrary.map((it) => (
            <Link key={it.href + tx(it.title, lang)} href={h(it.href)} className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 hover:border-teal-500">
              <span className="grid h-14 w-14 place-items-center rounded-b-lg rounded-t-full bg-teal-100 text-teal-700">
                {it.icon === "play" ? <IconPlay size={26} /> : it.icon === "map" ? <KindIcon kind="rebuild" size={26} /> : <IconBook size={26} />}
              </span>
              <span>
                <span className="block font-kufi text-xl font-bold text-teal-900">{tx(it.title, lang)}</span>
                <span className="text-muted">{tx(it.desc, lang)}</span>
              </span>
              <IconArrow size={20} className="ms-auto text-teal-500" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
