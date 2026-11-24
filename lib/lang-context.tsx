"use client";

import { createContext, useContext } from "react";
import { getDict, lhref, type Lang } from "./i18n";
import { getF } from "./dict/features";

const Ctx = createContext<Lang>("ar");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <Ctx.Provider value={lang}>{children}</Ctx.Provider>;
}

/** للمكوّنات التفاعلية: اللغة الحالية وقاموسها ودالة الروابط */
export function useI18n() {
  const lang = useContext(Ctx);
  return { lang, t: getDict(lang), f: getF(lang), href: (p: string) => lhref(lang, p) };
}
