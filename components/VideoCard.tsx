"use client";

import { useState } from "react";
import { GivingWaves } from "./Motifs";
import { useI18n } from "@/lib/lang-context";

/* فيديو يوتيوب خفيف: صورة مصغّرة، ولا يُحمَّل المشغّل إلا عند الضغط */
export default function VideoCard({ id, title, big = false }: { id: string; title: string; big?: boolean }) {
  const { t } = useI18n();
  const [play, setPlay] = useState(false);
  return (
    <figure className="group overflow-hidden rounded-[22px] border border-stone-200 bg-white">
      <div className={`relative overflow-hidden bg-night ${big ? "aspect-video" : "aspect-video"}`}>
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button onClick={() => setPlay(true)} aria-label={`${t.media.play}: ${title}`} className="absolute inset-0 block h-full w-full">
            <GivingWaves className="absolute bottom-0 left-1/2 h-[85%] -translate-x-1/2" rings={6} opacity={0.35} palette={["#3aafc9", "#64b6d0", "#8acbda"]} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent" />
            <span className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-500 text-night shadow-[0_0_0_10px_rgba(235,205,122,.25)] transition group-hover:scale-110 ${big ? "h-20 w-20" : "h-14 w-14"}`}>
              <svg viewBox="0 0 24 24" className={big ? "h-9 w-9" : "h-6 w-6"} fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className={`p-4 font-semibold leading-7 text-teal-900 ${big ? "text-lg" : "text-[15px]"}`} dir="auto">
        {title}
      </figcaption>
    </figure>
  );
}
