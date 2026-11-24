import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "@fontsource/reem-kufi/500.css";
import "@fontsource/reem-kufi/600.css";
import "@fontsource/reem-kufi/700.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GivingAssistant from "@/components/GivingAssistant";
import MobileDonateBar from "@/components/MobileDonateBar";
import { IconWhatsapp } from "@/components/Icons";
import { LangProvider } from "@/lib/lang-context";
import { CartProvider } from "@/lib/cart";
import { contact } from "@/lib/data";
import { dirOf, getDict, isLang, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  return {
    title: { default: t.meta.title, template: `%s · ${t.meta.org}` },
    description: t.meta.desc,
    metadataBase: new URL("https://burakdernegi.org"),
    alternates: { languages: { ar: "/ar", tr: "/tr", en: "/en" } },
    openGraph: { siteName: t.meta.org, locale: lang === "ar" ? "ar_AR" : lang === "tr" ? "tr_TR" : "en_US" },
    icons: { icon: "/brand/burak-logo.svg" },
  };
}

export const viewport: Viewport = { themeColor: "#003d55" };

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={lang} dir={dirOf(lang)}>
      <body>
        <LangProvider lang={lang}>
          <CartProvider>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3">
              {t.common.skip}
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer lang={lang} />
            <a
              href={contact.whatsapp}
              aria-label={t.common.whatsapp}
              className="fixed bottom-24 start-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-lg hover:scale-105 lg:bottom-5 lg:start-5"
            >
              <IconWhatsapp size={28} />
            </a>
            <GivingAssistant />
            <MobileDonateBar />
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
