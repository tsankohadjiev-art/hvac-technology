"use client";

import { useState } from "react";

const CONTACT_EMAIL = "hvact.mh@gmail.com";

const directionOptions = [
  { value: "klimatizatsia", label: "Климатизация и отопление" },
  { value: "baseyni-spa", label: "Басейни, СПА и водни съоръжения" },
  { value: "other", label: "Друго запитване" },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    direction: directionOptions[0].value,
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const directionLabel =
      directionOptions.find((o) => o.value === form.direction)?.label ?? "";

    const subject = `Запитване от сайта — ${directionLabel}`;
    const body = [
      `Име: ${form.name}`,
      `Телефон: ${form.phone}`,
      `Имейл: ${form.email}`,
      `Направление: ${directionLabel}`,
      "",
      form.message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-ink">
          Име
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            placeholder="Вашето име"
          />
        </label>
        <label className="text-sm font-medium text-ink">
          Телефон
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            placeholder="+359 87 ..."
          />
        </label>
      </div>

      <label className="text-sm font-medium text-ink">
        Имейл
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
          placeholder="you@example.com"
        />
      </label>

      <label className="text-sm font-medium text-ink">
        Направление
        <select
          name="direction"
          value={form.direction}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
        >
          {directionOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm font-medium text-ink">
        Съобщение
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
          placeholder="Разкажете ни накратко за вашия проект..."
        />
      </label>

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light sm:w-auto"
      >
        Изпрати запитване
      </button>
    </form>
  );
}
