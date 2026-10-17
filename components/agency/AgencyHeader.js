"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AgencyLogo from "@/components/agency/AgencyLogo";

const NAV_LINKS = [
  { href: "/agency-demo", label: "Начало" },
  { href: "/agency-demo/za-nas", label: "За нас" },
  { href: "/agency-demo/uslugi", label: "Услуги" },
  { href: "/agency-demo/proekti", label: "Проекти" },
  { href: "/agency-demo/kontakti", label: "Контакти" },
];

export default function AgencyHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <AgencyLogo onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Link
            href="/agency-demo/kontakti"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-opacity hover:opacity-90"
          >
            Заявете проект
          </Link>
        </div>

        <button
          type="button"
          className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          aria-label={open ? "Затвори меню" : "Отвори меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>
    </header>

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-in drawer panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs transform border-l border-white/10 bg-slate-950 transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <nav className="flex h-full flex-col gap-1 px-6 pb-8 pt-24">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`rounded-lg px-3 py-3 text-base font-medium text-slate-300 transition-all duration-300 hover:bg-white/5 hover:text-white ${
                open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/agency-demo/kontakti"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Заявете проект
          </Link>
        </nav>
      </div>
    </>
  );
}
