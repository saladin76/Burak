"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProject } from "@/lib/data";
import { fmt, tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import type { CartItem } from "@/lib/cart";
import { IconArrow, IconAward, IconFacebook, IconWhatsapp, IconX } from "./Icons";
import { getOrder } from "@/lib/orders";
import { GivingWaves, Khatam } from "./Motifs";

type Order = { ref: string; items: CartItem[]; total: number; pay: string };

export default function ThankYou() {
  const { lang, t, f, href } = useI18n();
  const T = t.thanks;
  const [o, setO] = useState<Order | null>(null);
  const [ref, setRef] = useState("");
  useEffect(() => {
    setRef(new URLSearchParams(window.location.search).get("ref") ?? "");
    const r = new URLSearchParams(window.location.search).get("ref");
    if (r) setO(getOrder(r) ?? null);
  }, []);
  const url = `https://burakdernegi.org/${lang}`;
  const msg = encodeURIComponent(`${T.shareText} ${url}`);

  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-night p-8 text-center text-white md:p-14">
      <div className="pattern-khatam absolute inset-0 opacity-10" />
      <GivingWaves className="pointer-events-none absolute -bottom-10 left-1/2 h-80 -translate-x-1/2" opacity={0.25} palette={["#8acbda", "#8acbda", "#64b6d0", "#3aafc9"]} />
      <div className="relative">
        <Khatam className="mx-auto h-16 w-16" color="#8acbda" />
        <h2 className="mt-4 font-kufi text-4xl font-bold text-accent-300 md:text-5xl">{T.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-9 text-teal-100">{T.text}</p>
        {(ref || o?.ref) && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm">
            {T.ref}: <b className="font-mono text-accent-300" dir="ltr">{o?.ref ?? ref}</b>
          </p>
        )}
        {o && (
          <ul className="mx-auto mt-6 max-w-md space-y-2 text-start text-sm">
            {o.items.map((it) => (
              <li key={it.id} className="flex justify-between gap-3 border-b border-white/10 pb-2">
                <span>{tx(getProject(it.slug)?.title ?? it.slug, lang)}</span>
                <span className="num font-bold">${fmt(it.amount)}</span>
              </li>
            ))}
          </ul>
        )}
        <Link href={href(`/documents?ref=${o?.ref ?? ref}`)} className="mt-8 inline-flex h-14 items-center gap-2 rounded-lg border-2 border-accent-300 px-7 text-lg font-bold text-accent-300 hover:bg-accent-300 hover:text-night">
          <IconAward size={22} /> {f.docs.view}
        </Link>
        <p className="mt-8 font-semibold">{T.share}</p>
        <div className="mt-3 flex justify-center gap-2">
          <a aria-label="WhatsApp" href={`https://api.whatsapp.com/send?text=${msg}`} className="grid h-12 w-12 place-items-center rounded-full bg-[#1f9d55]"><IconWhatsapp size={22} /></a>
          <a aria-label="X" href={`https://x.com/intent/post?text=${msg}`} className="grid h-12 w-12 place-items-center rounded-full bg-white/10"><IconX size={18} /></a>
          <a aria-label="Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} className="grid h-12 w-12 place-items-center rounded-full bg-white/10"><IconFacebook size={20} /></a>
        </div>
        <Link href={href("/projects")} className="mt-8 inline-flex h-14 items-center gap-2 rounded-lg bg-accent-500 px-8 text-lg font-bold text-white hover:bg-accent-600">
          {T.more} <IconArrow size={20} />
        </Link>
      </div>
    </div>
  );
}
