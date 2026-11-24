"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { projects, type Project } from "@/lib/data";
import { fmt, tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { useCart } from "@/lib/cart";
import SmartImg from "./SmartImg";
import { IconArrow, IconBag, IconCheck, IconRepeat, IconShield, KindIcon } from "./Icons";

type Region = "quds" | "gaza";
const inRegion = (r: Region, p: Project) => (r === "quds" ? p.region === "quds" : p.region !== "quds");

/** اختيار القدس أو غزة ثم البرنامج والمبلغ — يُستخدم في صفحتي العطاء الشهري والزكاة */
export default function RegionGive({ mode }: { mode: "monthly" | "zakat" }) {
  const { lang, f, href } = useI18n();
  const G = f.prog;
  const cart = useCart();
  const router = useRouter();
  const [region, setRegion] = useState<Region>("quds");
  const options = useMemo(
    () => projects.filter((p) => inRegion(region, p) && (mode === "zakat" ? p.kind === "zakat" : p.monthly)),
    [region, mode],
  );
  const [slug, setSlug] = useState(options[0]?.slug ?? "");
  useEffect(() => setSlug(options[0]?.slug ?? ""), [options]);
  const proj = options.find((p) => p.slug === slug) ?? options[0];

  const presets = mode === "zakat" ? [100, 250, 500, 1000, 2500] : [20, 50, 100, 150, 200];
  const [amount, setAmount] = useState(mode === "zakat" ? 250 : 50);
  const [months, setMonths] = useState(12);
  const [day, setDay] = useState(1);
  const [custom, setCustom] = useState("");
  const [fromCalc, setFromCalc] = useState(false);
  const [added, setAdded] = useState(false);
  const value = custom ? Number(custom) || 0 : amount;

  // استقبال المبلغ من حاسبة الزكاة
  useEffect(() => {
    if (mode !== "zakat") return;
    const on = (e: Event) => {
      const v = Math.round((e as CustomEvent<number>).detail);
      if (v > 0) {
        setCustom(String(v));
        setFromCalc(true);
        document.getElementById("give")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("burak:zakat-amount", on);
    return () => window.removeEventListener("burak:zakat-amount", on);
  }, [mode]);

  const freq = mode === "monthly" ? "monthly" : "once";
  const add = () => proj && value > 0 && cart.add({ slug: proj.slug, amount: value, freq, ...(mode === "monthly" ? { months, day } : {}) });
  const regionImg = (r: Region) => projects.find((p) => inRegion(r, p) && p.image && (mode === "zakat" ? p.kind === "zakat" : p.monthly))?.image;

  return (
    <div id="give" className="scroll-mt-28 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
      <div className="grid content-start gap-6">
        {/* 1) الوجهة */}
        <section className="rounded-2xl border border-stone-200 bg-white p-5 md:p-6">
          <h2 className="flex items-center gap-3 font-kufi text-xl font-bold text-teal-900">
            <span className="num grid h-8 w-8 place-items-center rounded-md bg-accent-500 text-sm text-white">1</span>
            {G.regionT}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {(["quds", "gaza"] as const).map((r) => {
              const on = region === r;
              return (
                <button key={r} type="button" aria-pressed={on} onClick={() => setRegion(r)}
                  className={`group relative h-40 overflow-hidden rounded-xl sm:h-44 text-start text-white transition ${on ? "ring-4 ring-accent-500 ring-offset-2" : "opacity-90 hover:opacity-100"}`}>
                  <div className={`absolute inset-0 ${r === "quds" ? "bg-accent-700" : "bg-accent-600"}`} />
                  <SmartImg src={regionImg(r)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-700/95 via-accent-700/45 to-transparent" />
                  <span className={`absolute end-3 top-3 grid h-7 w-7 place-items-center rounded-full border-2 ${on ? "border-white bg-accent-500" : "border-white/80 bg-black/10"}`}>
                    {on && <IconCheck size={14} />}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <span className="brand-label font-kufi text-xl font-extrabold sm:text-2xl">{G[r].t}</span>
                    <span className="mt-2 line-clamp-2 block text-xs leading-5 text-white/90 sm:text-sm sm:leading-6">{G[r].d}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2) البرنامج — للعطاء الشهري فقط */}
        {mode === "monthly" && (
          <section className="rounded-2xl border border-stone-200 bg-white p-5 md:p-6">
            <h2 className="flex items-center gap-3 font-kufi text-xl font-bold text-teal-900">
              <span className="num grid h-8 w-8 place-items-center rounded-md bg-accent-500 text-sm text-white">2</span>
              {G.programT}
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {options.map((p) => {
                const on = proj?.slug === p.slug;
                return (
                  <button key={p.slug} type="button" aria-pressed={on} onClick={() => setSlug(p.slug)}
                    className={`flex items-start gap-3 rounded-xl border p-3 text-start transition ${on ? "border-accent-500 bg-accent-100/60" : "border-stone-200 hover:border-accent-400"}`}>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${on ? "bg-accent-500 text-white" : "bg-stone-100 text-accent-600"}`}>
                      <KindIcon kind={p.kind} size={22} />
                    </span>
                    <span>
                      <b className="block font-kufi text-[15px] text-teal-900">{tx(p.title, lang)}</b>
                      <span className="mt-0.5 line-clamp-2 block text-xs leading-5 text-muted">{tx(p.summary, lang)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* 3) المبلغ */}
        <section className="rounded-2xl border border-stone-200 bg-white p-5 md:p-6">
          <h2 className="flex items-center gap-3 font-kufi text-xl font-bold text-teal-900">
            <span className="num grid h-8 w-8 place-items-center rounded-md bg-accent-500 text-sm text-white">{mode === "monthly" ? 3 : 2}</span>
            {G.amountT}
            {mode === "monthly" && <span className="rounded bg-accent-100 px-2 py-0.5 text-xs font-bold text-accent-700">{G.perMonth}</span>}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2 sm:grid sm:grid-cols-5">
            {presets.map((v) => {
              const on = !custom && amount === v;
              return (
                <button key={v} type="button" aria-pressed={on} onClick={() => { setAmount(v); setCustom(""); setFromCalc(false); }}
                  className={`num h-12 flex-[1_1_30%] rounded-lg border text-lg font-bold transition ${on ? "border-accent-500 bg-accent-500 text-white" : "border-stone-200 text-teal-900 hover:border-accent-400"}`}>
                  ${fmt(v)}
                </button>
              );
            })}
          </div>
          <label className="relative mt-3 block">
            <span className="sr-only">{G.other}</span>
            <span className="pointer-events-none absolute inset-y-0 start-4 grid place-items-center font-bold text-teal-700">$</span>
            <input inputMode="numeric" value={custom} placeholder={G.other}
              onChange={(e) => { setCustom(e.target.value.replace(/[^\d]/g, "")); setFromCalc(false); }}
              className="num h-12 w-full rounded-lg border border-stone-200 bg-stone-50 pe-4 ps-9 text-lg font-bold text-teal-900 focus:border-accent-400 focus:bg-white" />
          </label>
          {mode === "monthly" && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold text-muted">{G.months}
                <select value={months} onChange={(e) => setMonths(Number(e.target.value))} className="h-12 rounded-lg border border-stone-200 bg-stone-50 px-3 text-base font-semibold text-teal-900 focus:border-accent-400">
                  {Array.from({ length: 10 }, (_, i) => i + 3).map((m) => <option key={m} value={m}>{(lang === "ar" && m > 10 ? "{n} شهراً" : G.monthsN).replace("{n}", String(m))}</option>)}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-muted">{G.day}
                <select value={day} onChange={(e) => setDay(Number(e.target.value))} className="h-12 rounded-lg border border-stone-200 bg-stone-50 px-3 text-base font-semibold text-teal-900 focus:border-accent-400">
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>
            </div>
          )}
          {fromCalc && <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-accent-600"><IconCheck size={15} /> {G.z.fromCalc}</p>}
        </section>
      </div>

      {/* الملخص */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="grain relative overflow-hidden rounded-2xl bg-accent-700 text-white shadow-[0_30px_60px_-30px_rgba(0,61,85,.7)]">
          <div className="p-6">
            <p className="text-sm font-semibold text-accent-300">{G.summary}</p>
            <p className="num mt-2 font-kufi text-5xl font-extrabold">
              ${fmt(value)}
              {mode === "monthly" && <span className="ms-2 text-lg font-semibold text-accent-300">/ {G.perMonth}</span>}
            </p>
            {mode === "monthly" && (
              <div className="mt-5" aria-label={G.m.yearT}>
                <p className="mb-2 text-xs font-semibold text-accent-300">{G.m.yearT}</p>
                <div className="grid h-8 grid-cols-12 items-end gap-1">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className={`h-8 rounded-sm transition-all duration-500 ${i < months ? "bg-accent-400" : "bg-white/10"}`}
                      style={{ transitionDelay: `${i * 35}ms`, height: i < months ? `${18 + Math.min(14, (value / 200) * 14)}px` : "10px", alignSelf: "end" }} />
                  ))}
                </div>
              </div>
            )}
            <dl className="mt-5 grid gap-3 border-t border-white/15 pt-5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-accent-300">{G.to}</dt>
                <dd className="text-end font-bold">{G[region].t}</dd>
              </div>
              {mode === "monthly" && (
                <div className="flex justify-between gap-3">
                  <dt className="text-accent-300">{G.months}</dt>
                  <dd className="text-end font-bold">{(lang === "ar" && months > 10 ? "{n} شهراً" : G.monthsN).replace("{n}", String(months))} · {G.dayShort.replace("{d}", String(day))}</dd>
                </div>
              )}
              {mode === "monthly" && (
                <div className="flex justify-between gap-3">
                  <dt className="text-accent-300">{G.total}</dt>
                  <dd className="num text-end font-bold">${fmt(value * months)}</dd>
                </div>
              )}
              {proj && (
                <div className="flex justify-between gap-3">
                  <dt className="flex items-center gap-1.5 text-accent-300">{mode === "monthly" ? <IconRepeat size={14} /> : <KindIcon kind="zakat" size={15} />}</dt>
                  <dd className="text-end font-bold">{tx(proj.title, lang)}</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="grid gap-2 bg-accent-600/40 p-4">
            <button type="button" disabled={!value || !proj}
              onClick={() => { add(); router.push(href("/checkout")); }}
              className="btn-shine flex h-14 items-center justify-center gap-2 rounded-lg bg-white text-lg font-bold text-accent-700 transition hover:bg-accent-100 disabled:opacity-50">
              {mode === "monthly" ? G.giveMonthly : G.giveOnce} <IconArrow size={20} />
            </button>
            <button type="button" disabled={!value || !proj}
              onClick={() => { add(); setAdded(true); setTimeout(() => setAdded(false), 2200); }}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/30 text-sm font-semibold hover:bg-white/10 disabled:opacity-50">
              <IconBag size={17} /> {added ? f.cards.added : G.addCart}
            </button>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-accent-300"><IconShield size={14} /> {G.secure}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
