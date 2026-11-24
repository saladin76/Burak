import Link from "next/link";
import { Khatam, QudsSkyline } from "./Motifs";
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
    <section data-hero className="relative overflow-hidden bg-night text-white">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      )}
      <div className="pattern-khatam absolute inset-0 opacity-[.09]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-12">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-teal-100/80">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href={lhref(lang, "/")} className="hover:text-gold-300">{t.common.home}</Link></li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <Link href={lhref(lang, c.href)} className="hover:text-gold-300">{c.label}</Link>
              </li>
            ))}
            <li className="flex items-center gap-2"><span aria-hidden="true">/</span><span aria-current="page" className="text-gold-300">{title}</span></li>
          </ol>
        </nav>
        {kicker && (
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-gold-300"><Khatam className="h-5 w-5" color="#ebcd7a" />{kicker}</p>
        )}
        <h1 className="max-w-4xl text-balance font-kufi text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-9 text-teal-100/90">{children}</div>}
      </div>
      <QudsSkyline className="absolute inset-x-0 bottom-0 h-[50px] w-full" color="#fbf8f2" />
    </section>
  );
}
