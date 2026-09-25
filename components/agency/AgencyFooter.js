import Link from "next/link";
import AgencyLogo from "@/components/agency/AgencyLogo";

const SERVICE_LINKS = [
  { href: "/agency-demo/uslugi", label: "Дигитална стратегия" },
  { href: "/agency-demo/uslugi", label: "UI/UX дизайн" },
  { href: "/agency-demo/uslugi", label: "Уеб и мобилни приложения" },
  { href: "/agency-demo/uslugi", label: "Брандинг" },
];

const COMPANY_LINKS = [
  { href: "/agency-demo/za-nas", label: "За нас" },
  { href: "/agency-demo/proekti", label: "Проекти" },
  { href: "/agency-demo/kontakti", label: "Контакти" },
];

export default function AgencyFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <AgencyLogo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            Дигитално студио за стратегия, дизайн и разработка — помагаме на бизнеси да
            изглеждат и работят на ниво.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Услуги</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICE_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Компания</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Контакти</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href="tel:+35921234567" className="transition-colors hover:text-white">
                +359 2 123 4567
              </a>
            </li>
            <li>
              <a href="mailto:hello@lumora.demo" className="transition-colors hover:text-white">
                hello@lumora.demo
              </a>
            </li>
            <li className="text-slate-500">гр. София, ул. Дигитална 12</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>&copy; {year} LUMORA. Демонстрационен сайт — примерно съдържание.</p>
          <p>Изработено с Next.js</p>
        </div>
      </div>
    </footer>
  );
}
