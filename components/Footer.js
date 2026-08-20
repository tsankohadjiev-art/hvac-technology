import Link from "next/link";
import { ViberIcon, WhatsAppIcon } from "@/components/Icons";
import Logo from "@/components/Logo";

const FACEBOOK_CLIMATE = "https://www.facebook.com/hvac.technology.bulgaria/";
const FACEBOOK_POOL = "https://www.facebook.com/profile.php?id=61590323918867";
const VIBER_LINK = "viber://chat?number=%2B359893472443";
const WHATSAPP_LINK = "https://wa.me/359893472443";

const TEXT = {
  bg: {
    tagline:
      "Комплексни решения за климатизация и отопление, както и за басейни, СПА и водни съоръжения — под един покрив.",
    directionsHeading: "Направления",
    climate: "Климатизация и отопление",
    pools: "Басейни, СПА и водни съоръжения",
    companyHeading: "Компания",
    about: "За нас",
    contact: "Контакти",
    fbClimate: "Facebook — Климатизация",
    fbPool: "Facebook — Басейни и СПА",
    contactHeading: "Контакти",
    engineer: "инж. Ц. Хаджиев",
    address: "гр. София, кв. Витоша, ул. Андрей Бадев 1",
    rights: "Всички права запазени.",
    home: "/",
    climateHref: "/klimatizatsia",
    poolsHref: "/baseyni-spa",
    aboutHref: "/za-nas",
    contactHref: "/kontakti",
  },
  en: {
    tagline:
      "Complete solutions for air conditioning and heating, as well as pools, spas and water facilities — under one roof.",
    directionsHeading: "Services",
    climate: "Air Conditioning & Heating",
    pools: "Pools, Spa & Water Facilities",
    companyHeading: "Company",
    about: "About",
    contact: "Contact",
    fbClimate: "Facebook — Climate",
    fbPool: "Facebook — Pools & Spa",
    contactHeading: "Contact",
    engineer: "Eng. Ts. Hadzhiev",
    address: "Sofia, Vitosha, Andrey Badev St. 1, Bulgaria",
    rights: "All rights reserved.",
    home: "/en",
    climateHref: "/en/klimatizatsia",
    poolsHref: "/en/baseyni-spa",
    aboutHref: "/en/za-nas",
    contactHref: "/en/kontakti",
  },
};

export default function Footer({ lang = "bg" }) {
  const year = new Date().getFullYear();
  const t = TEXT[lang];

  return (
    <footer className="bg-navy-dark text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo className="h-10 w-auto text-white" />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{t.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t.directionsHeading}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href={t.climateHref} className="transition-colors hover:text-white">
                {t.climate}
              </Link>
            </li>
            <li>
              <Link href={t.poolsHref} className="transition-colors hover:text-white">
                {t.pools}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t.companyHeading}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href={t.aboutHref} className="transition-colors hover:text-white">
                {t.about}
              </Link>
            </li>
            <li>
              <Link href={t.contactHref} className="transition-colors hover:text-white">
                {t.contact}
              </Link>
            </li>
            <li>
              <a
                href={FACEBOOK_CLIMATE}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {t.fbClimate}
              </a>
            </li>
            <li>
              <a
                href={FACEBOOK_POOL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {t.fbPool}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t.contactHeading}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="text-slate-400">{t.engineer}</li>
            <li>
              <a href="tel:+359893472443" className="transition-colors hover:text-white">
                +359 89 347 2443
              </a>
            </li>
            <li>
              <a
                href="mailto:office@hvactechnology.eu"
                className="transition-colors hover:text-white"
              >
                office@hvactechnology.eu
              </a>
            </li>
            <li className="text-slate-400">{t.address}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href={VIBER_LINK}
              aria-label="Viber"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 hover:text-white"
            >
              <ViberIcon className="h-4 w-4" />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-slate-500 lg:px-8">
          <p>&copy; {year} Hvac Technology. {t.rights}</p>
          <Link href="/admin" className="mt-1 inline-block hover:text-slate-300">
            Админ
          </Link>
        </div>
      </div>
    </footer>
  );
}
