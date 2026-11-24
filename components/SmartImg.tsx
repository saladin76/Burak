"use client";

import { useState } from "react";

/* صورة خارجية تختفي بهدوء إن تعذّر تحميلها فيظهر الغطاء الزخرفي تحتها */
export default function SmartImg({ src, alt = "", className = "" }: { src?: string; alt?: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setOk(false)} className={className} />;
}
