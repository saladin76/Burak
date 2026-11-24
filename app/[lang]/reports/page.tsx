import Link from "next/link";
import PageHero from "@/components/PageHero";
import { GivingWaves } from "@/components/Motifs";
import { IconArrow, KindIcon } from "@/components/Icons";
import { kindLabel, orgContent, projects, regionLabel, stats, type Kind, type Region } from "@/lib/data";
import { fmt, tx } from "@/lib/i18n";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.reports.title);

export default async function Reports({ params }: LangParams) {
  const { lang, t, h } = await pageLang(params);
  const R = t.reports;
  const byKind = (Object.keys(kindLabel) as Kind[]).map((k) => ({ k, n: projects.filter((p) => p.kind === k).length })).filter((x) => x.n).sort((a, b) => b.n - a.n);
  const byRegion = (Object.keys(regionLabel) as Region[]).map((r) => ({ r, n: projects.filter((p) => p.region === r).length }));
  const max = Math.max(...byKind.map((x) => x.n));
  const total = projects.length;
  const regionColor: Record<Region, string> = { quds: "#007da5", gaza: "#003d55", palestine: "#3aafc9" };
  let acc = 0;

  return (
    <>
      <PageHero lang={lang} title={R.title} kicker={R.kicker}>{R.text}</PageHero>

      <section className="mx-auto max-w-7xl px-5 pt-14">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[...stats.lifetime.map((s) => ({ v: s.value, l: tx(s.label, lang) })), ...stats.annual.map((s) => ({ v: fmt(s.value), l: tx(s.label, lang) }))].map((s, i) => (
            <div key={i} className={`arch border px-4 pb-6 pt-10 text-center ${i < 3 ? "border-teal-900 bg-teal-900 text-white" : "border-stone-200 bg-white"}`}>
              <p className={`num text-3xl font-bold ${i < 3 ? "text-accent-300" : "text-teal-900"}`} dir="ltr">{s.v}</p>
              <p className={`mt-2 text-sm ${i < 3 ? "text-teal-100" : "text-muted"}`}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-16">
        <h2 className="mb-8 font-kufi text-2xl font-bold text-teal-900 md:text-3xl">{t.home.howTitle}</h2>
        <ol className="grid gap-4 md:grid-cols-5">
          {t.home.steps.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-stone-200 bg-white p-5">
              <span className="num grid h-10 w-10 place-items-center rounded-full bg-teal-900 font-bold text-white">{i + 1}</span>
              <h3 className="mt-3 font-kufi text-lg font-bold text-teal-900">{s.t}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pt-16 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
          <h2 className="mb-6 font-kufi text-2xl font-bold text-teal-900">{R.byKind}</h2>
          <ul className="space-y-4">
            {byKind.map(({ k, n }) => (
              <li key={k} className="grid grid-cols-[auto_9rem_1fr_auto] items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal-100 text-teal-700"><KindIcon kind={k} size={20} /></span>
                <span className="font-semibold text-teal-900">{tx(kindLabel[k], lang)}</span>
                <span className="h-3 overflow-hidden rounded-full bg-stone-100">
                  <span className="block h-full rounded-full bg-teal-500" style={{ width: `${(n / max) * 100}%` }} />
                </span>
                <span className="num font-bold text-teal-900">{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-night p-6 text-white md:p-8">
          <GivingWaves className="pointer-events-none absolute -bottom-6 end-[-30px] h-60 w-auto" opacity={0.15} />
          <h2 className="relative mb-6 font-kufi text-2xl font-bold">{R.byRegion}</h2>
          <svg viewBox="0 0 42 42" className="relative mx-auto h-48 w-48 -rotate-90" role="img" aria-label={R.byRegion}>
            {byRegion.map(({ r, n }) => {
              const pct = (n / total) * 100;
              const el = <circle key={r} cx="21" cy="21" r="15.9" fill="none" stroke={regionColor[r]} strokeWidth="6" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={-acc} />;
              acc += pct;
              return el;
            })}
          </svg>
          <ul className="relative mt-6 space-y-2">
            {byRegion.map(({ r, n }) => (
              <li key={r} className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ background: regionColor[r] === "#003d55" ? "#8acbda" : regionColor[r] }} />
                <span>{tx(regionLabel[r], lang)}</span>
                <span className="num ms-auto font-bold">{n} {R.projects}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-16">
        {orgContent.annualReports.length > 0 && (
          <>
            <h2 className="mb-6 font-kufi text-2xl font-bold text-teal-900">{R.annual}</h2>
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              {orgContent.annualReports.map((r) => (
                <a key={r.year} href={r.url} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 hover:border-teal-500">
                  <span className="num grid h-16 w-14 place-items-center rounded-b-md rounded-t-full bg-accent-100 text-lg font-bold text-accent-700">{r.year}</span>
                  <p className="font-bold text-teal-900">{R.download}</p>
                </a>
              ))}
            </div>
          </>
        )}
        <Link href={h("/projects")} className="inline-flex h-12 items-center gap-2 rounded-full bg-accent-500 px-6 font-bold text-white hover:bg-accent-600">
          {t.about.contribute} <IconArrow size={18} />
        </Link>
      </section>
    </>
  );
}
