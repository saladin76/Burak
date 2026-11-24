import Link from "next/link";
import { GivingRings, Khatam, QudsSkyline } from "./Motifs";
import { getDict, lhref, type Lang } from "@/lib/i18n";

export default function PageHero({
  lang,
  title,
  kicker,
  children,
  crumbs = [],
  image,
}: {
  lang: Lang;
  title: string;
  kicker?: string;
  children?: React.ReactNode;
  crumbs?: { href: string; label: string }[];
  image?: string;
}) {
  const t = getDict(lang);
  return (
    <section data-hero className="relative overflow-hidden bg-gradient-to-b from-white via-[#eef8fb] to-[#c5e5f1] text-teal-900">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-y-0 end-0 h-full w-full object-cover opacity-90 lg:w-[58%]" />
      )}
      {image && <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/85 to-white rtl:bg-gradient-to-r" />}
      <GivingRings className="pointer-events-none absolute -top-48 -start-48 w-[620px]" rings={7} opacity={0.3} palette={["#8acbda", "#aeddec", "#64b6d0", "#c5e5f1", "#8acbda", "#aeddec", "#64b6d0"]} />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 md:pb-24 md:pt-12">
        <nav aria-label="breadcrumb" className="mb-4 text-sm text-teal-700 md:mb-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href={lhref(lang, "/")} className="hover:text-accent-500">{t.common.home}</Link></li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <Link href={lhref(lang, c.href)} className="hover:text-accent-500">{c.label}</Link>
              </li>
            ))}
            <li className="flex items-center gap-2"><span aria-hidden="true">/</span><span aria-current="page" className="font-semibold text-accent-600">{title}</span></li>
          </ol>
        </nav>
        {kicker && (
          <p className="brand-tag mb-5"><Khatam className="h-4 w-4" color="#ffffff" />{kicker}</p>
        )}
        <h1 className="max-w-4xl font-kufi text-[34px] font-extrabold leading-[1.45] md:text-6xl"><span className="brand-label">{title}</span></h1>
        {children && <div className="mt-5 max-w-2xl text-base leading-8 text-teal-700 md:text-lg md:leading-9">{children}</div>}
      </div>
      <QudsSkyline className="absolute inset-x-0 bottom-0 h-[50px] w-full" color="#f5f9fb" />
    </section>
  );
}
