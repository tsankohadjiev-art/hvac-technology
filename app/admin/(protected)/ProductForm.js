"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ZONES } from "@/lib/products";
import { ICON_OPTIONS, resolveIcon } from "@/lib/icons";
import { XIcon, PlusIcon, ImageIcon } from "@/components/Icons";

const EMPTY_PRODUCT = {
  zone: "climate",
  category: "",
  name: "",
  description: "",
  specs: [""],
  price: "",
  oldPrice: "",
  image: null,
  icon: "SnowflakeIcon",
  badge: "",
};

export default function ProductForm({ product, onClose, onSaved }) {
  const isNew = !product;
  const [form, setForm] = useState(() =>
    product
      ? {
          ...product,
          specs: product.specs?.length ? product.specs : [""],
          price: product.price ?? "",
          oldPrice: product.oldPrice ?? "",
          badge: product.badge ?? "",
        }
      : { ...EMPTY_PRODUCT }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateSpec(index, value) {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[index] = value;
      return { ...prev, specs };
    });
  }

  function addSpec() {
    setForm((prev) => ({ ...prev, specs: [...prev.specs, ""] }));
  }

  function removeSpec(index) {
    setForm((prev) => ({ ...prev, specs: prev.specs.filter((_, i) => i !== index) }));
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
      update("image", data.url);
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

    const payload = {
      ...form,
      specs: form.specs.map((s) => s.trim()).filter(Boolean),
      price: form.price === "" ? null : Number(form.price),
      oldPrice: form.oldPrice === "" ? null : Number(form.oldPrice),
    };

    try {
      const res = await fetch(
        isNew ? "/api/admin/products" : `/api/admin/products/${product.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Грешка при запис.");
      onSaved(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const PreviewIcon = resolveIcon(form.icon);

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
      <div className="fixed inset-0 bg-navy-dark/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-bold text-ink">
            {isNew ? "Нов продукт" : "Редакция на продукт"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate hover:bg-mist hover:text-ink"
            aria-label="Затвори"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-ink">
              Зона
              <select
                value={form.zone}
                onChange={(e) => update("zone", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
              >
                {Object.values(ZONES).map((z) => (
                  <option key={z.key} value={z.key}>
                    {z.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-ink">
              Категория
              <input
                type="text"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                placeholder="напр. Климатици"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
              />
            </label>
          </div>

          <label className="text-sm font-medium text-ink">
            Име на продукта
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>

          <label className="text-sm font-medium text-ink">
            Описание
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>

          <div>
            <span className="text-sm font-medium text-ink">Спецификации</span>
            <div className="mt-1.5 grid gap-2">
              {form.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => updateSpec(idx, e.target.value)}
                    placeholder={`Спецификация ${idx + 1}`}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(idx)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 hover:text-red-500"
                    aria-label="Премахни"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSpec}
                className="inline-flex items-center gap-1.5 self-start rounded-full bg-mist px-3.5 py-1.5 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink"
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Добави спецификация
              </button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-ink">
              Цена (лв.)
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="Оставете празно, ако цената предстои"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
              />
            </label>
            <label className="text-sm font-medium text-ink">
              Стара цена преди отстъпка (незадължително)
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.oldPrice}
                onChange={(e) => update("oldPrice", e.target.value)}
                placeholder="Оставете празно, ако няма отстъпка"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
              />
            </label>
          </div>

          <label className="text-sm font-medium text-ink">
            Етикет (незадължително)
            <input
              type="text"
              list="badge-suggestions"
              value={form.badge}
              onChange={(e) => update("badge", e.target.value)}
              placeholder="напр. Хит, Ново, Топ продукт"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
            <datalist id="badge-suggestions">
              <option value="Хит" />
              <option value="Ново" />
              <option value="Топ продукт" />
            </datalist>
          </label>

          <div>
            <span className="text-sm font-medium text-ink">Снимка</span>
            <div className="mt-1.5 flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-mist">
                {form.image ? (
                  <div className="relative h-full w-full">
                    <Image src={form.image} alt="" fill className="object-cover" />
                  </div>
                ) : (
                  <PreviewIcon className="h-8 w-8 text-slate-400" />
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
                {form.image && (
                  <button
                    type="button"
                    onClick={() => update("image", null)}
                    className="text-left text-xs font-medium text-slate hover:text-red-600"
                  >
                    Премахни снимката
                  </button>
                )}
              </div>
            </div>
          </div>

          <label className="text-sm font-medium text-ink">
            Икона (показва се, ако няма снимка)
            <select
              value={form.icon}
              onChange={(e) => update("icon", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            >
              {ICON_OPTIONS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="mt-2 flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate hover:text-ink"
            >
              Отказ
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Запазване..." : "Запази продукта"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
