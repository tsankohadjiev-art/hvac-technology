import { NextResponse } from "next/server";
import { readSettings, writeSettings } from "@/lib/settingsStore";

// Пресича низовете рекурсивно; масивите/обектите се обхождат, но формата
// (кои полета съществуват) се налага от mergeWithDefaults в settingsStore,
// така че тук не се налага да изброяваме всяко поле ръчно.
function trimDeep(value) {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(trimDeep);
  if (value != null && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = trimDeep(v);
    return out;
  }
  return value;
}

export async function GET() {
  return NextResponse.json(await readSettings());
}

export async function PATCH(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Невалидна заявка." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Невалидна заявка." }, { status: 400 });
  }

  const cleaned = trimDeep(body);
  if (!cleaned.phone || !cleaned.email) {
    return NextResponse.json({ error: "Телефонът и имейлът са задължителни." }, { status: 400 });
  }

  const updated = await writeSettings(cleaned);
  return NextResponse.json(updated);
}
