import AgencyContactForm from "@/components/agency/AgencyContactForm";

export const metadata = {
  title: "Контакти",
  description: "Свържете се с LUMORA за консултация по вашия дигитален проект.",
};

export default function ContactPage() {
  return (
    <section className="bg-slate-950 py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-widest text-violet-400">
          Контакти
        </span>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Да поговорим за проекта ви
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
          Попълнете формата или се свържете директно — обикновено отговаряме в рамките на 1
          работен ден.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <AgencyContactForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Телефон
              </h2>
              <a href="tel:+35921234567" className="mt-2 block text-lg font-semibold text-white">
                +359 2 123 4567
              </a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Имейл
              </h2>
              <a href="mailto:hello@lumora.demo" className="mt-2 block text-lg font-semibold text-white">
                hello@lumora.demo
              </a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Офис
              </h2>
              <p className="mt-2 text-lg font-semibold text-white">гр. София, ул. Дигитална 12</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
