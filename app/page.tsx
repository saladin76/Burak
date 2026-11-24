import Link from "next/link";
import { Suspense } from "react";
import QuickDonate from "@/components/QuickDonate";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { DomeOfTheRock, Khatam, OrnamentDivider } from "@/components/Motifs";
import { IconArrow, IconBook, IconHeart, IconPlay, IconRepeat, KindIcon } from "@/components/Icons";
import { ProjectCover } from "@/components/ProjectCard";
import { fmt, news, pillars, projects, qudsLibrary, stats } from "@/lib/data";

const stars = [
  [8, 14], [18, 32], [27, 9], [36, 22], [44, 6], [52, 30], [61, 12], [70, 26], [78, 8], [88, 18], [94, 34], [12, 48], [57, 44], [83, 46],
];

function SectionHead({ kicker, title, children, action }: { kicker: string; title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gold-600">
          <Khatam className="h-5 w-5" color="#c99a2e" /> {kicker}
        </p>
        <h2 className="text-balance font-kufi text-3xl font-bold leading-tight text-teal-900 md:text-[42px]">{title}</h2>
        {children && <p className="mt-4 text-lg leading-8 text-muted">{children}</p>}
      </div>
      {action}
    </div>
  );
}

export default function Home() {
  const urgent = projects.filter((p) => p.urgent).slice(0, 2);

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="pattern-khatam absolute inset-0 opacity-[.09]" />
        <div aria-hidden="true" className="absolute inset-0">
          {stars.map(([x, y], i) => (
            <span
              key={i}
              className="twinkle absolute h-1 w-1 rounded-full bg-gold-300"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 5) * 0.6}s` }}
            />
          ))}
        </div>
        <div className="relative mx-auto grid max-w-7xl items-end gap-8 px-5 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <div className="pb-16 lg:pb-40">
            <p className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-white/5 px-4 py-2 text-sm font-semibold text-gold-300">
              <Khatam className="h-4 w-4" color="#ebcd7a" /> منذ 2011 في خدمة المسجد الأقصى المبارك
            </p>
            <h1 className="rise-2 text-balance font-kufi text-[44px] font-bold leading-[1.15] md:text-[68px]">
              البراق
              <span className="block text-gold-400">طريقك إلى القدس</span>
            </h1>
            <p className="rise-3 mt-6 max-w-xl text-lg leading-9 text-teal-100/90 md:text-xl">
              نُعمّر الأقصى، ونُثبّت المقدسيين في بيوتهم، ونغيث أهلنا في غزة. كل تبرع منك خطوةٌ على طريق الإسراء.
            </p>
            <div className="rise-3 mt-9 flex flex-wrap gap-3">
              <Link href="#donate" className="flex h-14 items-center gap-2 rounded-full bg-gold-500 px-8 text-lg font-bold text-night hover:bg-gold-400">
                تبرع الآن <IconArrow size={20} />
              </Link>
              <Link href="/projects?region=quds" className="flex h-14 items-center gap-2 rounded-full border border-white/25 px-7 text-lg font-semibold hover:border-gold-300 hover:text-gold-300">
                مشاريع القدس
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[640px] self-end">
            <DomeOfTheRock className="block w-full" />
          </div>
        </div>
      </section>

      {/* ========== تبرع سريع + الحملات العاجلة ========== */}
      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-5 lg:-mt-28">
        <div className="grid gap-6 lg:grid-cols-[440px_1fr]">
          <QuickDonate />
          <div className="grid gap-6 lg:pt-28">
            <div className="flex items-center justify-between">
              <h2 className="font-kufi text-2xl font-bold text-teal-900">حملات عاجلة</h2>
              <Link href="/projects" className="flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-900">
                كل المشاريع <IconArrow size={18} />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {urgent.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group overflow-hidden rounded-[24px] border border-stone-200 bg-white hover:shadow-[0_24px_60px_-30px_rgba(1,64,78,.5)]">
                  <ProjectCover p={p} />
                  <div className="p-5">
                    <h3 className="font-kufi text-xl font-bold text-teal-900">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 leading-7 text-muted">{p.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-gold-600 group-hover:gap-2.5">
                      ساهم في الحملة <IconArrow size={18} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== المحاور ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-24">
        <SectionHead kicker="محاور عملنا" title="أربعة طرق تصل بها إلى القدس" />
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Link
              key={p.key}
              href={p.href}
              className={`group arch relative overflow-hidden border px-3 pb-6 pt-12 text-center md:px-6 md:pb-7 md:pt-16 transition hover:-translate-y-1 ${
                i === 0 ? "border-teal-900 bg-teal-900 text-white" : "border-stone-200 bg-white text-teal-900 hover:border-teal-500"
              }`}
            >
              <div className={`pattern-khatam-teal absolute inset-0 ${i === 0 ? "opacity-0" : ""}`} />
              {i === 0 && <div className="pattern-khatam absolute inset-0 opacity-20" />}
              <div className={`relative mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full md:h-20 md:w-20 ${i === 0 ? "bg-white/10 text-gold-300" : "bg-teal-100 text-teal-700"}`}>
                <KindIcon kind={(["rebuild", "food", "zakat", "quran"] as const)[i]} size={38} />
              </div>
              <h3 className="relative font-kufi text-lg font-bold md:text-2xl">{p.title}</h3>
              <p className={`relative mt-3 text-sm leading-6 md:text-base md:leading-7 ${i === 0 ? "text-teal-100" : "text-muted"}`}>{p.text}</p>
              <span className={`relative mt-5 inline-flex items-center gap-1.5 font-bold ${i === 0 ? "text-gold-300" : "text-teal-700"}`}>
                استكشف <IconArrow size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== الأثر ========== */}
      <section className="relative mt-24 overflow-hidden bg-teal-900 text-white">
        <div className="pattern-khatam absolute inset-0 opacity-[.12]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold text-gold-300">أثرٌ يبقى</p>
            <h2 className="font-kufi text-3xl font-bold leading-tight md:text-4xl">بفضل الله ثم بعطائكم</h2>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {stats.lifetime.map((s) => (
                <div key={s.label}>
                  <p className="num text-2xl font-bold text-gold-300 md:text-3xl" dir="ltr">{s.value}</p>
                  <p className="mt-1 text-sm text-teal-100">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.annual.map((s) => (
              <div key={s.label} className="arch border border-gold-300/30 bg-white/[.04] px-6 pb-8 pt-12 text-center">
                <p className="num text-5xl font-bold text-white md:text-6xl">{fmt(s.value)}</p>
                <p className="mt-3 text-lg text-teal-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="crenellation text-stone-50" />
      </section>

      {/* ========== المشاريع ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-24">
        <SectionHead
          kicker="مشاريعنا"
          title="مشاريع تصنع الأثر"
          action={
            <Link href="/projects" className="flex h-12 items-center gap-2 rounded-full border border-teal-900/20 px-6 font-bold text-teal-900 hover:bg-teal-50">
              عرض كل المشاريع <IconArrow size={18} />
            </Link>
          }
        >
          اختر المجال الذي يلامس قلبك، وتابع أثر تبرعك خطوة بخطوة.
        </SectionHead>
        <Suspense>
          <ProjectsExplorer limit={6} />
        </Suspense>
      </section>

      {/* ========== قصة الاسم ========== */}
      <section className="mx-auto mt-24 max-w-7xl px-5">
        <div className="pattern-stone grid overflow-hidden rounded-[32px] border border-stone-200 lg:grid-cols-2">
          <div className="p-8 md:p-14">
            <p className="mb-3 text-sm font-bold text-gold-600">لماذا «البراق»؟</p>
            <h2 className="font-kufi text-3xl font-bold leading-snug text-teal-900 md:text-4xl">
              من المسجد الحرام إلى المسجد الأقصى
            </h2>
            <p className="mt-5 text-lg leading-9 text-ink/85">
              تيمّناً برحلة الإسراء والمعراج التي ربطت المقدسات الإسلامية ببعضها، وكان «البراق» وسيلة نقل النبي ﷺ من المسجد الحرام إلى المسجد الأقصى؛ جاء اسمنا لنكون براقاً ينقل الأمة ومساعداتها من أنحاء العالم إلى الأقصى والقدس.
            </p>
            <ul className="mt-8 grid gap-3">
              {[
                "إعمار المسجد الأقصى بتشجيع التواجد اليومي فيه ودعم طلبة العلم وحفظة القرآن.",
                "ربط الأمة بالمسجد الأقصى فكرياً وجسدياً.",
                "خدمة الأقصى وتغطية احتياجاته أسوةً بالحرمين الشريفين.",
                "تثبيت المقدسيين في البلدة القديمة ورعاية احتياجاتهم اليومية.",
              ].map((t) => (
                <li key={t} className="flex gap-3 leading-8">
                  <Khatam className="mt-1.5 h-5 w-5 shrink-0" color="#04819c" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/about" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-teal-900 px-6 font-bold text-white hover:bg-teal-700">
              تعرّف علينا <IconArrow size={18} />
            </Link>
          </div>
          <div className="relative flex min-h-[420px] items-center justify-center bg-teal-900 p-10">
            <div className="pattern-khatam absolute inset-0 opacity-20" />
            <div className="arch relative w-full max-w-sm border-2 border-gold-400/70 p-3">
              <div className="arch grid aspect-[3/4] place-items-center bg-night p-8 text-center">
                <div>
                  <p className="font-kufi text-6xl font-bold text-gold-400 md:text-7xl">الإسراء</p>
                  <OrnamentDivider className="mx-auto my-6 h-5 w-48" />
                  <p className="font-naskh text-2xl leading-[1.9] text-teal-100">
                    ﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ﴾
                  </p>
                  <p className="mt-3 text-sm text-gold-300">الإسراء: 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== الحديث ========== */}
      <section className="mx-auto max-w-5xl px-5 pt-24 text-center">
        <OrnamentDivider className="mx-auto mb-8 h-5 w-72" />
        <p className="mb-6 text-sm font-bold text-gold-600">عن ميمونة مولاة النبي ﷺ قالت: يا رسول الله، أفتنا في بيت المقدس</p>
        <blockquote className="font-naskh text-[26px] leading-[2] text-teal-900 md:text-[34px]">
          «أرضُ المحشرِ والمنشرِ، ائتوه فصلّوا فيه، فإنّ صلاةً فيه كألفِ صلاةٍ في غيره»، قلت: أرأيت إن لم أستطع أن أتحمّل إليه؟ قال:
          <span className="mt-2 block text-gold-600">«فتُهدي له زيتاً يُسرَج فيه، فمن فعل فهو كمن أتاه»</span>
        </blockquote>
        <p className="mt-6 text-muted">رواه أحمد وأبو داود وابن ماجه</p>
        <Link href="/projects?region=quds" className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-gold-500 px-8 text-lg font-bold text-night hover:bg-gold-400">
          أهدِ الأقصى سراجه <IconHeart size={20} />
        </Link>
      </section>

      {/* ========== مكتبة القدس ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-24">
        <SectionHead kicker="اعرف القدس" title="بوابة المعرفة المقدسية">
          نُعرّف بالمسجد الأقصى المبارك والبلدة القديمة: تاريخاً ومعالمَ وقضية.
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qudsLibrary.map((l, i) => (
            <Link
              key={l.title}
              href={l.href}
              className="group flex items-center gap-5 rounded-2xl border border-stone-200 bg-white p-5 hover:border-teal-500"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-t-full rounded-b-lg bg-teal-100 text-teal-700 group-hover:bg-teal-900 group-hover:text-gold-300">
                {i > 3 ? <IconPlay size={26} /> : <IconBook size={26} />}
              </span>
              <span>
                <span className="block font-kufi text-xl font-bold text-teal-900">{l.title}</span>
                <span className="text-muted">{l.desc}</span>
              </span>
              <IconArrow size={20} className="ms-auto text-teal-500 transition group-hover:-translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* ========== الأخبار ========== */}
      <section id="news" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-24">
        <SectionHead kicker="من الميدان" title="الأنشطة والفعاليات" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {news.map((n, i) => (
            <article key={n.slug} className="group overflow-hidden rounded-[22px] border border-stone-200 bg-white">
              <div className={`relative h-40 ${i % 2 ? "bg-teal-700" : "bg-night-2"}`}>
                <div className="pattern-khatam absolute inset-0 opacity-40" />
                <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-900">{n.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold leading-8 text-teal-900 group-hover:text-teal-700">
                  <Link href="#">{n.title}</Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========== كن داعماً ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-24">
        <div className="relative overflow-hidden rounded-[32px] bg-gold-500 p-8 text-night md:p-14">
          <div className="pattern-khatam-teal absolute inset-0 opacity-70" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-3 flex items-center gap-2 font-bold text-teal-900">
                <IconRepeat size={20} /> كن داعماً
              </p>
              <h2 className="font-kufi text-3xl font-bold leading-tight md:text-5xl">اجعل لك سهماً دائماً في القدس</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-night/80">
                تبرّعك الشهري يمنح مشاريعنا استقراراً، ويُبقي حلقات القرآن والطرود الغذائية والتعليم مستمرة طوال العام.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/projects?monthly=1" className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-teal-900 px-8 text-lg font-bold text-white hover:bg-teal-700">
                ابدأ تبرعك الشهري <IconArrow size={20} />
              </Link>
              <Link href="/contact#volunteer" className="flex h-14 items-center justify-center rounded-2xl border-2 border-night/20 px-8 text-lg font-bold hover:bg-white/30">
                تطوّع معنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
