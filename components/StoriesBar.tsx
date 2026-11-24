import Link from "next/link";
import { IconHeart, KindIcon } from "./Icons";
import { GivingWaves } from "./Motifs";
import type { Kind } from "@/lib/data";

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
  "القدس": <GivingWaves className="h-8 w-8" rings={4} stroke={14} gap={10} palette={["#ebcd7a", "#8acbda", "#ebcd7a", "#8acbda"]} />,
  "خريطة الأقصى": <MapIcon />,
  "قناديل الأقصى": <Lantern />,
  "كن داعماً": <IconHeart size={26} />,
};

const items: { href: string; label: string; kind: Kind; tone: string; isNew?: boolean }[] = [
  { href: "/projects?region=quds", label: "القدس", kind: "support", tone: "from-teal-500 to-teal-900", isNew: true },
  { href: "#aqsa-map", label: "خريطة الأقصى", kind: "rebuild", tone: "from-gold-400 to-gold-700", isNew: true },
  { href: "/projects?region=gaza", label: "غزة", kind: "food", tone: "from-teal-300 to-teal-700" },
  { href: "/projects/qudus-winter", label: "شتاء القدس", kind: "winter", tone: "from-cobalt to-teal-900", isNew: true },
  { href: "#lamps", label: "قناديل الأقصى", kind: "education", tone: "from-gold-300 to-gold-600" },
  { href: "/zakat", label: "حاسبة الزكاة", kind: "zakat", tone: "from-gold-500 to-teal-900" },
  { href: "/projects?kind=quran", label: "جيل القرآن", kind: "quran", tone: "from-tile to-teal-900" },
  { href: "/projects?region=gaza&kind=water", label: "سقيا الماء", kind: "water", tone: "from-teal-300 to-cobalt" },
  { href: "/projects?monthly=1", label: "كن داعماً", kind: "support", tone: "from-gold-400 to-teal-700" },
];

export default function StoriesBar() {
  return (
    <nav aria-label="وصول سريع" className="border-b border-stone-200 bg-stone-50">
      <ul className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-5 py-4 [scrollbar-width:none] md:justify-center md:gap-7">
        {items.map((s) => (
          <li key={s.label} className="shrink-0">
            <Link href={s.href} className="group flex w-[78px] flex-col items-center gap-2 text-center">
              <span className={`relative grid h-[70px] w-[70px] place-items-center rounded-full bg-gradient-to-br p-[3px] ${s.tone}`}>
                <span className="grid h-full w-full place-items-center rounded-full border-[3px] border-stone-50 bg-teal-900 text-gold-300 transition group-hover:scale-95">
                  {icons[s.label] ?? <KindIcon kind={s.kind} size={28} />}
                </span>
                {s.isNew && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border-2 border-stone-50 bg-gold-500 px-1.5 text-[10px] font-bold leading-4 text-night">
                    جديد
                  </span>
                )}
              </span>
              <span className="text-[13px] font-semibold leading-tight text-teal-900">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
