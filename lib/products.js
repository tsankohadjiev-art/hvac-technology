export const ZONES = {
  climate: {
    key: "climate",
    label: "Климатизация и ОВК",
    shortLabel: "Климатизация и ОВК",
    theme: "climate",
  },
  pool: {
    key: "pool",
    label: "Басейни и СПА",
    shortLabel: "Басейни и СПА",
    theme: "aqua",
  },
};

export function formatPrice(value) {
  return new Intl.NumberFormat("bg-BG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Ако продуктът има oldPrice (стара цена) по-висока от price (текущата цена),
// смята се, че е с отстъпка и се показва % намаление.
export function getDiscountPercent(product) {
  if (product.price == null || !product.oldPrice || product.oldPrice <= product.price) return null;
  return Math.round((1 - product.price / product.oldPrice) * 100);
}

export function hasPrice(product) {
  return product.price != null;
}

// Спецификация може да е обикновен текст (стар формат — само string, или
// нов формат — { type: "text", value }), таблица ({ type: "table", rows })
// или снимка ({ type: "image", src, caption }).
export function normalizeSpecItem(item) {
  if (typeof item === "string") {
    const value = item.trim();
    return value ? { type: "text", value } : null;
  }
  if (!item || typeof item !== "object") return null;

  if (item.type === "image") {
    const src = typeof item.src === "string" ? item.src.trim() : "";
    if (!src) return null;
    const caption = typeof item.caption === "string" ? item.caption.trim() : "";
    return { type: "image", src, caption };
  }

  if (item.type === "table") {
    const rows = Array.isArray(item.rows)
      ? item.rows
          .map((row) => (Array.isArray(row) ? row.map((cell) => String(cell ?? "").trim()) : []))
          .filter((row) => row.some((cell) => cell !== ""))
      : [];
    return rows.length ? { type: "table", rows } : null;
  }

  const value = typeof item.value === "string" ? item.value.trim() : "";
  return value ? { type: "text", value } : null;
}

export function normalizeSpecs(specs) {
  if (!Array.isArray(specs)) return [];
  return specs.map(normalizeSpecItem).filter(Boolean);
}
