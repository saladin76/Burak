"use client";

import { useState } from "react";
import { orgContent } from "@/lib/data";
import { useI18n } from "@/lib/lang-context";
import { IconCheck } from "./Icons";

const ACCOUNT_NAME = "Burak Mukaddes Mekanları Tanıtım ve Kültür Derneği";

export default function BankAccounts() {
  const { lang } = useI18n();
  const [copied, setCopied] = useState("");
  const L = {
    ar: { name: "اسم الحساب", branch: "الفرع", copy: "نسخ", done: "نُسخ", more: "جميع الحسابات (ومنها Türkiye Finans) على الموقع الرسمي" },
    tr: { name: "Hesap adı", branch: "Şube", copy: "Kopyala", done: "Kopyalandı", more: "Tüm hesaplar (Türkiye Finans dahil) resmi sitede" },
    en: { name: "Account name", branch: "Branch", copy: "Copy", done: "Copied", more: "All accounts (incl. Türkiye Finans) on the official site" },
    fr: { name: "Titulaire du compte", branch: "Agence", copy: "Copier", done: "Copié", more: "Tous les comptes (dont Türkiye Finans) sur le site officiel" },
    de: { name: "Kontoinhaber", branch: "Filiale", copy: "Kopieren", done: "Kopiert", more: "Alle Konten (inkl. Türkiye Finans) auf der offiziellen Website" },
    id: { name: "Nama rekening", branch: "Cabang", copy: "Salin", done: "Disalin", more: "Semua rekening (termasuk Türkiye Finans) di situs resmi" },
    ur: { name: "اکاؤنٹ کا نام", branch: "برانچ", copy: "کاپی", done: "کاپی ہو گیا", more: "تمام اکاؤنٹس (بشمول Türkiye Finans) سرکاری ویب سائٹ پر" },
  }[lang];
  const copy = async (v: string) => {
    try { await navigator.clipboard.writeText(v.replace(/\s/g, "")); setCopied(v); setTimeout(() => setCopied(""), 1800); } catch {}
  };
  return (
    <div className="mt-6 grid gap-5">
      <p className="text-sm text-accent-100">{L.name}: <b className="text-white" dir="ltr">{ACCOUNT_NAME}</b></p>
      <div className="grid gap-5 lg:grid-cols-2">
        {orgContent.banks.map((b) => (
          <div key={b.swift} className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/15 pb-3">
              <b className="font-kufi text-xl">{b.bank}</b>
              <span className="text-xs text-accent-100" dir="ltr">{L.branch}: {b.branch} · SWIFT: <b className="text-white">{b.swift}</b></span>
            </div>
            <ul className="mt-3 grid gap-2">
              {b.accounts.map((a) => (
                <li key={a.iban} className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5">
                  <span className="grid h-8 w-12 shrink-0 place-items-center rounded-md bg-accent-500 text-xs font-bold">{a.currency}</span>
                  <span className="flex-1 font-mono text-[13px] tracking-wide sm:text-sm" dir="ltr">{a.iban}</span>
                  <button type="button" onClick={() => copy(a.iban)} className="flex h-8 shrink-0 items-center gap-1 rounded-md border border-white/20 px-2.5 text-xs font-semibold hover:bg-white/10">
                    {copied === a.iban ? <><IconCheck size={13} /> {L.done}</> : L.copy}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <a href={`https://burakdernegi.org/${lang}/hesapnumaralarimiz`} target="_blank" rel="noopener" className="text-sm font-semibold text-accent-300 underline-offset-4 hover:underline">{L.more} ↗</a>
    </div>
  );
}
