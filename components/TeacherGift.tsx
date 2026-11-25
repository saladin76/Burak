"use client";

import { useCurrency } from "@/lib/currency";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Certificate from "./Certificate";
import { IconArrow, IconBag, KindIcon } from "./Icons";
import { projects } from "@/lib/data";
import { tx } from "@/lib/i18n";
import { useI18n } from "@/lib/lang-context";
import { useCart } from "@/lib/cart";
import { addDedication } from "@/lib/orders";

const EDU = ["alquds-supporting-education", "jyl-alqran-5", "hlqat-alqran-alqds", "mdrs-dar-alaytam-alslamy-2"];
const AMOUNTS = [25, 50, 100, 250];

export default function TeacherGift() {
  const { lang, f, href } = useI18n();
  const T = f.teach;
  const D = f.docs;
  const cart = useCart();
  const router = useRouter();
  const [v, setV] = useState({ title: 0, teacher: "", subject: "", student: "", msg: "", slug: EDU[0], amount: 50, custom: "" });
  const [added, setAdded] = useState(false);
  const C$ = useCurrency();
  const amount = v.custom ? C$.toUsd(Number(v.custom) || 0) : C$.pick(v.amount);
  const proj = projects.find((p) => p.slug === v.slug)!;
  const ok = v.teacher.trim() && v.student.trim() && amount > 0;

  const commit = () => {
    cart.add({ slug: v.slug, amount, freq: "once" });
    addDedication({ type: "teacher", title: T.tTitles[v.title], teacher: v.teacher.trim(), subject: v.subject.trim(), student: v.student.trim(), msg: v.msg.trim(), slug: v.slug });
  };

  const input = "h-12 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 text-base text-ink focus:border-teal-500 focus:bg-white focus:outline-none";
  const label = "grid gap-1.5 text-sm font-semibold text-muted";

  return (
    <div className="grid gap-8 xl:grid-cols-[440px_1fr]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!ok) return;
          commit();
          router.push(href("/checkout"));
        }}
        className="h-fit rounded-2xl border border-stone-200 bg-white p-6 md:p-8"
      >
        <h2 className="font-kufi text-2xl font-bold text-teal-900">{T.formT}</h2>
        <div className="mt-5 grid gap-4">
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <label className={label}>{T.tTitle}
              <select value={v.title} onChange={(e) => setV({ ...v, title: Number(e.target.value) })} className={input}>
                {T.tTitles.map((x, i) => <option key={x} value={i}>{x}</option>)}
              </select>
            </label>
            <label className={label}>{T.tName} *<input required value={v.teacher} onChange={(e) => setV({ ...v, teacher: e.target.value })} className={input} /></label>
          </div>
          <label className={label}>{T.tSubject}<input value={v.subject} onChange={(e) => setV({ ...v, subject: e.target.value })} className={input} /></label>
          <label className={label}>{T.student} *<input required value={v.student} onChange={(e) => setV({ ...v, student: e.target.value })} className={input} /></label>
          <label className={label}>{T.msg}
            <textarea rows={2} maxLength={120} value={v.msg} onChange={(e) => setV({ ...v, msg: e.target.value })} placeholder={T.msgPh} className="rounded-xl border border-stone-300 bg-stone-50 p-4 text-base text-ink focus:border-teal-500 focus:bg-white focus:outline-none" />
          </label>
          <fieldset>
            <legend className="mb-1.5 text-sm font-semibold text-muted">{T.project}</legend>
            <div className="grid gap-2">
              {EDU.map((s) => {
                const p = projects.find((x) => x.slug === s)!;
                const on = v.slug === s;
                return (
                  <button type="button" key={s} aria-pressed={on} onClick={() => setV({ ...v, slug: s })}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-start ${on ? "border-teal-500 bg-teal-50 ring-4 ring-teal-500/10" : "border-stone-200 hover:border-teal-500"}`}>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${on ? "bg-teal-500 text-white" : "bg-teal-100 text-teal-700"}`}><KindIcon kind={p.kind} size={20} /></span>
                    <span className="font-semibold text-teal-900">{tx(p.title, lang)}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-1.5 text-sm font-semibold text-muted">{T.amount}</legend>
            <div className="grid grid-cols-4 gap-2">
              {AMOUNTS.map((a) => (
                <button type="button" key={a} aria-pressed={!v.custom && v.amount === a} onClick={() => setV({ ...v, amount: a, custom: "" })}
                  className={`num h-12 rounded-xl border text-lg font-bold ${!v.custom && v.amount === a ? "border-accent-500 bg-accent-100 text-accent-700" : "border-stone-300 text-teal-900"}`}>
                  {C$.money(a, { nice: true })}
                </button>
              ))}
            </div>
            <input inputMode="numeric" placeholder={`${C$.symbol} …`} value={v.custom} onChange={(e) => setV({ ...v, custom: e.target.value.replace(/[^\d]/g, "") })} aria-label={T.amount} className={`${input} mt-2`} />
          </fieldset>
        </div>
        <div className="mt-6 flex gap-2">
          <button type="submit" disabled={!ok} className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-accent-500 py-3 text-center text-lg font-bold leading-snug text-white hover:bg-accent-600 disabled:opacity-50">
            {T.cta} · <span className="num" dir="ltr">{C$.money(amount)}</span> <IconArrow size={20} />
          </button>
          <button type="button" disabled={!ok} aria-label={f.cards.quickAdd} title={f.cards.quickAdd}
            onClick={() => { commit(); setAdded(true); setV({ ...v, teacher: "", subject: "", msg: "" }); setTimeout(() => setAdded(false), 2200); }}
            className={`grid h-14 w-14 place-items-center rounded-2xl border-2 ${added ? "border-olive bg-olive text-white" : "border-teal-900/15 text-teal-900"} disabled:opacity-40`}>
            <IconBag />
          </button>
        </div>
        <p className="mt-3 text-xs leading-6 text-muted">{added ? f.cards.added : T.others}</p>
      </form>

      <div className="xl:sticky xl:top-28 xl:self-start">
        <p className="mb-3 font-kufi text-xl font-bold text-teal-900">{T.preview}</p>
        <Certificate
          lang={lang}
          variant="teacher"
          heading={T.cert}
          occasion={T.occasion}
          toLabel={T.certTo}
          name={`${T.tTitles[v.title]} ${v.teacher || "…"}`}
          body={T.certLine.replace("{s}", v.student || "…").replace("{p}", tx(proj.title, lang).replace(/[«»]/g, "")) + (v.subject ? ` — ${v.subject}` : "")}
          msg={v.msg}
          dua={D.dua}
          refNo="BRK-PREVIEW"
          refLabel={D.ref}
          date={new Date()}
          dateLabel={D.date}
          sign={D.sign}
          verifyLabel={D.verify}
          verifyUrl={`https://burakdernegi.org/${lang}/teachers-day`}
        />
      </div>
    </div>
  );
}
