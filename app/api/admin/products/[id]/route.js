import { NextResponse } from "next/server";
import { getProductById, upsertProduct, deleteProduct } from "@/lib/productStore";

function normalize(body, fallback) {
  const priceNum = body.price === "" || body.price === null ? null : Number(body.price);
  const oldPriceNum = body.oldPrice === "" || body.oldPrice == null ? null : Number(body.oldPrice);

  return {
    zone: body.zone === "pool" ? "pool" : "climate",
    category: (body.category ?? fallback.category ?? "").trim() || "Общи",
    name: (body.name ?? fallback.name ?? "").trim(),
    description: (body.description ?? fallback.description ?? "").trim(),
    specs: Array.isArray(body.specs)
      ? body.specs.map((s) => String(s).trim()).filter(Boolean)
      : fallback.specs || [],
    price:
      body.price === undefined
        ? fallback.price
        : priceNum === null
          ? null
          : Number.isFinite(priceNum)
            ? priceNum
            : fallback.price,
    oldPrice: Number.isFinite(oldPriceNum) ? oldPriceNum : null,
    image: body.image !== undefined ? body.image : fallback.image,
    icon: body.icon || fallback.icon || "SnowflakeIcon",
    badge: (body.badge ?? fallback.badge ?? "")?.trim() || null,
  };
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const existing = await getProductById(id);
  if (!existing) {
    return NextResponse.json({ error: "Продуктът не е намерен." }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Невалидна заявка." }, { status: 400 });
  }

  const normalized = normalize(body, existing);
  if (!normalized.name) {
    return NextResponse.json({ error: "Името на продукта е задължително." }, { status: 400 });
  }

  const updated = { id, ...normalized };
  await upsertProduct(updated);
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const existing = await getProductById(id);
  if (!existing) {
    return NextResponse.json({ error: "Продуктът не е намерен." }, { status: 404 });
  }
  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
