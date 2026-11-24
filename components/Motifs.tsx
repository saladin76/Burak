/* زخارف وعناصر الهوية المقدسية — كلها SVG خفيفة بلا صور */

export function BurakMark({ className = "", tone = "color" }: { className?: string; tone?: "color" | "light" }) {
  const dome = tone === "light" ? "#ebcd7a" : "#04819c";
  const body = tone === "light" ? "#daf1f4" : "#01404e";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 4v6" stroke={dome} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="4" r="2.2" fill={dome} />
      <path d="M12 34c0-12 9-21 20-22 11 1 20 10 20 22Z" fill={dome} />
      <path d="M32 12c6 3 9 11 9 22" stroke="#fff" strokeOpacity=".35" strokeWidth="2" fill="none" />
      <rect x="8" y="34" width="48" height="4" rx="1" fill={body} />
      <path
        d="M10 60V42h44v18M16 60v-9a4 4 0 0 1 8 0v9M28 60v-9a4 4 0 0 1 8 0v9M40 60v-9a4 4 0 0 1 8 0v9"
        stroke={body}
        strokeWidth="2.6"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BurakLogo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <BurakMark className="h-11 w-11 shrink-0" tone={light ? "light" : "color"} />
      <span className="flex flex-col leading-none">
        <span className={`font-kufi text-[26px] font-bold ${light ? "text-white" : "text-teal-900"}`}>البراق</span>
        <span
          className={`mt-1 text-[10.5px] font-semibold tracking-[0.18em] ${light ? "text-gold-300" : "text-teal-500"}`}
          dir="ltr"
        >
          BURAK · AL-QUDS
        </span>
      </span>
    </span>
  );
}

/* قبة الصخرة — رسم توضيحي رئيسي */
export function DomeOfTheRock({ className = "" }: { className?: string }) {
  const bodyArches = [132, 184, 236, 288, 340, 392, 444]
    .map((x) => `M${x} 342V306a12 12 0 0 1 24 0v36Z`)
    .join("");
  const drumWindows = [222, 246, 270, 294, 318, 342, 366]
    .map((x) => `M${x} 222v-22a6 6 0 0 1 12 0v22Z`)
    .join("");
  const merlons = Array.from({ length: 22 }, (_, i) => `M${i * 28} 372h16v-12h-16Z`).join("");
  return (
    <svg viewBox="0 0 600 430" className={className} role="img" aria-label="رسم لقبة الصخرة المشرفة وسور القدس">
      <defs>
        <linearGradient id="domeGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a87b1c" />
          <stop offset=".45" stopColor="#e9c766" />
          <stop offset="1" stopColor="#b8892a" />
        </linearGradient>
        <pattern id="tiles" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#1597a8" />
          <path d="M8 1 15 8 8 15 1 8Z" fill="#1d4f91" opacity=".55" />
          <circle cx="8" cy="8" r="1.6" fill="#f4eee2" opacity=".8" />
        </pattern>
      </defs>

      {/* هالة ذهبية */}
      <circle cx="300" cy="170" r="160" fill="#c99a2e" opacity=".09" />
      <circle cx="300" cy="170" r="110" fill="#c99a2e" opacity=".08" />

      {/* الهلال والقمة */}
      <path d="M300 64V26" stroke="#ebcd7a" strokeWidth="3" />
      <circle cx="300" cy="44" r="4" fill="#ebcd7a" />
      <path d="M292 18a10 10 0 1 0 16 0 8 8 0 1 1-16 0Z" fill="#ebcd7a" />

      {/* القبة */}
      <path d="M194 180c0-74 50-112 106-118 56 6 106 44 106 118Z" fill="url(#domeGold)" />
      <path d="M300 62c30 14 50 56 54 118" stroke="#fff2c4" strokeOpacity=".55" strokeWidth="4" fill="none" />
      <path d="M194 180h212" stroke="#7a5a0e" strokeWidth="3" />

      {/* الرقبة (الطبلة) */}
      <rect x="206" y="182" width="188" height="46" fill="url(#tiles)" />
      <path d={drumWindows} fill="#052229" />
      <rect x="206" y="182" width="188" height="5" fill="#ebcd7a" opacity=".8" />

      {/* الإفريز */}
      <rect x="98" y="228" width="404" height="10" rx="2" fill="#e8decb" />

      {/* الجسم المثمن */}
      <rect x="106" y="238" width="388" height="116" fill="url(#tiles)" />
      <rect x="106" y="238" width="388" height="24" fill="#01404e" />
      <path d="M112 250h376" stroke="#ebcd7a" strokeWidth="2" strokeDasharray="10 6" />
      <path d={bodyArches} fill="#052229" stroke="#ebcd7a" strokeWidth="1.5" />
      <path d="M106 238v116M494 238v116" stroke="#ebcd7a" strokeWidth="2" opacity=".7" />

      {/* المصطبة */}
      <rect x="52" y="354" width="496" height="14" rx="2" fill="#e8decb" />

      {/* السرو */}
      <path d="M58 358c-10-30-6-74 10-112 16 38 20 82 10 112Z" fill="#0f3a2e" />
      <path d="M522 358c-10-30-6-74 10-112 16 38 20 82 10 112Z" fill="#0f3a2e" />
      <path d="M86 358c-6-20-4-48 6-72 10 24 12 52 6 72Z" fill="#164a3a" />

      {/* سور القدس */}
      <path d={merlons} fill="#d6c7a8" />
      <rect x="0" y="372" width="600" height="58" fill="#d6c7a8" />
      <path
        d="M0 392h600M0 412h600M40 372v20M120 372v20M200 372v20M280 372v20M360 372v20M440 372v20M520 372v20M80 392v20M160 392v20M240 392v20M320 392v20M400 392v20M480 392v20M560 392v20"
        stroke="#b9a681"
        strokeWidth="1.2"
      />
      {/* باب العامود (مبسّط) */}
      <path d="M272 430v-34a28 28 0 0 1 56 0v34Z" fill="#052229" />
      <path d="M266 430v-36a34 34 0 0 1 68 0v36" fill="none" stroke="#9c8a66" strokeWidth="3" />
    </svg>
  );
}

/* فاصل زخرفي: نجمة ثمانية بين خطين */
export function OrnamentDivider({ className = "", color = "#c99a2e" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 20" className={className} aria-hidden="true">
      <path d="M0 10h78M122 10h78" stroke={color} strokeWidth="1.2" />
      <g transform="translate(100 10)" fill="none" stroke={color} strokeWidth="1.4">
        <rect x="-7" y="-7" width="14" height="14" />
        <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" />
      </g>
      <circle cx="84" cy="10" r="2" fill={color} />
      <circle cx="116" cy="10" r="2" fill={color} />
    </svg>
  );
}

/* نجمة ثمانية مفردة */
export function Khatam({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.3">
        <rect x="-8" y="-8" width="16" height="16" />
        <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" />
        <circle r="3" />
      </g>
    </svg>
  );
}

/* أفق القدس — للتذييل وأعلى الأقسام الداكنة */
export function QudsSkyline({ className = "", color = "#01404e" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        fill={color}
        d="M0 120V84h40v-8h14v8h28v-8h14v8h40V60h10V48h6v12h10v24h60v-8h14v8h28v-8h14v8h56V70c0-22 18-38 40-40 22 2 40 18 40 40v14h36v-8h14v8h28V62h-6V54l16-14 16 14v8h-6v22h40v-8h14v8h28v-8h14v8h44V66h8V40h8V26h4v14h8v26h8v18h52v-8h14v8h28v-8h14v8h60c0-30 24-56 56-60V12h4v12c32 4 56 30 56 60h48v-8h14v8h28v-8h14v8h44V58h10V46h6v12h10v26h40v-8h14v8h28v-8h14v8H1440v36Z"
      />
    </svg>
  );
}
