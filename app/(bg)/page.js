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
    href: "/klimatizatsia",
    icon: SnowflakeIcon,
    theme: "climate",
    title: "Климатизация и отопление",
    description:
      "Проектиране, доставка и монтаж на климатични и отоплителни системи за дома и бизнеса.",
    points: ["Климатизация", "Отопление", "Термопомпи"],
  },
  {
    href: "/baseyni-spa",
    icon: WavesIcon,
    theme: "aqua",
    title: "Басейни, СПА и водни съоръжения",
    description:
      "Изграждане и поддръжка на басейни, СПА центрове и водни атракции с внимание към всеки детайл.",
    points: ["Басейни", "СПА и джакузи", "Пречистване на вода"],
  },
];

const advantages = [
  {
    icon: UsersIcon,
    title: "Опит и професионализъм",
    description: "Екип от инженери и техници с дългогодишен опит в бранша.",
  },
  {
    icon: WrenchIcon,
    title: "Комплексни решения",
    description: "От проектиране и монтаж до сервиз и поддръжка — всичко на едно място.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Гаранция и надеждност",
    description: "Работим с доказано оборудване и даваме гаранция на извършените услуги.",
  },
  {
    icon: ClockIcon,
    title: "Индивидуален подход",
    description: "Всеки проект получава решение, съобразено с конкретните нужди на клиента.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <Logo className="h-14 w-auto text-white sm:h-16" />
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Комплексни решения в две направления за постигане на интегрирано
            инженерство
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-white/70">
            (Integrated Building Systems Engineering)
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Hvac Technology обединява експертиза в климатизацията и
            отоплението с изграждането на басейни, СПА и водни съоръжения —
            качество и надеждност под едно име.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/klimatizatsia"
              className="inline-flex items-center gap-2 rounded-full bg-climate px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-climate-dark"
            >
              Климатизация и отопление
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/baseyni-spa"
              className="inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-aqua-dark"
            >
              Басейни, СПА и водни съоръжения
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            Нашите направления
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Едно име, две експертизи
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
                Научете повече
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
              Защо да изберете нас
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
              Партньор, на когото можете да разчитате
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

      <CtaBanner />
    </>
  );
}
