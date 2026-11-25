/** دمج عميق: ترجمة جزئية فوق نص احتياطي (الإنجليزية) — المصفوفات تُستبدل كاملة */
export type DeepPartial<T> = T extends readonly (infer _U)[] ? T : T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

export function deepMerge<T>(base: T, over: DeepPartial<NoInfer<T>> | undefined): T {
  if (!over) return base;
  if (Array.isArray(base) || typeof base !== "object" || base === null) return (over as T) ?? base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
    if (v === undefined) continue;
    const b = (base as Record<string, unknown>)[k];
    out[k] = b && typeof b === "object" && !Array.isArray(b) && v && typeof v === "object" && !Array.isArray(v) ? deepMerge(b, v as DeepPartial<typeof b>) : v;
  }
  return out as T;
}
