import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsExplorer from "@/components/ProjectsExplorer";

export const metadata: Metadata = { title: "مشاريعنا" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero title="مشاريعنا" kicker="تبرّع لما يلامس قلبك">
        مشاريع في القدس والأقصى وغزة: إطعام، وسقيا، وتعليم، وحلقات قرآن، وترميم، وزكاة. اختر المشروع وتابع أثر عطائك.
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 pt-14">
        <Suspense>
          <ProjectsExplorer />
        </Suspense>
      </section>
    </>
  );
}
