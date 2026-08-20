import fs from "node:fs";
import path from "node:path";
import { put, list } from "@vercel/blob";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");
const BLOB_PATHNAME = "data/products.json";

// На Vercel файловата система е временна и промените не се запазват между
// заявките, затова там пазим данните в Vercel Blob. Локално (без token) се
// ползва обикновен файл — по-просто за разработка.
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, "[]\n", "utf8");
  }
}

async function readFromBlob() {
  const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
  if (!blobs.length) return [];
  const res = await fetch(blobs[0].url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

async function writeToBlob(products) {
  await put(BLOB_PATHNAME, JSON.stringify(products, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
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
