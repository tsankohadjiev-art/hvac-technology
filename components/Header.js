"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/klimatizatsia", label: "Климатизация" },
  { href: "/baseyni-spa", label: "Басейни и СПА" },
  { href: "/za-nas", label: "За нас" },
  { href: "/kontakti", label: "Контакти" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo className="h-10 w-auto text-climate sm:h-11" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink transition-colors hover:text-climate"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/kontakti"
          className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light lg:inline-block"
        >
          Свържете се с нас
        </Link>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 lg:hidden"
          aria-label="Отвори меню"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Меню</span>
          <div className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-mist"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakti"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-navy px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Свържете се с нас
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
