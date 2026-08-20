"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { formatPrice, getDiscountPercent, hasPrice } from "@/lib/products";
import { resolveIcon } from "@/lib/icons";
import { XIcon, MinusIcon, PlusIcon, CheckIcon } from "@/components/Icons";

const tileGradient = {
  climate: "from-navy via-climate-dark to-climate",
  pool: "from-navy via-aqua-dark to-aqua",
};

export default function ProductQuickView({ product, onClose }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const discount = getDiscountPercent(product);
  const Icon = resolveIcon(product.icon);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 700);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <div className="fixed inset-0 bg-navy-dark/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl animate-slide-up sm:max-w-2xl sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
          aria-label="Затвори"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-56 ${tileGradient[product.zone]}`}>
          {product.image ? (
            <Image src={product.image} alt={product.name} fill sizes="100vw" className="object-cover" />
          ) : (
            <Icon className="h-20 w-20 text-white/90" />
          )}
          {discount && (
            <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              -{discount}%
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate">
            {product.category}
          </span>
          <h2 className="mt-1.5 text-2xl font-bold text-ink">{product.name}</h2>
          <p className="mt-3 leading-relaxed text-slate">{product.description}</p>

          <ul className="mt-5 space-y-2">
            {product.specs.map((spec) => (
              <li key={spec} className="flex items-start gap-2.5 text-sm text-ink">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-climate-dark" />
                {spec}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {hasPrice(product) ? (
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-ink">{formatPrice(product.price)} лв.</span>
                {discount && (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.oldPrice)} лв.
                  </span>
                )}
              </div>
            ) : (
              <span className="text-base font-medium text-slate">Цена при запитване</span>
            )}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border border-slate-300">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center text-slate hover:text-ink"
                  aria-label="Намали количеството"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-ink">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center text-slate hover:text-ink"
                  aria-label="Увеличи количеството"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors ${
                  added ? "bg-emerald-600" : "bg-navy hover:bg-navy-light"
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    Добавено
                  </>
                ) : (
                  "Добави в количката"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
