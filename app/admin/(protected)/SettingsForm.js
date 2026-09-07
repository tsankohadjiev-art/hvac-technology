"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "@/components/Icons";

export default function SettingsForm({ initialSettings }) {
  const [form, setForm] = useState(initialSettings);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setSaved(false);
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateAddress(lang, value) {
    setSaved(false);
    setForm((prev) => ({ ...prev, address: { ...prev.address, [lang]: value } }));
  }

  function updateHero(lang, field, value) {
    setSaved(false);
    setForm((prev) => ({
      ...prev,
      hero: { ...prev.hero, [lang]: { ...prev.hero[lang], [field]: value } },
    }));
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Грешка при качване.");
      update("heroImage", data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Грешка при запис.");
      setForm(data);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold text-ink">Настройки на сайта</h1>
      <p className="mt-1 text-sm text-slate">
        Тези данни се показват в подножието на сайта, страница "Контакти" и началната страница.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">Контакти</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium text-ink">
            Телефон (за показване)
            <input
              type="text"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+359 89 347 2443"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>
          <label className="text-sm font-medium text-ink">
            Телефон (линк, tel:+359...)
            <input
              type="text"
              value={form.phoneHref}
              onChange={(e) => update("phoneHref", e.target.value)}
              placeholder="tel:+359893472443"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>
        </div>
        <label className="mt-5 block text-sm font-medium text-ink">
          Имейл
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
          />
        </label>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium text-ink">
            Адрес (български)
            <input
              type="text"
              value={form.address.bg}
              onChange={(e) => updateAddress("bg", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>
          <label className="text-sm font-medium text-ink">
            Адрес (английски)
            <input
              type="text"
              value={form.address.en}
              onChange={(e) => updateAddress("en", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">Начална страница — снимка</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-mist">
            {form.heroImage ? (
              <div className="relative h-full w-full">
                <Image src={form.heroImage} alt="" fill className="object-cover" />
              </div>
            ) : (
              <span className="text-xs text-slate-400">Без снимка</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-mist px-4 py-2 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink">
              <ImageIcon className="h-4 w-4" />
              {uploading ? "Качване..." : "Качи снимка"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {form.heroImage && (
              <button
                type="button"
                onClick={() => update("heroImage", null)}
                className="text-left text-xs font-medium text-slate hover:text-red-600"
              >
                Премахни снимката
              </button>
            )}
          </div>
        </div>
      </div>

      {["bg", "en"].map((lang) => (
        <div key={lang} className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-ink">
            Начална страница — текст ({lang === "bg" ? "български" : "английски"})
          </h2>
          <label className="mt-4 block text-sm font-medium text-ink">
            Заглавие
            <textarea
              rows={2}
              value={form.hero[lang].title}
              onChange={(e) => updateHero(lang, "title", e.target.value)}
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-ink">
            Подзаглавие
            <input
              type="text"
              value={form.hero[lang].subtitle}
              onChange={(e) => updateHero(lang, "subtitle", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-ink">
            Описание
            <textarea
              rows={3}
              value={form.hero[lang].description}
              onChange={(e) => updateHero(lang, "description", e.target.value)}
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>
        </div>
      ))}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {saved && <p className="mt-4 text-sm text-emerald-600">Запазено успешно.</p>}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Запазване..." : "Запази настройките"}
        </button>
      </div>
    </form>
  );
}
