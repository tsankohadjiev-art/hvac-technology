import Image from "next/image";
import PageHero from "@/components/PageHero";
import ServiceGrid from "@/components/ServiceGrid";
import ProcessSteps from "@/components/ProcessSteps";
import CtaBanner from "@/components/CtaBanner";
import {
  WavesIcon,
  SparklesIcon,
  DropletIcon,
  ShieldCheckIcon,
  RulerIcon,
  WrenchIcon,
} from "@/components/Icons";

export const metadata = {
  title: "Pools, Spa & Water Facilities",
  description:
    "Design, construction and maintenance of pools, spa centers and water facilities by Hvac Technology.",
  alternates: {
    canonical: "https://hvactechnology.bg/en/baseyni-spa",
    languages: {
      "bg-BG": "https://hvactechnology.bg/baseyni-spa",
      "en-US": "https://hvactechnology.bg/en/baseyni-spa",
    },
  },
};

const services = [
  {
    icon: WavesIcon,
    title: "Pool Construction",
    description:
      "Design and construction of pools for homes, hotels and public facilities.",
  },
  {
    icon: SparklesIcon,
    title: "Spa & Wellness Centers",
    description:
      "Complete equipping of spa areas for relaxation, recovery and a wellness experience.",
  },
  {
    icon: DropletIcon,
    title: "Jacuzzis & Hot Tubs",
    description: "Supply and installation of jacuzzis and hot tubs for home and business.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Water Purification",
    description:
      "Filtration and disinfection systems that guarantee clean and safe water.",
  },
  {
    icon: RulerIcon,
    title: "Design & Tiling",
    description:
      "Individual projects and quality tiling, tailored to the vision of the site.",
  },
  {
    icon: WrenchIcon,
    title: "Maintenance & Service",
    description:
      "Regular servicing and maintenance of pools, spa facilities and water equipment.",
  },
];

export default function BaseyniSpaPageEn() {
  return (
    <>
      <PageHero
        theme="aqua"
        title="Pools, Spa & Water Facilities"
        description="Integrated Building Systems Engineering — we design and build by treating the site as one ecosystem. This is the integrated approach used in designing modern spa complexes, pools, water parks, and top-class wellness centers. The two divisions of Hvac Technology working together enable a sound concept, a flawless project, smooth execution and long-term operation for the benefit of investors and clients."
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
            src="/images/baseyni-spa-real/pool-01.jpg"
            alt="Infinity pool built by Hvac Technology"
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
            Our Services
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Water facilities with attention to detail
          </p>
        </div>
        <div className="mt-10">
          <ServiceGrid items={services} theme="aqua" />
        </div>
      </section>

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
          <ProcessSteps theme="aqua" lang="en" />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Partnership
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
              Technical Audit of Water Facilities
            </p>
            <p className="mt-4 text-slate">
              Our team prepares a full, detailed analysis of the facility and
              an assessment of all systems — filtration, disinfection,
              circulation, heating, automation and energy efficiency.
            </p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src="/images/baseyni-spa/pool-filtration-room.jpg"
              alt="Technical audit of water facilities — filtration installation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Planning a pool or spa area?"
        description="Contact us for a consultation and an individual quote."
        ctaLabel="Contact us"
        ctaHref="/en/kontakti"
      />
    </>
  );
}
