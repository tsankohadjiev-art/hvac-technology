import PageHero from "@/components/PageHero";
import CtaBanner from "@/components/CtaBanner";
import {
  SnowflakeIcon,
  WavesIcon,
  ShieldCheckIcon,
  UsersIcon,
  ClockIcon,
  WrenchIcon,
} from "@/components/Icons";

export const metadata = {
  title: "About Us",
  description:
    "Hvac Technology brings together two divisions — air conditioning and heating, and pools, spa and water facilities.",
  alternates: {
    canonical: "https://hvactechnology.bg/en/za-nas",
    languages: {
      "bg-BG": "https://hvactechnology.bg/za-nas",
      "en-US": "https://hvactechnology.bg/en/za-nas",
    },
  },
};

const values = [
  {
    icon: UsersIcon,
    title: "A Team of Specialists",
    description:
      "Engineers and technicians experienced in designing and executing installations and facilities.",
  },
  {
    icon: WrenchIcon,
    title: "A Complete Approach",
    description:
      "From the initial consultation, through design and installation, to service and maintenance.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Quality & Warranty",
    description: "We work with proven equipment brands and stand behind our work.",
  },
  {
    icon: ClockIcon,
    title: "Long-Term Partnership",
    description:
      "We build trust through reliability, meeting deadlines, and caring for the client even after the project is complete.",
  },
];

export default function ZaNasPageEn() {
  return (
    <>
      <PageHero
        theme="navy"
        eyebrow="Hvac Technology"
        title="One name, two divisions, a shared commitment to quality"
        description="Hvac Technology is a company built around two complementary teams of specialists — one in air conditioning and heating, and another in the construction of pools, spas and water facilities."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Mission
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight text-ink">
              Comfort and quality in every project
            </p>
            <p className="mt-4 leading-relaxed text-slate">
              We believe that a good microclimate and quality water facilities
              have a direct impact on the comfort of a home or business. That
              is why we approach every project individually — from a small
              air conditioning installation to the complete construction of a
              spa area.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-climate/10 text-climate-dark">
                <SnowflakeIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">
                Air Conditioning & Heating
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Solutions for maintaining a healthy and comfortable climate all year round.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aqua/10 text-aqua-dark">
                <WavesIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">
                Pools, Spa & Water Facilities
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Building spaces for relaxation, sport and leisure around water.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Our Values
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
              What sets us apart
            </p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        ctaLabel="Contact us"
        ctaHref="/en/kontakti"
        title="Ready to get started?"
        description="Contact us for a free consultation and a quote tailored to your needs."
      />
    </>
  );
}
