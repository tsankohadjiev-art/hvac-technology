import Image from "next/image";
import PageHero from "@/components/PageHero";
import Logo from "@/components/Logo";
import ServiceGrid from "@/components/ServiceGrid";
import ProcessSteps from "@/components/ProcessSteps";
import CtaBanner from "@/components/CtaBanner";
import {
  SnowflakeIcon,
  FlameIcon,
  ThermometerIcon,
  RulerIcon,
  WrenchIcon,
  DropletIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@/components/Icons";

export const metadata = {
  title: "Air Conditioning & Heating",
  description:
    "Design, supply, installation and service of air conditioning and heating systems by Hvac Technology.",
  alternates: {
    canonical: "https://hvactechnology.bg/en/klimatizatsia",
    languages: {
      "bg-BG": "https://hvactechnology.bg/klimatizatsia",
      "en-US": "https://hvactechnology.bg/en/klimatizatsia",
    },
  },
};

const services = [
  {
    icon: SnowflakeIcon,
    title: "Air Conditioning",
    description:
      "Design and installation of air conditioning systems for residential, commercial and industrial sites.",
  },
  {
    icon: FlameIcon,
    title: "Heating",
    description:
      "Installation of heating systems and boilers for efficient, reliable heating through the cold months.",
  },
  {
    icon: ThermometerIcon,
    title: "Heat Pumps",
    description:
      "Energy-efficient solutions for heating, cooling and hot water all year round.",
  },
  {
    icon: RulerIcon,
    title: "Design",
    description:
      "Individual technical projects tailored to the specifics of the site and the client's needs.",
  },
  {
    icon: WrenchIcon,
    title: "Maintenance & Service",
    description:
      "Prevention, diagnostics and repair of already installed air conditioning and heating systems.",
  },
];

const systemStats = [
  { value: "COP 5", label: "Efficiency" },
  { value: "55°C", label: "Hot water year-round" },
  { value: "0 CO₂", label: "Emissions" },
  { value: "4-in-1", label: "Solutions in one system" },
];

const systemAdvantages = [
  {
    icon: SparklesIcon,
    title: "A Smart Investment",
    description: "High efficiency at an optimal price-to-quality ratio.",
  },
  {
    icon: ThermometerIcon,
    title: "Even Thermal Comfort",
    description: "Underfloor heating warms the entire room evenly.",
  },
  {
    icon: DropletIcon,
    title: "Hot Water at 55°C Year-Round",
    description: "A DHW boiler powered directly by the heat pump.",
  },
  {
    icon: SnowflakeIcon,
    title: "Efficient Cooling",
    description: "Air conditioners cool more efficiently than convectors in summer.",
  },
  {
    icon: FlameIcon,
    title: "Fast Heating in the Transitional Season",
    description: "Air conditioners warm the room in just minutes.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Eco-Friendly & Emission-Free",
    description: "No gas or solid fuel combustion — 0 CO₂ emissions.",
  },
];

const galleryPhotos = [
  { src: "/images/klimatizatsia-real/klim-01.jpg", alt: "Mitsubishi Electric outdoor unit on a balcony" },
  { src: "/images/klimatizatsia-real/klim-02.jpg", alt: "Mitsubishi Electric indoor unit above a door" },
  { src: "/images/klimatizatsia-real/klim-03.jpg", alt: "Mitsubishi Electric indoor unit" },
  { src: "/images/klimatizatsia-real/klim-04.jpg", alt: "Mitsubishi Electric indoor unit, black model" },
  { src: "/images/klimatizatsia-real/klim-05.jpg", alt: "Daikin indoor unit" },
  { src: "/images/klimatizatsia-real/klim-06.jpg", alt: "Installation of an outdoor AC unit" },
  { src: "/images/klimatizatsia-real/klim-07.jpg", alt: "Daikin outdoor unit on a terrace" },
  { src: "/images/klimatizatsia-real/klim-08.jpg", alt: "Mitsubishi Electric outdoor unit, corner mount" },
  { src: "/images/klimatizatsia-real/klim-09.jpg", alt: "Two Mitsubishi Electric outdoor units" },
  { src: "/images/klimatizatsia-real/klim-10.jpg", alt: "Installed Viessmann boiler" },
  { src: "/images/klimatizatsia-real/klim-11.jpg", alt: "Viessmann boiler control panel" },
  { src: "/images/klimatizatsia-real/klim-12.jpg", alt: "AC service and maintenance" },
];

export default function KlimatizatsiaPageEn() {
  return (
    <>
      <PageHero
        theme="climate"
        title="Air Conditioning & Heating"
        description="We provide a comfortable and healthy microclimate at home and in the office — from design and equipment supply to installation and service."
        logo={<Logo className="h-10 w-auto text-white" />}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            How We Work
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Project stages
          </p>
        </div>
        <div className="mt-10">
          <ProcessSteps theme="climate" lang="en" />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Flagship Solution
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
              A complete heating and cooling system
            </p>
            <p className="mt-4 text-slate">
              Heat pump + Underfloor heating + DHW + Air conditioners — one
              comprehensive solution combining efficiency, comfort and savings
              all year round.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {systemStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="text-2xl font-bold text-climate-dark">{s.value}</div>
                <div className="mt-1 text-xs text-slate">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {systemAdvantages.map((a) => (
              <div key={a.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-climate/10 text-climate-dark">
                  <a.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate">
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            Our Services
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            A full range of engineering solutions
          </p>
        </div>
        <div className="mt-10">
          <ServiceGrid items={services} theme="climate" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            Completed Projects
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            From our installations
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-2xl bg-mist"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Need an air conditioning or heating system?"
        description="Contact us for a site visit and a free quote."
        ctaLabel="Contact us"
        ctaHref="/en/kontakti"
      />
    </>
  );
}
