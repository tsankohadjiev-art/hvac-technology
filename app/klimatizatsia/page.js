import Image from "next/image";
import PageHero from "@/components/PageHero";
import Logo from "@/components/Logo";
import ServiceGrid from "@/components/ServiceGrid";
import ProcessSteps from "@/components/ProcessSteps";
import CtaBanner from "@/components/CtaBanner";
import {
  SnowflakeIcon,
  FlameIcon,
  ThermometerIcon,
  RulerIcon,
  WrenchIcon,
  DropletIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@/components/Icons";

export const metadata = {
  title: "Климатизация и отопление | Hvac Technology",
  description:
    "Проектиране, доставка, монтаж и сервиз на климатични и отоплителни системи от Hvac Technology.",
};

const services = [
  {
    icon: SnowflakeIcon,
    title: "Климатизация",
    description:
      "Проектиране и монтаж на климатични системи за жилищни, търговски и промишлени обекти.",
  },
  {
    icon: FlameIcon,
    title: "Отопление",
    description:
      "Монтаж на отоплителни системи и котли за ефективно и сигурно отопление през студените месеци.",
  },
  {
    icon: ThermometerIcon,
    title: "Термопомпи",
    description:
      "Енергийно ефективни решения за отопление, охлаждане и топла вода целогодишно.",
  },
  {
    icon: RulerIcon,
    title: "Проектиране",
    description:
      "Индивидуални технически проекти, съобразени със спецификата на обекта и нуждите на клиента.",
  },
  {
    icon: WrenchIcon,
    title: "Поддръжка и сервиз",
    description:
      "Профилактика, диагностика и ремонт на вече инсталирани климатични и отоплителни системи.",
  },
];

const systemStats = [
  { value: "COP 5", label: "Ефективност" },
  { value: "55°C", label: "Гореща вода целогодишно" },
  { value: "0 CO₂", label: "Емисии" },
  { value: "4 в 1", label: "Решения в една система" },
];

const systemAdvantages = [
  {
    icon: SparklesIcon,
    title: "Разумна инвестиция",
    description: "Висока ефективност при оптимално съотношение цена — качество.",
  },
  {
    icon: ThermometerIcon,
    title: "Равномерен топлинен комфорт",
    description: "Подовото отопление затопля равномерно цялата стая.",
  },
  {
    icon: DropletIcon,
    title: "Гореща вода 55°C целогодишно",
    description: "БГВ бойлер, захранван директно от термопомпата.",
  },
  {
    icon: SnowflakeIcon,
    title: "Ефективно охлаждане",
    description: "Климатиците охлаждат по-ефективно от конвекторите през лятото.",
  },
  {
    icon: FlameIcon,
    title: "Бързо отопление в преходния сезон",
    description: "Климатиците затоплят помещението само за минути.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Екологична и без емисии",
    description: "Без изгаряне на газ или твърдо гориво — 0 емисии CO₂.",
  },
];

const galleryPhotos = [
  { src: "/images/klimatizatsia-real/klim-01.jpg", alt: "Външно тяло Mitsubishi Electric на балкон" },
  { src: "/images/klimatizatsia-real/klim-02.jpg", alt: "Вътрешно тяло Mitsubishi Electric над врата" },
  { src: "/images/klimatizatsia-real/klim-03.jpg", alt: "Вътрешно тяло Mitsubishi Electric" },
  { src: "/images/klimatizatsia-real/klim-04.jpg", alt: "Вътрешно тяло Mitsubishi Electric, черен модел" },
  { src: "/images/klimatizatsia-real/klim-05.jpg", alt: "Вътрешно тяло Daikin" },
  { src: "/images/klimatizatsia-real/klim-06.jpg", alt: "Монтаж на външно тяло на климатик" },
  { src: "/images/klimatizatsia-real/klim-07.jpg", alt: "Външно тяло Daikin на терасa" },
  { src: "/images/klimatizatsia-real/klim-08.jpg", alt: "Външно тяло Mitsubishi Electric на ъглов монтаж" },
  { src: "/images/klimatizatsia-real/klim-09.jpg", alt: "Две външни тела Mitsubishi Electric" },
  { src: "/images/klimatizatsia-real/klim-10.jpg", alt: "Монтиран котел Viessmann" },
  { src: "/images/klimatizatsia-real/klim-11.jpg", alt: "Табло за управление на котел Viessmann" },
  { src: "/images/klimatizatsia-real/klim-12.jpg", alt: "Сервизно обслужване на климатик" },
];

export default function KlimatizatsiaPage() {
  return (
    <>
      <PageHero
        theme="climate"
        title="Климатизация и отопление"
        description="Осигуряваме комфортен и здравословен микроклимат в дома и офиса — от проектиране и доставка на оборудване до монтаж и сервизно обслужване."
        logo={<Logo className="h-10 w-auto text-white" />}
      />

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
          <ProcessSteps theme="climate" />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Флагманско решение
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
              Пълна система за отопление и охлаждане
            </p>
            <p className="mt-4 text-slate">
              Термопомпа + Подово отопление + БГВ + Климатици — едно комплексно
              решение, което съчетава ефективност, комфорт и икономия през
              цялата година.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {systemStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="text-2xl font-bold text-climate-dark">{s.value}</div>
                <div className="mt-1 text-xs text-slate">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {systemAdvantages.map((a) => (
              <div key={a.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-climate/10 text-climate-dark">
                  <a.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate">
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            Нашите услуги
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            Пълен набор от инженерни решения
          </p>
        </div>
        <div className="mt-10">
          <ServiceGrid items={services} theme="climate" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
            Реализирани обекти
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
            От нашите монтажи
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-2xl bg-mist"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Нуждаете се от климатична или отоплителна система?"
        description="Свържете се с нас за оглед и безплатна оферта."
      />
    </>
  );
}
