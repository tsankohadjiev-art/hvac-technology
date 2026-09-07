import Image from "next/image";
import PageHero from "@/components/PageHero";
import ServiceGrid from "@/components/ServiceGrid";
import ProcessSteps from "@/components/ProcessSteps";
import CtaBanner from "@/components/CtaBanner";
import { readSettings } from "@/lib/settingsStore";
import { resolveIcon } from "@/lib/icons";

export const metadata = {
  title: "Басейни, СПА и водни съоръжения",
  description:
    "Проектиране, изграждане и поддръжка на басейни, СПА центрове и водни съоръжения от Hvac Technology.",
};

export default async function BaseyniSpaPage() {
  const settings = await readSettings();
  const page = settings.pages.baseyniSpa;
  const t = page.bg;

  const services = page.services.map((s) => ({
    icon: resolveIcon(s.icon),
    title: s.title.bg,
    description: s.description.bg,
  }));

  return (
    <>
      <PageHero
        theme="aqua"
        title={t.heroTitle}
        description={t.heroDescription}
        logo={
          <span className="flex items-center gap-2.5">
            <Image
              src="/icon-blue.png"
              alt=""
              width={38}
              height={38}
              priority
              className="h-9 w-9"
            />
            <span className="text-xl font-extrabold tracking-tight text-white">
              H TECHNOLOGY
            </span>
          </span>
        }
      />

      <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-mist sm:aspect-[21/9]">
          <Image
            src={page.showcaseImage}
            alt="Изграден инфинити басейн от Hvac Technology"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
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
          <ServiceGrid items={services} theme="aqua" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            {t.howWorkEyebrow}
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{t.howWorkTitle}</p>
        </div>
        <div className="mt-10">
          <ProcessSteps theme="aqua" />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              {t.auditEyebrow}
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{t.auditTitle}</p>
            <p className="mt-4 text-slate">{t.auditDescription}</p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={page.auditImage}
              alt="Технически одит на водни съоръжения — филтрационна инсталация"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
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
