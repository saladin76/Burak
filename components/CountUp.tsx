"use client";

import { useEffect, useRef, useState } from "react";

/** عدّاد يتصاعد عند ظهوره على الشاشة — ويضمن دائماً الوصول إلى الرقم الحقيقي */
export default function CountUp({ to, prefix = "", suffix = "", duration = 1400, className = "" }: { to: number; prefix?: string; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to); // يُعرض الرقم الحقيقي افتراضياً (الخادم وبدون JS)
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let done: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setV(0);
      raf = requestAnimationFrame(tick);
      // ضمان: مهما حدث للإطارات (تبويب في الخلفية/تمرير سريع) يستقر العدّاد على القيمة الحقيقية
      done = setTimeout(() => { cancelAnimationFrame(raf); setV(to); }, duration + 150);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); if (done) clearTimeout(done); };
  }, [to, duration]);
  return <span ref={ref} className={className} dir="ltr">{prefix}{v.toLocaleString("en-US")}{suffix}</span>;
}
