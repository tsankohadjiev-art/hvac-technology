"use client";

import { useState } from "react";

export default function AgencyContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-violet-500/30 bg-violet-500/10 p-8 text-center">
        <p className="text-lg font-semibold text-white">Благодарим ви!</p>
        <p className="mt-2 text-sm text-slate-400">
          Това е демонстрационна форма — в реален сайт съобщението ви щеше да бъде изпратено към
          екипа ни.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300">
            Име
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
            placeholder="Вашето име"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Имейл
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300">
          Съобщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
          placeholder="Разкажете ни накратко за проекта си..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-opacity hover:opacity-90"
      >
        Изпратете съобщение
      </button>
      <p className="text-xs text-slate-500">
        Демонстрационна форма — не изпраща реални данни.
      </p>
    </form>
  );
}
