"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ZONES, formatPrice, getDiscountPercent } from "@/lib/products";
import { resolveIcon } from "@/lib/icons";
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon, XIcon } from "@/components/Icons";
import ProductForm from "./ProductForm";

export default function AdminDashboard({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [formTarget, setFormTarget] = useState(null); // null | "new" | product
  const [confirmTarget, setConfirmTarget] = useState(null); // product pending delete confirmation
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "Escape") return;
      if (confirmTarget && !deletingId) setConfirmTarget(null);
      else if (formTarget) setFormTarget(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmTarget, deletingId, formTarget]);

  const filtered = useMemo(() => {
    let list = products;
    if (zoneFilter !== "all") list = list.filter((p) => p.zone === zoneFilter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, zoneFilter, query]);

  function handleSaved(product) {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx === -1) return [...prev, product];
      const next = [...prev];
      next[idx] = product;
      return next;
    });
    setFormTarget(null);
  }

  async function confirmDelete() {
    if (!confirmTarget) return;
    const id = confirmTarget.id;
    setDeletingId(id);
    setDeleteError("");
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Грешка при изтриване.");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setConfirmTarget(null);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Продукти</h1>
          <p className="mt-1 text-sm text-slate">
            {products.length} продукта общо — добавяйте, редактирайте или изтривайте свободно.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormTarget("new")}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
        >
          <PlusIcon className="h-4 w-4" />
          Нов продукт
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Търсене..."
            className="w-full rounded-full border border-slate-300 py-2 pl-10 pr-4 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
          />
        </div>
        <div className="flex gap-2">
          {["all", "climate", "pool"].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setZoneFilter(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                zoneFilter === key ? "bg-navy text-white" : "bg-mist text-slate hover:bg-slate-200"
              }`}
            >
              {key === "all" ? "Всички" : ZONES[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-mist/60 text-xs font-semibold uppercase tracking-wide text-slate">
            <tr>
              <th className="px-4 py-3">Продукт</th>
              <th className="px-4 py-3">Зона</th>
              <th className="px-4 py-3">Цена</th>
              <th className="px-4 py-3">Етикет</th>
              <th className="px-4 py-3 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((product) => {
              const Icon = resolveIcon(product.icon);
              const discount = getDiscountPercent(product);
              return (
                <tr key={product.id} className="align-middle">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-mist">
                        {product.image ? (
                          <Image src={product.image} alt="" fill className="object-cover" />
                        ) : (
                          <Icon className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{product.name}</p>
                        <p className="truncate text-xs text-slate">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate">{ZONES[product.zone]?.label}</td>
                  <td className="px-4 py-3">
                    {product.price == null ? (
                      <span className="text-slate-400">Предстои</span>
                    ) : (
                      <span className="font-semibold text-ink">{formatPrice(product.price)} лв.</span>
                    )}
                    {discount && (
                      <span className="ml-2 text-xs text-slate-400 line-through">
                        {formatPrice(product.oldPrice)} лв.
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate">{product.badge || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setFormTarget(product)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate hover:bg-mist hover:text-ink"
                        aria-label="Редактирай"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteError("");
                          setConfirmTarget(product);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate hover:bg-red-50 hover:text-red-600"
                        aria-label="Изтрий"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-slate">Няма намерени продукти.</div>
        )}
      </div>

      {formTarget && (
        <ProductForm
          product={formTarget === "new" ? null : formTarget}
          onClose={() => setFormTarget(null)}
          onSaved={handleSaved}
        />
      )}

      {confirmTarget && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-6">
          <div
            className="fixed inset-0 bg-navy-dark/50 backdrop-blur-sm"
            onClick={() => !deletingId && setConfirmTarget(null)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-bold text-ink">Изтриване на продукт</h2>
              <button
                type="button"
                onClick={() => setConfirmTarget(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate hover:bg-mist hover:text-ink"
                aria-label="Затвори"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-slate">
              Сигурни ли сте, че искате да изтриете{" "}
              <span className="font-semibold text-ink">{confirmTarget.name}</span>? Това
              действие не може да бъде отменено.
            </p>
            {deleteError && <p className="mt-3 text-sm text-red-600">{deleteError}</p>}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmTarget(null)}
                disabled={!!deletingId}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate hover:text-ink disabled:opacity-50"
              >
                Отказ
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId ? "Изтриване..." : "Изтрий"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
