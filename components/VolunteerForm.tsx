"use client";

import { useState } from "react";
import { useI18n } from "@/lib/lang-context";

export default function VolunteerForm() {
  const { t } = useI18n();
  const V = t.volunteer;
  const [sent, setSent] = useState(false);
  const input = "h-12 rounded-xl border border-stone-300 bg-stone-50 px-4 text-base text-ink focus:border-teal-500 focus:outline-none";
  if (sent) return <p role="status" className="rounded-[28px] border border-olive/30 bg-white p-10 text-center text-lg font-semibold text-olive">{V.sent}</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-[28px] border border-stone-200 bg-white p-6 md:p-10" aria-label={V.form}>
      <h2 className="font-kufi text-3xl font-bold text-teal-900">{V.form}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-muted">{t.checkout.name}<input required className={input} /></label>
        <label className="grid gap-1.5 text-sm font-semibold text-muted">{t.checkout.email}<input required type="email" className={input} /></label>
        <label className="grid gap-1.5 text-sm font-semibold text-muted">{t.checkout.phone}<input type="tel" className={input} dir="ltr" /></label>
        <label className="grid gap-1.5 text-sm font-semibold text-muted">{V.city}<input className={input} /></label>
        <label className="grid gap-1.5 text-sm font-semibold text-muted md:col-span-2">{V.type}
          <select className={input}>{V.ways.map((w) => <option key={w.t}>{w.t}</option>)}</select>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-muted md:col-span-2">{V.skills}<textarea rows={4} className="rounded-xl border border-stone-300 bg-stone-50 p-4 text-base text-ink" /></label>
      </div>
      <button type="submit" className="mt-6 h-12 rounded-full bg-gold-500 px-8 font-bold text-night hover:bg-gold-400">{V.send}</button>
    </form>
  );
}
