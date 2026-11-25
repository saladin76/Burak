"use client";

import { formatMoney, rateOf } from "@/lib/currency";
import { BurakLogo, GivingRings, Khatam } from "./Motifs";
import QR from "./QR";
import { contact, getProject } from "@/lib/data";
import { tx, type Lang } from "@/lib/i18n";
import { getF } from "@/lib/dict/features";
import { getDict } from "@/lib/i18n";
import type { Order } from "@/lib/orders";

/* وصل تبرع A4 عمودي — يُطبع أو يُحفظ PDF */
export default function Receipt({ order, lang, verifyUrl }: { order: Order; lang: Lang; verifyUrl: string }) {
  const D = getF(lang).docs;
  const t = getDict(lang);
  const loc = lang === "ar" ? "ar-EG" : lang === "tr" ? "tr-TR" : "en-GB";
  const date = new Date(order.date);
  const when = new Intl.DateTimeFormat(loc, { dateStyle: "long", timeStyle: "short" }).format(date);

  return (
    <div className="receipt-page @container mx-auto w-full max-w-[820px]">
      <div className="relative aspect-[210/297] w-full overflow-hidden bg-white shadow-[0_30px_80px_-40px_rgba(0,61,85,.6)] print:shadow-none">
        {/* رأس الوصل بخلفية الهوية */}
        <div className="relative h-[30cqw] overflow-hidden bg-teal-500 text-white">
          <GivingRings className="absolute -end-[18%] -top-[45%] w-[70%]" palette={["#52a6c0", "#3aafc9", "#64b6d0", "#8acbda", "#aeddec", "#c5e5f1", "#ffffff"]} opacity={0.45} />
          <div className="relative flex h-full items-start justify-between p-[6cqw]">
            <div>
              <p className="font-kufi font-bold" style={{ fontSize: "5cqw", lineHeight: 1.15 }}>{D.receipt}</p>
              <p className="mt-[1.5cqw] opacity-90" style={{ fontSize: "2.1cqw" }}>{D.thanks}</p>
              <p className="mt-[3cqw] inline-block rounded-full bg-white/15 px-[2.4cqw] py-[0.8cqw]" style={{ fontSize: "2cqw" }}>
                {D.ref}: <b className="font-mono" dir="ltr">{order.ref}</b>
              </p>
            </div>
            <BurakLogo light latin={lang !== "ar"} className="h-[16cqw]" />
          </div>
        </div>

        <div className="p-[6cqw]" style={{ fontSize: "2.1cqw" }}>
          <dl className="grid grid-cols-2 gap-x-[4cqw] gap-y-[2cqw] border-b border-stone-200 pb-[4cqw]">
            {[
              [D.date, when],
              [D.donor, order.donor.anon || !order.donor.name ? D.anonymous : order.donor.name],
              [D.method, order.pay === "bank" ? D.bank : D.card],
              [D.status, D.statusV],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted" style={{ fontSize: "1.7cqw" }}>{k}</dt>
                <dd className="font-bold text-teal-900">{v}</dd>
              </div>
            ))}
          </dl>

          <table className="mt-[4cqw] w-full border-collapse text-start">
            <thead>
              <tr className="bg-teal-50 text-teal-900" style={{ fontSize: "1.8cqw" }}>
                <th className="rounded-s-[1cqw] p-[1.6cqw] text-start font-bold">{D.project}</th>
                <th className="p-[1.6cqw] text-start font-bold">{D.type}</th>
                <th className="rounded-e-[1cqw] p-[1.6cqw] text-end font-bold">{D.amount}</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((it) => {
                const p = getProject(it.slug);
                return (
                  <tr key={it.id} className="border-b border-stone-100">
                    <td className="p-[1.6cqw] font-semibold text-teal-900">{p ? tx(p.title, lang) : it.slug}</td>
                    <td className="p-[1.6cqw] text-muted">{it.freq === "monthly" ? t.common.monthly : t.common.once}</td>
                    <td className="num p-[1.6cqw] text-end font-bold text-teal-900" dir="ltr">{formatMoney(Math.round(it.amount * rateOf(order.currency) * 100) / 100, order.currency ?? "USD")}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="p-[1.6cqw] pt-[3cqw] text-end font-bold text-muted">{D.total}</td>
                <td className="num p-[1.6cqw] pt-[3cqw] text-end font-bold text-teal-900" style={{ fontSize: "4cqw" }} dir="ltr">{formatMoney(Math.round(order.total * rateOf(order.currency) * 100) / 100, order.currency ?? "USD")}</td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-[5cqw] flex items-end justify-between gap-[4cqw]">
            <div className="max-w-[60%] text-muted" style={{ fontSize: "1.7cqw", lineHeight: 1.7 }}>
              <p className="flex items-center gap-[1cqw] font-bold text-teal-900"><Khatam className="h-[2.4cqw] w-[2.4cqw]" color="#3aafc9" /> {D.sign}</p>
              <p className="mt-[1cqw]">{D.issued}</p>
            </div>
            <div className="text-center">
              <QR value={verifyUrl} className="mx-auto h-[16cqw] w-[16cqw]" />
              <p className="mt-[0.8cqw] text-muted" style={{ fontSize: "1.5cqw" }}>{D.verify}</p>
            </div>
          </div>
        </div>

        {/* تذييل بيانات المؤسسة */}
        <div className="absolute inset-x-0 bottom-0 bg-teal-900 px-[6cqw] py-[3cqw] text-teal-100" style={{ fontSize: "1.55cqw" }}>
          <div className="flex flex-wrap items-center justify-between gap-[2cqw]">
            <span lang="tr" className="font-semibold text-white">{contact.legalName}</span>
            <span>{D.regNote}</span>
          </div>
          <div className="mt-[1cqw] flex flex-wrap gap-x-[3cqw] gap-y-[0.6cqw]" dir="ltr">
            <span>{contact.address}</span>
            <span>{contact.phone}</span>
            <span>{contact.email}</span>
            <span>{contact.website}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
