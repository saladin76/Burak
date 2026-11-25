"use client";

import { localeOf } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/lang-context";

/* «الآن في القدس» — توقيت القدس والتاريخ الهجري الحي */
export default function JerusalemClock({ light = false }: { light?: boolean } = {}) {
  const { lang, t } = useI18n();
  const loc = localeOf(lang);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat(loc, { timeZone: "Asia/Jerusalem", hour: "numeric", minute: "2-digit" }).format(now)
    : "—";
  const hijri = now
    ? new Intl.DateTimeFormat(lang === "ar" ? "ar-SA-u-ca-islamic-umalqura-nu-arab" : `${loc}-u-ca-islamic-umalqura`, {
        timeZone: "Asia/Jerusalem",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now)
    : "";

  return (
    <div className={`inline-flex items-center gap-3 rounded-lg border py-2 ps-2 pe-4 backdrop-blur ${light ? "border-accent-300/50 bg-white/70" : "border-white/10 bg-white/5"}`}>
      <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full ${light ? "bg-accent-500 text-white" : "bg-white/10 text-accent-300"}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
        <span className="absolute -end-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22c55e]" />
      </span>
      <span className={`text-sm ${light ? "text-teal-700" : "text-teal-100"}`}>
        {t.hero.nowIn} <b className={`mx-1 inline-block font-kufi text-base ${light ? "text-teal-900" : "text-white"}`} dir={lang === "ar" ? undefined : "ltr"} suppressHydrationWarning>{time}</b>
        <bdi className={light ? "text-teal-600" : "text-teal-100/70"} suppressHydrationWarning>{hijri}</bdi>
      </span>
    </div>
  );
}
