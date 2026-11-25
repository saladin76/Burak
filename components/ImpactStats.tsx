import Link from "next/link";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { GivingRings, Khatam } from "./Motifs";
import { IconArrow, IconBank, IconCheck, IconHeart, IconShield, KindIcon } from "./Icons";
import { stats } from "@/lib/data";
import { getDict, lhref, tx, type Lang } from "@/lib/i18n";

const L = {
  ar: { year: "هذا العام", since: "منذ التأسيس", text: "أرقام تعكس ثقة المتبرعين وعمل فرقنا الميدانية في القدس وغزة.", benef: "مستفيد من مشاريعنا هذا العام" },
  tr: { year: "Bu yıl", since: "Kuruluştan bu yana", text: "Bağışçılarımızın güvenini ve Kudüs ile Gazze'deki saha ekiplerimizin çalışmasını yansıtan rakamlar.", benef: "bu yıl projelerimizden faydalanan kişi" },
  en: { year: "This year", since: "Since founding", text: "Figures that reflect our donors' trust and the work of our field teams in Al-Quds and Gaza.", benef: "people benefited from our projects this year" },
};

/** قسم الأثر والإحصاءات في الصفحة الرئيسية */
export default function ImpactStats({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const H = t.home;
  const T = L[lang];
  const [projects, beneficiaries, sponsorships] = stats.annual;
  const lifeIcons = [<Khatam key="a" className="h-6 w-6" color="#ffffff" />, <KindIcon key="b" kind="rebuild" size={24} />, <KindIcon key="c" kind="support" size={24} />];

  return (
    <section className="relative isolate mt-24 overflow-hidden bg-accent-700 text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/hero-aqsa-sm.jpg" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[.12]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent-700/60 via-accent-700/90 to-accent-700" />
      <GivingRings live className="pointer-events-none absolute -end-40 -top-40 -z-10 w-[620px]" rings={7} opacity={0.14} palette={["#3aafc9", "#64b6d0", "#8acbda", "#aeddec", "#3aafc9", "#64b6d0", "#8acbda"]} />

      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="brand-tag mb-4 !bg-white/15 ring-1 ring-white/20">{H.impactKicker}</p>
            <h2 className="font-kufi text-3xl font-extrabold leading-tight md:text-[44px]">{H.impactTitle}</h2>
            <p className="mt-3 text-lg leading-8 text-accent-100">{T.text}</p>
          </div>
          <Link href={lhref(lang, "/reports")} className="flex h-12 items-center gap-2 rounded-lg border-2 border-white/40 px-5 font-bold hover:border-white hover:bg-white/10">
            {t.nav.reports} <IconArrow size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* هذا العام */}
          <Reveal>
            <div className="h-full rounded-2xl bg-white p-7 text-teal-900 shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] md:p-9">
              <p className="flex items-center gap-2 text-sm font-bold text-accent-600">
                <span className="h-2 w-2 rounded-full bg-accent-500" /> {T.year}
              </p>
              <div className="mt-5 flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-accent-500 text-white"><KindIcon kind="support" size={30} /></span>
                <div>
                  <p className="num font-kufi text-5xl font-extrabold leading-none text-accent-700 md:text-7xl"><CountUp to={beneficiaries.value} /></p>
                  <p className="mt-3 text-lg font-semibold text-muted">{T.benef}</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-200 pt-6">
                {[
                  { s: projects, icon: <KindIcon kind="rebuild" size={22} /> },
                  { s: sponsorships, icon: <IconHeart size={22} /> },
                ].map(({ s, icon }) => (
                  <div key={s.value} className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-100 text-accent-600">{icon}</span>
                    <div>
                      <p className="num font-kufi text-3xl font-extrabold leading-none text-teal-900"><CountUp to={s.value} /></p>
                      <p className="mt-1 text-sm text-muted">{tx(s.label, lang)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* منذ التأسيس */}
          <div className="grid gap-4">
            <p className="flex items-center gap-2 text-sm font-bold text-accent-300">
              <span className="h-2 w-2 rounded-full bg-accent-300" /> {T.since}
            </p>
            {stats.lifetime.map((s, i) => (
              <Reveal key={s.value} delay={120 + i * 100}>
                <div className="lift flex items-center gap-5 rounded-2xl border border-white/15 bg-white/[.06] p-5 backdrop-blur">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-accent-500 text-white">{lifeIcons[i]}</span>
                  <p className="num font-kufi text-4xl font-extrabold leading-none" dir="ltr">{s.value}</p>
                  <p className="ms-auto text-end text-[15px] leading-6 text-accent-100">{tx(s.label, lang)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap gap-3 text-[15px] font-semibold">
          {[
            [<IconShield key="a" size={18} />, H.trust1],
            [<IconBank key="b" size={18} />, H.trust2],
            [<IconCheck key="c" size={18} />, H.trust3],
          ].map(([ic, txt], i) => (
            <li key={i} className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/[.06] px-4 py-2.5 text-accent-100">
              <span className="text-accent-300">{ic}</span> {txt}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
