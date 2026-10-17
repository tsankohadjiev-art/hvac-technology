import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://hvactechnology.bg";
const SITE_TITLE = "Hvac Technology — Климатизация и отопление · Басейни и СПА";
const SITE_DESCRIPTION =
  "Hvac Technology предлага комплексни решения в две направления: климатизация и отопление, както и басейни, СПА и водни съоръжения в София и страната.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Hvac Technology",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "климатизация София",
    "отопление София",
    "монтаж на климатици",
    "термопомпи",
    "изграждане на басейни",
    "СПА съоръжения",
    "поддръжка на басейни",
    "Hvac Technology",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      "bg-BG": SITE_URL,
      "en-US": `${SITE_URL}/en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: SITE_URL,
    siteName: "Hvac Technology",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bg"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
