import Link from "next/link";
import PageHero from "@/components/PageHero";
import AqsaMap from "@/components/AqsaMap";
import { DomeOfTheRock, Khatam} from "@/components/Motifs";
import { IconArrow, IconBook, IconPlay, KindIcon } from "@/components/Icons";
import { landmarks, orgContent, projects, qudsLibrary } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { tx } from "@/lib/i18n";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.quds.title);

const X = {
  ar: {
    factsT: "القدس والأقصى في سطور",
    facts: [
      { v: "144", u: "دونماً", d: "مساحة المسجد الأقصى المبارك بكل ما يحيط به السور من مصليات وساحات." },
      { v: "أولى", u: "القبلتين", d: "صلّى إليه المسلمون قبل تحويل القبلة إلى الكعبة المشرّفة." },
      { v: "ثالث", u: "المساجد", d: "التي تُشدّ إليها الرحال بعد المسجد الحرام والمسجد النبوي." },
      { v: "1541", u: "م", d: "اكتمل بناء سور البلدة القديمة القائم اليوم (1537–1541م) في عهد السلطان العثماني سليمان القانوني." },
    ],
    timeT: "محطات من تاريخ القدس",
    time: [
      { y: "الإسراء والمعراج", t: "أُسري بالنبي ﷺ من المسجد الحرام إلى المسجد الأقصى، وصلّى فيه بالأنبياء، ومنه عُرج به إلى السماء." },
      { y: "15هـ / 637م", t: "الفتح العُمري: تسلّم الخليفة عمر بن الخطاب مفاتيح القدس وكتب لأهلها العهدة العُمرية." },
      { y: "72هـ / 691م", t: "بناء قبة الصخرة المشرّفة في عهد الخليفة الأموي عبد الملك بن مروان." },
      { y: "583هـ / 1187م", t: "تحرير القدس على يد القائد صلاح الدين الأيوبي بعد معركة حطين." },
      { y: "922هـ / 1516م", t: "دخول القدس في العهد العثماني، وعناية السلاطين بعمارتها وأسوارها ومساجدها." },
      { y: "1967م", t: "احتلال شرقي القدس والمسجد الأقصى المبارك، وما زال أهلها صامدين في بيوتهم وأرضهم." },
    ],
    projT: "مشاريعنا في القدس",
    projD: "مشاريع ندعم بها صمود المقدسيين ونخدم المسجد الأقصى المبارك وروّاده.",
    all: "كل مشاريع القدس",
    ctaT: "كن سنداً للقدس وأهلها",
    ctaD: "من لم يستطع أن يشدّ الرحال إلى الأقصى، فليكن له فيه سهمٌ من العطاء.",
    cta1: "أسرج قنديلاً في الأقصى",
    cta2: "ادعم المقدسيين",
    photo: "المسجد الأقصى المبارك والبلدة القديمة",
  },
  tr: {
    factsT: "Kısaca Kudüs ve Aksa",
    facts: [
      { v: "144", u: "dönüm", d: "Mescid-i Aksa'nın surla çevrili tüm mescit ve avlularıyla alanı." },
      { v: "İlk", u: "kıble", d: "Müslümanlar kıble Kâbe'ye çevrilmeden önce Aksa'ya yönelerek namaz kıldı." },
      { v: "Üçüncü", u: "mescit", d: "Mescid-i Haram ve Mescid-i Nebevî'den sonra ziyaret için yola çıkılan mescit." },
      { v: "1541", u: "", d: "Bugünkü Eski Şehir surları (1537–1541) Kanuni Sultan Süleyman döneminde inşa edildi." },
    ],
    timeT: "Kudüs tarihinden duraklar",
    time: [
      { y: "İsra ve Miraç", t: "Peygamberimiz ﷺ Mescid-i Haram'dan Mescid-i Aksa'ya götürüldü, orada peygamberlere imam oldu ve oradan semaya yükseltildi." },
      { y: "15 H / 637", t: "Hz. Ömer Kudüs'ün anahtarlarını teslim aldı ve halkına Ömer Ahidnamesi'ni yazdı." },
      { y: "72 H / 691", t: "Kubbetü's-Sahra, Emevî halifesi Abdülmelik bin Mervan döneminde inşa edildi." },
      { y: "583 H / 1187", t: "Selahaddin Eyyubi Hıttin Savaşı'nın ardından Kudüs'ü fethetti." },
      { y: "922 H / 1516", t: "Kudüs Osmanlı idaresine girdi; sultanlar şehrin surlarına ve mescitlerine özen gösterdi." },
      { y: "1967", t: "Doğu Kudüs ve Mescid-i Aksa işgal edildi; Kudüslüler evlerinde ve topraklarında direnmeye devam ediyor." },
    ],
    projT: "Kudüs projelerimiz",
    projD: "Kudüslülerin direnişini destekleyen ve Mescid-i Aksa'ya hizmet eden projeler.",
    all: "Tüm Kudüs projeleri",
    ctaT: "Kudüs'e ve halkına destek olun",
    ctaD: "Aksa'ya gidemeyen, orada bir iyilik payı bıraksın.",
    cta1: "Aksa'da bir kandil yakın",
    cta2: "Kudüslülere destek olun",
    photo: "Mescid-i Aksa ve Eski Şehir",
  },
  en: {
    factsT: "Al-Quds and Al-Aqsa at a glance",
    facts: [
      { v: "144", u: "dunams", d: "The area of Al-Aqsa Mosque, including all prayer halls and courtyards within its walls." },
      { v: "First", u: "qibla", d: "Muslims prayed towards it before the qibla was turned to the Kaaba." },
      { v: "Third", u: "mosque", d: "To which journeys are made, after Al-Masjid Al-Haram and the Prophet's Mosque." },
      { v: "1541", u: "", d: "The Old City walls standing today (1537–1541) were completed under Ottoman Sultan Suleiman the Magnificent." },
    ],
    timeT: "Milestones in the history of Al-Quds",
    time: [
      { y: "Isra & Mi'raj", t: "The Prophet ﷺ was taken by night from Al-Masjid Al-Haram to Al-Aqsa, led the prophets in prayer, and ascended from there." },
      { y: "15 AH / 637", t: "Caliph Umar ibn Al-Khattab received the keys of Al-Quds and granted its people the Umari Covenant." },
      { y: "72 AH / 691", t: "The Dome of the Rock was built under the Umayyad caliph Abd Al-Malik ibn Marwan." },
      { y: "583 AH / 1187", t: "Salah Al-Din Al-Ayyubi liberated Al-Quds after the Battle of Hattin." },
      { y: "922 AH / 1516", t: "Al-Quds entered the Ottoman era; the sultans cared for its walls and mosques." },
      { y: "1967", t: "East Jerusalem and Al-Aqsa Mosque were occupied; Jerusalemites remain steadfast in their homes and land." },
    ],
    projT: "Our projects in Al-Quds",
    projD: "Projects that support Jerusalemites' steadfastness and serve Al-Aqsa Mosque and its worshippers.",
    all: "All Al-Quds projects",
    ctaT: "Stand with Al-Quds and its people",
    ctaD: "Whoever cannot travel to Al-Aqsa, let them have a share of giving in it.",
    cta1: "Light a lamp in Al-Aqsa",
    cta2: "Support Jerusalemites",
    photo: "Al-Aqsa Mosque and the Old City",
  },
};

export default async function Quds({ params }: LangParams) {
  const { lang, t, h } = await pageLang(params);
  const Q = t.quds;
  const L = X[lang];
  const qudsProjects = projects.filter((p) => p.region === "quds" && p.kind !== "zakat").slice(0, 3);
  return (
    <>
      <PageHero lang={lang} title={Q.title} kicker={Q.kicker}>{Q.text}</PageHero>

      {/* القدس في سطور */}
      <section className="mx-auto max-w-7xl px-5 pt-14">
        <h2 className="mb-6 font-kufi text-2xl font-bold text-teal-900 md:text-3xl">{L.factsT}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {L.facts.map((f, i) => (
            <Reveal key={f.d} delay={i * 90}>
              <div className="lift h-full rounded-2xl border border-stone-200 bg-white p-6">
                <p className="font-kufi text-teal-900"><span className="num text-4xl font-extrabold text-accent-500">{f.v}</span> <span className="text-lg font-bold">{f.u}</span></p>
                <p className="mt-3 leading-7 text-muted">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="history" className="mx-auto grid max-w-7xl scroll-mt-28 items-center gap-12 px-5 pt-14 lg:grid-cols-2">
        <div>
          <h2 className="mb-5 font-kufi text-3xl font-bold text-teal-900 md:text-4xl">{Q.history}</h2>
          <p className="font-naskh text-2xl leading-[2] text-teal-900" lang="ar" dir="rtl">{t.verse}</p>
          {t.verseTr && <p className="mt-3 italic leading-8 text-muted">{t.verseTr}</p>}
          {orgContent.history?.[lang] ? <p className="mt-5 text-lg leading-9 text-ink/85">{orgContent.history[lang]}</p> : <p className="mt-5 text-lg leading-9 text-ink/85">{t.about.p1}</p>}
        </div>
        <figure className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-night">
            <DomeOfTheRock className="absolute inset-x-6 bottom-0 w-[calc(100%-3rem)]" label="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/hero-aqsa.jpg" alt={L.photo} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_55%]" />
          </div>
          <figcaption className="absolute -bottom-4 start-5 rounded-lg bg-accent-700 px-4 py-2 text-sm font-semibold text-white shadow-lg">{L.photo}</figcaption>
        </figure>
      </section>

      {/* محطات تاريخية */}
      <section className="mt-20 bg-accent-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-kufi text-3xl font-bold md:text-4xl">{L.timeT}</h2>
          <ol className="relative mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {L.time.map((s, i) => (
              <li key={s.y}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl border border-white/15 bg-white/5 p-6">
                    <span className="inline-flex items-center rounded-md bg-accent-500 px-3 py-1 font-kufi text-sm font-bold">{s.y}</span>
                    <p className="mt-4 leading-8 text-accent-100">{s.t}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
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

      {/* مشاريعنا في القدس */}
      <section className="mx-auto max-w-7xl px-5 pt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-kufi text-3xl font-bold text-teal-900 md:text-4xl">{L.projT}</h2>
            <p className="mt-2 text-lg text-muted">{L.projD}</p>
          </div>
          <Link href={h("/projects?region=quds")} className="flex h-12 items-center gap-2 rounded-lg border-2 border-accent-700 px-5 font-bold text-accent-700 hover:bg-accent-700 hover:text-white">{L.all} <IconArrow size={18} /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {qudsProjects.map((p) => <ProjectCard key={p.slug} p={p} lang={lang} />)}
        </div>
      </section>

      <section id="library" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-20">
        <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900 md:text-4xl">{Q.library}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qudsLibrary.map((it) => (
            <Link key={it.href + tx(it.title, lang)} href={h(it.href)} className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 hover:border-teal-500">
              <span className="grid h-14 w-14 place-items-center rounded-lg bg-accent-500 text-white">
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

      {/* دعوة */}
      <section className="mx-auto max-w-7xl px-5 pt-20">
        <div className="relative isolate overflow-hidden rounded-2xl bg-accent-700 p-8 text-white md:p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/hero-aqsa-sm.jpg" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-accent-700 via-accent-700/80 to-accent-700/40" />
          <h2 className="font-kufi text-3xl font-extrabold md:text-4xl">{L.ctaT}</h2>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-accent-100">{L.ctaD}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={h("/lamps")} className="btn-shine flex min-h-14 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-center text-lg leading-snug font-bold text-accent-700 hover:bg-accent-100">{L.cta1} <IconArrow size={20} /></Link>
            <Link href={h("/projects?region=quds")} className="flex min-h-14 items-center justify-center gap-2 rounded-lg border-2 border-white/60 px-6 py-3 text-center text-lg leading-snug font-bold hover:bg-white/10">{L.cta2}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
