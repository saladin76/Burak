"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, regionLabel, type Kind } from "@/lib/data";
import { tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { IconArrow, IconClose, KindIcon } from "./Icons";
import { Khatam } from "./Motifs";

/* «مساعد العطاء» — ثلاثة أسئلة سريعة تقترح المشروع الأنسب */
type Where = "quds" | "gaza" | "any";
type What = "food" | "water" | "learn" | "build" | "zakat" | "any";
type How = "once" | "monthly";

const whereKeys = ["quds", "gaza", "any"] as const;
const whatOpts = [
  { v: "food", k: "food" },
  { v: "water", k: "water" },
  { v: "learn", k: "quran" },
  { v: "build", k: "rebuild" },
  { v: "zakat", k: "zakat" },
  { v: "any", k: "support" },
] as const;
const howKeys = ["once", "monthly"] as const;

const whatKinds: Record<What, Kind[]> = {
  food: ["food"],
  water: ["water"],
  learn: ["quran", "education"],
  build: ["rebuild"],
  zakat: ["zakat"],
  any: [],
};

export default function GivingAssistant() {
  const { lang, t, href } = useI18n();
  const A = t.assistant;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [where, setWhere] = useState<Where>("any");
  const [what, setWhat] = useState<What>("any");
  const [how, setHow] = useState<How>("once");

  const picks = useMemo(() => {
    return projects
      .map((p) => {
        let s = 0;
        if (where === "any" || (where === "quds" ? p.region === "quds" : p.region !== "quds")) s += 3;
        if (what === "any" || whatKinds[what].includes(p.kind)) s += 4;
        if (how === "monthly" && p.monthly) s += 2;
        if (how === "monthly" && !p.monthly) s -= 3;
        if (p.urgent && where === "any") s += 1;
        if (p.featured) s += 0.5;
        return { p, s };
      })
      .sort((a, b) => b.s - a.s)
      .slice(0, 2)
      .map((x) => x.p);
  }, [where, what, how]);

  const reset = () => {
    setStep(0);
    setWhere("any");
    setWhat("any");
    setHow("once");
  };

  const Opt = ({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) => (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 py-2 text-start text-[15px] font-semibold transition ${
        on ? "border-gold-500 bg-gold-100 text-gold-700" : "border-stone-200 bg-white text-teal-900 hover:border-teal-500"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed bottom-24 end-4 z-40 lg:bottom-5 lg:end-5">
      {open && (
        <div role="dialog" aria-label={A.name} className="rise absolute bottom-16 end-0 w-[min(92vw,380px)] overflow-hidden rounded-[24px] border border-stone-200 bg-stone-50 shadow-[0_30px_80px_-20px_rgba(1,64,78,.6)]">
          <div className="relative bg-teal-900 px-5 py-4 text-white">
            <div className="pattern-khatam absolute inset-0 opacity-20" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="font-kufi text-lg font-bold">{A.name}</p>
                <p className="text-xs text-teal-100">{A.sub}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label={t.common.close} className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10">
                <IconClose size={20} />
              </button>
            </div>
            <div className="relative mt-3 flex gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-gold-400" : "bg-white/15"}`} />
              ))}
            </div>
          </div>

          <div className="p-5">
            {step === 0 && (
              <>
                <p className="mb-3 font-bold text-teal-900">{A.q1}</p>
                <div className="grid gap-2">
                  {whereKeys.map((v) => (
                    <Opt key={v} on={where === v} onClick={() => { setWhere(v); setStep(1); }}>
                      <Khatam className="h-4 w-4" color="#c99a2e" /> {A.where[v]}
                    </Opt>
                  ))}
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <p className="mb-3 font-bold text-teal-900">{A.q2}</p>
                <div className="grid grid-cols-2 gap-2">
                  {whatOpts.map((o) => (
                    <Opt key={o.v} on={what === o.v} onClick={() => { setWhat(o.v); setStep(2); }}>
                      <KindIcon kind={o.k} size={20} className="shrink-0 text-teal-700" /> {A.what[o.v]}
                    </Opt>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <p className="mb-3 font-bold text-teal-900">{A.q3}</p>
                <div className="grid grid-cols-2 gap-2">
                  {howKeys.map((v) => (
                    <Opt key={v} on={how === v} onClick={() => { setHow(v); setStep(3); }}>
                      {v === "once" ? t.common.once : t.common.monthly}
                    </Opt>
                  ))}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <p className="mb-3 font-bold text-teal-900">{A.result}</p>
                <div className="grid gap-2">
                  {picks.map((p) => (
                    <Link
                      key={p.slug}
                      href={href(`/projects/${p.slug}${how === "monthly" && p.monthly ? "?freq=monthly" : ""}`)}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 hover:border-teal-500"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-t-full rounded-b-md bg-teal-900 text-gold-300">
                        <KindIcon kind={p.kind} size={22} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-bold text-teal-900">{tx(p.title, lang)}</span>
                        <span className="text-xs text-muted">{tx(regionLabel[p.region], lang)}{p.monthly ? ` · ${t.common.regular}` : ""}</span>
                      </span>
                      <IconArrow size={18} className="ms-auto shrink-0 text-teal-500" />
                    </Link>
                  ))}
                </div>
                <button onClick={reset} className="mt-3 text-sm font-semibold text-teal-700 hover:underline">{A.restart}</button>
              </>
            )}
            {step > 0 && step < 3 && (
              <button onClick={() => setStep((s) => s - 1)} className="mt-3 text-sm font-semibold text-muted hover:text-teal-900">{t.common.back}</button>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={A.name}
        className="flex h-14 items-center gap-2 rounded-full bg-teal-900 p-2 font-bold sm:pe-5 text-white shadow-[0_14px_40px_-12px_rgba(1,64,78,.9)] hover:bg-teal-700"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500 text-night">
          <Khatam className="h-6 w-6" color="#011f2c" />
        </span>
        <span className="hidden sm:inline">{A.name}</span>
      </button>
    </div>
  );
}
