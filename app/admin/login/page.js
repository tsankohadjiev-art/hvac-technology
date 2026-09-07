"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import { LockIcon, EyeIcon, EyeOffIcon } from "@/components/Icons";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Четем стойността директно от формата (а не от React state), за да работи
    // коректно и когато паролата е попълнена от автоматично попълване на браузъра.
    // Отрязваме крайни интервали/нов ред — чест проблем при копиране на паролата.
    const password = (new FormData(e.currentTarget).get("password") || "").trim();

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Пълно (не клиентско/soft) навигиране към /admin — гарантира, че
        // браузърът прави истинска заявка към сървъра с вече записаната
        // бисквитка, вместо да презареди евентуално кеширана "неавторизирана"
        // версия на страницата от клиентския router cache.
        window.location.href = "/admin";
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.error || "Грешна парола.");
    } catch {
      setError("Няма връзка със сървъра. Опитайте отново.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light px-6 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <Logo className="h-10 w-auto text-navy" />
          <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
            <LockIcon className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-ink">Вход в админ панела</h1>
          <p className="mt-1.5 text-sm text-slate">Достъпно само с администраторска парола.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
          <label className="text-sm font-medium text-ink">
            Парола
            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoFocus
                autoComplete="current-password"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                onKeyUp={(e) => setCapsLockOn(e.getModifierState?.("CapsLock") ?? false)}
                onKeyDown={(e) => setCapsLockOn(e.getModifierState?.("CapsLock") ?? false)}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 pr-10 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-slate hover:text-ink"
                aria-label={showPassword ? "Скрий паролата" : "Покажи паролата"}
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </label>

          {capsLockOn && (
            <p className="text-xs font-medium text-amber-600">
              Внимание: Caps Lock е включен.
            </p>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Проверка..." : "Вход"}
          </button>
        </form>
      </div>
    </div>
  );
}
