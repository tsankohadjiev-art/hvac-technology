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
  title: "Басейни, СПА и водни съоръжения | Hvac Technology",
  description:
    "Проектиране, изграждане и поддръжка на басейни, СПА центрове и водни съоръжения от Hvac Technology.",
};

const services = [
  {
    icon: WavesIcon,
    title: "Изграждане на басейни",
    description:
      "Проектиране и строителство на басейни за дома, хотели и обществени обекти.",
  },
  {
    icon: SparklesIcon,
    title: "СПА и уелнес центрове",
    description:
      "Комплексно оборудване на СПА зони за релакс, възстановяване и уелнес преживяване.",
  },
  {
    icon: DropletIcon,
    title: "Джакузи и хидромасажни вани",
    description: "Доставка и монтаж на джакузита и хидромасажни вани за дома и бизнеса.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Пречистване на вода",
    description:
      "Системи за филтрация и дезинфекция, гарантиращи чиста и безопасна вода.",
  },
  {
    icon: RulerIcon,
    title: "Проектиране и облицовка",
    description:
      "Индивидуални проекти и качествена облицовка, съобразени с визията на обекта.",
  },
  {
    icon: WrenchIcon,
    title: "Поддръжка и сервиз",
    description:
      "Редовно обслужване и сервиз на басейни, СПА съоръжения и водна техника.",
  },
];

export default function BaseyniSpaPage() {
  return (
    <>
      <PageHero
        theme="aqua"
        title="Басейни, СПА и водни съоръжения"
        description="Integrated Building Systems Engineering — проектираме и изграждаме, разглеждайки обекта като една екосистема. Именно този интегриран подход се използва при проектирането на съвременни СПА комплекси, басейни, аквапаркове, лечебни и уелнес центрове от най-висок клас. Двете работещи заедно направления на Hvac Technology позволяват изготвянето на правилна концепция, направа на безупречен проект, безпроблемно изпълнение и дългосрочна експлоатация в полза на инвеститори и клиенти."
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
            alt="Изграден инфинити басейн от Hvac Technology"
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
            Нашите услуги
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Водни съоръжения с внимание към детайла
          </p>
        </div>
        <div className="mt-10">
          <ServiceGrid items={services} theme="aqua" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            Как работим
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Етапи на изграждане на проекта
          </p>
        </div>
        <div className="mt-10">
          <ProcessSteps theme="aqua" />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Партньорство
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
              Технически одит на водни съоръжения
            </p>
            <p className="mt-4 text-slate">
              Нашият екип изготвя пълен детайлен анализ на съоръжението и
              оценка на работата на всички системи – филтрация, дезинфекция,
              циркулация, отопление, автоматизация и енергийна ефективност.
            </p>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src="/images/baseyni-spa/pool-filtration-room.jpg"
              alt="Технически одит на водни съоръжения — филтрационна инсталация"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Планирате басейн или СПА зона?"
        description="Свържете се с нас за консултация и индивидуална оферта."
      />
    </>
  );
}
