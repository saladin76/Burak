import Link from "next/link";
import { Suspense } from "react";
import QuickDonate from "@/components/QuickDonate";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { DomeOfTheRock, GivingWaves, Khatam, OrnamentDivider } from "@/components/Motifs";
import { IconArrow, IconBook, IconHeart, IconPlay, IconRepeat, KindIcon } from "@/components/Icons";
import { ProjectCover } from "@/components/ProjectCard";
import StoriesBar from "@/components/StoriesBar";
import JerusalemClock from "@/components/JerusalemClock";
import AqsaMap from "@/components/AqsaMap";
import Lamps from "@/components/Lamps";
import Reveal from "@/components/Reveal";
import { IconShield, IconBank } from "@/components/Icons";
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
      <StoriesBar />
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
            <div className="rise-3 mt-8">
              <JerusalemClock />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[640px] self-end">
            <GivingWaves
              className="pointer-events-none absolute bottom-[8%] left-1/2 w-[135%] -translate-x-1/2"
              rings={8}
              stroke={3}
              gap={9}
              palette={["#3aafc9", "#64b6d0", "#8acbda", "#aeddec"]}
              opacity={0.28}
            />
            <DomeOfTheRock className="relative block w-full" />
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

      {/* ========== شريط الآية ========== */}
      <section className="mx-auto mt-16 max-w-7xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-gold-300/60 bg-gold-100/60 px-6 py-7 text-center">
            <div className="pattern-khatam-teal absolute inset-0 opacity-50" />
            <div className="relative flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <OrnamentDivider className="hidden h-5 w-32 2xl:block" />
              <p className="font-naskh text-2xl leading-[1.9] text-teal-900 md:text-[30px]">
                ﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ﴾
              </p>
              <OrnamentDivider className="hidden h-5 w-32 2xl:block" />
            </div>
            <p className="relative mt-1 text-sm font-semibold text-gold-700">سورة الإسراء · الآية 1</p>
          </div>
        </Reveal>
      </section>

      {/* ========== المحاور ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-20">
        <Reveal><SectionHead kicker="محاور عملنا" title="أربعة طرق تصل بها إلى القدس" /></Reveal>
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
        <GivingWaves className="pointer-events-none absolute -bottom-6 start-[-40px] h-[340px] w-auto" rings={8} opacity={0.18} palette={["#c5e5f1", "#8acbda", "#64b6d0", "#3aafc9"]} />
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

      {/* ========== كيف يصل تبرعك ========== */}
      <section className="mx-auto max-w-7xl px-5 pt-24">
        <Reveal>
          <SectionHead kicker="الشفافية" title="كيف يصل تبرعك إلى القدس؟" action={
            <Link href="/about" className="flex h-12 items-center gap-2 rounded-full border border-teal-900/20 px-6 font-bold text-teal-900 hover:bg-teal-50">
              تقاريرنا وإنجازاتنا <IconArrow size={18} />
            </Link>
          } />
        </Reveal>
        <ol className="relative grid gap-6 md:grid-cols-5">
          <span aria-hidden="true" className="absolute inset-x-[10%] top-9 hidden border-t-2 border-dashed border-gold-400/60 md:block" />
          {[
            { t: "تختار وجهة عطائك", d: "مشروعاً محدداً في القدس أو غزة، أو زكاتك أو صدقتك." },
            { t: "تحدّد المبلغ", d: "مرة واحدة أو شهرياً، ويمكنك إهداؤه لمن تحب." },
            { t: "دفع آمن", d: "عبر بوابات دفع معتمدة أو تحويل بنكي مباشر." },
            { t: "التنفيذ الميداني", d: "فرقنا وشركاؤنا في القدس وغزة يوصلون المساعدة لمستحقيها." },
            { t: "التوثيق والتقرير", d: "نشارك صور ومقاطع التنفيذ وأثر المشروع." },
          ].map((s, i) => (
            <li key={s.t}>
              <Reveal delay={i * 90} className="relative text-center">
                <span className="relative mx-auto grid h-[72px] w-[72px] place-items-center">
                  <Khatam className="absolute inset-0 h-full w-full text-gold-500" color="#c99a2e" />
                  <span className="num relative grid h-10 w-10 place-items-center rounded-full bg-teal-900 text-lg font-bold text-gold-300">{i + 1}</span>
                </span>
                <h3 className="mt-4 font-kufi text-xl font-bold text-teal-900">{s.t}</h3>
                <p className="mt-2 leading-7 text-muted">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-stone-200 bg-white px-6 py-4 text-[15px] font-semibold text-teal-900">
          <span className="flex items-center gap-2"><IconShield size={20} className="text-olive" /> مدفوعات مشفّرة وآمنة</span>
          <span className="flex items-center gap-2"><IconBank size={20} className="text-teal-700" /> حسابات بنكية رسمية</span>
          <span className="flex items-center gap-2"><Khatam className="h-5 w-5" color="#c99a2e" /> جمعية مسجّلة رسمياً في تركيا</span>
        </Reveal>
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
                  <Khatam className="mt-1.5 h-5 w-5 shrink-0" color="#007da5" />
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
              <div className="arch relative aspect-[3/4] overflow-hidden bg-night px-6 pb-6 pt-12 text-center">
                <p className="font-kufi text-5xl font-bold text-gold-400 md:text-6xl">الإسراء</p>
                <p className="mt-2 text-sm text-teal-100/80">رحلةٌ في ليلة… وطريقٌ لا ينقطع</p>
                <svg viewBox="0 0 260 260" className="mx-auto mt-4 w-full max-w-[260px]" role="img" aria-label="مسار رحلة الإسراء من المسجد الحرام إلى المسجد الأقصى">
                  <path id="isra" d="M60 225 C 20 150, 230 120, 195 40" fill="none" stroke="#ebcd7a" strokeWidth="2" strokeDasharray="5 7" opacity=".8" />
                  {/* المسجد الحرام */}
                  <g transform="translate(60 225)">
                    <circle r="20" fill="#032c3d" stroke="#ebcd7a" />
                    <rect x="-8" y="-8" width="16" height="16" fill="#10222a" stroke="#ebcd7a" strokeWidth="1.2" />
                    <path d="M-8 -3h16" stroke="#ebcd7a" strokeWidth="1.5" />
                  </g>
                  {/* المسجد الأقصى */}
                  <g transform="translate(195 40)">
                    <circle r="22" fill="#032c3d" stroke="#ebcd7a" />
                    <path d="M-11 6c0-8 5-13 11-14 6 1 11 6 11 14Z" fill="#c99a2e" />
                    <rect x="-13" y="6" width="26" height="7" fill="#3aafc9" />
                  </g>
                  <circle r="5" fill="#fff6d8">
                    <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#isra" />
                    </animateMotion>
                  </circle>
                  <text x="60" y="258" textAnchor="middle" fill="#c5e5f1" fontSize="12">المسجد الحرام</text>
                  <text x="195" y="78" textAnchor="middle" fill="#c5e5f1" fontSize="12">المسجد الأقصى</text>
                </svg>
                <p className="mt-2 text-sm leading-7 text-gold-300">ونحن البراق الذي يحمل عطاءك إلى هناك</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== قناديل الأقصى ========== */}
      <div className="mt-24">
        <Lamps />
      </div>

      {/* ========== خريطة الأقصى ========== */}
      <section id="aqsa-map" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-24">
        <Reveal>
          <SectionHead kicker="جولة تفاعلية" title="تجوّل في رحاب المسجد الأقصى">
            اضغط على المعالم لتتعرف عليها، وعلى المشاريع التي تخدمها.
          </SectionHead>
        </Reveal>
        <Reveal><AqsaMap /></Reveal>
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
