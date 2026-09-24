import AgencyCta from "@/components/agency/AgencyCta";
import {
  TargetIcon,
  PenToolIcon,
  CodeIcon,
  SparklesIcon,
  CheckIcon,
} from "@/components/agency/AgencyIcons";

export const metadata = {
  title: "Услуги",
  description: "Дигитална стратегия, UI/UX дизайн, уеб и мобилна разработка, брандинг.",
};

const SERVICES = [
  {
    icon: TargetIcon,
    title: "Дигитална стратегия",
    description:
      "Преди да проектираме или пишем код, разбираме бизнеса, пазара и потребителите ви. Изграждаме пътна карта с ясни приоритети.",
    items: ["Проучване на пазара и конкуренцията", "Дефиниране на цели и метрики", "Продуктова пътна карта"],
  },
  {
    icon: PenToolIcon,
    title: "UI/UX Дизайн",
    description:
      "Проектираме интерфейси, които са едновременно визуално силни и лесни за използване, базирани на реални потребителски нужди.",
    items: ["Wireframes и прототипи", "Дизайн система", "Потребителско тестване"],
  },
  {
    icon: CodeIcon,
    title: "Уеб и мобилни приложения",
    description:
      "Разработваме бързи, сигурни и лесни за поддръжка приложения — от малки маркетингови сайтове до сложни платформи.",
    items: ["Уеб приложения и сайтове", "Мобилни приложения (iOS/Android)", "Интеграции и API"],
  },
  {
    icon: SparklesIcon,
    title: "Брандинг",
    description:
      "Изграждаме визуална идентичност, която комуникира ценностите на марката и я прави разпознаваема навсякъде.",
    items: ["Лого и визуална идентичност", "Насоки за марката (brand guidelines)", "Маркетингови материали"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-slate-950 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Услуги
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Всичко, от което се нуждае дигиталният ви продукт
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Работим като разширение на екипа ви — от първата идея до продукт, който реално се
            използва от клиентите ви.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                <s.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-white">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-400">{s.description}</p>
              <ul className="mt-5 space-y-2.5">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <AgencyCta />
    </>
  );
}
