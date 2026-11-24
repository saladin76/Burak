import PageHero from "@/components/PageHero";
import VideoCard from "@/components/VideoCard";
import SmartImg from "@/components/SmartImg";
import { IconYoutube } from "@/components/Icons";
import { contact, news, projects, videos } from "@/lib/data";
import { tx } from "@/lib/i18n";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.media.title);

export default async function Media({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  const M = t.media;
  const photos = [...projects.filter((p) => p.image).map((p) => ({ src: p.image!, alt: tx(p.title, lang) })), ...news.map((n) => ({ src: n.image, alt: tx(n.title, lang) }))];
  return (
    <>
      <PageHero lang={lang} title={M.title} kicker={M.kicker}>{M.text}</PageHero>

      <section className="mx-auto max-w-7xl px-5 pt-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-kufi text-3xl font-bold text-teal-900">{M.field}</h2>
          <a href={`https://www.youtube.com/@${contact.handles[lang]}`} className="flex h-11 items-center gap-2 rounded-full border border-teal-900/20 px-5 font-bold text-teal-900 hover:bg-teal-50">
            <IconYoutube size={20} /> {M.youtube}
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {videos.filter((v) => v.group === "field").map((v) => <VideoCard key={v.id} id={v.id} title={v.title} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-16">
        <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900">{M.school}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {videos.filter((v) => v.group === "school").map((v) => <VideoCard key={v.id} id={v.id} title={v.title} />)}
        </div>
      </section>

      <section id="photos" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-16">
        <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900">{M.photos}</h2>
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {photos.map((p, i) => (
            <figure key={p.src} className={`relative overflow-hidden rounded-2xl bg-teal-700 ${i % 3 === 0 ? "h-72" : "h-52"}`}>
              <div className="pattern-khatam absolute inset-0 opacity-40" />
              <SmartImg src={p.src} alt={p.alt} className="absolute inset-0 h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent p-3 text-sm font-semibold text-white">{p.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
