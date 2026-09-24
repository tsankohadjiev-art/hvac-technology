import AgencyCta from "@/components/agency/AgencyCta";
import { TargetIcon, SparklesIcon, LayersIcon, CheckIcon } from "@/components/agency/AgencyIcons";

export const metadata = {
  title: "За нас",
  description: "LUMORA — екип от стратези, дизайнери и разработчици, обединени около една цел.",
};

const VALUES = [
  {
    icon: TargetIcon,
    title: "Фокус върху резултата",
    description: "Всяко решение има измерима цел — растеж, конверсии или ефективност.",
  },
  {
    icon: SparklesIcon,
    title: "Внимание към детайла",
    description: "Малките неща изграждат доверие — затова не пропускаме нищо.",
  },
  {
    icon: LayersIcon,
    title: "Прозрачност",
    description: "Ясна комуникация на всеки етап — знаете какво се случва и защо.",
  },
];

const TEAM = [
  { name: "Мария Колева", role: "Основател и Creative Director" },
  { name: "Стефан Иванов", role: "Lead Product Designer" },
  { name: "Никол Тодорова", role: "Frontend Engineer" },
  { name: "Явор Симеонов", role: "Backend Engineer" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-950 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            За нас
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Екип, който превръща идеите в продукти
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            LUMORA е основана през 2018 г. от малка група дизайнери и разработчици, които вярват,
            че добрият дигитален продукт е равнопоставено съчетание на стратегия, естетика и
            технология. Днес сме екип от 18 души, работещи с клиенти в цяла Европа.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Мисия
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight text-white">
              Помагаме на бизнеси да растат чрез добре обмислен дизайн и технология
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              Не вярваме в шаблонни решения. Всеки проект започва с въпроса &ldquo;какъв проблем
              решаваме&rdquo; — едва тогава преминаваме към дизайн и код.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Стратегия, базирана на данни", "Дизайн, ориентиран към потребителя", "Код, който издържа във времето", "Дългосрочно партньорство"].map(
              (item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
                  <p className="text-sm text-slate-300">{item}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Ценности
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-white">Как работим</p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Екипът
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">Хората зад LUMORA</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-bold text-white">
                {member.name.charAt(0)}
              </div>
              <h3 className="mt-4 font-semibold text-white">{member.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <AgencyCta />
    </>
  );
}
