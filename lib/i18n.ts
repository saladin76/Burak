import ar from "./dict/ar";
import tr from "./dict/tr";
import en from "./dict/en";

export const locales = ["ar", "tr", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "ar";

export const isLang = (l: string): l is Lang => (locales as readonly string[]).includes(l);
export const dirOf = (l: Lang) => (l === "ar" ? "rtl" : "ltr");

export type Dict = typeof ar;
const dicts: Record<Lang, Dict> = { ar, tr, en };
export const getDict = (l: Lang): Dict => dicts[l] ?? ar;

/** نص متعدد اللغات */
export type L = Record<Lang, string>;
export const tx = (v: L | string, l: Lang) => (typeof v === "string" ? v : v[l] ?? v.ar);

/** رابط مسبوق باللغة */
export const lhref = (l: Lang, path: string) => {
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) return path;
  if (path.startsWith("#")) return path;
  return `/${l}${path === "/" ? "" : path}`;
};

/** تنسيق الأرقام (أرقام لاتينية في كل اللغات لوضوح المبالغ) */
export const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);
