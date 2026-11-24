import Link from "next/link";
import { fmt, kindLabel, regionLabel, type Project } from "@/lib/data";
import { IconArrow, IconRepeat, KindIcon } from "./Icons";

const coverTone = (p: Project) =>
  p.kind === "zakat"
    ? "bg-gold-600 text-gold-100"
    : p.region === "quds"
      ? "bg-teal-700 text-teal-50"
      : "bg-night-2 text-teal-100";

export function ProjectCover({ p, tall = false }: { p: Project; tall?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${coverTone(p)} ${tall ? "h-72" : "h-44"}`}>
      <div className="pattern-khatam absolute inset-0 opacity-60" />
      {/* نافذة قوسية تحمل أيقونة المجال */}
      <div className="absolute bottom-0 left-1/2 grid h-[78%] w-36 -translate-x-1/2 place-items-center rounded-t-full border-2 border-b-0 border-gold-300/70 bg-black/15">
        <KindIcon kind={p.kind} size={tall ? 64 : 46} className="text-gold-300" />
      </div>
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-900">{regionLabel[p.region]}</span>
        {p.urgent && <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-night">عاجل</span>}
      </div>
    </div>
  );
}

export function Progress({ p }: { p: Project }) {
  if (p.raised == null) return null;
  const pct = p.goal ? Math.min(100, Math.round((p.raised / p.goal) * 100)) : null;
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span>
          <span className="num text-lg font-bold text-teal-900">${fmt(p.raised)}</span>
          {p.goal && <span className="text-muted"> من ${fmt(p.goal)}</span>}
        </span>
        <span className="text-muted">
          <span className="num font-bold text-teal-900">{fmt(p.donors ?? 0)}</span> متبرعاً
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-valuenow={pct ?? undefined} aria-valuemin={0} aria-valuemax={100} aria-label="نسبة الإنجاز">
        <div className="h-full rounded-full bg-gradient-to-l from-gold-400 to-gold-600" style={{ width: `${pct ?? 100}%` }} />
      </div>
      {pct != null && <p className="mt-1 text-xs font-semibold text-gold-700">تحقق {pct}% من الهدف</p>}
    </div>
  );
}

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[24px] border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(1,64,78,.5)]">
      <Link href={`/projects/${p.slug}`} tabIndex={-1} aria-hidden="true">
        <ProjectCover p={p} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-teal-700">
          <span>{kindLabel[p.kind]}</span>
          {p.monthly && (
            <span className="flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-teal-900">
              <IconRepeat size={12} /> تبرع منتظم
            </span>
          )}
        </div>
        <h3 className="mb-2 font-kufi text-xl font-bold leading-snug text-teal-900">
          <Link href={`/projects/${p.slug}`} className="hover:text-teal-700">
            {p.title}
          </Link>
        </h3>
        <p className="mb-4 line-clamp-2 text-[15px] leading-7 text-muted">{p.summary}</p>
        <div className="mt-auto">
          <Progress p={p} />
          <div className="mb-3 flex gap-2">
            {p.amounts.slice(0, 3).map((a) => (
              <Link
                key={a}
                href={`/projects/${p.slug}?amount=${a}`}
                className="num flex h-10 flex-1 items-center justify-center rounded-xl border border-stone-300 text-[15px] font-bold text-teal-900 hover:border-gold-500 hover:bg-gold-100 hover:text-gold-700"
              >
                ${fmt(a)}
              </Link>
            ))}
          </div>
          <Link
            href={`/projects/${p.slug}`}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-900 font-bold text-white transition hover:bg-teal-700"
          >
            تبرع الآن <IconArrow size={18} className="transition group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
