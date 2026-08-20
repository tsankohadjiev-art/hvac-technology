"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";
import { CartIcon, MinusIcon, PlusIcon, XIcon, ArrowRightIcon } from "@/components/Icons";

export default function CartDrawer() {
  const { items, subtotal, hasUnpricedItems, updateQty, removeItem, isDrawerOpen, closeDrawer } =
    useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") closeDrawer();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-navy-dark/40 backdrop-blur-sm transition-opacity ${
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isDrawerOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <CartIcon className="h-5 w-5 text-navy" />
            <h2 className="text-lg font-bold text-ink">Количка</h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate transition-colors hover:bg-mist hover:text-ink"
            aria-label="Затвори количката"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <CartIcon className="h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate">Количката е празна.</p>
            <button
              type="button"
              onClick={closeDrawer}
              className="mt-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Разгледай продуктите
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${
                        item.zone === "climate" ? "bg-climate/10 text-climate-dark" : "bg-aqua/10 text-aqua-dark"
                      }`}
                    >
                      <span className="text-lg font-bold">{item.qty}x</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                      <p className="mt-0.5 text-xs text-slate">{item.category}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-slate-200">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="flex h-7 w-7 items-center justify-center text-slate hover:text-ink"
                            aria-label="Намали количеството"
                          >
                            <MinusIcon className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-ink">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="flex h-7 w-7 items-center justify-center text-slate hover:text-ink"
                            aria-label="Увеличи количеството"
                          >
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-ink">
                          {item.price == null
                            ? "Цена при запитване"
                            : `${formatPrice(item.price * item.qty)} лв.`}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-300 hover:text-red-500"
                      aria-label="Премахни от количката"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200 px-6 py-5">
              <div className="flex items-center justify-between text-sm text-slate">
                <span>Междинна сума</span>
                <span className="text-lg font-bold text-ink">{formatPrice(subtotal)} лв.</span>
              </div>
              <p className="mt-1 text-xs text-slate">
                {hasUnpricedItems
                  ? "Част от продуктите нямат обявена цена — ще получите оферта след запитването. Без онлайн плащане."
                  : "Крайната цена се потвърждава след запитването — без онлайн плащане."}
              </p>
              <Link
                href="/poruchka"
                onClick={closeDrawer}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
              >
                Продължи към поръчка
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
