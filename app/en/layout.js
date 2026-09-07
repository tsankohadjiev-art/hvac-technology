import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SetHtmlLang from "@/components/SetHtmlLang";

// Позволява промените от админ панела (Настройки на сайта) да излязат
// на живо в рамките на минута, без да е нужен нов deploy.
export const revalidate = 60;

export const metadata = {
  title: {
    default: "Hvac Technology — Air Conditioning & Heating · Pools & Spa",
    template: "%s | Hvac Technology",
  },
  description:
    "Hvac Technology offers complete solutions in two directions: air conditioning and heating, as well as pools, spa and water facilities in Sofia, Bulgaria.",
  alternates: {
    canonical: "https://hvactechnology.bg/en",
    languages: {
      "bg-BG": "https://hvactechnology.bg",
      "en-US": "https://hvactechnology.bg/en",
    },
  },
  openGraph: {
    locale: "en_US",
  },
};

export default function EnLayout({ children }) {
  return (
    <>
      <SetHtmlLang lang="en" />
      <Header lang="en" />
      <main className="flex-1">{children}</main>
      <Footer lang="en" />
    </>
  );
}
