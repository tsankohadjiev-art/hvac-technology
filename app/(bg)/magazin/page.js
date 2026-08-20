import Link from "next/link";
import Logo from "@/components/Logo";
import { SnowflakeIcon, WavesIcon, ArrowRightIcon } from "@/components/Icons";

export const metadata = {
  title: "Онлайн магазин",
  description:
    "Онлайн магазин на Hvac Technology — продукти за климатизация и ОВК, както и за басейни и СПА.",
};

const zones = [
  {
    href: "/magazin/klimatizatsia",
    icon: SnowflakeIcon,
    theme: "climate",
    title: "Климатизация и ОВК",
    description: "Климатици, мулти-сплит системи, термопомпи, отопление и вентилация.",
    points: ["Климатици", "Термопомпи", "Отопление", "Вентилация"],
  },
  {
    href: "/magazin/baseyni-spa",
    icon: WavesIcon,
    theme: "aqua",
    title: "Басейни и СПА",
    description: "Филтрация, дезинфекция, осветление, покривала и уелнес оборудване.",
    points: ["Филтрация", "Дезинфекция", "СПА и уелнес", "Аксесоари"],
  },
];

export default function MagazinLandingPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <Logo className="h-12 w-auto text-white sm:h-14" />
        <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
          Онлайн магазин
        </span>
        <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Изберете направление
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
          Изберете едно от направленията, за да видите само продуктите от тази категория.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {zones.map((zone) => (
            <Link
              key={zone.href}
              href={zone.href}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/10"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                  zone.theme === "climate" ? "bg-climate/20 text-climate-light" : "bg-aqua/20 text-aqua-light"
                }`}
              >
                <zone.icon className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-white">{zone.title}</h2>
              <p className="mt-3 text-white/75">{zone.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {zone.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <span
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    zone.theme === "climate" ? "text-climate-light" : "text-aqua-light"
                  }`}
                >
                  Разгледай
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
