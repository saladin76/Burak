"use client";

import { useEffect, useMemo, useState } from "react";
import Certificate from "./Certificate";
import Receipt from "./Receipt";
import { IconAward, IconPrint } from "./Icons";
import { getProject } from "@/lib/data";
import { fmt, tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { getOrder, lastOrder, type Order } from "@/lib/orders";

const sample = (): Order => ({
  ref: "BRK-SAMPLE",
  date: new Date().toISOString(),
  items: [{ id: "s1", slug: "jyl-alqran-5", amount: 200, freq: "once" }],
  total: 200,
  pay: "card",
  donor: { name: "", anon: true },
  gift: null,
  dedications: [],
});

export default function DocsView() {
  const { lang, t, f } = useI18n();
  const D = f.docs;
  const [order, setOrder] = useState<Order | null>(null);
  const [isSample, setIsSample] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const ref = sp.get("ref");
    const o = (ref && getOrder(ref)) || (!ref && lastOrder()) || null;
    setOrder(o ?? sample());
    setIsSample(!o);
    const d = Number(sp.get("doc"));
    if (d) setTab(d);
  }, []);

  const docs = useMemo(() => {
    if (!order) return [];
    const verify = `https://burakdernegi.org/${lang}/documents?ref=${order.ref}`;
    const date = new Date(order.date);
    const titles = order.items.map((i) => getProject(i.slug)).filter(Boolean).map((p) => tx(p!.title, lang));
    const donor = order.donor.anon || !order.donor.name ? D.anonymous : order.donor.name;
    const base = { lang, refNo: order.ref, refLabel: D.ref, date, dateLabel: D.date, sign: D.sign, verifyLabel: D.verify, verifyUrl: verify };
    const list: { label: string; node: React.ReactNode }[] = [
      { label: D.receipt, node: <Receipt order={order} lang={lang} verifyUrl={verify} /> },
      {
        label: D.certificate,
        node: <Certificate {...base} variant="donation" heading={D.certificate} toLabel={D.certIntro} name={donor} body={`${D.certBody} ($${fmt(order.total)})`} projects={titles} dua={D.dua} />,
      },
    ];
    if (order.gift)
      list.push({
        label: D.gift,
        node: <Certificate {...base} variant="gift" heading={D.gift} toLabel={D.giftTo} name={order.gift.to} body={D.giftBody} projects={titles} msg={order.gift.msg} from={{ label: D.giftFrom, name: order.gift.from }} dua={D.dua} />,
      });
    for (const d of order.dedications ?? []) {
      const p = getProject(d.slug);
      const pt = p ? tx(p.title, lang) : "";
      if (d.type === "teacher")
        list.push({
          label: `${D.teacher} — ${d.teacher}`,
          node: (
            <Certificate
              {...base}
              variant="teacher"
              heading={f.teach.cert}
              occasion={f.teach.occasion}
              toLabel={f.teach.certTo}
              name={`${d.title} ${d.teacher}`}
              body={f.teach.certLine.replace("{s}", d.student).replace("{p}", pt.replace(/[«»]/g, "")) + (d.subject ? ` — ${d.subject}` : "")}
              msg={d.msg}
              dua={D.dua}
            />
          ),
        });
      if (d.type === "lamp")
        list.push({
          label: `${D.lamp} — ${d.name || donor}`,
          node: (
            <Certificate
              {...base}
              variant="lamp"
              heading={f.lamps.certT}
              toLabel={`${f.lamps.certLine.replace("{n}", String(d.count))} ${f.lamps.certFor[d.mode]}`}
              name={d.name || donor}
              body={f.lamps.hadith}
              dua={D.dua}
              lamps={d.count}
            />
          ),
        });
    }
    return list;
  }, [order, lang, D, f]);

  if (!order) return <div className="h-96 animate-pulse rounded-2xl bg-stone-100" />;

  return (
    <div>
      {isSample && <p className="no-print mb-6 rounded-2xl border border-accent-300 bg-accent-100/70 p-4 text-center font-semibold text-accent-700">{D.noOrder}</p>}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" className="flex flex-wrap gap-2">
          {docs.map((d, i) => (
            <button key={d.label} role="tab" aria-selected={tab === i} onClick={() => setTab(i)}
              className={`flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold ${tab === i ? "bg-teal-900 text-white" : "border border-stone-300 bg-white text-teal-900 hover:border-teal-500"}`}>
              <IconAward size={18} /> {d.label}
            </button>
          ))}
        </div>
        <button onClick={() => window.print()} className="flex h-12 items-center gap-2 rounded-full bg-accent-500 px-6 font-bold text-white hover:bg-accent-600">
          <IconPrint size={20} /> {D.print}
        </button>
      </div>
      {docs.map((d, i) => (
        <div key={d.label} className={i === tab ? "print-area" : "hidden"}>{d.node}</div>
      ))}
      <p className="no-print mt-6 text-center text-sm text-muted">{t.cart.total}: <b className="num text-teal-900">${fmt(order.total)}</b> · {D.ref}: <b className="font-mono" dir="ltr">{order.ref}</b></p>
    </div>
  );
}
