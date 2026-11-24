"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/lang-context";
import { IconCheck, IconArrow } from "./Icons";
import { GivingRings, Khatam } from "./Motifs";

type V = {
  firstName: string; lastName: string; email: string; phone: string; country: string; city: string; birthYear: string;
  langs: number[]; areas: string[]; skills: string;
  days: number; hours: number; mode: number; start: string; exp: string; heard: number;
  privacy: boolean; contact: boolean;
};
const empty: V = {
  firstName: "", lastName: "", email: "", phone: "", country: "", city: "", birthYear: "",
  langs: [], areas: [], skills: "", days: 2, hours: 0, mode: 2, start: "", exp: "", heard: 0, privacy: false, contact: true,
};
const KEY = "burak-volunteer-draft";

/* نموذج تطوع احترافي متعدد الخطوات مع تحقق وحفظ مسودة */
export default function VolunteerForm() {
  const { t, f, href } = useI18n();
  const F = f.vol;
  const [v, setV] = useState<V>(empty);
  const [step, setStep] = useState(0);
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState("");
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const r = localStorage.getItem(KEY);
      if (r) setV({ ...empty, ...JSON.parse(r) });
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(v));
    } catch {}
  }, [v]);

  const set = <K extends keyof V>(k: K, val: V[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    setErr((e) => ({ ...e, [k]: "" }));
  };
  const toggle = (k: "langs" | "areas", x: never) => set(k, (v[k] as never[]).includes(x) ? ((v[k] as never[]).filter((y) => y !== x) as never) : ([...(v[k] as never[]), x] as never));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      (["firstName", "lastName", "email", "phone", "city"] as const).forEach((k) => !v[k].trim() && (e[k] = F.required));
      if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = F.invalidEmail;
    }
    if (s === 1 && !v.areas.length) e.areas = F.chooseOne;
    if (s === 3 && !v.privacy) e.privacy = F.mustConsent;
    setErr(e);
    return !Object.keys(e).length;
  };
  const go = (n: number) => {
    setStep(n);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const next = () => validate(step) && go(step + 1);

  const input = (bad?: string) =>
    `h-12 w-full rounded-xl border bg-stone-50 px-4 text-base text-ink focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 ${bad ? "border-red-400" : "border-stone-300 focus:border-teal-500"}`;
  const Field = ({ k, label, type = "text", ltr = false, optional = false, ac }: { k: "firstName" | "lastName" | "email" | "phone" | "country" | "city" | "birthYear"; label: string; type?: string; ltr?: boolean; optional?: boolean; ac?: string }) => (
    <label className="grid gap-1.5 text-sm font-semibold text-muted">
      <span>{label} {!optional && <span className="text-red-500">*</span>}</span>
      <input type={type} value={v[k]} autoComplete={ac} dir={ltr ? "ltr" : undefined} onChange={(e) => set(k, e.target.value)} aria-invalid={!!err[k]} className={input(err[k])} />
      {err[k] && <span className="text-xs text-red-600" role="alert">{err[k]}</span>}
    </label>
  );
  const Chips = ({ opts, val, on }: { opts: string[]; val: number; on: (i: number) => void }) => (
    <div className="flex flex-wrap gap-2">
      {opts.map((o, i) => (
        <button type="button" key={o} aria-pressed={val === i} onClick={() => on(i)}
          className={`h-11 rounded-xl border px-4 text-[15px] font-semibold transition ${val === i ? "border-teal-900 bg-teal-900 text-white" : "border-stone-300 bg-white text-teal-900 hover:border-teal-500"}`}>
          {o}
        </button>
      ))}
    </div>
  );

  if (done)
    return (
      <div className="relative overflow-hidden rounded-[32px] bg-night p-10 text-center text-white md:p-16" role="status">
        <GivingRings className="pointer-events-none absolute -bottom-1/2 left-1/2 w-[120%] -translate-x-1/2" opacity={0.25} />
        <div className="relative">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold-500 text-night"><IconCheck size={40} /></span>
          <h2 className="mt-6 font-kufi text-4xl font-bold text-gold-300">{F.doneT}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-9 text-teal-100">{F.doneD}</p>
          <p className="mt-6 inline-flex rounded-full bg-white/10 px-5 py-2 text-sm">{F.doneRef}: <b className="ms-2 font-mono text-gold-300" dir="ltr">{done}</b></p>
          <ul className="mx-auto mt-8 grid max-w-xl gap-3 text-start">
            {F.doneNext.map((x) => <li key={x} className="flex items-center gap-3"><Khatam className="h-5 w-5 shrink-0" color="#ebcd7a" /> {x}</li>)}
          </ul>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={href("/projects?region=quds")} className="inline-flex h-12 items-center gap-2 rounded-full bg-gold-500 px-6 font-bold text-night">{t.hero.cta2} <IconArrow size={18} /></Link>
            <button onClick={() => { setDone(""); setV(empty); setStep(0); }} className="h-12 rounded-full border border-white/25 px-6 font-semibold">{F.newForm}</button>
          </div>
        </div>
      </div>
    );

  const Row = ({ k, val, s }: { k: string; val: string; s: number }) => (
    <div className="flex items-start justify-between gap-4 border-b border-stone-100 py-3">
      <span className="text-sm text-muted">{k}</span>
      <span className="flex items-center gap-3 text-end font-semibold text-teal-900">{val || "—"}
        <button type="button" onClick={() => go(s)} className="text-xs font-bold text-teal-500 hover:underline">{F.edit}</button>
      </span>
    </div>
  );

  return (
    <div ref={top} className="scroll-mt-28 overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-[0_30px_80px_-50px_rgba(0,61,85,.5)]">
      {/* شريط الخطوات */}
      <div className="relative overflow-hidden bg-teal-500 px-6 py-6 text-white md:px-10">
        <GivingRings className="pointer-events-none absolute -end-20 -top-24 w-80" opacity={0.35} palette={["#52a6c0", "#64b6d0", "#8acbda", "#aeddec", "#c5e5f1", "#ffffff"]} />
        <p className="relative text-sm font-semibold text-teal-50">{F.stepOf.replace("{n}", String(step + 1)).replace("{t}", "4")}</p>
        <ol className="relative mt-3 grid grid-cols-4 gap-2">
          {F.steps.map((s, i) => (
            <li key={s}>
              <button type="button" disabled={i > step} onClick={() => i < step && go(i)} className="w-full text-start disabled:cursor-default">
                <span className={`block h-1.5 rounded-full ${i <= step ? "bg-white" : "bg-white/30"}`} />
                <span className={`mt-2 flex items-center gap-1.5 text-sm font-bold ${i <= step ? "text-white" : "text-white/60"}`}>
                  <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs ${i < step ? "bg-white text-teal-700" : i === step ? "bg-gold-400 text-night" : "bg-white/20"}`}>
                    {i < step ? <IconCheck size={14} /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) return next();
          if (!validate(3)) return;
          const ref = "VOL-" + Date.now().toString(36).toUpperCase().slice(-6);
          try { localStorage.removeItem(KEY); } catch {}
          setDone(ref);
        }}
        className="p-6 md:p-10"
        noValidate
      >
        {step === 0 && (
          <div className="rise grid gap-5 md:grid-cols-2">
            {Field({ k: "firstName", label: F.firstName, ac: "given-name" })}
            {Field({ k: "lastName", label: F.lastName, ac: "family-name" })}
            {Field({ k: "email", label: F.email, type: "email", ltr: true, ac: "email" })}
            {Field({ k: "phone", label: F.phone, type: "tel", ltr: true, ac: "tel" })}
            {Field({ k: "country", label: F.country, optional: true, ac: "country-name" })}
            {Field({ k: "city", label: F.city, ac: "address-level2" })}
            {Field({ k: "birthYear", label: F.birthYear, type: "number", optional: true })}
            <fieldset className="grid gap-2 text-sm font-semibold text-muted md:col-span-2">
              <legend className="mb-1.5">{F.langs}</legend>
              <div className="flex flex-wrap gap-2">
                {F.langsOpts.map((o, i) => (
                  <button type="button" key={o} aria-pressed={v.langs.includes(i)} onClick={() => toggle("langs", i as never)}
                    className={`flex h-11 items-center gap-2 rounded-xl border px-4 text-[15px] font-semibold ${v.langs.includes(i) ? "border-teal-500 bg-teal-50 text-teal-900" : "border-stone-300 text-teal-900 hover:border-teal-500"}`}>
                    {v.langs.includes(i) && <IconCheck size={16} />} {o}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 1 && (
          <div className="rise">
            <h3 className="font-kufi text-2xl font-bold text-teal-900">{F.areasT}</h3>
            <p className="mt-1 text-muted">{F.areasD}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label={F.areasT}>
              {F.areas.map((a) => {
                const on = v.areas.includes(a.k);
                return (
                  <button type="button" key={a.k} aria-pressed={on} onClick={() => toggle("areas", a.k as never)}
                    className={`relative rounded-2xl border p-4 text-start transition ${on ? "border-teal-500 bg-teal-50 ring-4 ring-teal-500/10" : "border-stone-200 hover:border-teal-500"}`}>
                    <span className={`absolute end-3 top-3 grid h-6 w-6 place-items-center rounded-full border ${on ? "border-teal-500 bg-teal-500 text-white" : "border-stone-300"}`}>{on && <IconCheck size={14} />}</span>
                    <Khatam className="h-7 w-7" color={on ? "#007da5" : "#c99a2e"} />
                    <span className="mt-2 block font-bold text-teal-900">{a.t}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted">{a.d}</span>
                  </button>
                );
              })}
            </div>
            {err.areas && <p className="mt-3 text-sm text-red-600" role="alert">{err.areas}</p>}
            <label className="mt-6 grid gap-1.5 text-sm font-semibold text-muted">{F.skills}
              <input value={v.skills} onChange={(e) => set("skills", e.target.value)} placeholder={F.skillsPh} className={input()} />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="rise grid gap-6">
            <div className="grid gap-2"><p className="text-sm font-semibold text-muted">{F.days}</p><Chips opts={F.daysOpts} val={v.days} on={(i) => set("days", i)} /></div>
            <div className="grid gap-2"><p className="text-sm font-semibold text-muted">{F.hours}</p><Chips opts={F.hoursOpts} val={v.hours} on={(i) => set("hours", i)} /></div>
            <div className="grid gap-2"><p className="text-sm font-semibold text-muted">{F.mode}</p><Chips opts={F.modeOpts} val={v.mode} on={(i) => set("mode", i)} /></div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold text-muted">{F.start}<input type="date" value={v.start} onChange={(e) => set("start", e.target.value)} className={input()} /></label>
              <label className="grid gap-1.5 text-sm font-semibold text-muted">{F.heard}
                <select value={v.heard} onChange={(e) => set("heard", Number(e.target.value))} className={input()}>{F.heardOpts.map((o, i) => <option key={o} value={i}>{o}</option>)}</select>
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-semibold text-muted">{F.exp}
              <textarea rows={4} value={v.exp} onChange={(e) => set("exp", e.target.value)} placeholder={F.expPh} className="rounded-xl border border-stone-300 bg-stone-50 p-4 text-base text-ink focus:border-teal-500 focus:bg-white focus:outline-none" />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="rise">
            <h3 className="font-kufi text-2xl font-bold text-teal-900">{F.review}</h3>
            <div className="mt-4 grid gap-x-10 md:grid-cols-2">
              <div>
                <Row k={`${F.firstName} / ${F.lastName}`} val={`${v.firstName} ${v.lastName}`} s={0} />
                <Row k={F.email} val={v.email} s={0} />
                <Row k={F.phone} val={v.phone} s={0} />
                <Row k={F.city} val={[v.city, v.country].filter(Boolean).join("، ")} s={0} />
                <Row k={F.langs} val={v.langs.map((i) => F.langsOpts[i]).join("، ")} s={0} />
              </div>
              <div>
                <Row k={F.areasT} val={F.areas.filter((a) => v.areas.includes(a.k)).map((a) => a.t).join("، ")} s={1} />
                <Row k={F.skills} val={v.skills} s={1} />
                <Row k={F.days} val={`${F.daysOpts[v.days]} · ${F.hoursOpts[v.hours]}`} s={2} />
                <Row k={F.mode} val={F.modeOpts[v.mode]} s={2} />
                <Row k={F.start} val={v.start} s={2} />
              </div>
            </div>
            <div className="mt-6 grid gap-3 rounded-2xl bg-stone-100 p-5">
              <label className="flex items-start gap-3 text-[15px] text-teal-900">
                <input type="checkbox" checked={v.privacy} onChange={(e) => set("privacy", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-teal-700" /> {F.consentPrivacy} <span className="text-red-500">*</span>
              </label>
              <label className="flex items-start gap-3 text-[15px] text-teal-900">
                <input type="checkbox" checked={v.contact} onChange={(e) => set("contact", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-teal-700" /> {F.consentContact}
              </label>
              {err.privacy && <p className="text-sm text-red-600" role="alert">{err.privacy}</p>}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-6">
          <p className="text-xs text-muted">✦ {F.draft}</p>
          <div className="flex gap-2">
            {step > 0 && <button type="button" onClick={() => go(step - 1)} className="h-12 rounded-full border border-stone-300 px-6 font-semibold text-teal-900 hover:border-teal-500">{F.back}</button>}
            <button type="submit" className="flex h-12 items-center gap-2 rounded-full bg-gold-500 px-7 font-bold text-night hover:bg-gold-400">
              {step < 3 ? F.next : F.submit} <IconArrow size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
