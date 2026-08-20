import { NextResponse } from "next/server";
import { readProducts, upsertProduct, generateId } from "@/lib/productStore";

function normalize(body) {
  const priceNum = body.price === "" || body.price == null ? null : Number(body.price);
  const oldPriceNum = body.oldPrice === "" || body.oldPrice == null ? null : Number(body.oldPrice);

  return {
    zone: body.zone === "pool" ? "pool" : "climate",
    category: (body.category || "").trim() || "Общи",
    name: (body.name || "").trim(),
    description: (body.description || "").trim(),
    specs: Array.isArray(body.specs) ? body.specs.map((s) => String(s).trim()).filter(Boolean) : [],
    price: Number.isFinite(priceNum) ? priceNum : null,
    oldPrice: Number.isFinite(oldPriceNum) ? oldPriceNum : null,
    image: body.image || null,
    icon: body.icon || "SnowflakeIcon",
    badge: (body.badge || "").trim() || null,
  };
}

export async function GET() {
  return NextResponse.json(await readProducts());
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Невалидна заявка." }, { status: 400 });
  }

  const normalized = normalize(body);
  if (!normalized.name) {
    return NextResponse.json({ error: "Името на продукта е задължително." }, { status: 400 });
  }

  const id = await generateId(normalized.zone);
  const product = { id, ...normalized };
  await upsertProduct(product);
  return NextResponse.json(product, { status: 201 });
}
