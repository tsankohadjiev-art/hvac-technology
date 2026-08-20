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
  return new Intl.NumberFormat("bg-BG", { maximumFractionDigits: 0 }).format(value);
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
