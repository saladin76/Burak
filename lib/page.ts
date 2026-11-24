import { notFound } from "next/navigation";
import { getDict, isLang, lhref, type Lang } from "./i18n";

export type LangParams = { params: Promise<{ lang: string }> };

/** يستخرج اللغة من مسار الصفحة ويعيد القاموس ودالة الروابط */
export async function pageLang(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const l = lang as Lang;
  return { lang: l, t: getDict(l), h: (p: string) => lhref(l, p) };
}

export const metaTitle = async (params: Promise<{ lang: string }>, pick: (t: ReturnType<typeof getDict>) => string) => {
  const { lang } = await params;
  return { title: pick(getDict(isLang(lang) ? lang : "ar")) };
};
