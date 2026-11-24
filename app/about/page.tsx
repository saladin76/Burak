import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Khatam, OrnamentDivider } from "@/components/Motifs";
import { IconArrow, IconPlay } from "@/components/Icons";
import { stats, fmt } from "@/lib/data";

export const metadata: Metadata = { title: "من نحن" };

const goals = [
  "إعمار المسجد الأقصى المبارك عبر تنشيط وتشجيع التواجد اليومي للمقدسيين فيه، مع دعم النشاطات اليومية لطلبة العلم وحفظة القرآن الكريم في باحاته.",
  "حماية المسجد الأقصى المبارك وربط الأمة به فكرياً وجسدياً، ودعمها لتكثيف التواجد فيه.",
  "خدمة ورعاية المسجد الأقصى وتغطية احتياجاته ليكون مهيّأً لاستقبال المصلين على أحسن صورة، أسوةً بالحرمين الشريفين.",
  "تثبيت المقدسيين في البلدة القديمة أمام المحاولات المستمرة لتهجيرهم وترحيلهم من أرضهم.",
  "رعاية المقدسيين في البلدة القديمة بمختلف فئاتهم، وتغطية احتياجاتهم اليومية الملحّة والأساسية.",
];

export default function About() {
  return (
    <>
      <PageHero title="من نحن" kicker="مؤسسة البراق">
        مؤسسة إنسانية تركية تأسست عام 2011، تخطّى عدد مشاريعها 600 مشروع، وبلغ عدد المستفيدين منها أكثر من مليون مستفيد.
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-14 lg:grid-cols-[1.3fr_1fr]">
        <div className="text-lg leading-9 text-ink/85">
          <p>
            نهدف إلى التعريف بالمقدسات الإسلامية، وخاصة المسجد الأقصى المبارك والبلدة القديمة بالقدس الشريف، وغرس محبتها في نفوس المسلمين، والمساهمة في الحفاظ عليها وإعمارها وخدمتها ورعايتها، ودعم صمود المقدسيين فيها عبر حزمة من البرامج والمشاريع المتنوعة.
          </p>
          <h2 className="mt-10 font-kufi text-3xl font-bold text-teal-900">البداية</h2>
          <p className="mt-4">
            تيمّناً برحلة الإسراء والمعراج التي كان لها معنى عظيم في ربط المقدسات الإسلامية ببعضها، وكان «البراق» وسيلة نقل النبي ﷺ من المسجد الحرام إلى المسجد الأقصى؛ ومن هنا جاء اسم «البراق»: لنكون براقاً ينقل الأمة الإسلامية ومساعداتها من جميع أنحاء العالم إلى المسجد الأقصى والقدس.
          </p>
          <p className="mt-6 font-kufi text-2xl text-gold-600">« البراق طريقك إلى القدس »</p>
        </div>
        <div className="grid content-start gap-4">
          <a href="#" className="group arch relative grid aspect-[4/3] place-items-center overflow-hidden bg-teal-900 text-white">
            <div className="pattern-khatam absolute inset-0 opacity-25" />
            <span className="relative flex flex-col items-center gap-3">
              <IconPlay size={64} className="text-gold-300 transition group-hover:scale-110" />
              <span className="font-kufi text-xl">شاهد الفيلم التعريفي</span>
            </span>
          </a>
          <div className="grid grid-cols-3 gap-3">
            {stats.lifetime.map((s) => (
              <div key={s.label} className="rounded-2xl border border-stone-200 bg-white p-4 text-center">
                <p className="num text-xl font-bold text-teal-900" dir="ltr">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-20">
        <div className="relative overflow-hidden rounded-[32px] bg-teal-900 p-8 text-white md:p-14">
          <div className="pattern-khatam absolute inset-0 opacity-15" />
          <div className="relative">
            <p className="text-sm font-bold text-gold-300">رؤيتنا</p>
            <p className="mt-4 max-w-4xl font-kufi text-2xl leading-[1.8] md:text-3xl">
              أن نكون المؤسسة الرائدة التي تجمع جهود الأمة بكافة شرائحها وأجناسها لنصرة المسجد الأقصى والقدس الشريف، والحفاظ على هويتها وتراثها الإسلامي، ورعاية المقدسيين وتثبيتهم وتعزيز صمودهم.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-20">
        <h2 className="font-kufi text-3xl font-bold text-teal-900 md:text-4xl">أهدافنا ورسالتنا</h2>
        <OrnamentDivider className="my-6 h-5 w-56" />
        <ol className="grid gap-4 md:grid-cols-2">
          {goals.map((g, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-6">
              <span className="num grid h-12 w-12 shrink-0 place-items-center rounded-t-full rounded-b-md bg-gold-100 text-xl font-bold text-gold-700">{i + 1}</span>
              <p className="leading-8">{g}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-[24px] border border-stone-200 bg-white p-6">
          <p className="flex items-center gap-3 text-lg">
            <Khatam className="h-6 w-6" color="#c99a2e" /> هذا العام: <b className="num">{stats.annual[0].value}</b> مشروعاً و<b className="num">{fmt(stats.annual[1].value)}</b> مستفيداً.
          </p>
          <Link href="/projects" className="flex h-12 items-center gap-2 rounded-full bg-gold-500 px-6 font-bold text-night hover:bg-gold-400">
            ساهم في مشاريعنا <IconArrow size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
