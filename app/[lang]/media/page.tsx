import PageHero from "@/components/PageHero";
import VideoCard from "@/components/VideoCard";
import PhotoSlider from "@/components/PhotoSlider";
import { IconYoutube } from "@/components/Icons";
import { contact, fieldPhotos, videos } from "@/lib/data";
import { metaTitle, pageLang, type LangParams } from "@/lib/page";

export const generateMetadata = ({ params }: LangParams) => metaTitle(params, (t) => t.media.title);

export default async function Media({ params }: LangParams) {
  const { lang, t } = await pageLang(params);
  const M = t.media;
  return (
    <>
      <PageHero lang={lang} title={M.title} kicker={M.kicker}>{M.text}</PageHero>

      <section id="photos" className="mx-auto max-w-7xl scroll-mt-28 px-5 pt-14">
        <h2 className="mb-8 font-kufi text-3xl font-bold text-teal-900">{M.photos}</h2>
        <PhotoSlider photos={fieldPhotos} alt={M.photos} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-kufi text-3xl font-bold text-teal-900">{M.field}</h2>
          <a href={`https://www.youtube.com/@${contact.handles[lang]}`} className="flex h-11 items-center gap-2 rounded-lg border border-teal-900/20 px-5 font-bold text-teal-900 hover:bg-teal-50">
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

    </>
  );
}
