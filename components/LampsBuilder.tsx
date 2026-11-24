"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Certificate from "./Certificate";
import { IconArrow, IconBag, IconRepeat } from "./Icons";
import { LAMP_PRICE } from "@/lib/data";
import { fmt } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { useCart } from "@/lib/cart";
import { addDedication } from "@/lib/orders";

const SLUG = "qanadeel-al-aqsa";

function Lantern({ lit, i }: { lit: boolean; i: number }) {
  return (
    <svg viewBox="0 0 40 70" className={`h-full w-full transition-all duration-700 ${lit ? "drop-shadow-[0_0_10px_rgba(235,205,122,.9)]" : "opacity-40"}`} style={{ transitionDelay: `${(i % 10) * 30}ms` }} aria-hidden="true">
      <path d="M20 0v6" stroke="#c99a2e" strokeWidth="2" />
      <path d="M12 6h16l-3 6H15Z" fill="#9a7214" />
      <path d="M10 12h20l4 22c0 10-6 18-14 22-8-4-14-12-14-22Z" fill={lit ? "#ebcd7a" : "#0a3a4f"} stroke="#c99a2e" strokeWidth="1.6" />
      {lit && <ellipse cx="20" cy="32" rx="5" ry="8" fill="#fff6d8" />}
      <path d="M17 56h6l-3 8Z" fill="#9a7214" />
    </svg>
  );
}

export default function LampsBuilder() {
  const { lang, t, f, href } = useI18n();
  const L = f.lamps;
  const D = f.docs;
  const cart = useCart();
  const router = useRouter();
  const [n, setN] = useState(5);
  const [mode, setMode] = useState<0 | 1 | 2>(0);
  const [name, setName] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [added, setAdded] = useState(false);
  const total = n * LAMP_PRICE;
  const shown = Math.min(n, 50);

  const commit = () => {
    cart.add({ slug: SLUG, amount: total, freq: monthly ? "monthly" : "once" });
    addDedication({ type: "lamp", count: n, mode, name: name.trim(), slug: SLUG });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          commit();
          router.push(href("/checkout"));
        }}
        className="rounded-[28px] border border-stone-200 bg-white p-6 md:p-8"
      >
        <h2 className="font-kufi text-2xl font-bold text-teal-900">{L.pkgT}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {L.pkgs.map((p) => (
            <button type="button" key={p.n} aria-pressed={n === p.n} onClick={() => setN(p.n)}
              className={`rounded-2xl border p-4 text-start transition ${n === p.n ? "border-gold-500 bg-gold-100 ring-4 ring-gold-400/20" : "border-stone-200 hover:border-teal-500"}`}>
              <span className="flex items-baseline justify-between">
                <b className="font-kufi text-xl text-teal-900">{p.t}</b>
                <span className="num font-bold text-gold-700">${fmt(p.n * LAMP_PRICE)}</span>
              </span>
              <span className="mt-1 block text-sm text-muted">{p.d}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-stone-100 p-3">
          <span className="ps-2 text-sm font-semibold text-muted">{L.count}</span>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="−" onClick={() => setN(Math.max(1, n - 1))} className="grid h-11 w-11 place-items-center rounded-xl bg-white text-xl font-bold text-teal-900">−</button>
            <input inputMode="numeric" aria-label={L.count} value={n} onChange={(e) => setN(Math.min(999, Math.max(1, Number(e.target.value.replace(/[^\d]/g, "")) || 1)))} className="num h-11 w-20 rounded-xl border border-stone-300 bg-white text-center text-xl font-bold text-teal-900" />
            <button type="button" aria-label="+" onClick={() => setN(Math.min(999, n + 1))} className="grid h-11 w-11 place-items-center rounded-xl bg-white text-xl font-bold text-teal-900">+</button>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">{L.priceNote.replace("{p}", String(LAMP_PRICE))}</p>

        <fieldset className="mt-6">
          <legend className="mb-2 text-sm font-semibold text-muted">{L.forT}</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {L.forOpts.map((o, i) => (
              <button type="button" key={o} aria-pressed={mode === i} onClick={() => setMode(i as 0 | 1 | 2)}
                className={`min-h-12 rounded-xl border px-3 py-2 text-sm font-semibold ${mode === i ? "border-teal-900 bg-teal-900 text-white" : "border-stone-300 text-teal-900 hover:border-teal-500"}`}>
                {o}
              </button>
            ))}
          </div>
          <label className="mt-3 grid gap-1.5 text-sm font-semibold text-muted">{L.name}
            <input value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl border border-stone-300 bg-stone-50 px-4 text-base text-ink focus:border-teal-500 focus:bg-white focus:outline-none" />
          </label>
        </fieldset>

        <label className="mt-5 flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-stone-200 p-4">
          <span className="flex items-center gap-2 font-semibold text-teal-900"><IconRepeat size={18} /> {L.monthly}</span>
          <input type="checkbox" checked={monthly} onChange={(e) => setMonthly(e.target.checked)} className="h-6 w-6 accent-teal-700" />
        </label>

        <div className="mt-6 flex gap-2">
          <button type="submit" className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gold-500 text-lg font-bold text-night shadow-[0_0_40px_-8px_rgba(235,205,122,.9)] hover:bg-gold-400">
            {L.btn.replace("{n}", String(n)).replace("{x}", fmt(total))}{monthly ? ` · ${t.common.monthly}` : ""} <IconArrow size={20} />
          </button>
          <button type="button" aria-label={f.cards.quickAdd} title={f.cards.quickAdd} onClick={() => { commit(); setAdded(true); setTimeout(() => setAdded(false), 2200); }}
            className={`grid h-14 w-14 place-items-center rounded-2xl border-2 ${added ? "border-olive bg-olive text-white" : "border-teal-900/15 text-teal-900"}`}>
            <IconBag />
          </button>
        </div>
        <p className="mt-3 text-sm text-muted" aria-live="polite">{added ? f.cards.added : L.certNote}</p>
      </form>

      <div className="grid content-start gap-6">
        {/* نافذة القناديل الحيّة */}
        <div className="arch relative overflow-hidden bg-night px-6 pb-8 pt-14 text-center">
          <div className="pattern-khatam absolute inset-0 opacity-10" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 transition-opacity duration-700" style={{ background: "radial-gradient(60% 70% at 50% 25%, rgba(235,205,122,.28), transparent 70%)", opacity: Math.min(1, 0.25 + shown / 25) }} />
          <div className="relative mx-auto grid max-w-md grid-cols-10 gap-x-1.5 gap-y-3">
            {Array.from({ length: 50 }, (_, i) => (
              <div key={i} className="aspect-[4/7]"><Lantern lit={i < shown} i={i} /></div>
            ))}
          </div>
          <p className="relative mt-6 font-kufi text-3xl font-bold text-gold-300"><span className="num">{fmt(n)}</span> {L.lit}</p>
        </div>
        <Certificate
          lang={lang}
          variant="lamp"
          heading={L.certT}
          toLabel={`${L.certLine.replace("{n}", String(n))} ${L.certFor[mode]}`}
          name={name || "…"}
          body={L.hadith}
          dua={D.dua}
          refNo="BRK-PREVIEW"
          refLabel={D.ref}
          date={new Date()}
          dateLabel={D.date}
          sign={D.sign}
          verifyLabel={D.verify}
          verifyUrl={`https://burakdernegi.org/${lang}/lamps`}
        />
      </div>
    </div>
  );
}
