import fs from "node:fs";
import path from "node:path";
import { put, list, del } from "@vercel/blob";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");
const BLOB_PREFIX = "data/products-";
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

// На Vercel файловата система е временна и промените не се запазват между
// заявките, затова там пазим данните в Vercel Blob. Всеки запис създава НОВ
// файл (версия) вместо да презаписва стария на същия адрес — презаписването
// на един и същ адрес се кешира от CDN-а и води до остарели резултати малко
// след запис. Локално (без token) се ползва обикновен файл.
const useBlob = !!BLOB_TOKEN;

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, "[]\n", "utf8");
  }
}

async function readFromBlob() {
  const { blobs } = await list({ prefix: BLOB_PREFIX, token: BLOB_TOKEN });
  if (!blobs.length) return [];
  const latest = [...blobs].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  )[0];
  const res = await fetch(latest.url, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${BLOB_TOKEN}` },
  });
  if (!res.ok) return [];
  return res.json();
}

async function writeToBlob(products) {
  const pathname = `${BLOB_PREFIX}${Date.now()}.json`;
  await put(pathname, JSON.stringify(products, null, 2), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
    token: BLOB_TOKEN,
  });

  // Изтриваме старите версии (пазим само последната записана).
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX, token: BLOB_TOKEN });
    const stale = blobs.filter((b) => b.pathname !== pathname);
    await Promise.all(stale.map((b) => del(b.url, { token: BLOB_TOKEN }).catch(() => {})));
  } catch {
    // почистването не е критично — просто ще се натрупат версии
  }
}

export async function readProducts() {
  if (useBlob) return readFromBlob();
  ensureFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

export async function writeProducts(products) {
  if (useBlob) return writeToBlob(products);
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2) + "\n", "utf8");
}

export async function getProductById(id) {
  const products = await readProducts();
  return products.find((p) => p.id === id) || null;
}

export async function upsertProduct(product) {
  const products = await readProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx === -1) {
    products.push(product);
  } else {
    products[idx] = product;
  }
  await writeProducts(products);
  return product;
}

export async function deleteProduct(id) {
  const products = (await readProducts()).filter((p) => p.id !== id);
  await writeProducts(products);
}

export async function generateId(zone) {
  const prefix = zone === "pool" ? "pool" : "clim";
  const products = await readProducts();
  const existingNumbers = products
    .filter((p) => p.id.startsWith(`${prefix}-`))
    .map((p) => parseInt(p.id.split("-")[1], 10))
    .filter((n) => !Number.isNaN(n));
  const next = existingNumbers.length ? Math.max(...existingNumbers) + 1 : 1;
  return `${prefix}-${String(next).padStart(2, "0")}`;
}
