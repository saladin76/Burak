import Link from "next/link";
import { BurakLogo, GivingRings, QudsSkyline } from "./Motifs";
import { IconBank, IconFacebook, IconInstagram, IconMail, IconPhone, IconShield, IconTiktok, IconWhatsapp, IconX, IconYoutube, IconPin } from "./Icons";
import { contact, socials } from "@/lib/data";
import { getDict, lhref, type Lang } from "@/lib/i18n";

const sIcon: Record<string, React.ReactNode> = {
  facebook: <IconFacebook size={19} />,
  instagram: <IconInstagram size={19} />,
  x: <IconX size={17} />,
  tiktok: <IconTiktok size={19} />,
  youtube: <IconYoutube size={19} />,
};

export default function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const h = (p: string) => lhref(lang, p);
  const handle = contact.handles[lang];
  const linkCls = "inline-block py-1 hover:text-accent-300";

  return (
    <footer className="relative mt-24 bg-night text-teal-100">
      <QudsSkyline className="absolute inset-x-0 -top-[59px] h-[60px] w-full" color="#003d55" />
      <div className="pattern-khatam absolute inset-0 opacity-[.07]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GivingRings className="absolute -bottom-40 end-[-140px] h-[560px] w-[560px]" opacity={0.14} rings={8} />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-16 lg:pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <BurakLogo light latin={lang !== "ar"} className="h-24" />
            <p className="mt-5 max-w-sm leading-8 text-teal-100/85">{t.footer.about}</p>
            <p className="mt-4 font-kufi text-xl text-accent-300">{t.common.slogan}</p>
          </div>

          <nav aria-label={t.footer.org}>
            <h2 className="mb-4 font-kufi text-lg font-bold text-white">{t.footer.org}</h2>
            <ul className="space-y-1">
              <li><Link className={linkCls} href={h("/about")}>{t.nav.about}</Link></li>
              <li><Link className={linkCls} href={h("/about#vision")}>{t.footer.vision}</Link></li>
              <li><Link className={linkCls} href={h("/reports")}>{t.nav.reports}</Link></li>
              <li><Link className={linkCls} href={h("/news")}>{t.nav.news}</Link></li>
              <li><Link className={linkCls} href={h("/media")}>{t.nav.media}</Link></li>
              <li><Link className={linkCls} href={h("/volunteer")}>{t.nav.volunteer}</Link></li>
              <li><Link className={linkCls} href={h("/contact#faq")}>{t.footer.faq}</Link></li>
            </ul>
          </nav>

          <nav aria-label={t.footer.give}>
            <h2 className="mb-4 font-kufi text-lg font-bold text-white">{t.footer.give}</h2>
            <ul className="space-y-1">
              <li><Link className={linkCls} href={h("/projects?region=quds")}>{t.footer.qudsProjects}</Link></li>
              <li><Link className={linkCls} href={h("/projects?region=gaza")}>{t.footer.gazaRelief}</Link></li>
              <li><Link className={linkCls} href={h("/zakat")}>{t.common.zakatCalc}</Link></li>
              <li><Link className={linkCls} href={h("/monthly")}>{t.footer.monthly}</Link></li>
              <li><Link className={linkCls} href={h("/cart")}>{t.common.cart}</Link></li>
              <li><Link className={linkCls} href={h("/contact#bank")}>{t.common.bank}</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-kufi text-lg font-bold text-white">{t.footer.contact}</h2>
            <ul className="space-y-3">
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-accent-300">
                  <IconPhone size={18} /> <span dir="ltr">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a href={contact.phoneTrHref} className="flex items-center gap-2 hover:text-accent-300">
                  <IconPhone size={18} /> <span dir="ltr">{contact.phoneTr}</span> <span className="text-xs text-teal-100/60">{t.footer.trSupport}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-accent-300">
                  <IconMail size={18} /> {contact.email}
                </a>
              </li>
              <li>
                <Link href={h("/contact#bank")} className="flex items-center gap-2 hover:text-accent-300">
                  <IconBank size={18} /> {t.common.bank}
                </Link>
              </li>
              <li className="flex items-start gap-2 text-sm leading-6 text-teal-100/80" lang="tr" dir="ltr">
                <IconPin size={18} className="mt-0.5 shrink-0" /> {contact.address}
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials(handle).map((x) => (
                <a key={x.key} aria-label={t.social[x.key]} href={x.href} className="grid h-11 w-11 place-items-center rounded-full border border-teal-700 hover:border-accent-300 hover:text-accent-300">
                  {sIcon[x.key]}
                </a>
              ))}
              <a aria-label={t.social.whatsapp} href={contact.whatsapp} className="grid h-11 w-11 place-items-center rounded-full border border-teal-700 hover:border-accent-300 hover:text-accent-300">
                <IconWhatsapp size={19} />
              </a>
            </div>
            <p className="mt-3 text-xs leading-6 text-teal-100/60" dir="ltr">
              AR @{contact.handles.ar} · TR @{contact.handles.tr} · EN @{contact.handles.en}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-teal-100/70 md:flex-row">
          <p>
            © {new Date().getFullYear()} {t.meta.org} — <span lang="tr">{contact.legalName}</span>. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-1.5"><IconShield size={16} /> {t.footer.secure}</span>
            <Link href="#" className="inline-block py-1 hover:text-accent-300">{t.footer.privacy}</Link>
            <Link href="#" className="inline-block py-1 hover:text-accent-300">{t.footer.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
