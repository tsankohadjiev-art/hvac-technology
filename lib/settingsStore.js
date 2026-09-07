import fs from "node:fs";
import path from "node:path";
import { put, list, del } from "@vercel/blob";

const DATA_FILE = path.join(process.cwd(), "data", "settings.json");
const BLOB_PREFIX = "data/settings-";
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

// Същата схема като productStore.js: на Vercel файловата система е
// временна, затова настройките се пазят в Vercel Blob (нова версия при
// всеки запис, за да се избегне CDN кеширане на стар прочит). Локално
// (без token) се ползва обикновен файл.
const useBlob = !!BLOB_TOKEN;

export const DEFAULT_SETTINGS = {
  phone: "+359 89 347 2443",
  phoneHref: "tel:+359893472443",
  email: "office@hvactechnology.eu",
  address: {
    bg: "гр. София, кв. Витоша, ул. Андрей Бадев 1",
    en: "Sofia, Vitosha, Andrey Badev St. 1, Bulgaria",
  },
  hero: {
    bg: {
      title:
        "Комплексни решения в две направления за постигане на интегрирано инженерство",
      subtitle: "(Integrated Building Systems Engineering)",
      description:
        "Hvac Technology обединява експертиза в климатизацията и отоплението с изграждането на басейни, СПА и водни съоръжения — качество и надеждност под едно име.",
    },
    en: {
      title:
        "Complete solutions in two directions towards integrated engineering",
      subtitle: "(Integrated Building Systems Engineering)",
      description:
        "Hvac Technology combines expertise in air conditioning and heating with the construction of pools, spas and water facilities — quality and reliability under one name.",
    },
  },
  heroImage: null,
};

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2) + "\n", "utf8");
  }
}

async function readFromBlob() {
  const { blobs } = await list({ prefix: BLOB_PREFIX, token: BLOB_TOKEN });
  if (!blobs.length) return null;
  const latest = [...blobs].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  )[0];
  const res = await fetch(latest.url, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${BLOB_TOKEN}` },
  });
  if (!res.ok) return null;
  return res.json();
}

async function writeToBlob(settings) {
  const pathname = `${BLOB_PREFIX}${Date.now()}.json`;
  await put(pathname, JSON.stringify(settings, null, 2), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
    token: BLOB_TOKEN,
  });

  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX, token: BLOB_TOKEN });
    const stale = blobs.filter((b) => b.pathname !== pathname);
    await Promise.all(stale.map((b) => del(b.url, { token: BLOB_TOKEN }).catch(() => {})));
  } catch {
    // почистването не е критично — просто ще се натрупат версии
  }
}

function mergeWithDefaults(settings) {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
    address: { ...DEFAULT_SETTINGS.address, ...settings?.address },
    hero: {
      bg: { ...DEFAULT_SETTINGS.hero.bg, ...settings?.hero?.bg },
      en: { ...DEFAULT_SETTINGS.hero.en, ...settings?.hero?.en },
    },
  };
}

export async function readSettings() {
  let settings = null;
  if (useBlob) {
    settings = await readFromBlob();
  } else {
    ensureFile();
    settings = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  }
  return mergeWithDefaults(settings);
}

export async function writeSettings(settings) {
  const merged = mergeWithDefaults(settings);
  if (useBlob) {
    await writeToBlob(merged);
  } else {
    ensureFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(merged, null, 2) + "\n", "utf8");
  }
  return merged;
}
