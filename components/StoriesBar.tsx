import Link from "next/link";
import { IconHeart, KindIcon } from "./Icons";
import { GivingWaves } from "./Motifs";
import type { Kind } from "@/lib/data";
import { getDict, lhref, type Lang } from "@/lib/i18n";
import { getF } from "@/lib/dict/features";

/* شريط «القصص» الدائري أسفل الترويسة — وصول سريع للحملات والأدوات */
const Lantern = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 1v3M9 4h6l-1 2h-4ZM7 6h10l1.5 8c0 3.5-3 6-6.5 8-3.5-2-6.5-4.5-6.5-8Z" />
    <path d="M12 9c1.5 1.8 1.8 3.5 0 5.5-1.8-2-1.5-3.7 0-5.5Z" fill="currentColor" />
  </svg>
);
const MapIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 3h14l2 18H5Z" />
    <circle cx="11" cy="10" r="2.5" />
    <path d="M10 17h5" />
  </svg>
);
const icons: Record<string, React.ReactNode> = {
  quds: <GivingWaves className="h-8 w-8" rings={4} stroke={14} gap={10} palette={["#8acbda", "#8acbda", "#8acbda", "#8acbda"]} />,
  map: <MapIcon />,
  lamps: <Lantern />,
  support: <IconHeart size={26} />,
};

type SK = "teacher" | "quds" | "map" | "gaza" | "winter" | "lamps" | "zakat" | "quran" | "water" | "support";
const items: { href: string; k: SK; kind: Kind; tone: string; isNew?: boolean }[] = [
  { href: "/teachers-day", k: "teacher", kind: "education", tone: "from-accent-300 to-accent-700" },
  { href: "/projects?region=quds", k: "quds", kind: "support", tone: "from-teal-500 to-teal-900" },
  { href: "/quds#landmarks", k: "map", kind: "rebuild", tone: "from-accent-400 to-accent-700" },
  { href: "/projects?region=gaza", k: "gaza", kind: "food", tone: "from-teal-300 to-teal-700" },
  { href: "/projects/qudus-winter", k: "winter", kind: "winter", tone: "from-cobalt to-teal-900" },
  { href: "/lamps", k: "lamps", kind: "aqsa", tone: "from-accent-300 to-accent-600", isNew: true },
  { href: "/zakat", k: "zakat", kind: "zakat", tone: "from-accent-500 to-teal-900" },
  { href: "/projects?kind=quran", k: "quran", kind: "quran", tone: "from-tile to-teal-900" },
  { href: "/projects?kind=water", k: "water", kind: "water", tone: "from-teal-300 to-cobalt" },
  { href: "/projects?monthly=1", k: "support", kind: "support", tone: "from-accent-400 to-teal-700" },
];

export default function StoriesBar({ lang }: { lang: Lang }) {
  const t = { ...getDict(lang).stories, teacher: getF(lang).teach.navLabel };
  return (
    <nav aria-label={t.label} className="border-b border-stone-200 bg-stone-50">
      <ul className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-5 py-4 [scrollbar-width:none] md:justify-center md:gap-7">
        {items.map((s) => (
          <li key={s.k} className="shrink-0">
            <Link href={lhref(lang, s.href)} className="group flex w-[78px] flex-col items-center gap-2 text-center">
              <span className={`relative grid h-[70px] w-[70px] place-items-center rounded-full bg-gradient-to-br p-[3px] ${s.tone}`}>
                <span className="grid h-full w-full place-items-center rounded-full border-[3px] border-stone-50 bg-teal-900 text-accent-300 transition group-hover:scale-95">
                  {icons[s.k] ?? <KindIcon kind={s.kind} size={28} />}
                </span>
                {s.isNew && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border-2 border-stone-50 bg-accent-500 px-1.5 text-[10px] font-bold leading-4 text-white">
                    {t.isNew}
                  </span>
                )}
              </span>
              <span className="text-[13px] font-semibold leading-tight text-teal-900">{t[s.k]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
