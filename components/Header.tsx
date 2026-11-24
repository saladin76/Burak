"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BurakLogo } from "./Motifs";
import { IconBag, IconClose, IconGlobe, IconHeart, IconMail, IconMenu, IconPhone } from "./Icons";
import { contact } from "@/lib/data";
import { locales, type Lang } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { useCart } from "@/lib/cart";

export default function Header() {
  const { lang, t, f, href } = useI18n();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname() || `/${lang}`;
  const rest = path.replace(/^\/(ar|tr|en)/, "") || "/";

  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/projects", label: t.nav.projects },
    { href: "/quds", label: t.nav.quds },
    { href: "/news", label: t.nav.news },
    { href: "/media", label: t.nav.media },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const langLink = (l: Lang) => `/${l}${rest === "/" ? "" : rest}`;
  const phone = lang === "tr" ? { v: contact.phoneTr, h: contact.phoneTrHref } : { v: contact.phone, h: contact.phoneHref };

  return (
    <>
      <div className="bg-night text-[13px] text-teal-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2">
          <div className="flex items-center gap-5">
            <a href={phone.h} className="flex items-center gap-1.5 hover:text-gold-300" dir="ltr">
              <IconPhone size={15} /> {phone.v}
            </a>
            <a href={`mailto:${contact.email}`} className="hidden items-center gap-1.5 hover:text-gold-300 sm:flex">
              <IconMail size={15} /> {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href={href("/teachers-day")} className="hidden font-semibold text-gold-300 hover:text-gold-400 lg:inline">
              ✦ {f.teach.navLabel}
            </Link>
            <span className="hidden h-3 w-px bg-teal-700 lg:inline" />
            <Link href={href("/lamps")} className="hidden hover:text-gold-300 lg:inline">
              {f.lamps.navLabel}
            </Link>
            <span className="hidden h-3 w-px bg-teal-700 lg:inline" />
            <Link href={href("/zakat")} className="hidden hover:text-gold-300 md:inline">
              {t.common.zakatCalc}
            </Link>
            <span className="hidden h-3 w-px bg-teal-700 md:inline" />
            <Link href={href("/contact#bank")} className="hidden hover:text-gold-300 md:inline">
              {t.common.bank}
            </Link>
            <span className="hidden h-3 w-px bg-teal-700 md:inline" />
            <span className="flex items-center gap-1.5" dir="ltr">
              <IconGlobe size={15} />
              {locales.map((l, i) => (
                <span key={l} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-teal-300">·</span>}
                  {l === lang ? (
                    <span className="font-semibold text-gold-300" aria-current="true">{l.toUpperCase()}</span>
                  ) : (
                    <Link href={langLink(l)} hrefLang={l} lang={l} className="hover:text-gold-300">
                      {l.toUpperCase()}
                    </Link>
                  )}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-all ${
          scrolled ? "border-stone-200 bg-stone-50/95 shadow-[0_8px_30px_-18px_rgba(0,61,85,.45)] backdrop-blur" : "border-transparent bg-stone-50"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-2">
          <Link href={href("/")} aria-label={t.meta.org}>
            <BurakLogo latin={lang !== "ar"} className="h-14 md:h-[68px]" />
          </Link>

          <nav aria-label={t.nav.home} className="hidden flex-1 xl:block">
            <ul className="flex items-center justify-center gap-0.5">
              {nav.map((n) => {
                const active = n.href === "/" ? rest === "/" : rest.startsWith(n.href);
                return (
                  <li key={n.href}>
                    <Link
                      href={href(n.href)}
                      className={`relative rounded-full px-3 py-2 text-[15px] font-medium transition-colors ${active ? "text-teal-900" : "text-muted hover:text-teal-700"}`}
                    >
                      {n.label}
                      {active && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-2 xl:ms-0">
            <Link href={href("/cart")} aria-label={t.common.cart} className="relative grid h-11 w-11 place-items-center rounded-full text-teal-900 hover:bg-teal-100">
              <IconBag />
              {count > 0 && (
                <span className="absolute end-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-night">{count}</span>
              )}
            </Link>
            <Link
              href={href("/volunteer#form")}
              className="hidden h-11 items-center gap-2 rounded-full border border-teal-500/40 bg-teal-50 px-4 text-[15px] font-semibold text-teal-900 hover:border-teal-500 hover:bg-teal-100 md:flex"
            >
              <IconHeart size={18} /> {f.vol.btn}
            </Link>
            <Link
              href={href("/#donate")}
              className="flex h-11 items-center gap-2 rounded-full bg-gold-500 px-5 text-[15px] font-bold text-night shadow-[0_6px_20px_-8px_rgba(201,154,46,.9)] hover:bg-gold-400"
            >
              {t.common.donateNow}
            </Link>
            <button
              className="grid h-11 w-11 place-items-center rounded-full text-teal-900 hover:bg-teal-100 xl:hidden"
              aria-label={open ? t.common.closeMenu : t.common.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-stone-200 bg-stone-50 xl:hidden">
            <ul className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:grid-cols-2">
              {[...nav, { href: "/lamps", label: f.lamps.navLabel }, { href: "/teachers-day", label: f.teach.navLabel }, { href: "/reports", label: t.nav.reports }, { href: "/volunteer", label: f.vol.btn }, { href: "/zakat", label: t.common.zakatCalc }].map((n) => (
                <li key={n.href}>
                  <Link href={href(n.href)} className="block rounded-xl px-4 py-3 text-lg font-medium text-teal-900 hover:bg-teal-100">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
