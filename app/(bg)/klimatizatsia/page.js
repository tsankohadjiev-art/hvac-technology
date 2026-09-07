import Image from "next/image";
import PageHero from "@/components/PageHero";
import Logo from "@/components/Logo";
import ServiceGrid from "@/components/ServiceGrid";
import ProcessSteps from "@/components/ProcessSteps";
import CtaBanner from "@/components/CtaBanner";
import { readSettings } from "@/lib/settingsStore";
import { resolveIcon } from "@/lib/icons";

export const metadata = {
  title: "Климатизация и отопление",
  description:
    "Проектиране, доставка, монтаж и сервиз на климатични и отоплителни системи от Hvac Technology.",
};

export default async function KlimatizatsiaPage() {
  const settings = await readSettings();
  const page = settings.pages.klimatizatsia;
  const t = page.bg;

  const services = page.services.map((s) => ({
    icon: resolveIcon(s.icon),
    title: s.title.bg,
    description: s.description.bg,
  }));
  const advantages = page.advantages.map((a) => ({
    icon: resolveIcon(a.icon),
    title: a.title.bg,
    description: a.description.bg,
  }));

  return (
    <>
      <PageHero
        theme="climate"
        title={t.heroTitle}
        description={t.heroDescription}
        logo={<Logo className="h-10 w-auto text-white" />}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            {t.howWorkEyebrow}
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{t.howWorkTitle}</p>
        </div>
        <div className="mt-10">
          <ProcessSteps theme="climate" />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              {t.flagshipEyebrow}
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{t.flagshipTitle}</p>
            <p className="mt-4 text-slate">{t.flagshipDescription}</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {page.stats.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="text-2xl font-bold text-climate-dark">{s.value.bg}</div>
                <div className="mt-1 text-xs text-slate">{s.label.bg}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-climate/10 text-climate-dark">
                  <a.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            {t.servicesEyebrow}
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{t.servicesTitle}</p>
        </div>
        <div className="mt-10">
          <ServiceGrid items={services} theme="climate" />
        </div>
      </section>

      {page.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              {t.galleryEyebrow}
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{t.galleryTitle}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {page.gallery.map((photo, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden rounded-2xl bg-mist"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt?.bg || ""}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBanner title={t.ctaTitle} description={t.ctaDescription} />
    </>
  );
}
