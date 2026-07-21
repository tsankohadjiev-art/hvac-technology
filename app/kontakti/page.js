import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import {
  PhoneIcon,
  MailIcon,
  UsersIcon,
  MapPinIcon,
  FacebookIcon,
  ViberIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export const metadata = {
  title: "Контакти | Hvac Technology",
  description:
    "Свържете се с Hvac Technology за климатизация, отопление, басейни, СПА и водни съоръжения.",
};

const FACEBOOK_CLIMATE = "https://www.facebook.com/hvac.technology.bulgaria/";
const FACEBOOK_POOL = "https://www.facebook.com/profile.php?id=61590323918867";
const VIBER_LINK = "viber://chat?number=%2B359873472443";
const WHATSAPP_LINK = "https://wa.me/359873472443";
const PHONE_LINK = "tel:+359873472443";
const MAIL_LINK = "mailto:hvact.mh@gmail.com";
const MAP_QUERY = "гр. София, кв. Витоша, ул. Андрей Бадев 1";
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&z=15&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  MAP_QUERY
)}`;

const contactItems = [
  { icon: UsersIcon, label: "инж. Ц. Хаджиев", href: null },
  { icon: PhoneIcon, label: "+359 87 347 2443", href: PHONE_LINK },
  {
    icon: MailIcon,
    label: "hvact.mh@gmail.com",
    href: MAIL_LINK,
  },
  { icon: MapPinIcon, label: "гр. София, кв. Витоша, ул. Андрей Бадев 1", href: MAP_LINK },
];

const quickContacts = [
  {
    icon: PhoneIcon,
    label: "Обадете се",
    href: PHONE_LINK,
    className: "hover:border-climate hover:text-climate-dark",
  },
  {
    icon: ViberIcon,
    label: "Viber",
    href: VIBER_LINK,
    className: "hover:border-[#7360F2] hover:text-[#7360F2]",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    href: WHATSAPP_LINK,
    className: "hover:border-[#25D366] hover:text-[#1DA851]",
    external: true,
  },
  {
    icon: MailIcon,
    label: "Имейл",
    href: MAIL_LINK,
    className: "hover:border-climate hover:text-climate-dark",
  },
];

export default function KontaktiPage() {
  return (
    <>
      <PageHero
        theme="navy"
        eyebrow="Hvac Technology"
        title="Свържете се с нас"
        description="Пишете ни за консултация, оглед или оферта — независимо дали въпросът е за климатизация, отопление, басейн или СПА."
      />

      <section className="mx-auto max-w-7xl px-6 pt-14 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickContacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className={`flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center text-sm font-medium text-ink transition-colors ${c.className}`}
            >
              <c.icon className="h-6 w-6" />
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-ink">Изпратете запитване</h2>
            <p className="mt-2 text-slate">
              Попълнете формата и ще се свържем с вас възможно най-скоро.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-ink">Данни за контакт</h2>
            <ul className="mt-6 space-y-5">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/10 text-navy">
                    <item.icon className="h-5 w-5" />
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.icon === MapPinIcon ? "_blank" : undefined}
                      rel={item.icon === MapPinIcon ? "noopener noreferrer" : undefined}
                      className="mt-2 text-sm font-medium text-ink hover:text-climate"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="mt-2 text-sm font-medium text-ink">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-widest text-slate">
              Последвайте ни
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={FACEBOOK_CLIMATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-climate hover:text-climate-dark"
                >
                  <FacebookIcon className="h-5 w-5" />
                  Facebook — Климатизация
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_POOL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-aqua hover:text-aqua-dark"
                >
                  <FacebookIcon className="h-5 w-5" />
                  Facebook — Басейни и СПА
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate">
              Локация
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">
              Намерете ни на картата
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Hvac Technology — местоположение"
              src={MAP_EMBED_SRC}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block"
            />
          </div>
        </div>
      </section>
    </>
  );
}
