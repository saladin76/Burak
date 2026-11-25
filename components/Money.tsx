"use client";

import { useCurrency } from "@/lib/currency";

/** يعرض مبلغاً مخزّناً بالدولار بعملة الزائر */
export default function Money({ usd, nice = false, className = "" }: { usd: number; nice?: boolean; className?: string }) {
  const { money } = useCurrency();
  return <span className={className} dir="ltr" suppressHydrationWarning>{money(usd, { nice })}</span>;
}
