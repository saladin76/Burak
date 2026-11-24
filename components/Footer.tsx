import Link from "next/link";
import { BurakLogo, OrnamentDivider, QudsSkyline } from "./Motifs";
import { IconBank, IconFacebook, IconMail, IconPhone, IconShield, IconWhatsapp, IconYoutube } from "./Icons";
import { contact } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-night text-teal-100">
      <QudsSkyline className="absolute inset-x-0 -top-[59px] h-[60px] w-full" color="#052229" />
      <div className="pattern-khatam absolute inset-0 opacity-[.07]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <BurakLogo light />
            <p className="mt-5 max-w-sm leading-8 text-teal-100/85">
              مؤسسة إنسانية تأسست عام 2011 للتعريف بالمسجد الأقصى المبارك والقدس الشريف، وإعمارها، ودعم صمود المقدسيين.
            </p>
            <p className="mt-4 font-kufi text-xl text-gold-300">« البراق طريقك إلى القدس »</p>
          </div>

          <nav aria-label="روابط المؤسسة">
            <h2 className="mb-4 font-kufi text-lg font-bold text-white">المؤسسة</h2>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-gold-300" href="/about">من نحن</Link></li>
              <li><Link className="hover:text-gold-300" href="/about#vision">رؤيتنا ورسالتنا</Link></li>
              <li><Link className="hover:text-gold-300" href="/#news">الأنشطة والفعاليات</Link></li>
              <li><Link className="hover:text-gold-300" href="/contact#volunteer">تطوّع معنا</Link></li>
              <li><Link className="hover:text-gold-300" href="/contact#faq">الأسئلة المتكررة</Link></li>
            </ul>
          </nav>

          <nav aria-label="روابط التبرع">
            <h2 className="mb-4 font-kufi text-lg font-bold text-white">تبرّع</h2>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-gold-300" href="/projects?region=quds">مشاريع القدس</Link></li>
              <li><Link className="hover:text-gold-300" href="/projects?region=gaza">إغاثة غزة</Link></li>
              <li><Link className="hover:text-gold-300" href="/projects?kind=zakat">زكاة المال</Link></li>
              <li><Link className="hover:text-gold-300" href="/projects?monthly=1">التبرع الشهري</Link></li>
              <li><Link className="hover:text-gold-300" href="/contact#bank">حساباتنا البنكية</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-kufi text-lg font-bold text-white">تواصل معنا</h2>
            <ul className="space-y-3">
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-gold-300" dir="ltr">
                  <IconPhone size={18} /> {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-gold-300">
                  <IconMail size={18} /> {contact.email}
                </a>
              </li>
              <li>
                <Link href="/contact#bank" className="flex items-center gap-2 hover:text-gold-300">
                  <IconBank size={18} /> حساباتنا البنكية
                </Link>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a aria-label="فيسبوك" href={contact.facebook} className="grid h-11 w-11 place-items-center rounded-full border border-teal-700 hover:border-gold-300 hover:text-gold-300"><IconFacebook size={19} /></a>
              <a aria-label="يوتيوب" href={contact.youtube} className="grid h-11 w-11 place-items-center rounded-full border border-teal-700 hover:border-gold-300 hover:text-gold-300"><IconYoutube size={19} /></a>
              <a aria-label="واتساب" href={contact.whatsapp} className="grid h-11 w-11 place-items-center rounded-full border border-teal-700 hover:border-gold-300 hover:text-gold-300"><IconWhatsapp size={19} /></a>
            </div>
          </div>
        </div>

        <OrnamentDivider className="mx-auto my-10 h-5 w-64" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-teal-100/70 md:flex-row">
          <p>© {new Date().getFullYear()} مؤسسة البراق — <span lang="tr">{contact.legalName}</span>. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><IconShield size={16} /> مدفوعات آمنة</span>
            <Link href="#" className="hover:text-gold-300">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-gold-300">ملفات تعريف الارتباط</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
