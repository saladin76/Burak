"use client";

import { useMemo, useState } from "react";
import { fmt } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { IconArrow } from "./Icons";
import { OrnamentDivider } from "./Motifs";

/* حاسبة زكاة المال — نصاب الذهب 85 غراماً، والمقدار ربع العشر (2.5%) */
const NISAB_GOLD_G = 85;
const NISAB_SILVER_G = 595;

const fields = [
  { k: "cash", unit: "$" },
  { k: "goldG", unit: "g" },
  { k: "silverG", unit: "g" },
  { k: "trade", unit: "$" },
  { k: "receivable", unit: "$" },
  { k: "debts", unit: "$" },
] as const;

type K = (typeof fields)[number]["k"] | "goldPrice" | "silverPrice";

export default function ZakatCalculator() {
  const { t, f } = useI18n();
  const Z = t.zakat;
  const [v, setV] = useState<Record<K, string>>({
    cash: "", goldG: "", silverG: "", trade: "", receivable: "", debts: "", goldPrice: "", silverPrice: "",
  });
  const [basis, setBasis] = useState<"gold" | "silver">("gold");
  const n = (k: K) => Number(v[k]) || 0;

  const r = useMemo(() => {
    const assets = n("cash") + n("goldG") * n("goldPrice") + n("silverG") * n("silverPrice") + n("trade") + n("receivable");
    const net = Math.max(0, assets - n("debts"));
    const nisab = basis === "gold" ? NISAB_GOLD_G * n("goldPrice") : NISAB_SILVER_G * n("silverPrice");
    const due = nisab > 0 && net >= nisab ? net * 0.025 : 0;
    return { assets, net, nisab, due };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v, basis]);

  const set = (k: K) => (e: React.ChangeEvent<HTMLInputElement>) => setV((s) => ({ ...s, [k]: e.target.value.replace(/[^\d.]/g, "") }));
  const priceMissing = basis === "gold" ? !n("goldPrice") : !n("silverPrice");

  const Input = ({ k, label, unit }: { k: K; label: string; unit: string }) => (
    <label className="grid gap-1.5 text-sm font-semibold text-muted">
      {label}
      <span className="relative">
        <input inputMode="decimal" value={v[k]} onChange={set(k)} placeholder="0" className="h-12 w-full rounded-xl border border-stone-300 bg-white pe-10 ps-4 text-base text-ink focus:border-teal-500 focus:outline-none" />
        <span className="pointer-events-none absolute inset-y-0 end-4 grid place-items-center font-bold text-muted">{unit}</span>
      </span>
    </label>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
        <h2 className="font-kufi text-2xl font-bold text-teal-900">{Z.s1}</h2>
        <p className="mt-1 text-sm text-muted">{Z.s1d}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {Input({ k: "goldPrice", label: Z.goldPrice, unit: "$" })}
          {Input({ k: "silverPrice", label: Z.silverPrice, unit: "$" })}
        </div>
        <fieldset className="mt-4">
          <legend className="mb-2 text-sm font-semibold text-muted">{Z.basis}</legend>
          <div className="inline-grid grid-cols-2 gap-1 rounded-2xl bg-stone-100 p-1">
            {(["gold", "silver"] as const).map((b) => (
              <button key={b} type="button" aria-pressed={basis === b} onClick={() => setBasis(b)} className={`h-10 rounded-xl px-5 text-sm font-semibold ${basis === b ? "bg-teal-900 text-white" : "text-teal-900"}`}>
                {b === "gold" ? Z.gold : Z.silver}
              </button>
            ))}
          </div>
        </fieldset>

        <OrnamentDivider className="my-8 h-5 w-48" />

        <h2 className="font-kufi text-2xl font-bold text-teal-900">{Z.s2}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.k}>{Input({ k: f.k, label: Z[f.k], unit: f.unit === "g" ? Z.g : "$" })}</div>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-2xl bg-teal-900 p-6 text-white md:p-8">
          <div className="pattern-khatam absolute inset-0 opacity-15" />
          <div className="relative">
            <p className="text-sm font-bold text-accent-300">{Z.due}</p>
            <p className="num mt-2 text-6xl font-bold" aria-live="polite">${fmt(Math.round(r.due))}</p>
            <dl className="mt-6 grid gap-3 border-t border-white/15 pt-5 text-sm">
              <div className="flex justify-between"><dt className="text-teal-100">{Z.assets}</dt><dd className="num font-bold">${fmt(Math.round(r.assets))}</dd></div>
              <div className="flex justify-between"><dt className="text-teal-100">{Z.net}</dt><dd className="num font-bold">${fmt(Math.round(r.net))}</dd></div>
              <div className="flex justify-between"><dt className="text-teal-100">{Z.nisab}</dt><dd className="num font-bold">{r.nisab ? `$${fmt(Math.round(r.nisab))}` : "—"}</dd></div>
            </dl>
            <p className="mt-5 rounded-xl bg-white/10 p-3 text-sm leading-7 text-teal-50">
              {priceMissing
                ? Z.needPrice
                : r.net >= r.nisab
                  ? Z.reached
                  : Z.notReached}
            </p>
            <button
              type="button"
              disabled={!r.due}
              onClick={() => window.dispatchEvent(new CustomEvent("burak:zakat-amount", { detail: r.due }))}
              className={`mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-lg text-lg font-bold ${r.due ? "bg-accent-500 text-white hover:bg-accent-600" : "cursor-not-allowed bg-white/10 text-white/50"}`}
            >
              {f.prog.z.useAmount}{r.due ? <span className="num">· ${fmt(Math.round(r.due))}</span> : null} <IconArrow size={20} />
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted">
          {Z.note}
        </p>
      </aside>
    </div>
  );
}
