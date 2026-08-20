"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import { CartIcon } from "@/components/Icons";

const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || "http://localhost:3001";
const SHOP_LABEL = { bg: "Онлайн магазин", en: "Online Shop" };

const NAV_LINKS = {
  bg: [
    { href: "/", label: "Начало" },
    { href: "/klimatizatsia", label: "Климатизация" },
    { href: "/baseyni-spa", label: "Басейни и СПА" },
    { href: "/za-nas", label: "За нас" },
    { href: "/kontakti", label: "Контакти" },
  ],
  en: [
    { href: "/en", label: "Home" },
    { href: "/en/klimatizatsia", label: "Air Conditioning" },
    { href: "/en/baseyni-spa", label: "Pools & Spa" },
    { href: "/en/za-nas", label: "About" },
    { href: "/en/kontakti", label: "Contact" },
  ],
};

const CTA_LABEL = { bg: "Свържете се с нас", en: "Contact us" };
const CTA_HREF = { bg: "/kontakti", en: "/en/kontakti" };
const MENU_LABEL = { bg: "Отвори меню", en: "Open menu" };

function otherLangHref(pathname, currentLang) {
  if (currentLang === "en") {
    const rest = pathname.replace(/^\/en/, "");
    return rest === "" ? "/" : rest;
  }
  return pathname === "/" ? "/en" : `/en${pathname}`;
}

function LanguageSwitcher({ lang, pathname }) {
  const [open, setOpen] = useState(false);
  const otherHref = otherLangHref(pathname, lang);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-climate hover:text-climate-dark"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {lang === "bg" ? "БГ" : "EN"}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <Link
            href={lang === "bg" ? pathname : otherHref}
            className={`block px-4 py-2.5 text-sm ${lang === "bg" ? "bg-mist font-semibold text-ink" : "text-ink hover:bg-mist"}`}
          >
            Български
          </Link>
          <Link
            href={lang === "en" ? pathname : otherHref}
            className={`block px-4 py-2.5 text-sm ${lang === "en" ? "bg-mist font-semibold text-ink" : "text-ink hover:bg-mist"}`}
          >
            English
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Header({ lang = "bg" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = NAV_LINKS[lang];
  const homeHref = lang === "en" ? "/en" : "/";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href={homeHref} className="flex items-center" onClick={() => setOpen(false)}>
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

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher lang={lang} pathname={pathname} />
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-climate to-aqua px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            <CartIcon className="h-4 w-4" />
            {SHOP_LABEL[lang]}
          </a>
          <Link
            href={CTA_HREF[lang]}
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
          >
            {CTA_LABEL[lang]}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SHOP_LABEL[lang]}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-climate to-aqua text-white shadow-sm"
          >
            <CartIcon className="h-4 w-4" />
          </a>
          <LanguageSwitcher lang={lang} pathname={pathname} />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200"
            aria-label={MENU_LABEL[lang]}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mb-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-climate to-aqua px-3 py-2.5 text-sm font-semibold text-white"
            >
              <CartIcon className="h-4 w-4" />
              {SHOP_LABEL[lang]}
            </a>
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
              href={CTA_HREF[lang]}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-navy px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              {CTA_LABEL[lang]}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
