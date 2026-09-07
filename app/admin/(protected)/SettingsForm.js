"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, PlusIcon, XIcon } from "@/components/Icons";
import { ICON_OPTIONS, resolveIcon } from "@/lib/icons";

const PAGE_LABELS = {
  klimatizatsia: "Климатизация",
  baseyniSpa: "Басейни и СПА",
  zaNas: "За нас",
  kontakti: "Контакти",
};

async function uploadFile(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Грешка при качване.");
  return data.url;
}

function Card({ title, children }) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-4 grid gap-4">{children}</div>
    </div>
  );
}

function LangPair({ label, bg, en, onBgChange, onEnChange, multiline }) {
  const Field = multiline ? "textarea" : "input";
  return (
    <div>
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-1.5 grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate">
          Български
          <Field
            {...(multiline ? { rows: 3 } : { type: "text" })}
            value={bg}
            onChange={(e) => onBgChange(e.target.value)}
            className="mt-1 w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal normal-case text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
          />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate">
          English
          <Field
            {...(multiline ? { rows: 3 } : { type: "text" })}
            value={en}
            onChange={(e) => onEnChange(e.target.value)}
            className="mt-1 w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal normal-case text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
          />
        </label>
      </div>
    </div>
  );
}

// Редактор на повтарящ се списък (услуги / предимства / ценности / посоки).
// Всеки елемент носи (по избор) икона, споделена за двата езика, плюс
// заглавие и описание, всяко въведено отделно на български и английски.
function ItemListEditor({ items, onUpdateField, onUpdateIcon, onAdd, onRemove, hasIcon }) {
  return (
    <div className="grid gap-4">
      {items.map((item, idx) => {
        const Icon = hasIcon ? resolveIcon(item.icon) : null;
        return (
          <div key={idx} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {hasIcon && (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist text-slate">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <select
                      value={item.icon}
                      onChange={(e) => onUpdateIcon(idx, e.target.value)}
                      className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
                    >
                      {ICON_OPTIONS.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:text-red-500"
                aria-label="Премахни"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid gap-3">
              <LangPair
                label="Заглавие"
                bg={item.title?.bg ?? ""}
                en={item.title?.en ?? ""}
                onBgChange={(v) => onUpdateField(idx, "title", "bg", v)}
                onEnChange={(v) => onUpdateField(idx, "title", "en", v)}
              />
              <LangPair
                label="Описание"
                multiline
                bg={item.description?.bg ?? ""}
                en={item.description?.en ?? ""}
                onBgChange={(v) => onUpdateField(idx, "description", "bg", v)}
                onEnChange={(v) => onUpdateField(idx, "description", "en", v)}
              />
            </div>
          </div>
        );
      })}
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mist px-3.5 py-1.5 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink"
      >
        <PlusIcon className="h-3.5 w-3.5" />
        Добави елемент
      </button>
    </div>
  );
}

// Редактор на списък стойност/етикет (напр. статистиките на страница
// "Климатизация" — COP 5, 55°C и т.н.), без икона.
function StatListEditor({ items, onUpdateField, onAdd, onRemove }) {
  return (
    <div className="grid gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate">
              Елемент {idx + 1}
            </span>
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 hover:text-red-500"
              aria-label="Премахни"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 grid gap-3">
            <LangPair
              label="Стойност"
              bg={item.value?.bg ?? ""}
              en={item.value?.en ?? ""}
              onBgChange={(v) => onUpdateField(idx, "value", "bg", v)}
              onEnChange={(v) => onUpdateField(idx, "value", "en", v)}
            />
            <LangPair
              label="Етикет"
              bg={item.label?.bg ?? ""}
              en={item.label?.en ?? ""}
              onBgChange={(v) => onUpdateField(idx, "label", "bg", v)}
              onEnChange={(v) => onUpdateField(idx, "label", "en", v)}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mist px-3.5 py-1.5 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink"
      >
        <PlusIcon className="h-3.5 w-3.5" />
        Добави елемент
      </button>
    </div>
  );
}

function GalleryEditor({ photos, onAdd, onRemove, onAltChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file);
      onAdd(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, idx) => (
          <div key={idx} className="rounded-xl border border-slate-200 p-3">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-mist">
              <Image src={photo.src} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-600 hover:text-red-500"
                aria-label="Премахни снимката"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
            <input
              type="text"
              value={photo.alt?.bg ?? ""}
              onChange={(e) => onAltChange(idx, "bg", e.target.value)}
              placeholder="Описание (BG)"
              className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1 text-xs text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
            <input
              type="text"
              value={photo.alt?.en ?? ""}
              onChange={(e) => onAltChange(idx, "en", e.target.value)}
              placeholder="Description (EN)"
              className="mt-1.5 w-full rounded-md border border-slate-300 px-2 py-1 text-xs text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </div>
        ))}
      </div>
      <label className="mt-4 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-mist px-4 py-2 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink">
        <ImageIcon className="h-4 w-4" />
        {uploading ? "Качване..." : "Добави снимка"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function SingleImageField({ label, src, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      onChange(await uploadFile(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-1.5 flex items-center gap-4">
        <div className="relative flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-mist">
          {src ? (
            <Image src={src} alt="" fill className="object-cover" />
          ) : (
            <span className="text-xs text-slate-400">Без снимка</span>
          )}
        </div>
        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-mist px-4 py-2 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink">
          <ImageIcon className="h-4 w-4" />
          {uploading ? "Качване..." : "Качи снимка"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function SettingsForm({ initialSettings }) {
  const [form, setForm] = useState(initialSettings);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [activePage, setActivePage] = useState("klimatizatsia");

  function update(field, value) {
    setSaved(false);
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateAddress(lang, value) {
    setSaved(false);
    setForm((prev) => ({ ...prev, address: { ...prev.address, [lang]: value } }));
  }

  function updateHero(lang, field, value) {
    setSaved(false);
    setForm((prev) => ({
      ...prev,
      hero: { ...prev.hero, [lang]: { ...prev.hero[lang], [field]: value } },
    }));
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      update("heroImage", await uploadFile(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  // ---- Генерични помощни функции за съдържанието на конкретна страница ----

  function updatePages(pageKey, updater) {
    setSaved(false);
    setForm((prev) => {
      const pages = { ...prev.pages };
      pages[pageKey] = { ...pages[pageKey] };
      updater(pages[pageKey]);
      return { ...prev, pages };
    });
  }

  function updatePageText(pageKey, lang, field, value) {
    updatePages(pageKey, (page) => {
      page[lang] = { ...page[lang], [field]: value };
    });
  }

  function updatePageValue(pageKey, field, value) {
    updatePages(pageKey, (page) => {
      page[field] = value;
    });
  }

  function updateListField(pageKey, listKey, idx, field, lang, value) {
    updatePages(pageKey, (page) => {
      const list = [...page[listKey]];
      list[idx] = { ...list[idx], [field]: { ...list[idx][field], [lang]: value } };
      page[listKey] = list;
    });
  }

  function updateListIcon(pageKey, listKey, idx, icon) {
    updatePages(pageKey, (page) => {
      const list = [...page[listKey]];
      list[idx] = { ...list[idx], icon };
      page[listKey] = list;
    });
  }

  function addListItem(pageKey, listKey, template) {
    updatePages(pageKey, (page) => {
      page[listKey] = [...page[listKey], template];
    });
  }

  function removeListItem(pageKey, listKey, idx) {
    updatePages(pageKey, (page) => {
      page[listKey] = page[listKey].filter((_, i) => i !== idx);
    });
  }

  function addGalleryPhoto(pageKey, src) {
    updatePages(pageKey, (page) => {
      page.gallery = [...page.gallery, { src, alt: { bg: "", en: "" } }];
    });
  }

  function removeGalleryPhoto(pageKey, idx) {
    updatePages(pageKey, (page) => {
      page.gallery = page.gallery.filter((_, i) => i !== idx);
    });
  }

  function updateGalleryAlt(pageKey, idx, lang, value) {
    updatePages(pageKey, (page) => {
      const gallery = [...page.gallery];
      gallery[idx] = { ...gallery[idx], alt: { ...gallery[idx].alt, [lang]: value } };
      page.gallery = gallery;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Грешка при запис.");
      setForm(data);
      setSaved(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const emptyItem = { icon: "SnowflakeIcon", title: { bg: "", en: "" }, description: { bg: "", en: "" } };
  const emptyStat = { value: { bg: "", en: "" }, label: { bg: "", en: "" } };

  const page = form.pages[activePage];

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold text-ink">Настройки на сайта</h1>
      <p className="mt-1 text-sm text-slate">
        Контакти, начална страница и съдържанието на всеки основен раздел — на български и английски.
      </p>

      <Card title="Контакти">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-ink">
            Телефон (за показване)
            <input
              type="text"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+359 89 347 2443"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>
          <label className="text-sm font-medium text-ink">
            Телефон (линк, tel:+359...)
            <input
              type="text"
              value={form.phoneHref}
              onChange={(e) => update("phoneHref", e.target.value)}
              placeholder="tel:+359893472443"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
            />
          </label>
        </div>
        <label className="text-sm font-medium text-ink">
          Имейл
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-climate focus:ring-2 focus:ring-climate/20"
          />
        </label>
        <LangPair
          label="Адрес"
          bg={form.address.bg}
          en={form.address.en}
          onBgChange={(v) => updateAddress("bg", v)}
          onEnChange={(v) => updateAddress("en", v)}
        />
      </Card>

      <Card title="Начална страница — снимка">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-mist">
            {form.heroImage ? (
              <div className="relative h-full w-full">
                <Image src={form.heroImage} alt="" fill className="object-cover" />
              </div>
            ) : (
              <span className="text-xs text-slate-400">Без снимка</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-mist px-4 py-2 text-xs font-semibold text-slate hover:bg-slate-200 hover:text-ink">
              <ImageIcon className="h-4 w-4" />
              {uploading ? "Качване..." : "Качи снимка"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {form.heroImage && (
              <button
                type="button"
                onClick={() => update("heroImage", null)}
                className="text-left text-xs font-medium text-slate hover:text-red-600"
              >
                Премахни снимката
              </button>
            )}
          </div>
        </div>
      </Card>

      <Card title="Начална страница — текст">
        <LangPair
          label="Заглавие"
          multiline
          bg={form.hero.bg.title}
          en={form.hero.en.title}
          onBgChange={(v) => updateHero("bg", "title", v)}
          onEnChange={(v) => updateHero("en", "title", v)}
        />
        <LangPair
          label="Подзаглавие"
          bg={form.hero.bg.subtitle}
          en={form.hero.en.subtitle}
          onBgChange={(v) => updateHero("bg", "subtitle", v)}
          onEnChange={(v) => updateHero("en", "subtitle", v)}
        />
        <LangPair
          label="Описание"
          multiline
          bg={form.hero.bg.description}
          en={form.hero.en.description}
          onBgChange={(v) => updateHero("bg", "description", v)}
          onEnChange={(v) => updateHero("en", "description", v)}
        />
      </Card>

      <div className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="text-lg font-bold text-ink">Съдържание по раздели</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.keys(PAGE_LABELS).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActivePage(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activePage === key ? "bg-navy text-white" : "bg-mist text-slate hover:bg-slate-200"
              }`}
            >
              {PAGE_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {activePage === "klimatizatsia" && (
        <>
          <Card title="Климатизация — начало на страницата">
            <LangPair
              label="Заглавие"
              multiline
              bg={page.bg.heroTitle}
              en={page.en.heroTitle}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "heroTitle", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "heroTitle", v)}
            />
            <LangPair
              label="Описание"
              multiline
              bg={page.bg.heroDescription}
              en={page.en.heroDescription}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "heroDescription", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "heroDescription", v)}
            />
          </Card>

          <Card title="Секция „Как работим“">
            <LangPair
              label="Надпис"
              bg={page.bg.howWorkEyebrow}
              en={page.en.howWorkEyebrow}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "howWorkEyebrow", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "howWorkEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.howWorkTitle}
              en={page.en.howWorkTitle}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "howWorkTitle", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "howWorkTitle", v)}
            />
          </Card>

          <Card title="Флагманско решение">
            <LangPair
              label="Надпис"
              bg={page.bg.flagshipEyebrow}
              en={page.en.flagshipEyebrow}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "flagshipEyebrow", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "flagshipEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.flagshipTitle}
              en={page.en.flagshipTitle}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "flagshipTitle", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "flagshipTitle", v)}
            />
            <LangPair
              label="Описание"
              multiline
              bg={page.bg.flagshipDescription}
              en={page.en.flagshipDescription}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "flagshipDescription", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "flagshipDescription", v)}
            />
          </Card>

          <Card title="Флагманско решение — статистики">
            <StatListEditor
              items={page.stats}
              onUpdateField={(idx, field, lang, value) =>
                updateListField("klimatizatsia", "stats", idx, field, lang, value)
              }
              onAdd={() => addListItem("klimatizatsia", "stats", emptyStat)}
              onRemove={(idx) => removeListItem("klimatizatsia", "stats", idx)}
            />
          </Card>

          <Card title="Флагманско решение — предимства">
            <ItemListEditor
              items={page.advantages}
              hasIcon
              onUpdateField={(idx, field, lang, value) =>
                updateListField("klimatizatsia", "advantages", idx, field, lang, value)
              }
              onUpdateIcon={(idx, icon) => updateListIcon("klimatizatsia", "advantages", idx, icon)}
              onAdd={() => addListItem("klimatizatsia", "advantages", emptyItem)}
              onRemove={(idx) => removeListItem("klimatizatsia", "advantages", idx)}
            />
          </Card>

          <Card title="Услуги">
            <LangPair
              label="Надпис"
              bg={page.bg.servicesEyebrow}
              en={page.en.servicesEyebrow}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "servicesEyebrow", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "servicesEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.servicesTitle}
              en={page.en.servicesTitle}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "servicesTitle", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "servicesTitle", v)}
            />
            <ItemListEditor
              items={page.services}
              hasIcon
              onUpdateField={(idx, field, lang, value) =>
                updateListField("klimatizatsia", "services", idx, field, lang, value)
              }
              onUpdateIcon={(idx, icon) => updateListIcon("klimatizatsia", "services", idx, icon)}
              onAdd={() => addListItem("klimatizatsia", "services", emptyItem)}
              onRemove={(idx) => removeListItem("klimatizatsia", "services", idx)}
            />
          </Card>

          <Card title="Галерия „Реализирани обекти“">
            <LangPair
              label="Надпис"
              bg={page.bg.galleryEyebrow}
              en={page.en.galleryEyebrow}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "galleryEyebrow", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "galleryEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.galleryTitle}
              en={page.en.galleryTitle}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "galleryTitle", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "galleryTitle", v)}
            />
            <GalleryEditor
              photos={page.gallery}
              onAdd={(src) => addGalleryPhoto("klimatizatsia", src)}
              onRemove={(idx) => removeGalleryPhoto("klimatizatsia", idx)}
              onAltChange={(idx, lang, value) => updateGalleryAlt("klimatizatsia", idx, lang, value)}
            />
          </Card>

          <Card title="Долен банер (CTA)">
            <LangPair
              label="Заглавие"
              bg={page.bg.ctaTitle}
              en={page.en.ctaTitle}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "ctaTitle", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "ctaTitle", v)}
            />
            <LangPair
              label="Описание"
              bg={page.bg.ctaDescription}
              en={page.en.ctaDescription}
              onBgChange={(v) => updatePageText("klimatizatsia", "bg", "ctaDescription", v)}
              onEnChange={(v) => updatePageText("klimatizatsia", "en", "ctaDescription", v)}
            />
          </Card>
        </>
      )}

      {activePage === "baseyniSpa" && (
        <>
          <Card title="Басейни и СПА — начало на страницата">
            <LangPair
              label="Заглавие"
              bg={page.bg.heroTitle}
              en={page.en.heroTitle}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "heroTitle", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "heroTitle", v)}
            />
            <LangPair
              label="Описание"
              multiline
              bg={page.bg.heroDescription}
              en={page.en.heroDescription}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "heroDescription", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "heroDescription", v)}
            />
            <SingleImageField
              label="Голяма снимка под заглавието"
              src={page.showcaseImage}
              onChange={(url) => updatePageValue("baseyniSpa", "showcaseImage", url)}
            />
          </Card>

          <Card title="Услуги">
            <LangPair
              label="Надпис"
              bg={page.bg.servicesEyebrow}
              en={page.en.servicesEyebrow}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "servicesEyebrow", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "servicesEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.servicesTitle}
              en={page.en.servicesTitle}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "servicesTitle", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "servicesTitle", v)}
            />
            <ItemListEditor
              items={page.services}
              hasIcon
              onUpdateField={(idx, field, lang, value) =>
                updateListField("baseyniSpa", "services", idx, field, lang, value)
              }
              onUpdateIcon={(idx, icon) => updateListIcon("baseyniSpa", "services", idx, icon)}
              onAdd={() => addListItem("baseyniSpa", "services", emptyItem)}
              onRemove={(idx) => removeListItem("baseyniSpa", "services", idx)}
            />
          </Card>

          <Card title="Секция „Как работим“">
            <LangPair
              label="Надпис"
              bg={page.bg.howWorkEyebrow}
              en={page.en.howWorkEyebrow}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "howWorkEyebrow", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "howWorkEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.howWorkTitle}
              en={page.en.howWorkTitle}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "howWorkTitle", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "howWorkTitle", v)}
            />
          </Card>

          <Card title="Технически одит">
            <LangPair
              label="Надпис"
              bg={page.bg.auditEyebrow}
              en={page.en.auditEyebrow}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "auditEyebrow", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "auditEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.auditTitle}
              en={page.en.auditTitle}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "auditTitle", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "auditTitle", v)}
            />
            <LangPair
              label="Описание"
              multiline
              bg={page.bg.auditDescription}
              en={page.en.auditDescription}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "auditDescription", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "auditDescription", v)}
            />
            <SingleImageField
              label="Снимка на секцията"
              src={page.auditImage}
              onChange={(url) => updatePageValue("baseyniSpa", "auditImage", url)}
            />
          </Card>

          <Card title="Галерия „Реализирани обекти“">
            <LangPair
              label="Надпис"
              bg={page.bg.galleryEyebrow}
              en={page.en.galleryEyebrow}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "galleryEyebrow", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "galleryEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.galleryTitle}
              en={page.en.galleryTitle}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "galleryTitle", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "galleryTitle", v)}
            />
            <GalleryEditor
              photos={page.gallery}
              onAdd={(src) => addGalleryPhoto("baseyniSpa", src)}
              onRemove={(idx) => removeGalleryPhoto("baseyniSpa", idx)}
              onAltChange={(idx, lang, value) => updateGalleryAlt("baseyniSpa", idx, lang, value)}
            />
            {page.gallery.length === 0 && (
              <p className="text-xs text-slate">
                Все още няма снимки тук — добавете първата, за да се появи галерия на страницата.
              </p>
            )}
          </Card>

          <Card title="Долен банер (CTA)">
            <LangPair
              label="Заглавие"
              bg={page.bg.ctaTitle}
              en={page.en.ctaTitle}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "ctaTitle", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "ctaTitle", v)}
            />
            <LangPair
              label="Описание"
              bg={page.bg.ctaDescription}
              en={page.en.ctaDescription}
              onBgChange={(v) => updatePageText("baseyniSpa", "bg", "ctaDescription", v)}
              onEnChange={(v) => updatePageText("baseyniSpa", "en", "ctaDescription", v)}
            />
          </Card>
        </>
      )}

      {activePage === "zaNas" && (
        <>
          <Card title="За нас — начало на страницата">
            <LangPair
              label="Надпис"
              bg={page.bg.heroEyebrow}
              en={page.en.heroEyebrow}
              onBgChange={(v) => updatePageText("zaNas", "bg", "heroEyebrow", v)}
              onEnChange={(v) => updatePageText("zaNas", "en", "heroEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              multiline
              bg={page.bg.heroTitle}
              en={page.en.heroTitle}
              onBgChange={(v) => updatePageText("zaNas", "bg", "heroTitle", v)}
              onEnChange={(v) => updatePageText("zaNas", "en", "heroTitle", v)}
            />
            <LangPair
              label="Описание"
              multiline
              bg={page.bg.heroDescription}
              en={page.en.heroDescription}
              onBgChange={(v) => updatePageText("zaNas", "bg", "heroDescription", v)}
              onEnChange={(v) => updatePageText("zaNas", "en", "heroDescription", v)}
            />
          </Card>

          <Card title="Мисия">
            <LangPair
              label="Надпис"
              bg={page.bg.missionEyebrow}
              en={page.en.missionEyebrow}
              onBgChange={(v) => updatePageText("zaNas", "bg", "missionEyebrow", v)}
              onEnChange={(v) => updatePageText("zaNas", "en", "missionEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.missionTitle}
              en={page.en.missionTitle}
              onBgChange={(v) => updatePageText("zaNas", "bg", "missionTitle", v)}
              onEnChange={(v) => updatePageText("zaNas", "en", "missionTitle", v)}
            />
            <LangPair
              label="Описание"
              multiline
              bg={page.bg.missionDescription}
              en={page.en.missionDescription}
              onBgChange={(v) => updatePageText("zaNas", "bg", "missionDescription", v)}
              onEnChange={(v) => updatePageText("zaNas", "en", "missionDescription", v)}
            />
          </Card>

          <Card title="Двете направления">
            <ItemListEditor
              items={page.directions}
              hasIcon
              onUpdateField={(idx, field, lang, value) =>
                updateListField("zaNas", "directions", idx, field, lang, value)
              }
              onUpdateIcon={(idx, icon) => updateListIcon("zaNas", "directions", idx, icon)}
              onAdd={() => addListItem("zaNas", "directions", emptyItem)}
              onRemove={(idx) => removeListItem("zaNas", "directions", idx)}
            />
          </Card>

          <Card title="Нашите ценности">
            <LangPair
              label="Надпис"
              bg={page.bg.valuesEyebrow}
              en={page.en.valuesEyebrow}
              onBgChange={(v) => updatePageText("zaNas", "bg", "valuesEyebrow", v)}
              onEnChange={(v) => updatePageText("zaNas", "en", "valuesEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.valuesTitle}
              en={page.en.valuesTitle}
              onBgChange={(v) => updatePageText("zaNas", "bg", "valuesTitle", v)}
              onEnChange={(v) => updatePageText("zaNas", "en", "valuesTitle", v)}
            />
            <ItemListEditor
              items={page.values}
              hasIcon
              onUpdateField={(idx, field, lang, value) =>
                updateListField("zaNas", "values", idx, field, lang, value)
              }
              onUpdateIcon={(idx, icon) => updateListIcon("zaNas", "values", idx, icon)}
              onAdd={() => addListItem("zaNas", "values", emptyItem)}
              onRemove={(idx) => removeListItem("zaNas", "values", idx)}
            />
          </Card>
        </>
      )}

      {activePage === "kontakti" && (
        <>
          <Card title="Контакти — начало на страницата">
            <LangPair
              label="Надпис"
              bg={page.bg.heroEyebrow}
              en={page.en.heroEyebrow}
              onBgChange={(v) => updatePageText("kontakti", "bg", "heroEyebrow", v)}
              onEnChange={(v) => updatePageText("kontakti", "en", "heroEyebrow", v)}
            />
            <LangPair
              label="Заглавие"
              bg={page.bg.heroTitle}
              en={page.en.heroTitle}
              onBgChange={(v) => updatePageText("kontakti", "bg", "heroTitle", v)}
              onEnChange={(v) => updatePageText("kontakti", "en", "heroTitle", v)}
            />
            <LangPair
              label="Описание"
              multiline
              bg={page.bg.heroDescription}
              en={page.en.heroDescription}
              onBgChange={(v) => updatePageText("kontakti", "bg", "heroDescription", v)}
              onEnChange={(v) => updatePageText("kontakti", "en", "heroDescription", v)}
            />
          </Card>

          <Card title="Форма за запитване">
            <LangPair
              label="Заглавие"
              bg={page.bg.formTitle}
              en={page.en.formTitle}
              onBgChange={(v) => updatePageText("kontakti", "bg", "formTitle", v)}
              onEnChange={(v) => updatePageText("kontakti", "en", "formTitle", v)}
            />
            <LangPair
              label="Описание"
              bg={page.bg.formDescription}
              en={page.en.formDescription}
              onBgChange={(v) => updatePageText("kontakti", "bg", "formDescription", v)}
              onEnChange={(v) => updatePageText("kontakti", "en", "formDescription", v)}
            />
          </Card>

          <Card title="Други надписи">
            <LangPair
              label='"Данни за контакт"'
              bg={page.bg.contactDetailsTitle}
              en={page.en.contactDetailsTitle}
              onBgChange={(v) => updatePageText("kontakti", "bg", "contactDetailsTitle", v)}
              onEnChange={(v) => updatePageText("kontakti", "en", "contactDetailsTitle", v)}
            />
            <LangPair
              label='"Последвайте ни"'
              bg={page.bg.followUsTitle}
              en={page.en.followUsTitle}
              onBgChange={(v) => updatePageText("kontakti", "bg", "followUsTitle", v)}
              onEnChange={(v) => updatePageText("kontakti", "en", "followUsTitle", v)}
            />
            <LangPair
              label="Надпис над картата"
              bg={page.bg.locationEyebrow}
              en={page.en.locationEyebrow}
              onBgChange={(v) => updatePageText("kontakti", "bg", "locationEyebrow", v)}
              onEnChange={(v) => updatePageText("kontakti", "en", "locationEyebrow", v)}
            />
            <LangPair
              label="Заглавие над картата"
              bg={page.bg.locationTitle}
              en={page.en.locationTitle}
              onBgChange={(v) => updatePageText("kontakti", "bg", "locationTitle", v)}
              onEnChange={(v) => updatePageText("kontakti", "en", "locationTitle", v)}
            />
          </Card>
        </>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {saved && <p className="mt-4 text-sm text-emerald-600">Запазено успешно.</p>}

      <div className="sticky bottom-0 mt-6 flex justify-end border-t border-slate-200 bg-cloud py-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Запазване..." : "Запази настройките"}
        </button>
      </div>
    </form>
  );
}
