import fs from "node:fs";
import path from "node:path";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, "[]\n", "utf8");
  }
}

export function readProducts() {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

export function writeProducts(products) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2) + "\n", "utf8");
}

export function getProductById(id) {
  return readProducts().find((p) => p.id === id) || null;
}

export function upsertProduct(product) {
  const products = readProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx === -1) {
    products.push(product);
  } else {
    products[idx] = product;
  }
  writeProducts(products);
  return product;
}

export function deleteProduct(id) {
  const products = readProducts().filter((p) => p.id !== id);
  writeProducts(products);
}

export function generateId(zone) {
  const prefix = zone === "pool" ? "pool" : "clim";
  const existingNumbers = readProducts()
    .filter((p) => p.id.startsWith(`${prefix}-`))
    .map((p) => parseInt(p.id.split("-")[1], 10))
    .filter((n) => !Number.isNaN(n));
  const next = existingNumbers.length ? Math.max(...existingNumbers) + 1 : 1;
  return `${prefix}-${String(next).padStart(2, "0")}`;
}
