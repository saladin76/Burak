"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { langNames, locales, type Lang } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { IconGlobe } from "./Icons";

/** قائمة اختيار اللغة (7 لغات) */
export default function LangSwitcher({ hrefFor }: { hrefFor: (l: Lang) => string }) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", close); };
  }, [open]);
  const label = { ar: "اللغة", tr: "Dil", en: "Language", fr: "Langue", de: "Sprache", id: "Bahasa", ur: "زبان" }[lang];
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" aria-label={label}
        className="flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md border border-white/20 bg-white/5 pe-2 ps-2 text-[13px] font-semibold text-teal-100 hover:border-white/40">
        <IconGlobe size={15} />
        <span>{lang.toUpperCase()}</span>
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true" className={open ? "rotate-180" : ""}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <ul role="menu" className="absolute end-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-xl border border-stone-200 bg-white py-1.5 text-teal-900 shadow-[0_20px_50px_-20px_rgba(0,61,85,.5)]">
          {locales.map((l) => (
            <li key={l} role="none">
              <Link role="menuitem" href={hrefFor(l)} hrefLang={l} lang={l} onClick={() => setOpen(false)} aria-current={l === lang ? "true" : undefined}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 text-[15px] hover:bg-stone-50 ${l === lang ? "font-bold text-accent-600" : ""}`}>
                <span dir={l === "ar" || l === "ur" ? "rtl" : "ltr"}>{langNames[l]}</span>
                <span className="text-xs font-semibold text-muted">{l.toUpperCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
