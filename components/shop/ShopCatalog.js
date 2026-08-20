"use client";

import { useMemo, useState } from "react";
import { ZONES } from "@/lib/products";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { SearchIcon, SnowflakeIcon, WavesIcon, XIcon } from "@/components/Icons";

const TABS = [
  { key: "all", label: "Всички продукти" },
  { key: "climate", label: ZONES.climate.label, icon: SnowflakeIcon },
  { key: "pool", label: ZONES.pool.label, icon: WavesIcon },
];

const SORTS = [
  { key: "default", label: "По подразбиране" },
  { key: "price-asc", label: "Цена: ниска към висока" },
  { key: "price-desc", label: "Цена: висока към ниска" },
  { key: "name", label: "По име (А-Я)" },
];

const HERO_THEMES = {
  navy: "from-navy-dark via-navy to-navy-light",
  climate: "from-navy via-climate-dark to-climate",
  aqua: "from-navy via-aqua-dark to-aqua",
};

export default function ShopCatalog({
  products,
  initialZone = "all",
  title = "Продукти за климатизация, ОВК, басейни и СПА",
  description = "Изберете, добавете в количката и изпратете запитване. Ще се свържем с вас, за да потвърдим наличност, цена и доставка.",
  heroTheme = "navy",
}) {
  const [zone, setZone] = useState(initialZone);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [activeProduct, setActiveProduct] = useState(null);

  const filtered = useMemo(() => {
    let list = products;
    if (zone !== "all") list = list.filter((p) => p.zone === zone);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "bg"));
    return sorted;
  }, [products, zone, query, sort]);

  return (
    <>
      <section className={`relative overflow-hidden bg-gradient-to-br text-white ${HERO_THEMES[heroTheme]}`}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
            Онлайн магазин
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3">
              <div className="text-2xl font-bold">0 лв.</div>
              <div className="text-xs text-white/70">онлайн плащане</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setZone(tab.key)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  zone === tab.key
                    ? "bg-navy text-white"
                    : "bg-mist text-slate hover:bg-slate-200 hover:text-ink"
                }`}
              >
                {tab.icon && <tab.icon className="h-4 w-4" />}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center lg:max-w-md">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Търсене на продукт..."
                className="w-full rounded-full border border-slate-300 py-2.5 pl-10 pr-9 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
                  aria-label="Изчисти търсенето"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-slate-300 px-4 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <p className="mb-6 text-sm text-slate">
          Показани {filtered.length} от {products.length} продукта
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <p className="text-lg font-semibold text-ink">Няма намерени продукти</p>
            <p className="mt-2 text-sm text-slate">Опитайте с друга дума за търсене или изберете друга категория.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onOpen={setActiveProduct} />
            ))}
          </div>
        )}
      </section>

      <ProductQuickView product={activeProduct} onClose={() => setActiveProduct(null)} />
    </>
  );
}
