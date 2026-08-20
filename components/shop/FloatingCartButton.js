"use client";

import { useCart } from "./CartContext";
import { CartIcon } from "@/components/Icons";

export default function FloatingCartButton() {
  const { count, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-lg shadow-navy/30 transition-transform hover:scale-105 active:scale-95"
      aria-label="Отвори количката"
    >
      <CartIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-climate px-1.5 text-xs font-bold text-navy-dark">
          {count}
        </span>
      )}
    </button>
  );
}
