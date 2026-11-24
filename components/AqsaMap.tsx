"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrow } from "./Icons";

/* خريطة تفاعلية مبسّطة للمسجد الأقصى المبارك (مخطط تقريبي، ليس بمقياس رسم) */
type Spot = { id: string; x: number; y: number; title: string; text: string; cta?: { href: string; label: string } };

const spots: Spot[] = [
  {
    id: "dome",
    x: 292,
    y: 292,
    title: "قبة الصخرة المشرفة",
    text: "شيّدها الخليفة الأموي عبد الملك بن مروان نحو سنة 72هـ / 691م، وهي أقدم أثر معماري إسلامي قائم، تتوسط صحن الأقصى فوق مصطبة مرتفعة.",
    cta: { href: "/projects?region=quds", label: "ادعم إعمار الأقصى" },
  },
  {
    id: "chain",
    x: 350,
    y: 296,
    title: "قبة السلسلة",
    text: "قبة صغيرة مفتوحة إلى الشرق من قبة الصخرة، من أقدم قباب المسجد الأقصى.",
  },
  {
    id: "qibli",
    x: 330,
    y: 595,
    title: "المسجد القبلي",
    text: "المصلى الجامع في الجهة الجنوبية بقبته الرصاصية، وفيه تُقام صلاة الجمعة والجماعات الكبرى.",
    cta: { href: "/projects/sqya-alma-alqds", label: "سقيا روّاد الأقصى" },
  },
  {
    id: "marwani",
    x: 450,
    y: 585,
    title: "المصلى المرواني",
    text: "مصلى واسع تحت مستوى الساحات في الزاوية الجنوبية الشرقية، أُعيد فتحه للصلاة عام 1996م.",
  },
  {
    id: "rahma",
    x: 484,
    y: 330,
    title: "باب الرحمة",
    text: "باب في السور الشرقي، وإلى جواره مصلى باب الرحمة الذي أعاد المقدسيون فتحه للصلاة عام 2019م.",
    cta: { href: "/projects?region=quds", label: "ثبّت المرابطين" },
  },
  {
    id: "buraq",
    x: 172,
    y: 560,
    title: "حائط البراق",
    text: "الجزء الجنوبي من السور الغربي للأقصى، ارتبط اسمه بما ورد من ربط النبي ﷺ البراق عنده ليلة الإسراء — ومنه استلهمت المؤسسة اسمها.",
    cta: { href: "/about", label: "قصة اسم البراق" },
  },
  {
    id: "asbat",
    x: 440,
    y: 64,
    title: "باب الأسباط",
    text: "من أبواب الأقصى الشمالية، ويدخل منه كثير من المصلين القادمين من خارج البلدة القديمة.",
  },
  {
    id: "quran",
    x: 230,
    y: 170,
    title: "مصاطب العلم",
    text: "تنتشر في ساحات الأقصى مصاطب وحلقات علم وقرآن، يرعى «جيل القرآن» طلابها وحفّاظها.",
    cta: { href: "/projects/jyl-alqran-5", label: "ادعم حلقات القرآن" },
  },
];

export default function AqsaMap() {
  const [active, setActive] = useState<Spot>(spots[0]);

  return (
    <div className="grid overflow-hidden rounded-[32px] bg-night text-white lg:grid-cols-[1.1fr_1fr]">
      <div className="relative p-6 md:p-10">
        <div className="pattern-khatam absolute inset-0 opacity-[.06]" />
        <svg viewBox="0 0 620 700" className="relative mx-auto block w-full max-w-[520px]" role="group" aria-label="مخطط المسجد الأقصى المبارك">
          {/* السور */}
          <path d="M150 50 L470 40 L505 650 L165 668 Z" fill="#032c3d" stroke="#ebcd7a" strokeWidth="3" strokeLinejoin="round" />
          <path d="M150 50 L470 40 L505 650 L165 668 Z" fill="none" stroke="#ebcd7a" strokeOpacity=".25" strokeWidth="14" strokeDasharray="4 10" />
          {/* أشجار الزيتون */}
          {[
            [210, 110], [250, 90], [390, 120], [420, 180], [200, 420], [230, 470], [410, 430], [440, 470], [380, 500], [250, 520],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="9" fill="#56693a" opacity=".7" />
          ))}
          {/* مصطبة قبة الصخرة */}
          <rect x="222" y="226" width="150" height="138" rx="6" fill="#0a3a4f" stroke="#d6c7a8" strokeOpacity=".6" />
          <polygon points="292,252 318,262 328,288 318,314 292,324 266,314 256,288 266,262" fill="#3aafc9" stroke="#ebcd7a" strokeWidth="2" />
          <circle cx="292" cy="288" r="14" fill="#c99a2e" />
          {/* المسجد القبلي */}
          <rect x="290" y="560" width="80" height="80" rx="4" fill="#0a3a4f" stroke="#d6c7a8" strokeOpacity=".6" />
          <circle cx="330" cy="578" r="10" fill="#8aa1a8" />
          {/* المرواني */}
          <rect x="410" y="560" width="80" height="60" rx="4" fill="#0a3a4f" stroke="#d6c7a8" strokeOpacity=".4" strokeDasharray="5 4" />
          {/* الشمال */}
          <g transform="translate(560 80)" fill="#ebcd7a">
            <path d="M0 -26 L8 0 L0 -6 L-8 0 Z" />
            <text y="20" textAnchor="middle" fontSize="16" fontFamily="var(--font-kufi)">ش</text>
          </g>

          {spots.map((s) => {
            const on = s.id === active.id;
            return (
              <g key={s.id} transform={`translate(${s.x} ${s.y})`}>
                {on && <circle r="26" fill="#ebcd7a" opacity=".18" className="animate-ping" style={{ transformOrigin: "center", transformBox: "fill-box" }} />}
                <circle
                  r={on ? 15 : 12}
                  fill={on ? "#ebcd7a" : "#011f2c"}
                  stroke="#ebcd7a"
                  strokeWidth="3"
                  tabIndex={0}
                  role="button"
                  aria-label={s.title}
                  aria-pressed={on}
                  className="cursor-pointer outline-none transition-all focus-visible:stroke-white"
                  onClick={() => setActive(s)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setActive(s))}
                />
                <circle r="4" fill={on ? "#011f2c" : "#ebcd7a"} pointerEvents="none" />
              </g>
            );
          })}
        </svg>
        <p className="relative mt-3 text-center text-xs text-teal-100/60">مخطط تقريبي للتعريف، ليس بمقياس رسم</p>
      </div>

      <div className="flex flex-col justify-center border-t border-white/10 bg-night-2 p-8 md:p-12 lg:border-s lg:border-t-0">
        <p className="text-sm font-bold text-gold-300">اكتشف الأقصى</p>
        <h3 key={active.id} className="rise mt-2 font-kufi text-3xl font-bold md:text-4xl">{active.title}</h3>
        <p key={active.id + "t"} className="rise-2 mt-4 text-lg leading-9 text-teal-100/90">{active.text}</p>
        {active.cta && (
          <Link href={active.cta.href} className="rise-3 mt-6 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-gold-500 px-6 font-bold text-night hover:bg-gold-400">
            {active.cta.label} <IconArrow size={18} />
          </Link>
        )}
        <div className="mt-8 flex flex-wrap gap-2">
          {spots.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              aria-pressed={s.id === active.id}
              className={`h-10 rounded-full px-4 text-sm font-semibold transition ${
                s.id === active.id ? "bg-white text-teal-900" : "border border-white/15 text-teal-100 hover:border-gold-300"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
