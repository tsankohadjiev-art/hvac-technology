import Link from "next/link";

export default function AgencyCta({
  title = "Готови да изградим нещо запомнящо се?",
  description = "Разкажете ни за проекта си — ще се свържем с вас в рамките на 1 работен ден с първоначални идеи и оценка.",
  ctaLabel = "Заявете безплатна консултация",
  ctaHref = "/agency-demo/kontakti",
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-700">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 lg:flex-row lg:items-center lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-white/80">{description}</p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-transform hover:scale-105"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
