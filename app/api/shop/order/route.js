import { NextResponse } from "next/server";
import { readSettings } from "@/lib/settingsStore";
import { formatPrice } from "@/lib/products";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Hvac Technology <onboarding@resend.dev>";
// Незадължителен адрес за поръчки, различен от публично показвания контактен
// имейл на сайта — полезно, докато домейнът не е потвърден в Resend (в тестов
// режим Resend изпраща само до имейла на собствения акаунт).
const ORDER_NOTIFICATION_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL;

function buildOrderText({ form, items, subtotal }) {
  const deliveryLabel = form.delivery === "office" ? "Вземане от офиса" : "Доставка на адрес";
  const itemLines = items
    .map(
      (i) =>
        `- ${i.name} x${i.qty} — ${
          i.price == null ? "цена при запитване" : `${formatPrice(i.price * i.qty)} €`
        }`
    )
    .join("\n");

  return [
    `Име: ${form.name}`,
    `Телефон: ${form.phone}`,
    `Имейл: ${form.email}`,
    `Начин на получаване: ${deliveryLabel}`,
    form.delivery === "delivery" ? `Адрес: ${form.address}` : null,
    "",
    "Продукти:",
    itemLines,
    "",
    `Междинна сума: ${formatPrice(subtotal)} €`,
    "",
    form.note ? `Бележка: ${form.note}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Невалидна заявка." }, { status: 400 });
  }

  const { form, items, subtotal } = body || {};
  if (!form?.name || !form?.phone || !form?.email || !Array.isArray(items) || !items.length) {
    return NextResponse.json({ error: "Липсват данни за поръчката." }, { status: 400 });
  }

  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Автоматичното изпращане не е конфигурирано." },
      { status: 503 }
    );
  }

  const settings = await readSettings();
  const text = buildOrderText({ form, items, subtotal });
  const to = ORDER_NOTIFICATION_EMAIL || settings.email;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [to],
        reply_to: form.email,
        subject: `Поръчка от онлайн магазина — ${form.name}`,
        text,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error("Resend send failed:", res.status, errBody);
      return NextResponse.json({ error: "Грешка при изпращане на имейла." }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed:", err);
    return NextResponse.json({ error: "Грешка при изпращане на имейла." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
