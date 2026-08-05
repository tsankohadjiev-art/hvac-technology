import { ClipboardIcon, RulerIcon, WrenchIcon, ShieldCheckIcon } from "@/components/Icons";

const STEPS = {
  bg: [
    {
      icon: ClipboardIcon,
      title: "Консултация",
      description: "Безплатен оглед и разговор за нуждите и бюджета на проекта.",
    },
    {
      icon: RulerIcon,
      title: "Проектиране",
      description: "Изготвяне на индивидуален технически проект, съобразен с обекта.",
    },
    {
      icon: WrenchIcon,
      title: "Изграждане",
      description: "Доставка на оборудване и професионален монтаж от нашия екип.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Сервиз и поддръжка",
      description: "Гаранционно и извънгаранционно обслужване през целия експлоатационен живот.",
    },
  ],
  en: [
    {
      icon: ClipboardIcon,
      title: "Consultation",
      description: "A free site visit and discussion of your needs and budget.",
    },
    {
      icon: RulerIcon,
      title: "Design",
      description: "Preparation of an individual technical project tailored to the site.",
    },
    {
      icon: WrenchIcon,
      title: "Installation",
      description: "Equipment delivery and professional installation by our team.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Service & Support",
      description: "Warranty and out-of-warranty service throughout the entire service life.",
    },
  ],
};

const STEP_LABEL = { bg: "Стъпка", en: "Step" };

const themeStyles = {
  climate: "bg-climate/10 text-climate-dark",
  aqua: "bg-aqua/10 text-aqua-dark",
};

const lineStyles = {
  climate: "bg-climate/30",
  aqua: "bg-aqua/30",
};

export default function ProcessSteps({ theme = "climate", lang = "bg" }) {
  const steps = STEPS[lang];
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, idx) => (
        <div key={step.title} className="relative">
          {idx < steps.length - 1 && (
            <div
              className={`absolute top-6 left-1/2 hidden h-0.5 w-full lg:block ${lineStyles[theme]}`}
            />
          )}
          <div className="relative flex flex-col items-start gap-4">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${themeStyles[theme]}`}
            >
              <step.icon className="h-6 w-6" />
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate">
                {STEP_LABEL[lang]} {idx + 1}
              </span>
              <h3 className="mt-1 font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
