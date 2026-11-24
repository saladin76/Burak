import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.projectsPage.title);

export default async function ProjectsPage({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  return (
    <>
      <PageHero lang={lang} title={t.projectsPage.title} kicker={t.projectsPage.kicker}>{t.projectsPage.text}</PageHero>

      <section className="mx-auto max-w-7xl px-5 pt-10">
        <Suspense>
          <ProjectsExplorer />
        </Suspense>
      </section>
    </>
  );
}
