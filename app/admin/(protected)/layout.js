import Link from "next/link";
import Logo from "@/components/Logo";
import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "Админ панел",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cloud">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo className="h-8 w-auto text-navy" />
            <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate">
              Админ панел
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-slate hover:text-ink">
              Към магазина
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
