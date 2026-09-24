import Link from "next/link";
import AgencyCta from "@/components/agency/AgencyCta";
import {
  ArrowRightIcon,
  TargetIcon,
  PenToolIcon,
  CodeIcon,
  SparklesIcon,
  CompassIcon,
  LayersIcon,
  RocketIcon,
} from "@/components/agency/AgencyIcons";

const STATS = [
  { value: "120+", label: "Реализирани проекта" },
  { value: "8", label: "Години опит" },
  { value: "40+", label: "Активни клиенти" },
  { value: "98%", label: "Доволни клиенти" },
];

const SERVICES = [
  {
    icon: TargetIcon,
    title: "Дигитална стратегия",
    description: "Анализ, позициониране и пътна карта за растеж в дигиталната среда.",
  },
  {
    icon: PenToolIcon,
    title: "UI/UX Дизайн",
    description: "Продуктов дизайн, който е едновременно красив и лесен за използване.",
  },
  {
    icon: CodeIcon,
    title: "Уеб и мобилни приложения",
    description: "Бързи, стабилни приложения — от прототип до продукт в продукция.",
  },
  {
    icon: SparklesIcon,
    title: "Брандинг",
    description: "Визуална идентичност, която прави марката ви разпознаваема.",
  },
];

const PROCESS = [
  { icon: CompassIcon, title: "Откриване", description: "Разбираме бизнеса, целите и аудиторията ви." },
  { icon: PenToolIcon, title: "Проектиране", description: "Изграждаме концепция, wireframes и дизайн." },
  { icon: LayersIcon, title: "Разработка", description: "Пишем чист, поддържан код и тестваме внимателно." },
  { icon: RocketIcon, title: "Старт", description: "Пускаме продукта на живо и следим резултатите." },
];

const WORK_PREVIEW = [
  {
    title: "Finoro — Финтех платформа",
    category: "Уеб приложение",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    title: "Verde — Онлайн магазин",
    category: "Е-commerce",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Northwind — Ребрандинг",
    category: "Брандинг",
    gradient: "from-amber-500 to-orange-600",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "LUMORA разбраха продукта ни от първия разговор. Резултатът надмина очакванията ни, а комуникацията беше на много високо ниво.",
    author: "Ивана Петрова",
    role: "Основател, Finoro",
  },
  {
    quote:
      "Екипът достави сложен проект в срок и бюджет. Дизайнът е чист, а кодът — лесен за поддръжка от нашия вътрешен екип.",
    author: "Георги Динев",
    role: "CTO, Verde",
  },
];

export default function AgencyHome() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-300">
            Дигитално студио · Демо сайт
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Изграждаме дигитални продукти, които открояват бизнеса ви
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Стратегия, дизайн и разработка на едно място — помагаме на амбициозни компании да
            превърнат идеите си в продукти, на които потребителите се доверяват.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/agency-demo/kontakti"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-opacity hover:opacity-90"
            >
              Заявете оферта
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/agency-demo/proekti"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Разгледайте проектите
            </Link>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4 lg:px-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-white sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Какво правим
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            Услуги, обхващащи целия дигитален път
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-violet-500/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-400">
                Избрани проекти
              </h2>
              <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                Работа, с която се гордеем
              </p>
            </div>
            <Link
              href="/agency-demo/proekti"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300"
            >
              Всички проекти
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {WORK_PREVIEW.map((p) => (
              <Link
                key={p.title}
                href="/agency-demo/proekti"
                className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
              >
                <div className={`h-44 bg-gradient-to-br ${p.gradient}`} />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                    {p.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{p.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 group-hover:text-white">
                    Виж проекта
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Как работим
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            Прост процес, ясни резултати
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                <step.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-semibold text-violet-400">
                Стъпка {i + 1}
              </p>
              <h3 className="mt-1 font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Отзиви
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-white">
              Какво казват клиентите ни
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="rounded-3xl border border-white/10 bg-slate-900 p-8">
                <p className="text-lg leading-relaxed text-slate-300">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AgencyCta />
    </>
  );
}
