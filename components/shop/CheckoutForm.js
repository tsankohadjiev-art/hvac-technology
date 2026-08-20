"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";
import { CheckIcon, ArrowRightIcon, MailIcon, ClipboardIcon } from "@/components/Icons";

const CONTACT_EMAIL = "office@hvactechnology.eu";

export default function CheckoutForm() {
  const { items, subtotal, hasUnpricedItems, clear } = useCart();
  const [orderReady, setOrderReady] = useState(null); // { mailtoHref, plainText }
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    delivery: "office",
    note: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const deliveryLabel = form.delivery === "office" ? "Вземане от офиса" : "Доставка на адрес";

    const itemLines = items
      .map(
        (i) =>
          `- ${i.name} x${i.qty} — ${
            i.price == null ? "цена при запитване" : `${formatPrice(i.price * i.qty)} лв.`
          }`
      )
      .join("\n");

    const subject = `Поръчка от онлайн магазина — ${form.name}`;
    const plainText = [
      `Име: ${form.name}`,
      `Телефон: ${form.phone}`,
      `Имейл: ${form.email}`,
      `Начин на получаване: ${deliveryLabel}`,
      form.delivery === "delivery" ? `Адрес: ${form.address}` : null,
      "",
      "Продукти:",
      itemLines,
      "",
      `Междинна сума: ${formatPrice(subtotal)} лв.`,
      "",
      form.note ? `Бележка: ${form.note}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(plainText)}`;

    setOrderReady({ mailtoHref, plainText });
  }

  function handleSendClick() {
    setSent(true);
    clear();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        `До: ${CONTACT_EMAIL}\n\n${orderReady.plainText}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard недостъпен — потребителят може да маркира текста ръчно
    }
  }

  if (items.length === 0 && !sent) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Количката е празна</h1>
        <p className="mt-3 text-slate">Добавете продукти от каталога, за да продължите към поръчка.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-light"
        >
          Към продуктите
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-ink">Готово</h1>
        <p className="mt-3 text-slate">
          Ако имейл клиентът ви се отвори, само натиснете изпращане в него. Ако не се отвори
          нищо, използвайте бутона за копиране на предишната стъпка и изпратете съобщението
          ръчно до {CONTACT_EMAIL} от вашата поща.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-light"
        >
          Обратно към магазина
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (orderReady) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-climate/10 text-climate-dark">
          <MailIcon className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-ink">Запитването е готово за изпращане</h1>
        <p className="mt-3 text-slate">
          Натиснете бутона, за да се отвори имейл клиентът ви с попълнено съобщение до{" "}
          <span className="font-semibold text-ink">{CONTACT_EMAIL}</span>.
        </p>

        <a
          href={orderReady.mailtoHref}
          onClick={handleSendClick}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light sm:w-auto"
        >
          <MailIcon className="h-4 w-4" />
          Изпрати през имейл клиента
        </a>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-mist p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate">
            Нямате настроен имейл клиент?
          </p>
          <p className="mt-1.5 text-sm text-slate">
            Копирайте текста на запитването и го изпратете ръчно от вашата поща (Gmail, Abv,
            и др.) до <span className="font-medium text-ink">{CONTACT_EMAIL}</span>.
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              copied ? "bg-emerald-600 text-white" : "bg-white text-ink hover:bg-slate-100"
            } border border-slate-300`}
          >
            {copied ? (
              <>
                <CheckIcon className="h-3.5 w-3.5" />
                Копирано
              </>
            ) : (
              <>
                <ClipboardIcon className="h-3.5 w-3.5" />
                Копирай текста на запитването
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOrderReady(null)}
          className="mt-6 text-sm font-medium text-slate hover:text-ink"
        >
          ← Назад към формата
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Завършване на поръчка</h1>
      <p className="mt-2 text-slate">
        Без онлайн плащане — изпращате запитване с избраните продукти, а екипът ни се
        свързва с вас за потвърждение.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="grid gap-5 lg:col-span-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-ink">
              Име
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Вашето име"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
              />
            </label>
            <label className="text-sm font-medium text-ink">
              Телефон
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+359 89 ..."
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
              />
            </label>
          </div>

          <label className="text-sm font-medium text-ink">
            Имейл
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>

          <fieldset className="grid gap-3">
            <legend className="text-sm font-medium text-ink">Начин на получаване</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm ${
                  form.delivery === "office" ? "border-climate bg-climate/5" : "border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="office"
                  checked={form.delivery === "office"}
                  onChange={handleChange}
                  className="accent-climate-dark"
                />
                Вземане от офиса
              </label>
              <label
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm ${
                  form.delivery === "delivery" ? "border-climate bg-climate/5" : "border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="delivery"
                  checked={form.delivery === "delivery"}
                  onChange={handleChange}
                  className="accent-climate-dark"
                />
                Доставка на адрес
              </label>
            </div>
          </fieldset>

          {form.delivery === "delivery" && (
            <label className="text-sm font-medium text-ink">
              Адрес за доставка
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="Град, улица, номер"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
              />
            </label>
          )}

          <label className="text-sm font-medium text-ink">
            Бележка към поръчката (незадължително)
            <textarea
              name="note"
              rows={4}
              value={form.note}
              onChange={handleChange}
              placeholder="Допълнителна информация за проекта или желан срок..."
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light sm:w-auto"
          >
            Продължи към изпращане
          </button>
        </form>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate">
              Резюме на поръчката
            </h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-ink">
                    {item.name} <span className="text-slate">x{item.qty}</span>
                  </span>
                  <span className="font-semibold text-ink">
                    {item.price == null
                      ? "Цена при запитване"
                      : `${formatPrice(item.price * item.qty)} лв.`}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-sm font-semibold text-ink">Общо</span>
              <span className="text-xl font-bold text-ink">{formatPrice(subtotal)} лв.</span>
            </div>
            {hasUnpricedItems && (
              <p className="mt-2 text-xs text-slate">
                Част от продуктите нямат обявена цена — ще получите оферта след запитването.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
