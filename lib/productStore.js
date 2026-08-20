import fs from "node:fs";
import path from "node:path";
import { put, list } from "@vercel/blob";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");
const BLOB_PATHNAME = "data/products.json";
const BLOB_STORE_ID = process.env.BLOB_STORE_ID;

// На Vercel файловата система е временна и промените не се запазват между
// заявките, затова там пазим данните в Vercel Blob (новите Blob хранилища се
// оторизират през BLOB_STORE_ID + вградения OIDC token, не статичен
// BLOB_READ_WRITE_TOKEN). Локално (без BLOB_STORE_ID) се ползва обикновен
// файл — по-просто за разработка.
const useBlob = !!BLOB_STORE_ID;

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, "[]\n", "utf8");
  }
}

async function readFromBlob() {
  const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1, storeId: BLOB_STORE_ID });
  console.log("[productStore] list() found", blobs.length, "blob(s)", blobs.map((b) => b.pathname));
  if (!blobs.length) return [];
  const res = await fetch(blobs[0].url, {
    cache: "no-store",
    headers: process.env.VERCEL_OIDC_TOKEN
      ? { Authorization: `Bearer ${process.env.VERCEL_OIDC_TOKEN}` }
      : {},
  });
  console.log("[productStore] fetch blob content status", res.status, "hasOidc", !!process.env.VERCEL_OIDC_TOKEN);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.log("[productStore] fetch blob content failed body:", text.slice(0, 300));
    return [];
  }
  return res.json();
}

async function writeToBlob(products) {
  const result = await put(BLOB_PATHNAME, JSON.stringify(products, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    storeId: BLOB_STORE_ID,
  });
  console.log("[productStore] wrote blob", result.pathname, result.url);
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
