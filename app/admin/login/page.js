"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { LockIcon } from "@/components/Icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Четем стойността директно от формата (а не от React state), за да работи
    // коректно и когато паролата е попълнена от автоматично попълване на браузъра.
    const password = new FormData(e.currentTarget).get("password") || "";

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
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
            <input
              type="password"
              name="password"
              autoFocus
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
              placeholder="••••••••"
            />
          </label>

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
