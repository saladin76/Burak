"use client";

import { CURRENCIES, symbolOf, useCurrency, type CurrencyCode } from "@/lib/currency";
import { useI18n } from "@/lib/lang-context";

/** اختيار العملة — يظهر بجوار اللغات */
export default function CurrencySwitcher({ dark = true, className = "" }: { dark?: boolean; className?: string }) {
  const { lang } = useI18n();
  const { cur, setCur } = useCurrency();
  const label = { ar: "العملة", tr: "Para birimi", en: "Currency" }[lang];
  return (
    <label className={`relative inline-flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-md border pe-6 ps-2 text-[13px] font-semibold ${dark ? "border-white/20 bg-white/5 text-teal-100 hover:border-white/40" : "border-stone-300 bg-white text-teal-900"} ${className}`} dir="ltr">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" suppressHydrationWarning>{cur}<span className="hidden sm:inline"> {symbolOf(cur, lang) !== cur ? symbolOf(cur, lang) : ""}</span></span>
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" className="pointer-events-none absolute end-2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      <select
        value={cur}
        onChange={(e) => setCur(e.target.value as CurrencyCode)}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label={label}
        suppressHydrationWarning
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} — {c.name[lang]}
          </option>
        ))}
      </select>
    </label>
  );
}
