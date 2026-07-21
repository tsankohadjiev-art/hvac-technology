import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export default function CtaBanner({
  title = "Готови ли сте да започнем?",
  description = "Свържете се с нас за безплатна консултация и оферта, съобразена с вашите нужди.",
  ctaLabel = "Свържете се с нас",
  ctaHref = "/kontakti",
}) {
  return (
    <section className="bg-navy-dark">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 lg:flex-row lg:items-center lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-white/70">{description}</p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-mist"
        >
          {ctaLabel}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
