"use client";

import Image from "next/image";
import { useCart } from "./CartContext";
import { formatPrice, getDiscountPercent, hasPrice } from "@/lib/products";
import { resolveIcon } from "@/lib/icons";
import { CheckIcon } from "@/components/Icons";
import { useState } from "react";

const tileGradient = {
  climate: "from-navy via-climate-dark to-climate",
  pool: "from-navy via-aqua-dark to-aqua",
};

const badgeStyle = {
  climate: "bg-climate text-navy-dark",
  pool: "bg-aqua text-white",
};

export default function ProductCard({ product, onOpen }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const discount = getDiscountPercent(product);
  const Icon = resolveIcon(product.icon);

  function handleAdd(e) {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className={`relative flex h-36 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${tileGradient[product.zone]}`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <Icon className="h-14 w-14 text-white/90" />
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeStyle[product.zone]}`}
            >
              {product.badge}
            </span>
          )}
        </div>
        {discount && (
          <span className="absolute right-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate">
          {product.category}
        </span>
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="mt-1.5 text-left text-base font-semibold leading-snug text-ink hover:text-navy-light"
        >
          {product.name}
        </button>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          {hasPrice(product) ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-ink">{formatPrice(product.price)} лв.</span>
              {discount && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.oldPrice)} лв.
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm font-medium text-slate">Цена при запитване</span>
          )}
          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-colors ${
              justAdded ? "bg-emerald-600" : "bg-navy hover:bg-navy-light"
            }`}
          >
            {justAdded ? (
              <>
                <CheckIcon className="h-3.5 w-3.5" />
                Добавено
              </>
            ) : (
              "Добави"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
