"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { projects, kindLabel, type Kind, type Project, type Region } from "@/lib/data";
import { tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { IconRepeat, IconSearch, KindIcon } from "./Icons";

type Tab = "all" | Region | "zakat" | "monthly";
type Sort = "featured" | "urgent" | "goal" | "low";

const match = (tab: Tab, p: Project) =>
  tab === "all" ? true : tab === "quds" ? p.region === "quds" : tab === "gaza" ? p.region !== "quds" : tab === "zakat" ? p.kind === "zakat" : tab === "monthly" ? !!p.monthly : true;

export default function ProjectsExplorer({ limit }: { limit?: number }) {
  const { lang, t, f, href } = useI18n();
  const P = t.projectsPage;
  const C = f.cards;
  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: P.tabs.all },
    { key: "quds", label: P.tabs.quds },
    { key: "gaza", label: P.tabs.gaza },
    { key: "zakat", label: P.tabs.zakat },
    { key: "monthly", label: P.tabs.monthly },
  ];
  const sp = useSearchParams();
  const initial: Tab = sp.get("monthly") ? "monthly" : sp.get("kind") === "zakat" ? "zakat" : ((sp.get("region") as Tab) ?? "all");
  const [tab, setTab] = useState<Tab>(tabs.some((x) => x.key === initial) ? initial : "all");
  const qk = sp.get("kind");
  const [kind, setKind] = useState<Kind | "">(qk && qk !== "zakat" && qk in kindLabel ? (qk as Kind) : "");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  const list = useMemo(() => {
    let l = projects.filter((p) => match(tab, p));
    if (kind) l = l.filter((p) => p.kind === kind);
    const s = q.trim().toLowerCase();
    if (s) l = l.filter((p) => (tx(p.title, lang) + " " + tx(p.summary, lang)).toLowerCase().includes(s));
    const score = (p: Project) =>
      sort === "urgent" ? (p.urgent ? 0 : 1) : sort === "goal" ? (p.goal && p.raised ? -(p.raised / p.goal) : p.raised ? -0.5 : 1) : sort === "low" ? p.amounts[0] : p.featured ? 0 : p.urgent ? 1 : 2;
    l = [...l].sort((a, b) => score(a) - score(b));
    return limit ? l.slice(0, limit) : l;
  }, [tab, kind, q, limit, lang, sort]);

  const kinds = (Object.keys(kindLabel) as Kind[]).filter((k) => projects.some((p) => match(tab, p) && p.kind === k));
  const active = tab !== "all" || !!kind || !!q.trim();
  const reset = () => { setTab("all"); setKind(""); setQ(""); setSort("featured"); };
  const tabIcon: Partial<Record<Tab, React.ReactNode>> = {
    all: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
    quds: <KindIcon kind="aqsa" size={18} />,
    gaza: <KindIcon kind="food" size={18} />,
    zakat: <KindIcon kind="zakat" size={18} />,
    monthly: <IconRepeat size={18} />,
  };

  if (limit)
    return (
      <div>
        <div role="tablist" aria-label={P.filter} className="mb-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {tabs.map((x) => {
            const page = x.key === "monthly" ? "/monthly" : x.key === "zakat" ? "/zakat" : null;
            const cls = `flex h-11 shrink-0 items-center gap-2 rounded-lg px-4 text-[15px] font-semibold transition ${tab === x.key ? "bg-accent-500 text-white" : "border border-stone-200 bg-white text-teal-900 hover:border-accent-400"}`;
            return page ? (
              <Link key={x.key} href={href(page)} className={cls}>
                {tabIcon[x.key]} {x.label}
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-accent-500 rtl:-scale-x-100" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </Link>
            ) : (
              <button key={x.key} role="tab" aria-selected={tab === x.key} onClick={() => setTab(x.key)} className={cls}>
                {tabIcon[x.key]} {x.label}
              </button>
            );
          })}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProjectCard key={p.slug} p={p} lang={lang} view="grid" />)}
        </div>
      </div>
    );

  return (
    <div>
      <div className="mb-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_18px_50px_-35px_rgba(0,61,85,.45)] lg:sticky lg:top-[92px] lg:z-20">
        {/* المناطق — تبويبات */}
        <div role="tablist" aria-label={P.filter} className="flex overflow-x-auto border-b border-stone-200 [scrollbar-width:none]">
          {tabs.map((x) => {
            const n = projects.filter((p) => match(x.key, p)).length;
            const on = tab === x.key;
            const page = x.key === "monthly" ? "/monthly" : x.key === "zakat" ? "/zakat" : null;
            const cls = `relative flex h-14 shrink-0 items-center gap-2 whitespace-nowrap px-4 text-[15px] font-semibold transition md:flex-1 md:justify-center lg:px-5 ${on ? "text-accent-600" : "text-teal-700 hover:bg-stone-50 hover:text-teal-900"}`;
            const inner = (
              <>
                <span className={on ? "text-accent-500" : "text-teal-300"}>{tabIcon[x.key]}</span>
                {x.label}
                {page ? (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-accent-500 rtl:-scale-x-100" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                ) : (
                  <span className={`num rounded px-1.5 py-0.5 text-xs ${on ? "bg-accent-500 text-white" : "bg-stone-100 text-teal-700"}`}>{n}</span>
                )}
                {on && <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-accent-500" />}
              </>
            );
            return page ? (
              <Link key={x.key} href={href(page)} className={cls}>{inner}</Link>
            ) : (
              <button key={x.key} role="tab" aria-selected={on} onClick={() => { setTab(x.key); setKind(""); }} className={cls}>{inner}</button>
            );
          })}
        </div>

        {/* البحث والترتيب والعرض */}
        <div className="flex flex-wrap items-center gap-2 p-3">
          <div className="relative min-w-[220px] flex-1">
            <label className="sr-only" htmlFor="q">{P.searchPh}</label>
            <IconSearch size={18} className="pointer-events-none absolute inset-y-0 start-3.5 my-auto text-teal-300" />
            <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={P.searchPh}
              className="h-11 w-full rounded-lg border border-stone-200 bg-stone-50 pe-4 ps-10 text-[15px] text-teal-900 placeholder:text-teal-300 focus:border-accent-400 focus:bg-white" />
          </div>
          <div className="relative">
            <label className="sr-only" htmlFor="sort">{C.sort}</label>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="pointer-events-none absolute inset-y-0 start-3 my-auto text-teal-300"><path d="M7 4v16M4 7l3-3 3 3M17 20V4M14 17l3 3 3-3" /></svg>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 appearance-none rounded-lg border border-stone-200 bg-stone-50 pe-9 ps-9 text-[15px] font-semibold text-teal-900 focus:border-accent-400">
              {(Object.keys(C.sortOpts) as Sort[]).map((k) => <option key={k} value={k}>{C.sortOpts[k]}</option>)}
            </select>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute inset-y-0 end-3 my-auto text-teal-700"><path d="m6 9 6 6 6-6" /></svg>
          </div>
          <div className="hidden h-11 items-center rounded-lg border border-stone-200 bg-stone-50 p-1 md:flex" role="group">
            {(["grid", "list"] as const).map((v) => (
              <button key={v} aria-pressed={view === v} aria-label={v === "grid" ? C.grid : C.list} title={v === "grid" ? C.grid : C.list} onClick={() => setView(v)}
                className={`grid h-9 w-10 place-items-center rounded-md transition ${view === v ? "bg-white text-accent-600 shadow" : "text-teal-300 hover:text-teal-700"}`}>
                {v === "grid"
                  ? <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
                  : <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" /></svg>}
              </button>
            ))}
          </div>
        </div>

        {/* المجالات — رقائق بأيقونات */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-stone-200 bg-stone-50/60 px-3 py-2.5 [scrollbar-width:none]">
          <span className="shrink-0 pe-1 text-xs font-bold uppercase tracking-wide text-teal-700">{C.filterBy}</span>
          <button onClick={() => setKind("")} aria-pressed={!kind}
            className={`h-9 shrink-0 rounded-md px-3 text-sm font-semibold transition ${!kind ? "bg-accent-700 text-white" : "bg-white text-teal-700 ring-1 ring-stone-200 hover:ring-accent-400"}`}>
            {P.allKinds}
          </button>
          {kinds.map((k) => (
            <button key={k} onClick={() => setKind(kind === k ? "" : k)} aria-pressed={kind === k}
              className={`flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm font-semibold transition ${kind === k ? "bg-accent-700 text-white" : "bg-white text-teal-700 ring-1 ring-stone-200 hover:ring-accent-400"}`}>
              <KindIcon kind={k} size={16} /> {tx(kindLabel[k], lang)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-muted">
          <span className="num font-bold text-teal-900">{list.length}</span> {C.results.replace("{n}", "").trim()}
        </p>
        {active && (
          <button onClick={reset} className="flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:text-accent-700">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            {C.clear}
          </button>
        )}
      </div>
      {list.length ? (
        <div className={view === "list" ? "grid gap-5" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
          {list.map((p) => <ProjectCard key={p.slug} p={p} lang={lang} view={view} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center text-muted">{P.empty}<button onClick={reset} className="mt-4 block w-full font-bold text-accent-600">{C.clear}</button></div>
      )}
    </div>
  );
}
