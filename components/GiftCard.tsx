import { BurakLogo, DomeOfTheRock, GivingWaves, Khatam } from "./Motifs";

/* بطاقة الإهداء — معاينة حيّة بثلاثة تصاميم */
export default function GiftCard({
  design,
  to,
  from,
  msg,
  projects,
  labels,
}: {
  design: number;
  to: string;
  from: string;
  msg: string;
  projects: string[];
  labels: { title: string; line: string; from: string };
}) {
  const bg = design === 1 ? "bg-night" : design === 2 ? "bg-teal-900" : "bg-night-2";
  return (
    <div className={`relative aspect-[1.35/1] w-full overflow-hidden rounded-[22px] ${bg} p-5 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]`}>
      <div className="pattern-khatam absolute inset-0 opacity-10" />
      {design === 0 && <DomeOfTheRock className="pointer-events-none absolute -bottom-6 end-[-20px] w-[55%] opacity-90" />}
      {design === 1 && (
        <div className="pointer-events-none absolute inset-x-6 top-0 flex justify-between" aria-hidden="true">
          {[50, 80, 40, 95, 60, 85, 45].map((h, i) => (
            <span key={i} className="flex flex-col items-center">
              <span className="w-px bg-gold-500/60" style={{ height: h }} />
              <span className="h-7 w-5 rounded-b-full rounded-t-md border border-gold-400 bg-gold-300/80 shadow-[0_0_18px_rgba(235,205,122,.8)]" />
            </span>
          ))}
        </div>
      )}
      {design === 2 && <GivingWaves className="pointer-events-none absolute -bottom-4 end-[-10px] h-[95%]" opacity={0.45} palette={["#c5e5f1", "#8acbda", "#64b6d0", "#3aafc9", "#ebcd7a"]} />}
      <div className={`relative flex h-full flex-col ${design === 1 ? "justify-end" : "justify-between"}`}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-bold text-gold-300"><Khatam className="h-4 w-4" color="#ebcd7a" />{labels.title}</span>
          {design !== 1 && <BurakLogo light className="h-10" />}
        </div>
        <div className="max-w-[65%]">
          <p className="font-kufi text-2xl font-bold leading-snug text-gold-300 md:text-3xl">{to || "—"}</p>
          <p className="mt-1 text-sm text-teal-100">{labels.line}</p>
          <p className="mt-1 line-clamp-2 font-semibold">{projects.join(" · ")}</p>
          {msg && <p className="mt-2 line-clamp-1 text-sm italic text-teal-50/90">“{msg}”</p>}
          <p className="mt-2 text-sm text-teal-100">{labels.from}: <b className="text-white">{from || "—"}</b></p>
        </div>
      </div>
    </div>
  );
}
