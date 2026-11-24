import Link from "next/link";
import { kindLabel, regionLabel, type Project } from "@/lib/data";
import { fmt, getDict, lhref, tx, type Lang } from "@/lib/i18n";
import { IconArrow, IconRepeat, KindIcon } from "./Icons";
import { GivingWaves } from "./Motifs";
import SmartImg from "./SmartImg";

const coverTone = (p: Project) =>
  p.kind === "zakat" ? "bg-gold-600 text-gold-100" : p.region === "quds" ? "bg-teal-700 text-teal-50" : "bg-night-2 text-teal-100";

export function ProjectCover({ p, lang, tall = false }: { p: Project; lang: Lang; tall?: boolean }) {
  const t = getDict(lang);
  return (
    <div className={`relative overflow-hidden ${coverTone(p)} ${tall ? "h-80 md:h-96" : "h-48"}`}>
      <div className="pattern-khatam absolute inset-0 opacity-60" />
      <GivingWaves
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${tall ? "h-64" : "h-40"}`}
        rings={5}
        stroke={6}
        gap={7}
        palette={p.kind === "zakat" ? ["#f8edcf", "#ebcd7a", "#dcb24b", "#f8edcf", "#ebcd7a"] : ["#c5e5f1", "#8acbda", "#64b6d0", "#3aafc9", "#ebcd7a"]}
        opacity={0.9}
      />
      <div className={`absolute bottom-0 left-1/2 grid -translate-x-1/2 place-items-center ${tall ? "h-28 w-20" : "h-16 w-14"}`}>
        <KindIcon kind={p.kind} size={tall ? 48 : 30} className="text-gold-300" />
      </div>
      <SmartImg src={p.image} alt={tx(p.title, lang)} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      {p.image && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-900">{tx(regionLabel[p.region], lang)}</span>
        {p.urgent && <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-night">{t.common.urgent}</span>}
      </div>
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
        <span className="text-muted">
          <span className="num font-bold text-teal-900">{fmt(p.donors ?? 0)}</span> {t.common.donors}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-valuenow={pct ?? undefined} aria-valuemin={0} aria-valuemax={100} aria-label={t.common.progress}>
        <div className="h-full rounded-full bg-gradient-to-l from-gold-400 to-gold-600" style={{ width: `${pct ?? 100}%` }} />
      </div>
      {pct != null && <p className="mt-1 text-xs font-semibold text-gold-700">{t.common.reached.replace("{p}", String(pct))}</p>}
    </div>
  );
}

export default function ProjectCard({ p, lang }: { p: Project; lang: Lang }) {
  const t = getDict(lang);
  const h = (x: string) => lhref(lang, x);
  return (
    <article className="group flex flex-col overflow-hidden rounded-[24px] border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,61,85,.5)]">
      <Link href={h(`/projects/${p.slug}`)} tabIndex={-1} aria-hidden="true">
        <ProjectCover p={p} lang={lang} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-teal-700">
          <span>{tx(kindLabel[p.kind], lang)}</span>
          {p.monthly && (
            <span className="flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-teal-900">
              <IconRepeat size={12} /> {t.common.regular}
            </span>
          )}
        </div>
        <h3 className="mb-2 font-kufi text-xl font-bold leading-snug text-teal-900">
          <Link href={h(`/projects/${p.slug}`)} className="hover:text-teal-700">{tx(p.title, lang)}</Link>
        </h3>
        <p className="mb-4 line-clamp-2 text-[15px] leading-7 text-muted">{tx(p.summary, lang)}</p>
        <div className="mt-auto">
          <Progress p={p} lang={lang} />
          <div className="mb-3 flex gap-2">
            {p.amounts.slice(0, 3).map((a) => (
              <Link
                key={a}
                href={h(`/projects/${p.slug}?amount=${a}`)}
                className="num flex h-10 flex-1 items-center justify-center rounded-xl border border-stone-300 text-[15px] font-bold text-teal-900 hover:border-gold-500 hover:bg-gold-100 hover:text-gold-700"
              >
                ${fmt(a)}
              </Link>
            ))}
          </div>
          <Link href={h(`/projects/${p.slug}`)} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-900 font-bold text-white transition hover:bg-teal-700">
            {t.common.donateNow} <IconArrow size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
