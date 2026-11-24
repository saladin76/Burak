"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { projects, kindLabel, type Kind, type Project, type Region } from "@/lib/data";
import { tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import ProjectCard from "./ProjectCard";
import { IconSearch } from "./Icons";

type Tab = "all" | Region | "zakat" | "monthly";
type Sort = "featured" | "urgent" | "goal" | "low";

const match = (tab: Tab, p: Project) =>
  tab === "all" ? true : tab === "quds" ? p.region === "quds" : tab === "gaza" ? p.region !== "quds" : tab === "zakat" ? p.kind === "zakat" : tab === "monthly" ? !!p.monthly : true;

export default function ProjectsExplorer({ limit }: { limit?: number }) {
  const { lang, t, f } = useI18n();
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

  return (
    <div>
      <div className={`mb-8 flex flex-wrap items-center gap-3 ${limit ? "" : "sticky top-[84px] z-20 -mx-2 rounded-2xl bg-stone-50/90 p-2 backdrop-blur"}`}>
        <div role="tablist" aria-label={P.filter} className="flex flex-wrap gap-2">
          {tabs.map((x) => {
            const n = projects.filter((p) => match(x.key, p)).length;
            return (
              <button key={x.key} role="tab" aria-selected={tab === x.key} onClick={() => setTab(x.key)}
                className={`flex h-11 items-center gap-2 rounded-full ps-5 pe-2 text-[15px] font-semibold transition ${tab === x.key ? "bg-teal-900 text-white" : "border border-stone-300 bg-white text-teal-900 hover:border-teal-500"}`}>
                {x.label}
                <span className={`num grid h-7 min-w-7 place-items-center rounded-full px-1.5 text-xs ${tab === x.key ? "bg-white/15" : "bg-stone-100"}`}>{n}</span>
              </button>
            );
          })}
        </div>
        {!limit && (
          <div className="ms-auto flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="kind">{P.kind}</label>
            <select id="kind" value={kind} onChange={(e) => setKind(e.target.value as Kind | "")} className="h-11 rounded-full border border-stone-300 bg-white px-4 text-[15px] text-teal-900">
              <option value="">{P.allKinds}</option>
              {(Object.keys(kindLabel) as Kind[]).map((k) => <option key={k} value={k}>{tx(kindLabel[k], lang)}</option>)}
            </select>
            <label className="sr-only" htmlFor="sort">{C.sort}</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-11 rounded-full border border-stone-300 bg-white px-4 text-[15px] text-teal-900">
              {(Object.keys(C.sortOpts) as Sort[]).map((k) => <option key={k} value={k}>{C.sort}: {C.sortOpts[k]}</option>)}
            </select>
            <div className="relative">
              <label className="sr-only" htmlFor="q">{P.searchPh}</label>
              <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder={P.searchPh} className="h-11 w-52 rounded-full border border-stone-300 bg-white pe-4 ps-10 text-[15px]" />
              <IconSearch size={18} className="pointer-events-none absolute inset-y-0 start-3.5 my-auto text-muted" />
            </div>
            <div className="hidden rounded-full border border-stone-300 bg-white p-1 md:flex" role="group">
              {(["grid", "list"] as const).map((v) => (
                <button key={v} aria-pressed={view === v} onClick={() => setView(v)} className={`h-9 rounded-full px-3 text-sm font-semibold ${view === v ? "bg-teal-900 text-white" : "text-teal-900"}`}>
                  {v === "grid" ? C.grid : C.list}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {!limit && <p className="mb-4 text-sm font-semibold text-muted">{C.results.replace("{n}", String(list.length))}</p>}
      {list.length ? (
        <div className={view === "list" && !limit ? "grid gap-5" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}>
          {list.map((p) => <ProjectCard key={p.slug} p={p} lang={lang} view={limit ? "grid" : view} />)}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-stone-300 p-10 text-center text-muted">{P.empty}</p>
      )}
    </div>
  );
}
