"use client";

import { isRtl } from "@/lib/i18n";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/lang-context";

/** معرض صور ميداني — سلايدر بتلاشٍ ناعم، أسهم، سحب على الجوال، مصغّرات وتشغيل تلقائي هادئ */
export default function PhotoSlider({ photos, alt }: { photos: string[]; alt: string }) {
  const { lang } = useI18n();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [broken, setBroken] = useState<Record<string, true>>({});
  const list = photos.filter((p) => !broken[p]);
  const n = list.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % Math.max(1, n)), [n]);
  const thumbs = useRef<HTMLDivElement>(null);
  const touch = useRef(0);
  const rtl = isRtl(lang);

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [paused, n, go]);

  useEffect(() => {
    thumbs.current?.querySelector<HTMLElement>(`[data-i="${i}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [i]);

  if (!n) return null;
  const prev = () => go(-1), next = () => go(1);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
      <div
        className="relative aspect-[4/3] max-h-[72vh] w-full overflow-hidden rounded-2xl bg-teal-900 md:aspect-[16/9]"
        role="region" aria-roledescription="carousel" aria-label={alt}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) (dx < 0) !== rtl ? next() : prev();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") rtl ? next() : prev();
          if (e.key === "ArrowRight") rtl ? prev() : next();
        }}
        tabIndex={0}
      >
        {list.map((src, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={`${alt} ${k + 1}`} loading={k < 2 ? "eager" : "lazy"} decoding="async"
            onError={() => setBroken((b) => ({ ...b, [src]: true }))}
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out ${k === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
            aria-hidden={k !== i} />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
        <span className="num absolute bottom-4 start-4 rounded-md bg-black/45 px-3 py-1 text-sm font-semibold text-white backdrop-blur" aria-live="polite" dir="ltr">{i + 1} / {n}</span>
        {(["prev", "next"] as const).map((d) => (
          <button key={d} type="button" onClick={d === "prev" ? prev : next} aria-label={d === "prev" ? "‹" : "›"}
            className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 md:h-12 md:w-12 place-items-center rounded-full bg-white/90 text-teal-900 shadow-lg transition hover:bg-white ${d === "prev" ? "start-3 md:start-4" : "end-3 md:end-4"}`}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={d === "prev" ? "rtl:rotate-180" : "rotate-180 rtl:rotate-0"}><path d="m15 18-6-6 6-6" /></svg>
          </button>
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          {!paused && <div key={i} className="slide-progress h-full origin-left bg-accent-400 rtl:origin-right" />}
        </div>
      </div>
      <div ref={thumbs} className="mt-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {list.map((src, k) => (
          <button key={src} data-i={k} type="button" onClick={() => setI(k)} aria-label={`${k + 1}`} aria-current={k === i}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition md:h-20 md:w-32 ${k === i ? "ring-4 ring-accent-500" : "opacity-60 hover:opacity-100"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
