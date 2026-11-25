import type { SVGProps } from "react";
import type { Kind } from "@/lib/data";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 22): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

export const IconHeart = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5c-2.2 4.6-9.2 9-9.2 9Z" />
  </svg>
);
export const IconGift = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M5 12v8h14v-8M12 8v12M12 8S10.5 3.5 8 4.5 9 8 12 8Zm0 0s1.5-4.5 4-3.5S15 8 12 8Z" />
  </svg>
);
export const IconBag = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const IconSearch = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4-4" />
  </svg>
);
export const IconMenu = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);
export const IconClose = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const IconArrow = ({ size, className = "", ...p }: P) => (
  // يشير لليسار (اتجاه التقدّم في RTL) ويُقلب تلقائياً في LTR
  <svg {...base(size)} {...p} className={`ltr:-scale-x-100 ${className}`}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const IconPhone = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </svg>
);
export const IconMail = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const IconGlobe = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 3.5 5.7 3.5 9s-1 6.3-3.5 9c-2.5-2.7-3.5-5.7-3.5-9s1-6.3 3.5-9Z" />
  </svg>
);
export const IconShield = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const IconBank = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
  </svg>
);
export const IconRepeat = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M17 3l3 3-3 3M20 6H8a4 4 0 0 0-4 4v1M7 21l-3-3 3-3M4 18h12a4 4 0 0 0 4-4v-1" />
  </svg>
);
export const IconWhatsapp = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z" />
    <path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1.2 1.8.8c-.2 1.2-1.1 1.9-2.3 1.9-3.3 0-6.5-3.2-6.5-6.5 0-1.2.7-2.1 1.9-2.3l.8 1.8L9 9.5Z" />
  </svg>
);
export const IconFacebook = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" />
  </svg>
);
export const IconYoutube = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="4" />
    <path d="m10 9.5 5 2.5-5 2.5v-5Z" />
  </svg>
);
export const IconInstagram = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r=".8" fill="currentColor" />
  </svg>
);
export const IconX = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);
export const IconTiktok = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 3c.5 2.8 2.3 4.4 5 4.6" />
  </svg>
);
export const IconPin = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const IconCheck = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const IconPrint = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M7 9V3h10v6M7 17H4v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6h-3" />
    <rect x="7" y="14" width="10" height="7" />
  </svg>
);
export const IconAward = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="9" r="6" />
    <path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" />
  </svg>
);
export const IconPlay = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m10 8.5 5.5 3.5-5.5 3.5v-7Z" />
  </svg>
);
export const IconBook = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
    <path d="M4 19a2 2 0 0 1 2-2h13" />
  </svg>
);

/* أيقونات المجالات */
const kindPaths: Record<Kind, React.ReactNode> = {
  aqsa: (
    <>
      <path d="M12 1.5v3M9 4.5h6l-1 2h-4ZM7 6.5h10l1.5 8c0 3.5-3 6-6.5 8-3.5-2-6.5-4.5-6.5-8Z" />
      <path d="M12 10c1.4 1.6 1.6 3.2 0 5-1.6-1.8-1.4-3.4 0-5Z" />
    </>
  ),
  winter: (
    <>
      <path d="M12 2v20M4 7l16 10M20 7 4 17" />
      <path d="m9 3 3 3 3-3M9 21l3-3 3 3" />
    </>
  ),
  food: (
    <>
      <path d="M3 12h18a9 9 0 0 1-18 0Z" />
      <path d="M8 8c0-1.5 1-1.5 1-3M12 8c0-1.5 1-1.5 1-3M16 8c0-1.5 1-1.5 1-3" />
    </>
  ),
  water: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />,
  quran: (
    <>
      <path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5Z" />
      <path d="M12 6v13" />
    </>
  ),
  education: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  zakat: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  medical: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M9 6V4h6v2M12 10v6M9 13h6" />
    </>
  ),
  rebuild: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10M10 20v-6h4v6" />
    </>
  ),
  support: (
    <>
      <circle cx="9" cy="7.5" r="3" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M3.5 20v-1.5a5.5 5.5 0 0 1 11 0V20" />
      <path d="M14.5 15.2a4.2 4.2 0 0 1 6.5 3.5V20" />
    </>
  ),
};

export const KindIcon = ({ kind, size = 28, ...p }: P & { kind: Kind }) => (
  <svg {...base(size)} strokeWidth={1.5} {...p}>
    {kindPaths[kind]}
  </svg>
);
