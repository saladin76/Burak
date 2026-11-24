"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { fmt } from "@/lib/data";
import { IconArrow } from "./Icons";
import { OrnamentDivider } from "./Motifs";

/* حاسبة زكاة المال — نصاب الذهب 85 غراماً، والمقدار ربع العشر (2.5%) */
const NISAB_GOLD_G = 85;
const NISAB_SILVER_G = 595;

const fields = [
  { k: "cash", l: "النقد في اليد والحسابات البنكية", unit: "$" },
  { k: "goldG", l: "الذهب المدّخر (بالغرام)", unit: "غ" },
  { k: "silverG", l: "الفضة المدّخرة (بالغرام)", unit: "غ" },
  { k: "trade", l: "عروض التجارة والأسهم المعدّة للبيع", unit: "$" },
  { k: "receivable", l: "الديون المرجوّ تحصيلها لك", unit: "$" },
  { k: "debts", l: "الديون الحالّة عليك (تُطرح)", unit: "$" },
] as const;

type K = (typeof fields)[number]["k"] | "goldPrice" | "silverPrice";

export default function ZakatCalculator() {
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
      <div className="rounded-[28px] border border-stone-200 bg-white p-6 md:p-8">
        <h2 className="font-kufi text-2xl font-bold text-teal-900">١. أسعار اليوم</h2>
        <p className="mt-1 text-sm text-muted">أدخل سعر غرام الذهب (عيار 24) والفضة بالدولار وفق سوقك اليوم.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {Input({ k: "goldPrice", label: "سعر غرام الذهب", unit: "$" })}
          {Input({ k: "silverPrice", label: "سعر غرام الفضة", unit: "$" })}
        </div>
        <fieldset className="mt-4">
          <legend className="mb-2 text-sm font-semibold text-muted">احتساب النصاب على أساس</legend>
          <div className="inline-grid grid-cols-2 gap-1 rounded-2xl bg-stone-100 p-1">
            {(["gold", "silver"] as const).map((b) => (
              <button key={b} type="button" aria-pressed={basis === b} onClick={() => setBasis(b)} className={`h-10 rounded-xl px-5 text-sm font-semibold ${basis === b ? "bg-teal-900 text-white" : "text-teal-900"}`}>
                {b === "gold" ? "الذهب (85 غ)" : "الفضة (595 غ)"}
              </button>
            ))}
          </div>
        </fieldset>

        <OrnamentDivider className="my-8 h-5 w-48" />

        <h2 className="font-kufi text-2xl font-bold text-teal-900">٢. أموالك التي حال عليها الحول</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.k}>{Input({ k: f.k, label: f.l, unit: f.unit })}</div>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-[28px] bg-teal-900 p-6 text-white md:p-8">
          <div className="pattern-khatam absolute inset-0 opacity-15" />
          <div className="relative">
            <p className="text-sm font-bold text-gold-300">زكاتك الواجبة</p>
            <p className="num mt-2 text-6xl font-bold" aria-live="polite">${fmt(Math.round(r.due))}</p>
            <dl className="mt-6 grid gap-3 border-t border-white/15 pt-5 text-sm">
              <div className="flex justify-between"><dt className="text-teal-100">مجموع الأموال</dt><dd className="num font-bold">${fmt(Math.round(r.assets))}</dd></div>
              <div className="flex justify-between"><dt className="text-teal-100">صافي المال بعد الديون</dt><dd className="num font-bold">${fmt(Math.round(r.net))}</dd></div>
              <div className="flex justify-between"><dt className="text-teal-100">النصاب</dt><dd className="num font-bold">{r.nisab ? `$${fmt(Math.round(r.nisab))}` : "—"}</dd></div>
            </dl>
            <p className="mt-5 rounded-xl bg-white/10 p-3 text-sm leading-7 text-teal-50">
              {priceMissing
                ? "أدخل سعر الغرام لمعرفة النصاب."
                : r.net >= r.nisab
                  ? "بلغ مالك النصاب؛ الزكاة ربع العشر (2.5%) من صافي المال."
                  : "لم يبلغ مالك النصاب، فلا زكاة عليك في هذا المال."}
            </p>
            <Link
              href={`/projects/alrka-alqds?amount=${Math.round(r.due)}`}
              aria-disabled={!r.due}
              className={`mt-5 flex h-14 items-center justify-center gap-2 rounded-2xl text-lg font-bold ${r.due ? "bg-gold-500 text-night hover:bg-gold-400" : "pointer-events-none bg-white/10 text-white/50"}`}
            >
              أخرج زكاتك للقدس <IconArrow size={20} />
            </Link>
            <Link href="/projects/zakat-gaza" className="mt-3 block text-center text-sm font-semibold text-gold-300 hover:underline">
              أو أخرجها لأهل غزة
            </Link>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted">
          الحاسبة للاستئناس. للحالات الخاصة (الذهب المستعمل للزينة، الأموال المشتركة، الديون المؤجلة) يُرجع إلى أهل العلم.
        </p>
      </aside>
    </div>
  );
}
