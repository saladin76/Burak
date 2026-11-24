"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { projects, kindLabel, type Kind, type Region } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import { IconSearch } from "./Icons";

type Tab = "all" | Region | "zakat" | "monthly";
const tabs: { key: Tab; label: string }[] = [
  { key: "all", label: "كل المشاريع" },
  { key: "quds", label: "القدس" },
  { key: "gaza", label: "غزة" },
  { key: "zakat", label: "الزكاة" },
  { key: "monthly", label: "التبرع الشهري" },
];

export default function ProjectsExplorer({ limit }: { limit?: number }) {
  const sp = useSearchParams();
  const initial: Tab =
    sp.get("monthly") ? "monthly" : sp.get("kind") === "zakat" ? "zakat" : ((sp.get("region") as Tab) ?? "all");
  const [tab, setTab] = useState<Tab>(tabs.some((t) => t.key === initial) ? initial : "all");
  const [kind, setKind] = useState<Kind | "">((sp.get("kind") as Kind) && sp.get("kind") !== "zakat" ? (sp.get("kind") as Kind) : "");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = projects;
    if (tab === "quds") l = l.filter((p) => p.region === "quds");
    if (tab === "gaza") l = l.filter((p) => p.region !== "quds");
    if (tab === "zakat") l = l.filter((p) => p.kind === "zakat");
    if (tab === "monthly") l = l.filter((p) => p.monthly);
    if (kind) l = l.filter((p) => p.kind === kind);
    if (q.trim()) l = l.filter((p) => (p.title + p.summary).includes(q.trim()));
    return limit ? l.slice(0, limit) : l;
  }, [tab, kind, q, limit]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="تصفية المشاريع" className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`h-11 rounded-full px-5 text-[15px] font-semibold transition ${
                tab === t.key ? "bg-teal-900 text-white" : "border border-stone-300 bg-white text-teal-900 hover:border-teal-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {!limit && (
          <div className="ms-auto flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="kind">المجال</label>
            <select
              id="kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as Kind | "")}
              className="h-11 rounded-full border border-stone-300 bg-white px-4 text-[15px] text-teal-900"
            >
              <option value="">كل المجالات</option>
              {Object.entries(kindLabel).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            <div className="relative">
              <label className="sr-only" htmlFor="q">ابحث عن مشروع</label>
              <input
                id="q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث عن مشروع"
                className="h-11 w-56 rounded-full border border-stone-300 bg-white ps-10 pe-4 text-[15px]"
              />
              <IconSearch size={18} className="pointer-events-none absolute inset-y-0 start-3.5 my-auto text-muted" />
            </div>
          </div>
        )}
      </div>

      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-stone-300 p-10 text-center text-muted">لا توجد مشاريع مطابقة للبحث.</p>
      )}
    </div>
  );
}
