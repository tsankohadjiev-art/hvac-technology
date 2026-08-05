import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import Logo from "@/components/Logo";
import {
  ArrowRightIcon,
  SnowflakeIcon,
  WavesIcon,
  ShieldCheckIcon,
  UsersIcon,
  ClockIcon,
  WrenchIcon,
} from "@/components/Icons";

const directions = [
  {
    href: "/en/klimatizatsia",
    icon: SnowflakeIcon,
    theme: "climate",
    title: "Air Conditioning & Heating",
    description:
      "Design, supply and installation of air conditioning and heating systems for homes and businesses.",
    points: ["Air Conditioning", "Heating", "Heat Pumps"],
  },
  {
    href: "/en/baseyni-spa",
    icon: WavesIcon,
    theme: "aqua",
    title: "Pools, Spa & Water Facilities",
    description:
      "Construction and maintenance of pools, spa centers and water attractions with attention to every detail.",
    points: ["Pools", "Spa & Jacuzzis", "Water Purification"],
  },
];

const advantages = [
  {
    icon: UsersIcon,
    title: "Experience & Professionalism",
    description: "A team of engineers and technicians with years of industry experience.",
  },
  {
    icon: WrenchIcon,
    title: "Complete Solutions",
    description: "From design and installation to service and maintenance — all in one place.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Warranty & Reliability",
    description: "We work with proven equipment and stand behind the services we provide.",
  },
  {
    icon: ClockIcon,
    title: "Individual Approach",
    description: "Every project gets a solution tailored to the client's specific needs.",
  },
];

export default function HomeEn() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <Logo className="h-14 w-auto text-white sm:h-16" />
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Complete solutions in two directions towards integrated engineering
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-white/70">
            (Integrated Building Systems Engineering)
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Hvac Technology combines expertise in air conditioning and heating
            with the construction of pools, spas and water facilities —
            quality and reliability under one name.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/en/klimatizatsia"
              className="inline-flex items-center gap-2 rounded-full bg-climate px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-climate-dark"
            >
              Air Conditioning & Heating
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/en/baseyni-spa"
              className="inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-aqua-dark"
            >
              Pools, Spa & Water Facilities
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            Our Services
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            One name, two areas of expertise
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {directions.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                  d.theme === "climate" ? "bg-climate/10 text-climate-dark" : "bg-aqua/10 text-aqua-dark"
                }`}
              >
                <d.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-ink">{d.title}</h3>
              <p className="mt-3 text-slate">{d.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {d.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-slate"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <span
                className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${
                  d.theme === "climate" ? "text-climate-dark" : "text-aqua-dark"
                }`}
              >
                Learn more
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Why Choose Us
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
              A partner you can rely on
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => (
              <div key={a.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-semibold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to get started?"
        description="Contact us for a free consultation and a quote tailored to your needs."
        ctaLabel="Contact us"
        ctaHref="/en/kontakti"
      />
    </>
  );
}
