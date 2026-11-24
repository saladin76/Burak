"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconHeart } from "./Icons";

/* شريط تبرع ثابت أسفل الشاشة على الجوال، يظهر بعد التمرير */
export default function MobileDonateBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-stone-50/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-2">
        <Link href="/#donate" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-gold-500 font-bold text-night">
          <IconHeart size={18} /> تبرع الآن
        </Link>
        <Link href="/zakat" className="flex h-12 items-center justify-center rounded-2xl border border-teal-900/20 px-4 font-bold text-teal-900">
          حاسبة الزكاة
        </Link>
      </div>
    </div>
  );
}
