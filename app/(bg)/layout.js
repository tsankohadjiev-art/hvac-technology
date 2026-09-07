import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Позволява промените от админ панела (Настройки на сайта) да излязат
// на живо в рамките на минута, без да е нужен нов deploy.
export const revalidate = 60;

export default function BgLayout({ children }) {
  return (
    <>
      <Header lang="bg" />
      <main className="flex-1">{children}</main>
      <Footer lang="bg" />
    </>
  );
}
