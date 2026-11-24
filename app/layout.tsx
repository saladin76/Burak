import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "@fontsource/reem-kufi/500.css";
import "@fontsource/reem-kufi/600.css";
import "@fontsource/reem-kufi/700.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IconWhatsapp } from "@/components/Icons";
import GivingAssistant from "@/components/GivingAssistant";
import MobileDonateBar from "@/components/MobileDonateBar";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: { default: "مؤسسة البراق — طريقك إلى القدس", template: "%s · مؤسسة البراق" },
  description:
    "مؤسسة البراق: مؤسسة إنسانية منذ 2011 للتعريف بالمسجد الأقصى المبارك وإعمار القدس ودعم صمود المقدسيين وإغاثة أهلنا في غزة.",
  metadataBase: new URL("https://burakdernegi.org"),
  openGraph: { locale: "ar_AR", siteName: "مؤسسة البراق" },
};

export const viewport: Viewport = { themeColor: "#003d55" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3">
          تخطَّ إلى المحتوى
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <a
          href={contact.whatsapp}
          aria-label="تواصل عبر واتساب"
          className="fixed bottom-24 start-4 z-30 lg:bottom-5 lg:start-5 grid h-14 w-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-lg hover:scale-105"
        >
          <IconWhatsapp size={28} />
        </a>
        <GivingAssistant />
        <MobileDonateBar />
      </body>
    </html>
  );
}
