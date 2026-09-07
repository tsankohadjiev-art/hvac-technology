import { NextResponse } from "next/server";
import { readSettings, writeSettings } from "@/lib/settingsStore";

function normalize(body) {
  return {
    phone: String(body.phone ?? "").trim(),
    phoneHref: String(body.phoneHref ?? "").trim(),
    email: String(body.email ?? "").trim(),
    address: {
      bg: String(body.address?.bg ?? "").trim(),
      en: String(body.address?.en ?? "").trim(),
    },
    hero: {
      bg: {
        title: String(body.hero?.bg?.title ?? "").trim(),
        subtitle: String(body.hero?.bg?.subtitle ?? "").trim(),
        description: String(body.hero?.bg?.description ?? "").trim(),
      },
      en: {
        title: String(body.hero?.en?.title ?? "").trim(),
        subtitle: String(body.hero?.en?.subtitle ?? "").trim(),
        description: String(body.hero?.en?.description ?? "").trim(),
      },
    },
    heroImage: body.heroImage || null,
  };
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

  const normalized = normalize(body);
  if (!normalized.phone || !normalized.email) {
    return NextResponse.json({ error: "Телефонът и имейлът са задължителни." }, { status: 400 });
  }

  const updated = await writeSettings(normalized);
  return NextResponse.json(updated);
}
