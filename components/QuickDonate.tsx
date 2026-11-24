"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, fmt, type Project } from "@/lib/data";
import { IconGift, IconRepeat, IconShield } from "./Icons";

type Props = { initial?: Project; lockProject?: boolean; compact?: boolean };

export default function QuickDonate({ initial, lockProject = false, compact = false }: Props) {
  const [slug, setSlug] = useState(initial?.slug ?? "jyl-alqran-5");
  const project = useMemo(() => projects.find((p) => p.slug === slug)!, [slug]);
  const [freq, setFreq] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(project.amounts[1] ?? project.amounts[0]);
  const [custom, setCustom] = useState("");

  const value = custom ? Number(custom) || 0 : amount;
  const popular = project.amounts[1] ?? project.amounts[0];

  const pickProject = (s: string) => {
    setSlug(s);
    const p = projects.find((x) => x.slug === s)!;
    setAmount(p.amounts[1] ?? p.amounts[0]);
    setCustom("");
    if (!p.monthly) setFreq("once");
  };

  return (
    <form
      id="donate"
      onSubmit={(e) => e.preventDefault()}
      className="relative rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_30px_80px_-40px_rgba(1,64,78,.55)] sm:p-7"
      aria-label="نموذج التبرع السريع"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-kufi text-2xl font-bold text-teal-900">تبرّع سريع</h2>
        <span className="flex items-center gap-1.5 text-xs font-medium text-olive">
          <IconShield size={16} /> دفع آمن ومشفّر
        </span>
      </div>

      {!lockProject && (
        <div className="mb-4">
          <label htmlFor="qd-project" className="mb-1.5 block text-sm font-semibold text-muted">
            اختر المشروع
          </label>
          <select
            id="qd-project"
            value={slug}
            onChange={(e) => pickProject(e.target.value)}
            className="h-12 w-full rounded-xl border border-stone-300 bg-stone-50 px-3 text-[15px] font-medium text-ink focus:border-teal-500 focus:outline-none"
          >
            <optgroup label="القدس">
              {projects.filter((p) => p.region === "quds").map((p) => (
                <option key={p.slug} value={p.slug}>{p.title}</option>
              ))}
            </optgroup>
            <optgroup label="غزة وفلسطين">
              {projects.filter((p) => p.region !== "quds").map((p) => (
                <option key={p.slug} value={p.slug}>{p.title}</option>
              ))}
            </optgroup>
          </select>
        </div>
      )}

      <fieldset className="mb-4">
        <legend className="sr-only">نوع التبرع</legend>
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-stone-100 p-1">
          {(["once", "monthly"] as const).map((f) => {
            const disabled = f === "monthly" && !project.monthly;
            return (
              <button
                key={f}
                type="button"
                disabled={disabled}
                aria-pressed={freq === f}
                onClick={() => setFreq(f)}
                className={`flex h-11 items-center justify-center gap-1.5 rounded-xl text-[15px] font-semibold transition ${
                  freq === f ? "bg-teal-900 text-white shadow" : "text-teal-900 hover:bg-white/70"
                } disabled:cursor-not-allowed disabled:opacity-40`}
              >
                {f === "monthly" && <IconRepeat size={16} />}
                {f === "once" ? "مرة واحدة" : "شهرياً"}
              </button>
            );
          })}
        </div>
        {!project.monthly && (
          <p className="mt-1.5 text-xs text-muted">التبرع الشهري غير متاح لهذا المشروع.</p>
        )}
      </fieldset>

      <fieldset className="mb-4">
        <legend className="mb-1.5 text-sm font-semibold text-muted">المبلغ (دولار أمريكي)</legend>
        <div className={`grid gap-2 ${project.amounts.length > 3 ? "grid-cols-4" : "grid-cols-3"}`}>
          {project.amounts.map((a) => {
            const on = !custom && a === amount;
            return (
              <button
                key={a}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setAmount(a);
                  setCustom("");
                }}
                className={`relative h-14 rounded-xl border text-lg font-bold transition num ${
                  on ? "border-gold-500 bg-gold-100 text-gold-700 ring-2 ring-gold-400/40" : "border-stone-300 text-teal-900 hover:border-teal-500"
                }`}
              >
                {a === popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal-900 px-2 py-0.5 font-sans text-[10px] font-semibold text-white">
                    الأكثر اختياراً
                  </span>
                )}
                ${fmt(a)}
              </button>
            );
          })}
        </div>
        <label htmlFor="qd-custom" className="sr-only">مبلغ آخر</label>
        <div className="relative mt-2">
          <input
            id="qd-custom"
            inputMode="numeric"
            placeholder="مبلغ آخر"
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ""))}
            className="h-12 w-full rounded-xl border border-stone-300 bg-stone-50 ps-4 pe-10 text-[15px] focus:border-teal-500 focus:outline-none"
          />
          <span className="pointer-events-none absolute inset-y-0 end-4 grid place-items-center font-bold text-muted">$</span>
        </div>
      </fieldset>

      <Link
        href={`/projects/${project.slug}?amount=${value}&freq=${freq}`}
        aria-disabled={!value}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gold-500 text-lg font-bold text-night shadow-[0_12px_30px_-12px_rgba(201,154,46,1)] transition hover:bg-gold-400"
      >
        تبرّع بـ <span className="num">${fmt(value)}</span>
        {freq === "monthly" && <span className="text-base font-semibold">شهرياً</span>}
      </Link>

      {!compact && (
        <div className="mt-3 flex items-center justify-between text-sm">
          <Link href={`/projects/${project.slug}?gift=1`} className="flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-900">
            <IconGift size={17} /> أهدِ تبرعك لمن تحب
          </Link>
          <Link href="/contact#bank" className="text-muted underline-offset-4 hover:underline">
            تحويل بنكي
          </Link>
        </div>
      )}
    </form>
  );
}
