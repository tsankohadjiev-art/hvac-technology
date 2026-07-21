import Link from "next/link";
import { ViberIcon, WhatsAppIcon } from "@/components/Icons";
import Logo from "@/components/Logo";

const FACEBOOK_CLIMATE = "https://www.facebook.com/hvac.technology.bulgaria/";
const FACEBOOK_POOL = "https://www.facebook.com/profile.php?id=61590323918867";
const VIBER_LINK = "viber://chat?number=%2B359873472443";
const WHATSAPP_LINK = "https://wa.me/359873472443";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo className="h-10 w-auto text-white" />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Комплексни решения за климатизация и отопление, както и за
            басейни, СПА и водни съоръжения — под един покрив.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Направления
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/klimatizatsia" className="transition-colors hover:text-white">
                Климатизация и отопление
              </Link>
            </li>
            <li>
              <Link href="/baseyni-spa" className="transition-colors hover:text-white">
                Басейни, СПА и водни съоръжения
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Компания
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/za-nas" className="transition-colors hover:text-white">
                За нас
              </Link>
            </li>
            <li>
              <Link href="/kontakti" className="transition-colors hover:text-white">
                Контакти
              </Link>
            </li>
            <li>
              <a
                href={FACEBOOK_CLIMATE}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Facebook — Климатизация
              </a>
            </li>
            <li>
              <a
                href={FACEBOOK_POOL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Facebook — Басейни и СПА
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Контакти
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="text-slate-400">инж. Ц. Хаджиев</li>
            <li>
              <a href="tel:+359873472443" className="transition-colors hover:text-white">
                +359 87 347 2443
              </a>
            </li>
            <li>
              <a
                href="mailto:hvact.mh@gmail.com"
                className="transition-colors hover:text-white"
              >
                hvact.mh@gmail.com
              </a>
            </li>
            <li className="text-slate-400">гр. София, кв. Витоша, ул. Андрей Бадев 1</li>
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
          &copy; {year} Hvac Technology. Всички права запазени.
        </div>
      </div>
    </footer>
  );
}
