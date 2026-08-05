"use client";

import { useState } from "react";

const CONTACT_EMAIL = "hvact.mh@gmail.com";

const TEXT = {
  bg: {
    directionOptions: [
      { value: "klimatizatsia", label: "Климатизация и отопление" },
      { value: "baseyni-spa", label: "Басейни, СПА и водни съоръжения" },
      { value: "other", label: "Друго запитване" },
    ],
    name: "Име",
    namePlaceholder: "Вашето име",
    phone: "Телефон",
    phonePlaceholder: "+359 89 ...",
    email: "Имейл",
    direction: "Направление",
    message: "Съобщение",
    messagePlaceholder: "Разкажете ни накратко за вашия проект...",
    submit: "Изпрати запитване",
    subjectPrefix: "Запитване от сайта",
    fieldName: "Име",
    fieldPhone: "Телефон",
    fieldEmail: "Имейл",
    fieldDirection: "Направление",
  },
  en: {
    directionOptions: [
      { value: "klimatizatsia", label: "Air Conditioning & Heating" },
      { value: "baseyni-spa", label: "Pools, Spa & Water Facilities" },
      { value: "other", label: "Other inquiry" },
    ],
    name: "Name",
    namePlaceholder: "Your name",
    phone: "Phone",
    phonePlaceholder: "+359 89 ...",
    email: "Email",
    direction: "Service",
    message: "Message",
    messagePlaceholder: "Tell us briefly about your project...",
    submit: "Send inquiry",
    subjectPrefix: "Website inquiry",
    fieldName: "Name",
    fieldPhone: "Phone",
    fieldEmail: "Email",
    fieldDirection: "Service",
  },
};

export default function ContactForm({ lang = "bg" }) {
  const t = TEXT[lang];
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    direction: t.directionOptions[0].value,
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const directionLabel =
      t.directionOptions.find((o) => o.value === form.direction)?.label ?? "";

    const subject = `${t.subjectPrefix} — ${directionLabel}`;
    const body = [
      `${t.fieldName}: ${form.name}`,
      `${t.fieldPhone}: ${form.phone}`,
      `${t.fieldEmail}: ${form.email}`,
      `${t.fieldDirection}: ${directionLabel}`,
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
          {t.name}
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            placeholder={t.namePlaceholder}
          />
        </label>
        <label className="text-sm font-medium text-ink">
          {t.phone}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            placeholder={t.phonePlaceholder}
          />
        </label>
      </div>

      <label className="text-sm font-medium text-ink">
        {t.email}
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
        {t.direction}
        <select
          name="direction"
          value={form.direction}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
        >
          {t.directionOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm font-medium text-ink">
        {t.message}
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
          placeholder={t.messagePlaceholder}
        />
      </label>

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light sm:w-auto"
      >
        {t.submit}
      </button>
    </form>
  );
}
