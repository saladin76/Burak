/* عناصر بصرية متحركة لهوية البراق — كلها تحترم prefers-reduced-motion عبر globals.css */
import type { CSSProperties, ReactNode } from "react";
import { Khatam } from "./Motifs";

/** جزيئات ضوء صاعدة — مواضع ثابتة لتطابق الخادم والمتصفح */
export function Particles({ count = 18, className = "", color = "#8acbda" }: { count?: number; className?: string; color?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37 + 11) % 100;
        const size = 2 + ((i * 7) % 4);
        const style = {
          left: `${left}%`,
          bottom: `-${(i * 13) % 20}px`,
          width: size,
          height: size,
          background: color,
          "--t": `${12 + ((i * 5) % 10)}s`,
          "--delay": `${-((i * 1.7) % 14)}s`,
          "--dx": `${((i % 5) - 2) * 18}px`,
        } as CSSProperties;
        return <span key={i} className="particle absolute rounded-full opacity-0 shadow-[0_0_10px_currentColor]" style={style} />;
      })}
    </div>
  );
}

/** موجات عطاء تتسع من المركز */
export function Ripple({ className = "", color = "#3aafc9" }: { className?: string; color?: string }) {
  return (
    <div aria-hidden="true" className={`ripple pointer-events-none absolute ${className}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="absolute inset-0 rounded-full border-2 opacity-0" style={{ borderColor: color }} />
      ))}
    </div>
  );
}

/** شريط متحرك لا نهائي */
export function Marquee({ items, className = "", seconds }: { items: ReactNode[]; className?: string; seconds?: number }) {
  const row = (k: string) => (
    <div className="flex shrink-0 items-center gap-10 pe-10" aria-hidden={k === "b"} {...(k === "b" ? { inert: true } : {})}>
      {items.map((it, i) => (
        <span key={k + i} className="flex shrink-0 items-center gap-10 whitespace-nowrap">
          {it}
          <Khatam className="h-5 w-5 opacity-60" color="currentColor" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max" style={{ "--dur": `${seconds ?? Math.max(60, items.length * 9)}s` } as CSSProperties}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/** مقياس الزكاة 2.5% — حلقة تُرسم عند التحميل */
export function ZakatGauge({ label, sub }: { label: string; sub: string }) {
  const R = 150;
  const C = 2 * Math.PI * R;
  const pct = 0.025;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[460px]">
      <Ripple className="inset-[8%]" color="#3aafc9" />
      <svg viewBox="0 0 400 400" className="relative h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="200" cy="200" r={R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="26" />
        {/* علامات الأربعين جزءاً — ربع العشر = جزء من أربعين */}
        {Array.from({ length: 40 }, (_, i) => {
          const a = (i / 40) * Math.PI * 2;
          const r1 = R + 24, r2 = R + (i % 10 === 0 ? 40 : 32);
          return <line key={i} x1={200 + r1 * Math.cos(a)} y1={200 + r1 * Math.sin(a)} x2={200 + r2 * Math.cos(a)} y2={200 + r2 * Math.sin(a)} stroke={i === 0 ? "#ffffff" : "rgba(138,203,218,.45)"} strokeWidth={i === 0 ? 4 : 2} strokeLinecap="round" />;
        })}
        <circle cx="200" cy="200" r={R} fill="none" stroke="#3aafc9" strokeWidth="26" strokeLinecap="round"
          strokeDasharray={`${C}`} className="draw" style={{ strokeDashoffset: C * (1 - pct), "--len": C, "--to": C * (1 - pct) } as CSSProperties} />
        <circle cx="200" cy="200" r="112" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" strokeDasharray="4 8" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="num font-kufi text-[64px] font-extrabold leading-none text-white md:text-[88px]" dir="ltr">2.5%</p>
          <p className="mt-3 font-kufi text-lg font-bold text-accent-300">{label}</p>
          <p className="mt-1 text-sm text-accent-100/80">{sub}</p>
        </div>
      </div>
    </div>
  );
}

/** مدار الأشهر — 12 عقدة تُضاء بالتتابع مع مُذنَّب يدور: عطاء لا ينقطع */
export function MonthsOrbit({ label, sub }: { label: string; sub: string }) {
  const R = 150;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[460px]">
      <Ripple className="inset-[14%]" color="#8acbda" />
      <svg viewBox="0 0 400 400" className="relative h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="comet" x1="0" x2="1">
            <stop offset="0" stopColor="#3aafc9" stopOpacity="0" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="2" />
        <circle cx="200" cy="200" r={R - 26} fill="none" stroke="rgba(138,203,218,.18)" strokeWidth="1" strokeDasharray="3 7" />
        <g className="orbit-comet">
          <path d={`M ${200 + R} 200 A ${R} ${R} 0 0 0 ${200 + R * Math.cos(-Math.PI / 2.4)} ${200 + R * Math.sin(-Math.PI / 2.4)}`} fill="none" stroke="url(#comet)" strokeWidth="6" strokeLinecap="round" />
        </g>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x = 200 + R * Math.cos(a), y = 200 + R * Math.sin(a);
          const lx = 200 + (R + 30) * Math.cos(a), ly = 200 + (R + 30) * Math.sin(a);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="#3aafc9" className="orbit-node" style={{ animationDelay: `${i}s` }} />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fill="rgba(197,229,241,.75)" fontSize="13" fontWeight="700" fontFamily="var(--font-kufi)">{i + 1}</text>
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div className="floaty max-w-[56%]">
          <svg viewBox="0 0 24 24" width="54" height="54" className="mx-auto text-accent-300" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M17 2l4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />
          </svg>
          <p className="mx-auto mt-3 max-w-[11ch] text-balance font-kufi text-2xl font-extrabold leading-tight text-white md:text-3xl">{label}</p>
          <p className="mt-1 text-sm text-accent-100/80">{sub}</p>
        </div>
      </div>
    </div>
  );
}

/** مصارف الزكاة الثمانية حول نجمة ثمانية (خاتم) */
export function AsnafStar({ items, center }: { items: readonly string[]; center: string }) {
  return (
    <>
      {/* سطح المكتب: توزيع دائري */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[640px] md:block">
        <div className="absolute inset-[22%] grid place-items-center">
          <Khatam className="absolute h-full w-full animate-[spin_80s_linear_infinite] motion-reduce:animate-none" color="#8acbda" />
          <Khatam className="absolute h-[70%] w-[70%] animate-[spin_60s_linear_infinite_reverse] opacity-60 motion-reduce:animate-none" color="#3aafc9" />
          <div className="relative grid aspect-square w-[58%] place-items-center rounded-full bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,61,85,.45)] ring-8 ring-accent-100"><p className="text-center font-naskh text-xl font-bold leading-relaxed text-teal-900">{center}</p></div>
        </div>
        {items.map((it, i) => {
          const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + 42 * Math.cos(a), y = 50 + 42 * Math.sin(a);
          return (
            <div key={it} className="lift absolute flex w-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-stone-200 bg-white p-3 text-center shadow-sm" style={{ left: `${x}%`, top: `${y}%` }}>
              <span className="num grid h-8 w-8 place-items-center rounded-md bg-accent-500 text-sm font-bold text-white">{i + 1}</span>
              <span className="text-[15px] font-bold leading-snug text-teal-900">{it}</span>
            </div>
          );
        })}
      </div>
      {/* الجوال: شبكة */}
      <ol className="grid grid-cols-2 gap-3 md:hidden">
        {items.map((it, i) => (
          <li key={it} className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
            <span className="num grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent-500 text-sm font-bold text-white">{i + 1}</span>
            <span className="text-sm font-semibold text-teal-900">{it}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
