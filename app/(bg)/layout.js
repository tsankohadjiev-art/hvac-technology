import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BgLayout({ children }) {
  return (
    <>
      <Header lang="bg" />
      <main className="flex-1">{children}</main>
      <Footer lang="bg" />
    </>
  );
}
