const SITE_URL = "https://hvactechnology.bg";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Hvac Technology",
  url: SITE_URL,
  telephone: "+359893472443",
  email: "office@hvactechnology.eu",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Андрей Бадев 1, кв. Витоша",
    addressLocality: "София",
    addressCountry: "BG",
  },
  areaServed: "BG",
  sameAs: [
    "https://www.facebook.com/hvac.technology.bulgaria/",
    "https://www.facebook.com/profile.php?id=61590323918867",
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Климатизация и отопление" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Басейни, СПА и водни съоръжения" } },
  ],
};

export default function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
    />
  );
}
