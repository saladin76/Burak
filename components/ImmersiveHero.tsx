import Link from "next/link";
import { GivingRings, QudsSkyline } from "./Motifs";
import { Particles } from "./Fx";
import { IconArrow } from "./Icons";
import { getDict, lhref, type Lang } from "@/lib/i18n";

/** بطل غامر بملء الشاشة لصفحات العطاء المخصّصة (الشهري / الزكاة) */
export default function ImmersiveHero({
  lang,
  kicker,
  title,
  text,
  quote,
  quoteSrc,
  cta,
  cta2,
  chips = [],
  visual,
  crumbs = [],
}: {
  lang: Lang;
  kicker: string;
  title: string;
  text: string;
  quote?: string;
  quoteSrc?: string;
  cta: { href: string; label: string };
  cta2?: { href: string; label: string };
  chips?: string[];
  visual: React.ReactNode;
  crumbs?: { href: string; label: string }[];
}) {
  const t = getDict(lang);
  return (
    <section data-hero className="grain relative isolate overflow-hidden bg-accent-700 text-white">
      {/* طبقات الخلفية */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_80%_20%,rgba(0,125,165,.55),transparent_70%),radial-gradient(50%_50%_at_10%_90%,rgba(58,175,201,.25),transparent_70%)]" />
      <GivingRings live className="pointer-events-none absolute -start-[25%] -top-[45%] -z-10 w-[1000px] max-w-none" rings={8} palette={["#007da5", "#3aafc9", "#64b6d0", "#399bb6", "#8acbda", "#52a6c0", "#3aafc9", "#aeddec"]} opacity={0.16} />
      <Particles count={22} />

      <div className="relative mx-auto grid min-h-[calc(100svh-150px)] max-w-7xl items-center gap-10 px-5 pb-28 pt-10 lg:grid-cols-[1.1fr_1fr] lg:pb-32">
        <div>
          <nav aria-label="breadcrumb" className="rise mb-6 text-sm text-accent-100/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={lhref(lang, "/")} className="hover:text-white">{t.common.home}</Link></li>
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-2"><span aria-hidden="true">/</span><Link href={lhref(lang, c.href)} className="hover:text-white">{c.label}</Link></li>
              ))}
              <li className="flex items-center gap-2"><span aria-hidden="true">/</span><span aria-current="page" className="font-semibold text-white">{title}</span></li>
            </ol>
          </nav>
          <p className="rise brand-tag mb-5 !bg-white/10 ring-1 ring-white/25 backdrop-blur">{kicker}</p>
          <h1 className="rise-2 font-kufi text-[38px] font-extrabold leading-[1.3] md:text-[56px] xl:text-[64px]">
            <span className="brand-label !bg-accent-500">{title}</span>
          </h1>
          <p className="rise-3 mt-6 max-w-xl text-lg leading-9 text-accent-100 md:text-xl">{text}</p>
          {quote && (
            <figure className="rise-3 mt-6 max-w-xl border-s-4 border-accent-400 ps-4">
              <blockquote className="font-naskh text-2xl leading-[1.8] text-white">{quote}</blockquote>
              {quoteSrc && <figcaption className="mt-1 text-sm text-accent-300">{quoteSrc}</figcaption>}
            </figure>
          )}
          <div className="rise-3 mt-8 flex flex-wrap gap-3">
            <a href={cta.href} className="btn-shine flex h-14 items-center gap-2 rounded-lg bg-white px-8 text-lg font-bold text-accent-700 shadow-[0_20px_40px_-20px_rgba(0,0,0,.6)] hover:bg-accent-100">
              {cta.label} <IconArrow size={20} />
            </a>
            {cta2 && (
              <a href={cta2.href} className="flex h-14 items-center gap-2 rounded-lg border-2 border-white/40 px-7 text-lg font-bold hover:border-white hover:bg-white/10">{cta2.label}</a>
            )}
          </div>
          {chips.length > 0 && (
            <ul className="rise-3 mt-8 flex flex-wrap gap-2">
              {chips.map((c) => (
                <li key={c} className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold text-accent-100 ring-1 ring-white/15 backdrop-blur">
                  <span className="glow h-1.5 w-1.5 rounded-full bg-accent-400" /> {c}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rise-2 relative">
          <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(0,61,85,.95)_45%,rgba(0,61,85,0)_72%)]" />
          <div className="relative">{visual}</div>
        </div>
      </div>
      <QudsSkyline className="absolute inset-x-0 bottom-0 h-[56px] w-full" color="#f5f9fb" />
    </section>
  );
}
