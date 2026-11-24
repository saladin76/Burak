import Link from "next/link";
export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="num text-7xl font-bold text-accent-500">404</p>
      <h1 className="mt-4 font-kufi text-3xl font-bold text-teal-900">الصفحة غير موجودة · Sayfa bulunamadı · Page not found</h1>
      <Link href="/ar" className="mt-8 inline-flex h-12 items-center rounded-full bg-teal-900 px-6 font-bold text-white">الرئيسية · Home</Link>
    </section>
  );
}
