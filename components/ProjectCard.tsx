"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { kindLabel, projectPath, regionLabel, type Project } from "@/lib/data";
import { fmt, getDict, tx, type Lang } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { useCart } from "@/lib/cart";
import { IconArrow, IconBag, IconRepeat, KindIcon } from "./Icons";
import { GivingWaves } from "./Motifs";
import SmartImg from "./SmartImg";

const coverTone = (p: Project) =>
  p.kind === "zakat" || p.kind === "aqsa" ? "bg-accent-600 text-accent-100" : p.region === "quds" ? "bg-teal-700 text-teal-50" : "bg-night-2 text-teal-100";

export function ProjectCover({ p, lang, tall = false, className = "" }: { p: Project; lang: Lang; tall?: boolean; className?: string }) {
  const t = getDict(lang);
  return (
    <div className={`relative overflow-hidden ${coverTone(p)} ${tall ? "h-80 md:h-96" : "h-52"} ${className}`}>
      <GivingWaves
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${tall ? "h-64" : "h-40"}`}
        rings={5}
        stroke={6}
        gap={7}
        palette={p.kind === "zakat" || p.kind === "aqsa" ? ["#dff1f7", "#8acbda", "#64b6d0", "#dff1f7", "#8acbda"] : ["#c5e5f1", "#8acbda", "#64b6d0", "#3aafc9", "#8acbda"]}
        opacity={0.9}
      />
      <div className={`absolute bottom-0 left-1/2 grid -translate-x-1/2 place-items-center ${tall ? "h-28 w-20" : "h-16 w-14"}`}>
        <KindIcon kind={p.kind} size={tall ? 48 : 30} className="text-accent-300" />
      </div>
      <SmartImg src={p.image} alt={tx(p.title, lang)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-night/0 to-night/20" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-900 shadow">{tx(regionLabel[p.region], lang)}</span>
        <span className="flex gap-1.5">
          {p.monthly && <span className="flex items-center gap-1 rounded-full bg-teal-900/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur"><IconRepeat size={12} /> {t.common.regular}</span>}
          {p.urgent && <span className="rounded-full bg-accent-400 px-3 py-1 text-xs font-bold text-night shadow">{t.common.urgent}</span>}
        </span>
      </div>
      <span className="absolute bottom-3 start-3 rounded-full bg-night/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{tx(kindLabel[p.kind], lang)}</span>
    </div>
  );
}

export function Progress({ p, lang }: { p: Project; lang: Lang }) {
  const t = getDict(lang);
  if (p.raised == null) return null;
  const pct = p.goal ? Math.min(100, Math.round((p.raised / p.goal) * 100)) : null;
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span>
          <span className="num text-lg font-bold text-teal-900">${fmt(p.raised)}</span>
          {p.goal && <span className="text-muted"> {t.common.of} ${fmt(p.goal)}</span>}
        </span>
        <span className="text-muted"><span className="num font-bold text-teal-900">{fmt(p.donors ?? 0)}</span> {t.common.donors}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-valuenow={pct ?? undefined} aria-valuemin={0} aria-valuemax={100} aria-label={t.common.progress}>
        <div className="h-full rounded-full bg-gradient-to-l from-accent-400 to-accent-600" style={{ width: `${pct ?? 100}%` }} />
      </div>
      {pct != null && <p className="mt-1 text-xs font-semibold text-accent-700">{t.common.reached.replace("{p}", String(pct))}</p>}
    </div>
  );
}

/* بطاقة مشروع تفاعلية: اختيار المبلغ، تبرع مباشر، إضافة للسلة، إهداء */
export default function ProjectCard({ p, lang, view = "grid" }: { p: Project; lang: Lang; view?: "grid" | "list" }) {
  const { t, f, href } = useI18n();
  const cart = useCart();
  const router = useRouter();
  const [amount, setAmount] = useState(p.amounts[1] ?? p.amounts[0]);
  const [added, setAdded] = useState(false);
  const path = href(projectPath(p.slug));
  const add = () => cart.add({ slug: p.slug, amount, freq: "once" });
  const list = view === "list";

  return (
    <article className={`group flex overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-[0_28px_60px_-30px_rgba(0,61,85,.55)] ${list ? "flex-col md:flex-row" : "flex-col"}`}>
      <Link href={path} tabIndex={-1} aria-hidden="true" className={list ? "md:w-80 md:shrink-0" : ""}>
        <ProjectCover p={p} lang={lang} className={list ? "md:h-full md:min-h-60" : ""} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-kufi text-xl font-bold leading-snug text-teal-900">
          <Link href={path} className="hover:text-teal-700">{tx(p.title, lang)}</Link>
        </h3>
        <p className={`mb-4 text-[15px] leading-7 text-muted ${list ? "line-clamp-3" : "line-clamp-2"}`}>{tx(p.summary, lang)}</p>
        <div className="mt-auto">
          <Progress p={p} lang={lang} />
          <div className="mb-3 flex gap-1.5" role="group" aria-label={t.donate.amount}>
            {p.amounts.slice(0, 4).map((a) => (
              <button key={a} type="button" aria-pressed={amount === a} onClick={() => setAmount(a)}
                className={`num flex h-10 flex-1 items-center justify-center rounded-xl border text-[15px] font-bold transition ${amount === a ? "border-accent-500 bg-accent-100 text-accent-700" : "border-stone-300 text-teal-900 hover:border-teal-500"}`}>
                ${fmt(a)}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => { add(); router.push(href("/checkout")); }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent-500 font-bold text-white transition hover:bg-accent-600">
            {t.common.donateNow} <span className="num">${fmt(amount)}</span> <IconArrow size={18} />
          </button>
          <button type="button" onClick={() => { add(); setAdded(true); setTimeout(() => setAdded(false), 1800); }}
            className="mx-auto mt-2 flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-teal-700 hover:bg-teal-50">
            <IconBag size={16} /> {added ? f.cards.added : f.cards.quickAdd}
          </button>
        </div>
      </div>
    </article>
  );
}
