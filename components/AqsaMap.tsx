"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrow } from "./Icons";
import { getProject, landmarks, type Landmark } from "@/lib/data";
import { tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";

/* خريطة تفاعلية مبسّطة للمسجد الأقصى المبارك (مخطط تقريبي، ليس بمقياس رسم) */
type Spot = Landmark;
const spots = landmarks;

export default function AqsaMap({ initial }: { initial?: string }) {
  const { lang, t, href } = useI18n();
  const [active, setActive] = useState<Spot>(spots.find((x) => x.id === initial) ?? spots[0]);
  const proj = active.project ? getProject(active.project) : undefined;

  return (
    <div className="grid overflow-hidden rounded-3xl bg-night text-white lg:grid-cols-[1.1fr_1fr]">
      <div className="relative p-6 md:p-10">
        <div className="pattern-khatam absolute inset-0 opacity-[.06]" />
        <svg viewBox="0 0 620 700" className="relative mx-auto block w-full max-w-[520px]" role="group" aria-label={t.map.label}>
          {/* السور */}
          <path d="M150 50 L470 40 L505 650 L165 668 Z" fill="#032c3d" stroke="#8acbda" strokeWidth="3" strokeLinejoin="round" />
          <path d="M150 50 L470 40 L505 650 L165 668 Z" fill="none" stroke="#8acbda" strokeOpacity=".25" strokeWidth="14" strokeDasharray="4 10" />
          {/* أشجار الزيتون */}
          {[
            [210, 110], [250, 90], [390, 120], [420, 180], [200, 420], [230, 470], [410, 430], [440, 470], [380, 500], [250, 520],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="9" fill="#56693a" opacity=".7" />
          ))}
          {/* مصطبة قبة الصخرة */}
          <rect x="222" y="226" width="150" height="138" rx="6" fill="#0a3a4f" stroke="#d6c7a8" strokeOpacity=".6" />
          <polygon points="292,252 318,262 328,288 318,314 292,324 266,314 256,288 266,262" fill="#3aafc9" stroke="#8acbda" strokeWidth="2" />
          <circle cx="292" cy="288" r="14" fill="#3aafc9" />
          {/* المسجد القبلي */}
          <rect x="290" y="560" width="80" height="80" rx="4" fill="#0a3a4f" stroke="#d6c7a8" strokeOpacity=".6" />
          <circle cx="330" cy="578" r="10" fill="#8aa1a8" />
          {/* المرواني */}
          <rect x="410" y="560" width="80" height="60" rx="4" fill="#0a3a4f" stroke="#d6c7a8" strokeOpacity=".4" strokeDasharray="5 4" />
          {/* الشمال */}
          <g transform="translate(560 80)" fill="#8acbda">
            <path d="M0 -26 L8 0 L0 -6 L-8 0 Z" />
            <text y="20" textAnchor="middle" fontSize="16" fontFamily="var(--font-kufi)">{t.map.north}</text>
          </g>

          {spots.map((s) => {
            const on = s.id === active.id;
            return (
              <g key={s.id} transform={`translate(${s.x} ${s.y})`}>
                {on && <circle r="26" fill="#8acbda" opacity=".18" className="animate-ping" style={{ transformOrigin: "center", transformBox: "fill-box" }} />}
                <circle
                  r={on ? 15 : 12}
                  fill={on ? "#8acbda" : "#011f2c"}
                  stroke="#8acbda"
                  strokeWidth="3"
                  tabIndex={0}
                  role="button"
                  aria-label={tx(s.title, lang)}
                  aria-pressed={on}
                  className="cursor-pointer outline-none transition-all focus-visible:stroke-white"
                  onClick={() => setActive(s)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setActive(s))}
                />
                <circle r="4" fill={on ? "#011f2c" : "#8acbda"} pointerEvents="none" />
              </g>
            );
          })}
        </svg>
        <p className="relative mt-3 text-center text-xs text-teal-100/60">{t.map.note}</p>
      </div>

      <div className="flex flex-col justify-center border-t border-white/10 bg-night-2 p-8 md:p-12 lg:border-s lg:border-t-0">
        <p className="text-sm font-bold text-accent-300">{t.map.kicker}</p>
        <h3 key={active.id} className="rise mt-2 font-kufi text-3xl font-bold md:text-4xl">{tx(active.title, lang)}</h3>
        <p key={active.id + "t"} className="rise-2 mt-4 text-lg leading-9 text-teal-100/90">{tx(active.text, lang)}</p>
        <div className="rise-3 mt-6 flex flex-wrap gap-3">
          {proj && (
            <Link href={href(`/projects/${proj.slug}`)} className="inline-flex h-12 items-center gap-2 rounded-lg bg-accent-500 px-6 font-bold text-white hover:bg-accent-600">
              {tx(proj.title, lang)} <IconArrow size={18} />
            </Link>
          )}
          <Link href={href(`/quds/${active.id}`)} className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/20 px-6 font-semibold hover:border-accent-300 hover:text-accent-300">
            {t.map.page}
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {spots.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              aria-pressed={s.id === active.id}
              className={`h-10 rounded-full px-4 text-sm font-semibold transition ${
                s.id === active.id ? "bg-white text-teal-900" : "border border-white/15 text-teal-100 hover:border-accent-300"
              }`}
            >
              {tx(s.title, lang)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
