"use client";

import Link from "next/link";
import { getProject, projectPath } from "@/lib/data";
import { fmt, tx } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/lang-context";
import { IconArrow, IconClose, IconRepeat, KindIcon } from "./Icons";
import SmartImg from "./SmartImg";

export default function CartView() {
  const { lang, t, href } = useI18n();
  const C = t.cart;
  const { items, remove, update, total, ready } = useCart();

  if (!ready) return <div className="h-60 animate-pulse rounded-2xl bg-stone-100" />;
  if (!items.length)
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
        <p className="text-lg text-muted">{C.empty}</p>
        <Link href={href("/projects")} className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-teal-900 px-6 font-bold text-white">{C.browse} <IconArrow size={18} /></Link>
      </div>
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <ul className="space-y-4">
        {items.map((it) => {
          const p = getProject(it.slug);
          if (!p) return null;
          return (
            <li key={it.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4">
              <span className="relative grid h-20 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-teal-700 text-accent-300">
                <KindIcon kind={p.kind} size={30} />
                <SmartImg src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <Link href={href(projectPath(p.slug))} className="font-kufi text-lg font-bold text-teal-900 hover:text-teal-700">{tx(p.title, lang)}</Link>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <div className="inline-grid grid-cols-2 gap-1 rounded-xl bg-stone-100 p-1 text-sm">
                    {(["once", "monthly"] as const).map((f) => (
                      <button key={f} disabled={f === "monthly" && !p.monthly} aria-pressed={it.freq === f} onClick={() => update(it.id, { freq: f })}
                        className={`h-8 rounded-lg px-3 font-semibold disabled:opacity-40 ${it.freq === f ? "bg-teal-900 text-white" : "text-teal-900"}`}>
                        {f === "once" ? t.common.once : t.common.monthly}
                      </button>
                    ))}
                  </div>
                  {it.freq === "monthly" && <span className="flex items-center gap-1 text-xs font-semibold text-teal-700"><IconRepeat size={13} /> {C.monthlyNote}</span>}
                </div>
              </div>
              <label className="relative">
                <span className="sr-only">{t.donate.amount}</span>
                <input inputMode="numeric" value={it.amount} onChange={(e) => update(it.id, { amount: Number(e.target.value.replace(/[^\d]/g, "")) || 0 })}
                  className="num h-12 w-28 rounded-xl border border-stone-300 bg-stone-50 pe-8 ps-3 text-lg font-bold text-teal-900" />
                <span className="pointer-events-none absolute inset-y-0 end-3 grid place-items-center font-bold text-muted">$</span>
              </label>
              <button onClick={() => remove(it.id)} aria-label={C.remove} className="grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-stone-100 hover:text-teal-900">
                <IconClose size={18} />
              </button>
            </li>
          );
        })}
        <li>
          <Link href={href("/projects")} className="inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900">+ {C.continue}</Link>
        </li>
      </ul>
      <aside className="h-fit rounded-2xl bg-teal-900 p-6 text-white lg:sticky lg:top-28">
        <p className="text-sm font-bold text-accent-300">{C.total}</p>
        <p className="num mt-1 text-5xl font-bold">${fmt(total)}</p>
        <Link href={href("/checkout")} className="mt-6 flex h-14 items-center justify-center gap-2 rounded-2xl bg-accent-500 text-lg font-bold text-white hover:bg-accent-600">
          {C.checkout} <IconArrow size={20} />
        </Link>
      </aside>
    </div>
  );
}
