"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { projects, kindLabel, type Kind, type Region } from "@/lib/data";
import { tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import ProjectCard from "./ProjectCard";
import { IconSearch } from "./Icons";

type Tab = "all" | Region | "zakat" | "monthly";

export default function ProjectsExplorer({ limit }: { limit?: number }) {
  const { lang, t } = useI18n();
  const P = t.projectsPage;
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

  const list = useMemo(() => {
    let l = projects;
    if (tab === "quds") l = l.filter((p) => p.region === "quds");
    if (tab === "gaza") l = l.filter((p) => p.region !== "quds");
    if (tab === "zakat") l = l.filter((p) => p.kind === "zakat");
    if (tab === "monthly") l = l.filter((p) => p.monthly);
    if (kind) l = l.filter((p) => p.kind === kind);
    const s = q.trim().toLowerCase();
    if (s) l = l.filter((p) => (tx(p.title, lang) + " " + tx(p.summary, lang)).toLowerCase().includes(s));
    return limit ? l.slice(0, limit) : l;
  }, [tab, kind, q, limit, lang]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label={P.filter} className="flex flex-wrap gap-2">
          {tabs.map((x) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={tab === x.key}
              onClick={() => setTab(x.key)}
              className={`h-11 rounded-full px-5 text-[15px] font-semibold transition ${
                tab === x.key ? "bg-teal-900 text-white" : "border border-stone-300 bg-white text-teal-900 hover:border-teal-500"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>
        {!limit && (
          <div className="ms-auto flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="kind">{P.kind}</label>
            <select id="kind" value={kind} onChange={(e) => setKind(e.target.value as Kind | "")} className="h-11 rounded-full border border-stone-300 bg-white px-4 text-[15px] text-teal-900">
              <option value="">{P.allKinds}</option>
              {(Object.keys(kindLabel) as Kind[]).map((k) => (
                <option key={k} value={k}>{tx(kindLabel[k], lang)}</option>
              ))}
            </select>
            <div className="relative">
              <label className="sr-only" htmlFor="q">{P.searchPh}</label>
              <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder={P.searchPh} className="h-11 w-56 rounded-full border border-stone-300 bg-white pe-4 ps-10 text-[15px]" />
              <IconSearch size={18} className="pointer-events-none absolute inset-y-0 start-3.5 my-auto text-muted" />
            </div>
          </div>
        )}
      </div>
      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProjectCard key={p.slug} p={p} lang={lang} />)}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-stone-300 p-10 text-center text-muted">{P.empty}</p>
      )}
    </div>
  );
}
