import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { DomeOfTheRock, Khatam, OrnamentDivider } from "@/components/Motifs";
import { IconArrow, IconBook, IconPlay } from "@/components/Icons";
import { qudsLibrary } from "@/lib/data";

export const metadata: Metadata = { title: "القدس" };

const landmarks = [
  { t: "المسجد الأقصى المبارك", d: "أولى القبلتين وثالث المساجد التي تُشدّ إليها الرحال، ومسرى النبي ﷺ. يشمل كل ما داخل سوره من مصليات وقباب وساحات ومصاطب." },
  { t: "قبة الصخرة المشرفة", d: "شيّدها الخليفة الأموي عبد الملك بن مروان، وفرغ منها نحو سنة 72هـ / 691م. أقدم أثر معماري إسلامي قائم، بقبتها الذهبية وبلاطها الأزرق." },
  { t: "المسجد القبلي", d: "المصلى الجامع في الجهة الجنوبية من المسجد الأقصى، بقبته الرصاصية، وهو موضع صلاة الجماعة الكبرى." },
  { t: "سور القدس وأبوابها", d: "أعاد بناءه السلطان العثماني سليمان القانوني بين عامي 1537 و1541م، ومن أشهر أبوابه باب العامود وباب الأسباط." },
];

export default function Quds() {
  return (
    <>
      <PageHero title="القدس" kicker="بوابة المعرفة المقدسية">
        نعرّف بالمسجد الأقصى المبارك والبلدة القديمة، ونغرس محبتها في نفوس المسلمين.
      </PageHero>

      <section id="history" className="mx-auto grid max-w-7xl scroll-mt-28 items-center gap-12 px-5 pt-14 lg:grid-cols-2">
        <div>
          <h2 className="font-kufi text-3xl font-bold text-teal-900 md:text-4xl">نبذة وتاريخ</h2>
          <OrnamentDivider className="my-5 h-5 w-56" />
          <p className="font-naskh text-2xl leading-[2] text-teal-900">
            ﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ﴾
          </p>
          <p className="mt-5 text-lg leading-9 text-ink/85">
            [يُضاف هنا محتوى «نبذة وتاريخ» من لوحة التحكم — هذا القسم فارغ حالياً في الموقع القديم ويعرض رسالة بالتركية.]
          </p>
        </div>
        <div className="arch overflow-hidden bg-night p-6 pt-10">
          <DomeOfTheRock className="w-full" />
        </div>
      </section>

      <section id="landmarks" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-20">
        <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900 md:text-4xl">معالم الأقصى</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {landmarks.map((l) => (
            <article key={l.t} className="flex gap-5 rounded-[24px] border border-stone-200 bg-white p-6">
              <Khatam className="mt-1 h-8 w-8 shrink-0" color="#c99a2e" />
              <div>
                <h3 className="font-kufi text-2xl font-bold text-teal-900">{l.t}</h3>
                <p className="mt-2 leading-8 text-muted">{l.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="articles" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-20">
        <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900 md:text-4xl">المكتبة المقدسية</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qudsLibrary.slice(2).map((l, i) => (
            <Link key={l.title} id={["books", "gallery", "videos"][i - 1]} href="#" className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 hover:border-teal-500">
              <span className="grid h-14 w-14 place-items-center rounded-t-full rounded-b-lg bg-teal-100 text-teal-700">{i > 1 ? <IconPlay size={26} /> : <IconBook size={26} />}</span>
              <span>
                <span className="block font-kufi text-xl font-bold text-teal-900">{l.title}</span>
                <span className="text-muted">{l.desc}</span>
              </span>
              <IconArrow size={20} className="ms-auto text-teal-500" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
