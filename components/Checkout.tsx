"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProject } from "@/lib/data";
import { fmt, tx } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/lang-context";
import { IconBank, IconGift, IconRepeat, IconShield } from "./Icons";
import GiftCard from "./GiftCard";

export default function Checkout() {
  const { lang, t, href } = useI18n();
  const K = t.checkout;
  const { items, total, clear, ready } = useCart();
  const router = useRouter();
  const [gift, setGift] = useState(false);
  const [g, setG] = useState({ to: "", from: "", email: "", msg: "", design: 0 });
  const [pay, setPay] = useState<"card" | "bank">("card");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("gift")) setGift(true);
  }, []);

  const input = "h-12 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 text-base text-ink focus:border-teal-500 focus:outline-none";
  const label = "grid gap-1.5 text-sm font-semibold text-muted";
  const titles = items.map((i) => getProject(i.slug)).filter(Boolean).map((p) => tx(p!.title, lang));

  if (ready && !items.length)
    return (
      <div className="rounded-[28px] border border-dashed border-stone-300 bg-white p-12 text-center">
        <p className="text-lg text-muted">{t.cart.empty}</p>
        <Link href={href("/projects")} className="mt-6 inline-flex h-12 items-center rounded-full bg-teal-900 px-6 font-bold text-white">{t.cart.browse}</Link>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setBusy(true);
        const ref = "BRK-" + Date.now().toString(36).toUpperCase().slice(-6);
        try {
          sessionStorage.setItem("burak-last-order", JSON.stringify({ ref, items, total, pay, gift: gift ? g : null }));
        } catch {}
        clear();
        router.push(href(`/thank-you?ref=${ref}`));
      }}
      className="grid gap-8 lg:grid-cols-[1fr_400px]"
    >
      <div className="space-y-8">
        <fieldset className="rounded-[28px] border border-stone-200 bg-white p-6 md:p-8">
          <legend className="sr-only">{K.donor}</legend>
          <h2 className="font-kufi text-2xl font-bold text-teal-900">1. {K.donor}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className={label}>{K.name} *<input required autoComplete="name" className={input} /></label>
            <label className={label}>{K.email} *<input required type="email" autoComplete="email" className={input} /></label>
            <label className={label}>{K.phone}<input type="tel" autoComplete="tel" dir="ltr" className={input} /></label>
            <label className={label}>{K.country}<input autoComplete="country-name" className={input} /></label>
          </div>
          <label className="mt-4 flex items-center gap-3 text-[15px] text-teal-900">
            <input type="checkbox" className="h-5 w-5 accent-teal-700" /> {K.anon}
          </label>
        </fieldset>

        <fieldset className="rounded-[28px] border border-stone-200 bg-white p-6 md:p-8">
          <legend className="sr-only">{K.gift}</legend>
          <h2 className="flex items-center gap-2 font-kufi text-2xl font-bold text-teal-900"><IconGift size={24} /> 2. {K.gift}</h2>
          <label className="mt-4 flex items-center gap-3 text-[15px] font-semibold text-teal-900">
            <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="h-5 w-5 accent-teal-700" /> {K.giftToggle}
          </label>
          {gift && (
            <div className="rise mt-6 grid gap-6 xl:grid-cols-2">
              <div className="grid content-start gap-4">
                <label className={label}>{K.giftTo} *<input required value={g.to} onChange={(e) => setG({ ...g, to: e.target.value })} className={input} /></label>
                <label className={label}>{K.giftFrom} *<input required value={g.from} onChange={(e) => setG({ ...g, from: e.target.value })} className={input} /></label>
                <label className={label}>{K.giftEmail}<input type="email" value={g.email} onChange={(e) => setG({ ...g, email: e.target.value })} className={input} /></label>
                <label className={label}>{K.giftMsg}<textarea rows={3} maxLength={140} placeholder={K.giftMsgPh} value={g.msg} onChange={(e) => setG({ ...g, msg: e.target.value })} className="rounded-xl border border-stone-300 bg-stone-50 p-4 text-base text-ink" /></label>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-muted">{K.design}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {K.designs.map((d, i) => (
                    <button type="button" key={d} aria-pressed={g.design === i} onClick={() => setG({ ...g, design: i })}
                      className={`h-10 rounded-full px-4 text-sm font-semibold ${g.design === i ? "bg-teal-900 text-white" : "border border-stone-300 text-teal-900"}`}>
                      {d}
                    </button>
                  ))}
                </div>
                <GiftCard design={g.design} to={g.to} from={g.from} msg={g.msg} projects={titles} labels={{ title: K.cardTitle, line: K.cardLine, from: K.cardFrom }} />
              </div>
            </div>
          )}
        </fieldset>

        <fieldset className="rounded-[28px] border border-stone-200 bg-white p-6 md:p-8">
          <legend className="sr-only">{K.payment}</legend>
          <h2 className="font-kufi text-2xl font-bold text-teal-900">3. {K.payment}</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {([
              { v: "card", t: K.payCard, d: K.payCardNote, i: <IconShield size={22} /> },
              { v: "bank", t: K.payBank, d: K.payBankNote, i: <IconBank size={22} /> },
            ] as const).map((o) => (
              <label key={o.v} className={`flex cursor-pointer gap-3 rounded-2xl border p-4 ${pay === o.v ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500/20" : "border-stone-200"}`}>
                <input type="radio" name="pay" checked={pay === o.v} onChange={() => setPay(o.v)} className="mt-1 h-5 w-5 accent-teal-700" />
                <span>
                  <span className="flex items-center gap-2 font-bold text-teal-900">{o.i} {o.t}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{o.d}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="h-fit rounded-[28px] bg-teal-900 p-6 text-white lg:sticky lg:top-28">
        <h2 className="font-kufi text-xl font-bold">{K.summary}</h2>
        <ul className="mt-4 space-y-3 border-b border-white/15 pb-4">
          {items.map((it) => {
            const p = getProject(it.slug);
            return (
              <li key={it.id} className="flex items-start justify-between gap-3 text-sm">
                <span>
                  {p ? tx(p.title, lang) : it.slug}
                  {it.freq === "monthly" && <span className="ms-1 inline-flex items-center gap-1 text-gold-300"><IconRepeat size={12} /> {t.common.monthly}</span>}
                </span>
                <span className="num shrink-0 font-bold">${fmt(it.amount)}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-teal-100">{t.cart.total}</span>
          <span className="num text-4xl font-bold">${fmt(total)}</span>
        </div>
        <button type="submit" disabled={busy || !total} className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gold-500 text-lg font-bold text-night hover:bg-gold-400 disabled:opacity-60">
          <IconShield size={20} /> {K.confirm}
        </button>
        <p className="mt-3 text-xs leading-6 text-teal-100/70">{K.terms}</p>
      </aside>
    </form>
  );
}
