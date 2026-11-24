import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { IconBank, IconMail, IconPhone, IconWhatsapp } from "@/components/Icons";
import { contact } from "@/lib/data";

export const metadata: Metadata = { title: "تواصل معنا" };

const faq = [
  { q: "كيف أتبرع لمشروع محدد؟", a: "اختر المشروع من صفحة «مشاريعنا»، ثم حدّد المبلغ ونوع التبرع (مرة واحدة أو شهرياً) وأكمل الدفع الآمن." },
  { q: "هل يمكنني التبرع شهرياً؟", a: "نعم، في المشاريع الموسومة بـ«تبرع منتظم» يمكنك اختيار «شهرياً» في نموذج التبرع." },
  { q: "هل يمكنني إهداء تبرعي لشخص آخر؟", a: "نعم، اختر «أهدِ تبرعك» وأدخل اسم المُهدى إليه لتصله بطاقة الإهداء." },
  { q: "هل تتوفر حسابات بنكية للتحويل المباشر؟", a: "نعم، تجد حساباتنا البنكية في هذه الصفحة أدناه." },
];

export default function Contact() {
  return (
    <>
      <PageHero title="تواصل معنا" kicker="يسعدنا تواصلك">
        للاستفسار عن المشاريع أو التبرعات أو التطوّع، تواصل معنا عبر القنوات التالية.
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: <IconPhone size={26} />, t: "اتصل بنا", v: contact.phone, href: contact.phoneHref, ltr: true },
          { icon: <IconPhone size={26} />, t: "Türkçe destek", v: contact.phoneTr, href: contact.phoneTrHref, ltr: true },
          { icon: <IconWhatsapp size={26} />, t: "واتساب", v: "راسلنا مباشرة", href: contact.whatsapp },
          { icon: <IconMail size={26} />, t: "البريد الإلكتروني", v: contact.email, href: `mailto:${contact.email}` },
        ].map((c) => (
          <a key={c.t} href={c.href} className="rounded-[24px] border border-stone-200 bg-white p-6 hover:border-teal-500">
            <span className="grid h-14 w-14 place-items-center rounded-t-full rounded-b-lg bg-teal-100 text-teal-700">{c.icon}</span>
            <p className="mt-4 font-kufi text-xl font-bold text-teal-900">{c.t}</p>
            <p className="mt-1 text-muted" dir={c.ltr ? "ltr" : undefined}>{c.v}</p>
          </a>
        ))}
      </section>

      <section id="bank" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-16">
        <div className="rounded-[28px] bg-teal-900 p-8 text-white md:p-12">
          <h2 className="flex items-center gap-3 font-kufi text-3xl font-bold"><IconBank size={30} className="text-gold-300" /> حساباتنا البنكية</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["USD", "EUR", "TRY"].map((c) => (
              <div key={c} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="font-bold text-gold-300">حساب {c}</p>
                <p className="mt-2 text-sm text-teal-100">[اسم البنك]</p>
                <p className="mt-1 font-mono text-sm" dir="ltr">[IBAN]</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl scroll-mt-28 px-5 pt-16">
        <h2 className="mb-6 font-kufi text-3xl font-bold text-teal-900">الأسئلة المتكررة</h2>
        <div className="grid gap-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-stone-200 bg-white p-5 open:border-teal-500">
              <summary className="cursor-pointer list-none font-bold text-teal-900">{f.q}</summary>
              <p className="mt-3 leading-8 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="volunteer" className="mx-auto max-w-4xl scroll-mt-28 px-5 pt-16">
        <form className="rounded-[28px] border border-stone-200 bg-white p-6 md:p-10" aria-label="نموذج التواصل والتطوع">
          <h2 className="font-kufi text-3xl font-bold text-teal-900">راسلنا أو تطوّع معنا</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-semibold text-muted">الاسم<input className="h-12 rounded-xl border border-stone-300 bg-stone-50 px-4 text-base text-ink" /></label>
            <label className="grid gap-1.5 text-sm font-semibold text-muted">البريد الإلكتروني<input type="email" className="h-12 rounded-xl border border-stone-300 bg-stone-50 px-4 text-base text-ink" /></label>
            <label className="grid gap-1.5 text-sm font-semibold text-muted md:col-span-2">رسالتك<textarea rows={4} className="rounded-xl border border-stone-300 bg-stone-50 p-4 text-base text-ink" /></label>
          </div>
          <button type="submit" className="mt-6 h-12 rounded-full bg-gold-500 px-8 font-bold text-night hover:bg-gold-400">إرسال</button>
        </form>
      </section>
    </>
  );
}
