import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import QuickDonate from "@/components/QuickDonate";
import ProjectCard, { ProjectCover, Progress } from "@/components/ProjectCard";
import { IconBank, IconGift, IconRepeat, IconShield } from "@/components/Icons";
import { OrnamentDivider } from "@/components/Motifs";
import { getProject, kindLabel, projects, regionLabel } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const related = projects.filter((x) => x.slug !== p.slug && (x.region === p.region || x.kind === p.kind)).slice(0, 3);

  return (
    <>
      <PageHero title={p.title} kicker={`${regionLabel[p.region]} · ${kindLabel[p.kind]}`} crumbs={[{ href: "/projects", label: "مشاريعنا" }]}>
        {p.summary}
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-12 lg:grid-cols-[1fr_440px]">
        <div>
          <div className="overflow-hidden rounded-[28px] border border-stone-200">
            <ProjectCover p={p} tall />
          </div>
          <div className="mt-8 rounded-[24px] border border-stone-200 bg-white p-6 md:p-8">
            <Progress p={p} />
            <h2 className="font-kufi text-2xl font-bold text-teal-900">عن المشروع</h2>
            <p className="mt-4 text-lg leading-9 text-ink/85">{p.summary}</p>
            <p className="mt-4 text-lg leading-9 text-ink/85">
              [يُضاف هنا الوصف الكامل للمشروع من لوحة التحكم: الاحتياج، وآلية التنفيذ، والفئة المستفيدة، وصور التوثيق.]
            </p>
            <OrnamentDivider className="my-8 h-5 w-56" />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: <IconShield size={24} />, t: "تبرع آمن", d: "دفع مشفّر عبر بوابات معتمدة" },
                { icon: <IconRepeat size={24} />, t: p.monthly ? "تبرع شهري متاح" : "تبرع لمرة واحدة", d: "اختر ما يناسبك" },
                { icon: <IconGift size={24} />, t: "أهدِ تبرعك", d: "بطاقة إهداء باسم من تحب" },
              ].map((f) => (
                <div key={f.t} className="rounded-2xl bg-stone-100 p-4">
                  <span className="text-teal-700">{f.icon}</span>
                  <p className="mt-2 font-bold text-teal-900">{f.t}</p>
                  <p className="text-sm text-muted">{f.d}</p>
                </div>
              ))}
            </div>
            <Link href="/contact#bank" className="mt-6 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900">
              <IconBank size={20} /> تفضّل التحويل البنكي؟ اطّلع على حساباتنا
            </Link>
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Suspense>
            <QuickDonate initial={p} lockProject />
          </Suspense>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pt-20">
          <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900">مشاريع قد تهمّك</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ProjectCard key={r.slug} p={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
