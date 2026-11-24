import BankAccounts from "@/components/BankAccounts";
import PageHero from "@/components/PageHero";
import { IconBank, IconMail, IconPhone, IconWhatsapp } from "@/components/Icons";
import { contact, orgContent } from "@/lib/data";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.contact.title);

export default async function Contact({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  const C = t.contact;
  const input = "h-12 rounded-xl border border-stone-300 bg-stone-50 px-4 text-base text-ink";
  return (
    <>
      <PageHero lang={lang} title={C.title} kicker={C.kicker}>{C.text}</PageHero>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: <IconPhone size={26} />, t: C.call, v: contact.phone, href: contact.phoneHref, ltr: true },
          { icon: <IconPhone size={26} />, t: C.trSupport, v: contact.phoneTr, href: contact.phoneTrHref, ltr: true },
          { icon: <IconWhatsapp size={26} />, t: C.wa, v: C.waText, href: contact.whatsapp },
          { icon: <IconMail size={26} />, t: C.mail, v: contact.email, href: `mailto:${contact.email}` },
        ].map((c) => (
          <a key={c.t} href={c.href} className="rounded-2xl border border-stone-200 bg-white p-6 hover:border-teal-500">
            <span className="grid h-14 w-14 place-items-center rounded-b-lg rounded-t-full bg-teal-100 text-teal-700">{c.icon}</span>
            <p className="mt-4 font-kufi text-xl font-bold text-teal-900">{c.t}</p>
            <p className="mt-1 text-muted" dir={c.ltr ? "ltr" : undefined}>{c.v}</p>
          </a>
        ))}
      </section>

      <section id="bank" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-16">
        <div className="rounded-2xl bg-teal-900 p-8 text-white md:p-12">
          <h2 className="flex items-center gap-3 font-kufi text-3xl font-bold"><IconBank size={30} className="text-accent-300" /> {t.common.bank}</h2>
          <BankAccounts />
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl scroll-mt-28 px-5 pt-16">
        <h2 className="mb-6 font-kufi text-3xl font-bold text-teal-900">{C.faq}</h2>
        <div className="grid gap-3">
          {C.faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-stone-200 bg-white p-5 open:border-teal-500">
              <summary className="cursor-pointer list-none font-bold text-teal-900">{f.q}</summary>
              <p className="mt-3 leading-8 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pt-16">
        <form className="rounded-2xl border border-stone-200 bg-white p-6 md:p-10" aria-label={C.msgTitle}>
          <h2 className="font-kufi text-3xl font-bold text-teal-900">{C.msgTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-semibold text-muted">{C.name}<input className={input} /></label>
            <label className="grid gap-1.5 text-sm font-semibold text-muted">{C.email}<input type="email" className={input} /></label>
            <label className="grid gap-1.5 text-sm font-semibold text-muted md:col-span-2">{C.msg}<textarea rows={4} className="rounded-xl border border-stone-300 bg-stone-50 p-4 text-base text-ink" /></label>
          </div>
          <button type="submit" className="mt-6 h-12 rounded-lg bg-accent-500 px-8 font-bold text-white hover:bg-accent-600">{C.send}</button>
        </form>
      </section>
    </>
  );
}
