"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrow } from "./Icons";
import { useI18n } from "@/lib/lang-context";

/* «فتُهدي له زيتاً يُسرج فيه» — قناديل الأقصى التفاعلية */
const N = 11;
const drops = [70, 110, 60, 130, 90, 150, 90, 130, 60, 110, 70];

function Lamp({ lit, onClick, i }: { lit: boolean; onClick: () => void; i: number }) {
  const { t } = useI18n();
  return (
    <button
      onClick={onClick}
      aria-pressed={lit}
      aria-label={(lit ? t.lamps.lit : t.lamps.light).replace("{n}", String(i + 1))}
      className="group flex flex-col items-center focus-visible:outline-none"
    >
      <span className="w-px bg-gold-500/60" style={{ height: drops[i] }} />
      <svg viewBox="0 0 40 70" className={`h-20 w-12 transition-transform duration-500 group-hover:rotate-3 ${lit ? "drop-shadow-[0_0_22px_rgba(235,205,122,.95)]" : ""}`} aria-hidden="true">
        <path d="M20 0v6" stroke="#c99a2e" strokeWidth="2" />
        <path d="M12 6h16l-3 6H15Z" fill="#9a7214" />
        <path d="M10 12h20l4 22c0 10-6 18-14 22-8-4-14-12-14-22Z" fill={lit ? "#ebcd7a" : "#0a3a4f"} stroke="#c99a2e" strokeWidth="1.6" className="transition-colors duration-700" />
        <path d="M14 18h12M12 26h16M12 34h16" stroke="#c99a2e" strokeOpacity=".6" strokeWidth="1" />
        <path d="M20 14v34M14 16l-1 26M26 16l1 26" stroke="#c99a2e" strokeOpacity=".45" strokeWidth="1" />
        {lit && <ellipse cx="20" cy="32" rx="5" ry="8" fill="#fff6d8" className="twinkle" />}
        <path d="M17 56h6l-3 8Z" fill="#9a7214" />
      </svg>
    </button>
  );
}

export default function Lamps() {
  const { t, href } = useI18n();
  const L = t.lamps;
  const [lit, setLit] = useState<boolean[]>(() => Array.from({ length: N }, (_, i) => i === 5));
  const count = lit.filter(Boolean).length;
  const toggle = (i: number) => setLit((l) => l.map((v, j) => (j === i ? !v : v)));

  return (
    <section id="lamps" className="relative scroll-mt-28 overflow-hidden bg-night pb-20 text-white">
      <div className="crenellation relative rotate-180 text-stone-50" />
      <div className="pattern-khatam absolute inset-0 opacity-[.06]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] transition-opacity duration-1000"
        style={{ background: "radial-gradient(60% 70% at 50% 20%, rgba(235,205,122,.22), transparent 70%)", opacity: Math.min(1, count / 6) }}
      />
      <div className="relative mx-auto flex max-w-6xl justify-between px-5">
        {lit.map((v, i) => (
          <Lamp key={i} i={i} lit={v} onClick={() => toggle(i)} />
        ))}
      </div>

      <div className="relative mx-auto mt-10 max-w-4xl px-5 text-center">
        <p className="mb-5 text-sm font-bold text-gold-300">{L.intro}</p>
        <blockquote className="font-naskh text-[24px] leading-[2] text-teal-50 md:text-[32px]">
          {L.hadith1}
          <span className="mt-2 block text-gold-300">{L.hadith2}</span>
        </blockquote>
        <p className="mt-4 text-sm text-teal-100/60">{L.source}</p>

        <p className="mt-8 text-teal-100/90" aria-live="polite">
          {count === N ? L.all : (
            <>
              {L.hint.split("{n}")[0].replace("{t}", String(N))}
              <b className="num text-xl text-gold-300">{count}</b>
              {L.hint.split("{n}")[1].replace("{t}", String(N))}
            </>
          )}
        </p>
        <Link href={href("/projects?region=quds")} className="mt-6 inline-flex h-14 items-center gap-2 rounded-full bg-gold-500 px-8 text-lg font-bold text-night shadow-[0_0_40px_-6px_rgba(235,205,122,.8)] hover:bg-gold-400">
          {L.cta} <IconArrow size={20} />
        </Link>
      </div>
    </section>
  );
}
