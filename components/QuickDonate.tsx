"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { projects, type Project } from "@/lib/data";
import { fmt, tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { useCart } from "@/lib/cart";
import { IconBag, IconGift, IconRepeat, IconShield } from "./Icons";

type Props = { initial?: Project; lockProject?: boolean };

export default function QuickDonate({ initial, lockProject = false }: Props) {
  const { lang, t, href } = useI18n();
  const d = t.donate;
  const cart = useCart();
  const router = useRouter();
  const [slug, setSlug] = useState(initial?.slug ?? "jyl-alqran-5");
  const project = useMemo(() => projects.find((p) => p.slug === slug)!, [slug]);
  const [freq, setFreq] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(project.amounts[1] ?? project.amounts[0]);
  const [custom, setCustom] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const a = Number(sp.get("amount"));
    if (a > 0) {
      if (project.amounts.includes(a)) setAmount(a);
      else setCustom(String(a));
    }
    if (sp.get("freq") === "monthly" && project.monthly) setFreq("monthly");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = custom ? Number(custom) || 0 : amount;
  const popular = project.amounts[1] ?? project.amounts[0];

  const pickProject = (s: string) => {
    setSlug(s);
    const p = projects.find((x) => x.slug === s)!;
    setAmount(p.amounts[1] ?? p.amounts[0]);
    setCustom("");
    if (!p.monthly) setFreq("once");
  };

  const addToCart = () => {
    if (!value) return false;
    cart.add({ slug, amount: value, freq });
    return true;
  };

  return (
    <form
      id="donate"
      onSubmit={(e) => {
        e.preventDefault();
        if (addToCart()) router.push(href("/checkout"));
      }}
      className="relative scroll-mt-32 rounded-[28px] border border-stone-200 bg-white p-5 shadow-[0_30px_80px_-40px_rgba(0,61,85,.55)] sm:p-7"
      aria-label={d.formLabel}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-kufi text-2xl font-bold text-teal-900">{d.title}</h2>
        <span className="flex items-center gap-1.5 text-xs font-medium text-olive">
          <IconShield size={16} /> {d.secure}
        </span>
      </div>

      {!lockProject && (
        <div className="mb-4">
          <label htmlFor="qd-project" className="mb-1.5 block text-sm font-semibold text-muted">
            {d.chooseProject}
          </label>
          <select
            id="qd-project"
            value={slug}
            onChange={(e) => pickProject(e.target.value)}
            className="h-12 w-full rounded-xl border border-stone-300 bg-stone-50 px-3 text-[15px] font-medium text-ink focus:border-teal-500 focus:outline-none"
          >
            <optgroup label={d.groupQuds}>
              {projects.filter((p) => p.region === "quds").map((p) => (
                <option key={p.slug} value={p.slug}>{tx(p.title, lang)}</option>
              ))}
            </optgroup>
            <optgroup label={d.groupGaza}>
              {projects.filter((p) => p.region !== "quds").map((p) => (
                <option key={p.slug} value={p.slug}>{tx(p.title, lang)}</option>
              ))}
            </optgroup>
          </select>
        </div>
      )}

      <fieldset className="mb-4">
        <legend className="sr-only">{d.type}</legend>
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-stone-100 p-1">
          {(["once", "monthly"] as const).map((f) => (
            <button
              key={f}
              type="button"
              disabled={f === "monthly" && !project.monthly}
              aria-pressed={freq === f}
              onClick={() => setFreq(f)}
              className={`flex h-11 items-center justify-center gap-1.5 rounded-xl text-[15px] font-semibold transition ${
                freq === f ? "bg-teal-900 text-white shadow" : "text-teal-900 hover:bg-white/70"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {f === "monthly" && <IconRepeat size={16} />}
              {f === "once" ? t.common.once : t.common.monthly}
            </button>
          ))}
        </div>
        {!project.monthly && <p className="mt-1.5 text-xs text-muted">{d.noMonthly}</p>}
      </fieldset>

      <fieldset className="mb-4">
        <legend className="mb-1.5 text-sm font-semibold text-muted">{d.amount}</legend>
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
                className={`num relative h-14 rounded-xl border text-lg font-bold transition ${
                  on ? "border-gold-500 bg-gold-100 text-gold-700 ring-2 ring-gold-400/40" : "border-stone-300 text-teal-900 hover:border-teal-500"
                }`}
              >
                {a === popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal-900 px-2 py-0.5 font-sans text-[10px] font-semibold text-white">
                    {d.popular}
                  </span>
                )}
                ${fmt(a)}
              </button>
            );
          })}
        </div>
        <label htmlFor="qd-custom" className="sr-only">{d.other}</label>
        <div className="relative mt-2">
          <input
            id="qd-custom"
            inputMode="numeric"
            placeholder={d.other}
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ""))}
            className="h-12 w-full rounded-xl border border-stone-300 bg-stone-50 pe-10 ps-4 text-[15px] focus:border-teal-500 focus:outline-none"
          />
          <span className="pointer-events-none absolute inset-y-0 end-4 grid place-items-center font-bold text-muted">$</span>
        </div>
      </fieldset>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!value}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gold-500 text-lg font-bold text-night shadow-[0_12px_30px_-12px_rgba(201,154,46,1)] transition hover:bg-gold-400 disabled:opacity-50"
        >
          {d.donateWith} <span className="num">${fmt(value)}</span>
          {freq === "monthly" && <span className="text-base font-semibold">{t.common.monthly}</span>}
        </button>
        <button
          type="button"
          aria-label={d.addToCart}
          title={d.addToCart}
          disabled={!value}
          onClick={() => {
            if (addToCart()) {
              setAdded(true);
              setTimeout(() => setAdded(false), 2200);
            }
          }}
          className={`grid h-14 w-14 place-items-center rounded-2xl border-2 transition ${added ? "border-olive bg-olive text-white" : "border-teal-900/15 text-teal-900 hover:border-teal-500"}`}
        >
          <IconBag />
        </button>
      </div>
      <p className="mt-2 h-5 text-center text-sm font-semibold text-olive" aria-live="polite">
        {added ? d.added : ""}
      </p>

      <div className="flex items-center justify-between text-sm">
        <Link href={href("/checkout?gift=1")} onClick={() => addToCart()} className="flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-900">
          <IconGift size={17} /> {d.gift}
        </Link>
        <Link href={href("/contact#bank")} className="text-muted underline-offset-4 hover:underline">
          {d.bankTransfer}
        </Link>
      </div>
    </form>
  );
}
