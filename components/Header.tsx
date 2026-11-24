"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BurakLogo } from "./Motifs";
import { IconBag, IconClose, IconGlobe, IconHeart, IconMail, IconMenu, IconPhone, IconSearch } from "./Icons";
import { contact } from "@/lib/data";

const nav = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/projects", label: "مشاريعنا" },
  { href: "/quds", label: "القدس" },
  { href: "/#news", label: "الأنشطة والفعاليات" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <>
      {/* شريط علوي */}
      <div className="bg-night text-[13px] text-teal-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2">
          <div className="flex items-center gap-5">
            <a href={contact.phoneHref} className="flex items-center gap-1.5 hover:text-gold-300" dir="ltr">
              <IconPhone size={15} /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="hidden items-center gap-1.5 hover:text-gold-300 sm:flex">
              <IconMail size={15} /> {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact#bank" className="hidden hover:text-gold-300 md:inline">
              حساباتنا البنكية
            </Link>
            <span className="hidden h-3 w-px bg-teal-700 md:inline" />
            <span className="flex items-center gap-1.5">
              <IconGlobe size={15} />
              <span className="font-semibold text-gold-300">AR</span>
              <span className="text-teal-300">·</span>
              <a href="#" className="hover:text-gold-300" lang="tr">TR</a>
              <span className="text-teal-300">·</span>
              <a href="#" className="hover:text-gold-300" lang="en">EN</a>
            </span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-all ${
          scrolled ? "border-stone-200 bg-stone-50/95 shadow-[0_8px_30px_-18px_rgba(1,64,78,.45)] backdrop-blur" : "border-transparent bg-stone-50"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3">
          <Link href="/" aria-label="مؤسسة البراق — الرئيسية">
            <BurakLogo />
          </Link>

          <nav aria-label="القائمة الرئيسية" className="hidden flex-1 lg:block">
            <ul className="flex items-center justify-center gap-1">
              {nav.map((n) => {
                const active = n.href === "/" ? path === "/" : path.startsWith(n.href) && n.href !== "/#news";
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className={`relative rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                        active ? "text-teal-900" : "text-muted hover:text-teal-700"
                      }`}
                    >
                      {n.label}
                      {active && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-2 lg:ms-0">
            <button aria-label="بحث" className="hidden h-11 w-11 place-items-center rounded-full text-teal-900 hover:bg-teal-100 sm:grid">
              <IconSearch />
            </button>
            <Link href="#" aria-label="سلة التبرعات" className="relative hidden h-11 w-11 place-items-center rounded-full text-teal-900 hover:bg-teal-100 sm:grid">
              <IconBag />
              <span className="absolute end-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-night">0</span>
            </Link>
            <Link
              href="/projects?monthly=1"
              className="hidden h-11 items-center gap-2 rounded-full border border-teal-900/20 px-4 text-[15px] font-semibold text-teal-900 hover:border-teal-700 hover:bg-teal-50 md:flex"
            >
              <IconHeart size={18} /> كن داعماً
            </Link>
            <Link
              href="/#donate"
              className="flex h-11 items-center gap-2 rounded-full bg-gold-500 px-5 text-[15px] font-bold text-night shadow-[0_6px_20px_-8px_rgba(201,154,46,.9)] hover:bg-gold-400"
            >
              تبرع الآن
            </Link>
            <button
              className="grid h-11 w-11 place-items-center rounded-full text-teal-900 hover:bg-teal-100 lg:hidden"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label="قائمة الجوال" className="border-t border-stone-200 bg-stone-50 lg:hidden">
            <ul className="mx-auto grid max-w-7xl gap-1 px-5 py-4">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="block rounded-xl px-4 py-3 text-lg font-medium text-teal-900 hover:bg-teal-100">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/projects?monthly=1" className="flex items-center justify-center gap-2 rounded-xl border border-teal-900/20 py-3 font-semibold text-teal-900">
                  <IconHeart size={18} /> كن داعماً — تبرع شهري
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
