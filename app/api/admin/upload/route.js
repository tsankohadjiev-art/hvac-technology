import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ALLOWED = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
// Vercel-функциите имат платформен лимит на тялото на заявката под 5MB —
// файл между ~4.5 и 5MB минаваше тази проверка, но биваше отхвърлен от
// самия Vercel с текстов (не JSON) отговор "Request Entity Too Large",
// което чупеше клиентския код, очакващ JSON. Пазим граница под лимита.
const MAX_SIZE = 4 * 1024 * 1024;
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
const useBlob = !!BLOB_TOKEN;

export async function POST(request) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Невалидна заявка." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Няма прикачен файл." }, { status: 400 });
  }
  if (!ALLOWED[file.type]) {
    return NextResponse.json({ error: "Позволени са само JPG, PNG или WebP снимки." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Файлът е твърде голям (макс. 4MB)." }, { status: 400 });
  }

  const ext = ALLOWED[file.type];
  const filename = `${crypto.randomUUID()}.${ext}`;

  if (useBlob) {
    const pathname = `uploads/${filename}`;
    await put(pathname, file, {
      access: "private",
      contentType: file.type,
      token: BLOB_TOKEN,
    });
    // Хранилището е частно, затова снимките се обслужват през собствен
    // маршрут вместо директния (защитен) адрес на Blob.
    return NextResponse.json({ url: `/api/blob/${pathname}` });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
