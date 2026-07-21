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
  title: "За нас | Hvac Technology",
  description:
    "Hvac Technology обединява две направления — климатизация и отопление, и басейни, СПА и водни съоръжения.",
};

const values = [
  {
    icon: UsersIcon,
    title: "Екип от специалисти",
    description:
      "Инженери и техници с опит в проектирането и изпълнението на инсталации и съоръжения.",
  },
  {
    icon: WrenchIcon,
    title: "Комплексен подход",
    description:
      "От първоначалната консултация, през проектиране и монтаж, до сервиз и поддръжка.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Качество и гаранция",
    description: "Работим с доказани марки оборудване и стоим зад извършената работа.",
  },
  {
    icon: ClockIcon,
    title: "Дългосрочно партньорство",
    description:
      "Изграждаме доверие чрез коректност, срокове и грижа за клиента и след приключване на проекта.",
  },
];

export default function ZaNasPage() {
  return (
    <>
      <PageHero
        theme="navy"
        eyebrow="Hvac Technology"
        title="Едно име, две направления, общ стремеж към качество"
        description="Hvac Technology е компания, изградена около два взаимно допълващи се екипа от специалисти — един в областта на климатизацията и отоплението, и друг в изграждането на басейни, СПА и водни съоръжения."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Мисия
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight text-ink">
              Комфорт и качество във всеки проект
            </p>
            <p className="mt-4 leading-relaxed text-slate">
              Вярваме, че добрият микроклимат и качествените водни съоръжения имат
              пряко значение за комфорта на дома и бизнеса. Затова подхождаме към
              всеки проект индивидуално — от малка климатична инсталация до
              цялостно изграждане на СПА зона.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-climate/10 text-climate-dark">
                <SnowflakeIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">
                Климатизация и отопление
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Решения за поддържане на здравословен и комфортен климат целогодишно.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aqua/10 text-aqua-dark">
                <WavesIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">
                Басейни, СПА и водни съоръжения
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Изграждане на пространства за релакс, спорт и отдих около водата.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Нашите ценности
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
              Какво ни отличава
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

      <CtaBanner />
    </>
  );
}
