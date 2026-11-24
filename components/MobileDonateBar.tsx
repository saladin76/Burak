"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconHeart, IconWhatsapp } from "./Icons";
import { Khatam } from "./Motifs";
import { contact } from "@/lib/data";
import { useI18n } from "@/lib/lang-context";

/* العنصر العائم الوحيد على الجوال: تبرع + واتساب + مساعد العطاء، يظهر بعد التمرير */
export default function MobileDonateBar() {
  const { t, href } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div
      className={`no-print fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-stone-50/95 px-3 py-2.5 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-2">
        <Link href={href("/#donate")} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 font-bold text-white">
          <IconHeart size={18} /> {t.mobileBar.donate}
        </Link>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("burak:assistant"))}
          aria-label={t.assistant.name}
          className="grid h-12 w-12 place-items-center rounded-xl border border-teal-900/15 text-teal-900"
        >
          <Khatam className="h-6 w-6" color="#007da5" />
        </button>
        <a href={contact.whatsapp} aria-label={t.common.whatsapp} className="grid h-12 w-12 place-items-center rounded-xl bg-[#1f9d55] text-white">
          <IconWhatsapp size={22} />
        </a>
      </div>
    </div>
  );
}
