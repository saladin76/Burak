"use client";

import { BurakLogo, GivingRings, Khatam, OrnamentDivider } from "./Motifs";
import { KindIcon } from "./Icons";
import QR from "./QR";
import type { Lang } from "@/lib/i18n";

export type CertProps = {
  lang: Lang;
  variant: "donation" | "gift" | "teacher" | "lamp";
  heading: string;
  occasion?: string;
  toLabel: string;
  name: string;
  body: string;
  projects?: string[];
  msg?: string;
  from?: { label: string; name: string };
  dua?: string;
  refNo: string;
  refLabel: string;
  date: Date;
  dateLabel: string;
  sign: string;
  verifyLabel: string;
  verifyUrl: string;
  lamps?: number;
};

const palette: Record<CertProps["variant"], { ring: string[]; accent: string }> = {
  donation: { ring: ["#399bb6", "#52a6c0", "#3aafc9", "#64b6d0", "#8acbda", "#aeddec", "#c5e5f1"], accent: "#007da5" },
  gift: { ring: ["#3aafc9", "#3aafc9", "#8acbda", "#64b6d0", "#64b6d0", "#8acbda", "#dff1f7"], accent: "#007da5" },
  teacher: { ring: ["#007da5", "#3aafc9", "#3aafc9", "#8acbda", "#64b6d0", "#8acbda", "#aeddec"], accent: "#003d55" },
  lamp: { ring: ["#3aafc9", "#64b6d0", "#8acbda", "#dff1f7", "#3aafc9", "#8acbda", "#dff1f7"], accent: "#007da5" },
};

/* شهادة A4 أفقية تتدرّج أحجامها مع عرض الحاوية (cqw) وتُطبع كما هي */
export default function Certificate(p: CertProps) {
  const pal = palette[p.variant];
  const dark = p.variant === "lamp";
  const loc = p.lang === "ar" ? "ar-EG" : p.lang === "tr" ? "tr-TR" : "en-GB";
  const greg = new Intl.DateTimeFormat(loc, { day: "numeric", month: "long", year: "numeric" }).format(p.date);
  const hijri = new Intl.DateTimeFormat(p.lang === "ar" ? "ar-SA-u-ca-islamic-umalqura-nu-arab" : `${loc}-u-ca-islamic-umalqura`, { day: "numeric", month: "long", year: "numeric" }).format(p.date);
  const fg = dark ? "text-white" : "text-teal-900";
  const sub = dark ? "text-teal-100" : "text-ink/75";

  return (
    <div className="cert-page @container w-full">
      <div className={`relative aspect-[297/210] w-full overflow-hidden ${dark ? "bg-night" : "bg-[#fbf8f2]"} shadow-[0_30px_80px_-40px_rgba(0,61,85,.6)] print:shadow-none`}>
        {/* حلقات العطاء */}
        <GivingRings className="pointer-events-none absolute -bottom-[38%] -end-[18%] w-[62%]" palette={pal.ring} opacity={dark ? 0.35 : 0.28} />
        <GivingRings className="pointer-events-none absolute -start-[14%] -top-[30%] w-[36%]" palette={pal.ring} opacity={dark ? 0.2 : 0.14} rings={5} />
        <div className="pattern-khatam-teal absolute inset-0 opacity-30" />
        {/* إطار مزدوج */}
        <div className="absolute inset-[2.2cqw] rounded-[1.4cqw] border-[0.35cqw]" style={{ borderColor: pal.accent }} />
        <div className="absolute inset-[3cqw] rounded-[1cqw] border-[0.12cqw] border-accent-500/70" />
        {["start-[1.55cqw] top-[1.55cqw]", "end-[1.55cqw] top-[1.55cqw]", "start-[1.55cqw] bottom-[1.55cqw]", "end-[1.55cqw] bottom-[1.55cqw]"].map((c) => (
          <span key={c} className={`absolute ${c} grid h-[2.2cqw] w-[2.2cqw] place-items-center rounded-full ${dark ? "bg-night" : "bg-[#fbf8f2]"}`}>
            <Khatam className="h-[2cqw] w-[2cqw]" color="#3aafc9" />
          </span>
        ))}

        {p.variant === "lamp" && (
          <div className="pointer-events-none absolute inset-x-[12cqw] top-[3.2cqw] flex justify-between" aria-hidden="true">
            {[4, 7, 3, 9, 5, 8, 4, 6, 3].map((h, i) => (
              <span key={i} className="flex flex-col items-center">
                <span className="w-px bg-brass/70" style={{ height: `${h}cqw` }} />
                <span className="h-[2.4cqw] w-[1.6cqw] rounded-b-full rounded-t-[0.4cqw] border border-brass bg-flame shadow-[0_0_1.6cqw_rgba(235,205,122,.9)]" />
              </span>
            ))}
          </div>
        )}

        <div className={`relative flex h-full flex-col items-center px-[9cqw] text-center ${p.variant === "lamp" ? "pt-[10cqw]" : "pt-[5.2cqw]"} pb-[4.6cqw]`}>
          <BurakLogo latin={p.lang !== "ar"} light={dark} className="h-[7cqw]" />
          {p.occasion && <p className="mt-[1.2cqw] font-semibold text-accent-600" style={{ fontSize: "1.45cqw" }}>{p.occasion}</p>}
          <h2 className={`mt-[0.8cqw] font-kufi font-bold ${fg}`} style={{ fontSize: "3.6cqw", lineHeight: 1.2 }}>
            {p.heading}
          </h2>
          <OrnamentDivider className="my-[1cqw] h-[1.4cqw] w-[20cqw]" />
          <p className={sub} style={{ fontSize: "1.45cqw" }}>{p.toLabel}</p>
          <p className="font-kufi font-bold text-accent-600" style={{ fontSize: "4.2cqw", lineHeight: 1.25 }} dir="auto">
            {p.name || "—"}
          </p>
          <p className={`mt-[1cqw] max-w-[70cqw] ${sub}`} style={{ fontSize: "1.55cqw", lineHeight: 1.75 }}>
            {p.body}
          </p>
          {!!p.projects?.length && (
            <p className={`mt-[0.6cqw] flex items-center gap-[0.8cqw] font-bold ${fg}`} style={{ fontSize: "1.7cqw" }}>
              <KindIcon kind={p.variant === "lamp" ? "aqsa" : p.variant === "teacher" ? "education" : "rebuild"} size={18} className="h-[2cqw] w-[2cqw] text-accent-500" />
              {p.projects.join(" · ")}
            </p>
          )}
          {p.msg && (
            <p className={`mt-[0.8cqw] max-w-[60cqw] italic ${sub}`} style={{ fontSize: "1.4cqw" }} dir="auto">
              “{p.msg}”
            </p>
          )}
          {p.from && (
            <p className={sub} style={{ fontSize: "1.4cqw", marginTop: "0.6cqw" }}>
              {p.from.label}: <b className={fg}>{p.from.name}</b>
            </p>
          )}
          {p.dua && <p className="mt-[0.6cqw] font-naskh text-accent-600" style={{ fontSize: "1.6cqw" }}>{p.dua}</p>}

          {/* التذييل: التاريخ والرقم — الختم — التحقق والتوقيع */}
          <div className="mt-auto grid w-full grid-cols-3 items-end" style={{ fontSize: "1.15cqw" }}>
            <div className={`text-start ${sub}`}>
              <p>{p.dateLabel}: <b className={fg}>{greg}</b></p>
              <p className="opacity-80">{hijri}</p>
              <p className="mt-[0.3cqw]">{p.refLabel}: <b className={`font-mono ${fg}`} dir="ltr">{p.refNo}</b></p>
            </div>
            <div className="flex justify-center">
              <span className="relative grid h-[9cqw] w-[9cqw] place-items-center rounded-full border-[0.25cqw] border-accent-500 text-accent-600">
                <span className="absolute inset-[0.6cqw] rounded-full border border-dashed border-accent-500/70" />
                <Khatam className="h-[4.4cqw] w-[4.4cqw]" color="#3aafc9" />
                <span className="absolute bottom-[1.2cqw] font-kufi font-bold" style={{ fontSize: "0.95cqw" }}>{p.lang === "ar" ? "البراق" : "BURAK"}</span>
              </span>
            </div>
            <div className="flex items-end justify-end gap-[1.2cqw]">
              <div className={`text-end ${sub}`}>
                <span className="mb-[0.4cqw] block h-px w-[16cqw] bg-current opacity-40" />
                <p className={`font-bold ${fg}`}>{p.sign}</p>
                <p className="opacity-80">{p.verifyLabel}</p>
              </div>
              <QR value={p.verifyUrl} className="h-[6.5cqw] w-[6.5cqw] rounded-[0.4cqw] bg-white p-[0.4cqw]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
