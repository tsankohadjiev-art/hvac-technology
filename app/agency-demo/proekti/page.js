import AgencyCta from "@/components/agency/AgencyCta";
import TiltCard from "@/components/agency/TiltCard";

export const metadata = {
  title: "Проекти",
  description: "Избрани проекти на LUMORA — уеб приложения, е-commerce и брандинг.",
};

const PROJECTS = [
  {
    title: "Finoro — Финтех платформа",
    category: "Уеб приложение",
    description: "Панел за управление на лични финанси с анализ на разходите в реално време.",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    title: "Verde — Онлайн магазин",
    category: "Е-commerce",
    description: "Пълен редизайн и разработка на магазин за устойчиви продукти за дома.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Northwind — Ребрандинг",
    category: "Брандинг",
    description: "Нова визуална идентичност за логистична компания с присъствие в 6 държави.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Pulse — Фитнес приложение",
    category: "Мобилно приложение",
    description: "Приложение за проследяване на тренировки с над 50 000 активни потребители.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    title: "Atlas — Корпоративен сайт",
    category: "Уеб дизайн",
    description: "Корпоративен сайт с фокус върху историите на клиентите и case studies.",
    gradient: "from-sky-500 to-cyan-600",
  },
  {
    title: "Orbit — SaaS платформа",
    category: "Продуктов дизайн",
    description: "Дизайн система и интерфейс за B2B SaaS платформа за управление на проекти.",
    gradient: "from-fuchsia-500 to-purple-600",
  },
];

export default function WorkPage() {
  return (
    <>
      <section className="bg-slate-950 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Проекти
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Избрана работа
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Примерни проекти за целите на това демо — илюстрират типа работа, стил и обхват на
            услугите ни.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <TiltCard key={p.title}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
                <div className={`h-44 bg-gradient-to-br ${p.gradient}`} />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                    {p.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.description}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <AgencyCta
        title="Харесва ли ви това, което виждате?"
        description="Нека обсъдим как можем да постигнем подобни резултати за вашия бизнес."
      />
    </>
  );
}
