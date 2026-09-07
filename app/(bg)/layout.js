import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Страниците тук четат съдържание от админ панела (Vercel Blob). ISR
// (revalidate) не засича надеждно новите Blob версии в тази Next.js
// версия — както при магазина (виж productStore.js/force-dynamic по
// същата причина), затова рендерираме динамично на всяка заявка, за да
// промените от "Настройки на сайта" излизат веднага, не до минута по-късно.
export const dynamic = "force-dynamic";

export default function BgLayout({ children }) {
  return (
    <>
      <Header lang="bg" />
      <main className="flex-1">{children}</main>
      <Footer lang="bg" />
    </>
  );
}
