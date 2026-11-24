export default function Faq({ title, items }: { title: string; items: readonly { q: string; a: string }[] }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h2 className="text-center font-kufi text-3xl font-extrabold text-teal-900">{title}</h2>
      <div className="mt-8 grid gap-3">
        {items.map((x) => (
          <details key={x.q} className="group rounded-xl border border-stone-200 bg-white p-5 open:border-accent-400">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-teal-900">
              {x.q}
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-stone-100 text-accent-600 transition group-open:rotate-45 group-open:bg-accent-500 group-open:text-white" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 leading-8 text-muted">{x.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
