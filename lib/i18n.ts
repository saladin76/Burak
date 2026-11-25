import ar from "./dict/ar";
import tr from "./dict/tr";
import en from "./dict/en";
import fr from "./dict/fr";
import de from "./dict/de";
import id from "./dict/id";
import ur from "./dict/ur";
import { deepMerge } from "./merge";

export const locales = ["ar", "tr", "en", "fr", "de", "id", "ur"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "ar";

export const isLang = (l: string): l is Lang => (locales as readonly string[]).includes(l);
export const isRtl = (l: Lang) => l === "ar" || l === "ur";
export const dirOf = (l: Lang) => (isRtl(l) ? "rtl" : "ltr");
/** محلية التواريخ لكل لغة */
export const localeOf = (l: Lang) => ({ ar: "ar-EG", tr: "tr-TR", en: "en-GB", fr: "fr-FR", de: "de-DE", id: "id-ID", ur: "ur-PK" })[l];
/** اسم كل لغة بلغتها */
export const langNames: Record<Lang, string> = { ar: "العربية", tr: "Türkçe", en: "English", fr: "Français", de: "Deutsch", id: "Bahasa Indonesia", ur: "اردو" };

export type Dict = typeof ar;
const dicts: Record<Lang, Dict> = { ar, tr, en, fr: deepMerge(en, fr), de: deepMerge(en, de), id: deepMerge(en, id), ur: deepMerge(en, ur) };
export const getDict = (l: Lang): Dict => dicts[l] ?? ar;

/** نص متعدد اللغات — العربية والتركية والإنجليزية إلزامية، والبقية تعود للإنجليزية */
export type L = { ar: string; tr: string; en: string } & Partial<Record<"fr" | "de" | "id" | "ur", string>>;
export const tx = (v: L | string, l: Lang) => (typeof v === "string" ? v : v[l] ?? v.en ?? v.ar);
/** اختيار من كائن لغات جزئي مع الرجوع للإنجليزية */
export const pick = <T,>(o: Partial<Record<Lang, T>> & { en: T }, l: Lang): T => o[l] ?? o.en;

/** رابط مسبوق باللغة */
export const lhref = (l: Lang, path: string) => {
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) return path;
  if (path.startsWith("#")) return path;
  return `/${l}${path === "/" ? "" : path}`;
};

/** تنسيق الأرقام (أرقام لاتينية في كل اللغات لوضوح المبالغ) */
export const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);
