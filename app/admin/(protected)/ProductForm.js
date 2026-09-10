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
  specs: [],
  price: "",
  oldPrice: "",
  image: null,
  icon: "SnowflakeIcon",
  badge: "",
};

// Спецификациите в admin формата винаги се пазят като обекти (за разлика от
// стария формат, който можеше да е чист текстов масив) — тук стария формат
// се преобразува към новия, за да може да се редактира с новия editor.
function toEditableSpec(item) {
  if (typeof item === "string") return { type: "text", value: item };
  if (item?.type === "image") return { type: "image", src: item.src || "", caption: item.caption || "" };
  if (item?.type === "table") {
    return { type: "table", title: item.title || "", rows: (item.rows || []).map((row) => [...row]) };
  }
  return { type: "text", value: item?.value || "" };
}

export default function ProductForm({ product, onClose, onSaved }) {
  const isNew = !product;
  const [form, setForm] = useState(() =>
    product
      ? {
          ...product,
          specs: (product.specs || []).map(toEditableSpec),
          price: product.price ?? "",
          oldPrice: product.oldPrice ?? "",
          badge: product.badge ?? "",
        }
      : { ...EMPTY_PRODUCT }
  );
  const [uploading, setUploading] = useState(false);
  const [uploadingSpecIndex, setUploadingSpecIndex] = useState(null);
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

  function updateSpecs(updater) {
    setForm((prev) => {
      const specs = [...prev.specs];
      updater(specs);
      return { ...prev, specs };
    });
  }

  function addTextSpec() {
    updateSpecs((specs) => specs.push({ type: "text", value: "" }));
  }

  function addTableSpec() {
    updateSpecs((specs) =>
      specs.push({
        type: "table",
        title: "",
        rows: [
          ["", ""],
          ["", ""],
        ],
      })
    );
  }

  function addImageSpec() {
    updateSpecs((specs) => specs.push({ type: "image", src: "", caption: "" }));
  }

  function removeSpec(index) {
    updateSpecs((specs) => specs.splice(index, 1));
  }

  function updateTextSpec(index, value) {
    updateSpecs((specs) => {
      specs[index] = { ...specs[index], value };
    });
  }

  function updateImageCaption(index, caption) {
    updateSpecs((specs) => {
      specs[index] = { ...specs[index], caption };
    });
  }

  function updateTableTitle(index, title) {
    updateSpecs((specs) => {
      specs[index] = { ...specs[index], title };
    });
  }

  function updateTableCell(index, rowIdx, cellIdx, value) {
    updateSpecs((specs) => {
      const rows = specs[index].rows.map((row) => [...row]);
      rows[rowIdx][cellIdx] = value;
      specs[index] = { ...specs[index], rows };
    });
  }

  function addTableRow(index) {
    updateSpecs((specs) => {
      const cols = specs[index].rows[0]?.length || 2;
      specs[index] = { ...specs[index], rows: [...specs[index].rows, Array(cols).fill("")] };
    });
  }

  function removeTableRow(index, rowIdx) {
    updateSpecs((specs) => {
      specs[index] = { ...specs[index], rows: specs[index].rows.filter((_, i) => i !== rowIdx) };
    });
  }

  function addTableColumn(index) {
    updateSpecs((specs) => {
      specs[index] = { ...specs[index], rows: specs[index].rows.map((row) => [...row, ""]) };
    });
  }

  function removeTableColumn(index, colIdx) {
    updateSpecs((specs) => {
      specs[index] = {
        ...specs[index],
        rows: specs[index].rows.map((row) => row.filter((_, i) => i !== colIdx)),
      };
    });
  }

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Грешка при качване.");
    return data.url;
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      update("image", await uploadFile(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSpecImageChange(index, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSpecIndex(index);
    setError("");
    try {
      const url = await uploadFile(file);
      updateSpecs((specs) => {
        specs[index] = { ...specs[index], src: url };
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingSpecIndex(null);
      e.target.value = "";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      specs: form.specs,
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
            <div className="mt-1.5 grid gap-3">
              {form.specs.map((spec, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 p-3">
                  {spec.type === "text" && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => updateTextSpec(idx, e.target.value)}
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
                  )}

                  {spec.type === "table" && (
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate">
                          Таблица
                        </span>
                        <button
                          type="button"
                          onClick={() => removeSpec(idx)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:text-red-500"
                          aria-label="Премахни таблицата"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={spec.title}
                        onChange={(e) => updateTableTitle(idx, e.target.value)}
                        placeholder="Заглавие на таблицата (незадължително), напр. Технически спецификации"
                        className="mb-2 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
                      />
                      <p className="mb-2 text-xs text-slate-400">
                        Първият ред от таблицата се показва удебелен като заглавен ред — въведете там имената на колоните (напр. „Параметър“ / „Стойност“).
                      </p>
                      <div className="overflow-x-auto">
                        <table className="border-collapse">
                          <tbody>
                            {spec.rows.map((row, rowIdx) => (
                              <tr key={rowIdx}>
                                {row.map((cell, cellIdx) => (
                                  <td key={cellIdx} className="border border-slate-200 p-1">
                                    <input
                                      type="text"
                                      value={cell}
                                      onChange={(e) => updateTableCell(idx, rowIdx, cellIdx, e.target.value)}
                                      className="w-28 rounded border-none px-2 py-1.5 text-sm text-ink outline-none focus:ring-2 focus:ring-climate/20"
                                    />
                                  </td>
                                ))}
                                <td className="border-none p-1">
                                  <button
                                    type="button"
                                    onClick={() => removeTableRow(idx, rowIdx)}
                                    disabled={spec.rows.length <= 1}
                                    className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:text-red-500 disabled:opacity-30"
                                    aria-label="Премахни реда"
                                  >
                                    <XIcon className="h-3.5 w-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                            <tr>
                              {spec.rows[0]?.map((_, colIdx) => (
                                <td key={colIdx} className="border-none p-1 text-center">
                                  <button
                                    type="button"
                                    onClick={() => removeTableColumn(idx, colIdx)}
                                    disabled={spec.rows[0].length <= 1}
                                    className="text-[11px] font-medium text-slate-400 hover:text-red-500 disabled:opacity-30"
                                  >
                                    − колона
                                  </button>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => addTableRow(idx)}
                          className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink"
                        >
                          <PlusIcon className="h-3 w-3" />
                          Ред
                        </button>
                        <button
                          type="button"
                          onClick={() => addTableColumn(idx)}
                          className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink"
                        >
                          <PlusIcon className="h-3 w-3" />
                          Колона
                        </button>
                      </div>
                    </div>
                  )}

                  {spec.type === "image" && (
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate">
                          Снимка
                        </span>
                        <button
                          type="button"
                          onClick={() => removeSpec(idx)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:text-red-500"
                          aria-label="Премахни снимката"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-mist">
                          {spec.src ? (
                            <div className="relative h-full w-full">
                              <Image src={spec.src} alt="" fill className="object-cover" />
                            </div>
                          ) : (
                            <ImageIcon className="h-6 w-6 text-slate-400" />
                          )}
                        </div>
                        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-mist px-3.5 py-1.5 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink">
                          {uploadingSpecIndex === idx ? "Качване..." : "Качи снимка"}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) => handleSpecImageChange(idx, e)}
                            disabled={uploadingSpecIndex === idx}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={spec.caption}
                        onChange={(e) => updateImageCaption(idx, e.target.value)}
                        placeholder="Надпис към снимката (незадължително)"
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={addTextSpec}
                  className="inline-flex items-center gap-1.5 self-start rounded-full bg-mist px-3.5 py-1.5 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                  Добави текст
                </button>
                <button
                  type="button"
                  onClick={addTableSpec}
                  className="inline-flex items-center gap-1.5 self-start rounded-full bg-mist px-3.5 py-1.5 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                  Добави таблица
                </button>
                <button
                  type="button"
                  onClick={addImageSpec}
                  className="inline-flex items-center gap-1.5 self-start rounded-full bg-mist px-3.5 py-1.5 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                  Добави снимка
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-ink">
              Цена (€)
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
