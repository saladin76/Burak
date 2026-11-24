"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/lang-context";

/* «الآن في القدس» — توقيت القدس والتاريخ الهجري الحي */
export default function JerusalemClock() {
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
    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-400" />
      </span>
      <span className="text-sm text-teal-100">
        {t.hero.nowIn} <b className="mx-1 font-kufi text-base text-white" suppressHydrationWarning>{time}</b>
        <span className="text-teal-100/70" suppressHydrationWarning>{hijri}</span>
      </span>
    </div>
  );
}
