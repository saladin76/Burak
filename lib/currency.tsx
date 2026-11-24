"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "./i18n";

/**
 * العملات — المبالغ داخلياً بالدولار الأمريكي، وتُعرض بعملة الزائر.
 * أسعار الصرف إرشادية (open.er-api.com بتاريخ RATES_DATE)، ويجب أن تأتي
 * الأسعار الفعلية من بوابة الدفع عند تفعيلها.
 */
export const RATES_DATE = "2026-11-24";

export type CurrencyCode = "USD" | "TRY" | "EUR" | "SAR" | "AED" | "KWD" | "QAR" | "BHD" | "OMR";
export const CURRENCIES: { code: CurrencyCode; rate: number; ar: string; name: Record<Lang, string> }[] = [
  { code: "USD", rate: 1, ar: "$", name: { ar: "دولار أمريكي", tr: "ABD Doları", en: "US Dollar" } },
  { code: "TRY", rate: 50.621508, ar: "₺", name: { ar: "ليرة تركية", tr: "Türk Lirası", en: "Turkish Lira" } },
  { code: "EUR", rate: 0.915641, ar: "€", name: { ar: "يورو", tr: "Euro", en: "Euro" } },
  { code: "SAR", rate: 3.75, ar: "ر.س", name: { ar: "ريال سعودي", tr: "Suudi Riyali", en: "Saudi Riyal" } },
  { code: "AED", rate: 3.6725, ar: "د.إ", name: { ar: "درهم إماراتي", tr: "BAE Dirhemi", en: "UAE Dirham" } },
  { code: "KWD", rate: 0.311688, ar: "د.ك", name: { ar: "دينار كويتي", tr: "Kuveyt Dinarı", en: "Kuwaiti Dinar" } },
  { code: "QAR", rate: 3.64, ar: "ر.ق", name: { ar: "ريال قطري", tr: "Katar Riyali", en: "Qatari Riyal" } },
  { code: "BHD", rate: 0.376, ar: "د.ب", name: { ar: "دينار بحريني", tr: "Bahreyn Dinarı", en: "Bahraini Dinar" } },
  { code: "OMR", rate: 0.384497, ar: "ر.ع", name: { ar: "ريال عُماني", tr: "Umman Riyali", en: "Omani Rial" } },
];
const byCode = Object.fromEntries(CURRENCIES.map((c) => [c.code, c])) as Record<CurrencyCode, (typeof CURRENCIES)[number]>;

export const rateOf = (code?: CurrencyCode) => byCode[code ?? "USD"].rate;

/** تقريب «لطيف» لمبالغ الاختيار السريع حسب حجم الرقم */
export function nice(x: number) {
  if (x <= 0) return 0;
  const step = x < 5 ? 0.5 : x < 20 ? 1 : x < 100 ? 5 : x < 1000 ? 10 : x < 10000 ? 50 : x < 100000 ? 500 : 1000;
  return Math.max(step, Math.round(x / step) * step);
}

const PREFIX: CurrencyCode[] = ["USD", "TRY", "EUR"];
export function symbolOf(code: CurrencyCode, lang: Lang = "en") {
  const c = byCode[code];
  if (PREFIX.includes(code)) return c.ar;
  return lang === "ar" ? c.ar : code;
}
export function formatMoney(local: number, code: CurrencyCode, lang: Lang = "en") {
  const frac = Math.abs(local) < 20 && local % 1 !== 0 ? 2 : 0;
  const n = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: frac }).format(local);
  const sym = symbolOf(code, lang);
  if (PREFIX.includes(code)) return `${sym}${n}`;
  // عربي: «750 ر.س» داخل عزل اتجاه من اليمين لليسار حتى لا ينقلب الترتيب
  return lang === "ar" ? `\u2067${n} ${sym}\u2069` : `${sym} ${n}`;
}

type Ctx = {
  cur: CurrencyCode;
  setCur: (c: CurrencyCode) => void;
  rate: number;
  symbol: string;
  /** اسم العملة بلغة الزائر */
  name: string;
  /** دولار ← عملة محلية (اختيارياً مقرّبة تقريباً لطيفاً) */
  toLocal: (usd: number, round?: boolean) => number;
  /** عملة محلية ← دولار */
  toUsd: (local: number) => number;
  /** يحوّل مبلغاً بالدولار إلى نص بعملة الزائر */
  money: (usd: number, opts?: { nice?: boolean; code?: CurrencyCode }) => string;
  /** مبلغ دولاري مضبوط بحيث يظهر رقماً لطيفاً بالعملة المحلية */
  pick: (usd: number) => number;
};

const CurrencyCtx = createContext<Ctx | null>(null);
const KEY = "burak-currency-v1";

export function CurrencyProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const [cur, setCurState] = useState<CurrencyCode>(lang === "tr" ? "TRY" : "USD");
  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY) as CurrencyCode | null;
      if (s && byCode[s]) setCurState(s);
    } catch {}
  }, []);
  const setCur = useCallback((c: CurrencyCode) => {
    setCurState(c);
    try { localStorage.setItem(KEY, c); } catch {}
  }, []);
  const value = useMemo<Ctx>(() => {
    const rate = byCode[cur].rate;
    const toLocal = (usd: number, round = false) => (round ? nice(usd * rate) : usd * rate);
    const toUsd = (local: number) => local / rate;
    return {
      cur, setCur, rate, symbol: symbolOf(cur, lang), name: byCode[cur].name[lang], toLocal, toUsd,
      pick: (usd) => toUsd(toLocal(usd, true)),
      money: (usd, o) => {
        const code = o?.code ?? cur;
        const r = byCode[code].rate;
        const local = o?.nice ? nice(usd * r) : Math.round(usd * r * 100) / 100;
        return formatMoney(local % 1 && Math.abs(local) >= 20 ? Math.round(local) : local, code, lang);
      },
    };
  }, [cur, setCur, lang]);
  return <CurrencyCtx.Provider value={value}>{children}</CurrencyCtx.Provider>;
}

export function useCurrency() {
  const c = useContext(CurrencyCtx);
  if (!c) throw new Error("useCurrency outside CurrencyProvider");
  return c;
}
