import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import { readSettings } from "@/lib/settingsStore";
import { resolveIcon } from "@/lib/icons";

export const metadata = {
  title: "За нас",
  description:
    "Hvac Technology обединява две направления — климатизация и отопление, и басейни, СПА и водни съоръжения.",
};

export default async function ZaNasPage() {
  const settings = await readSettings();
  const page = settings.pages.zaNas;
  const t = page.bg;

  const directions = page.directions.map((d) => ({
    icon: resolveIcon(d.icon),
    title: d.title.bg,
    description: d.description.bg,
  }));
  const values = page.values.map((v) => ({
    icon: resolveIcon(v.icon),
    title: v.title.bg,
    description: v.description.bg,
  }));

  return (
    <>
      <PageHero
        theme="navy"
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        description={t.heroDescription}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              {t.missionEyebrow}
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight text-ink">{t.missionTitle}</p>
            <p className="mt-4 leading-relaxed text-slate">{t.missionDescription}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {directions.map((d, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    idx === 0 ? "bg-climate/10 text-climate-dark" : "bg-aqua/10 text-aqua-dark"
                  }`}
                >
                  <d.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              {t.valuesEyebrow}
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{t.valuesTitle}</p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, idx) => (
              <div key={idx}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
