"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/lang-context";

/* «الآن في القدس» — توقيت القدس والتاريخ الهجري الحي */
export default function JerusalemClock({ light = false }: { light?: boolean } = {}) {
  const { lang, t } = useI18n();
  const loc = lang === "ar" ? "ar-EG" : lang === "tr" ? "tr-TR" : "en-GB";
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
    <div className={`inline-flex items-center gap-3 rounded-lg border px-4 py-2.5 backdrop-blur ${light ? "border-accent-300/50 bg-white/70" : "border-white/10 bg-white/5"}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400" />
      </span>
      <span className={`text-sm ${light ? "text-teal-700" : "text-teal-100"}`}>
        {t.hero.nowIn} <b className={`mx-1 font-kufi text-base ${light ? "text-teal-900" : "text-white"}`} suppressHydrationWarning>{time}</b>
        <span className={light ? "text-teal-600" : "text-teal-100/70"} suppressHydrationWarning>{hijri}</span>
      </span>
    </div>
  );
}
