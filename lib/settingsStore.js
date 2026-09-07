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

const klimatizatsiaCopy = {
  bg: {
    heroTitle: "Климатизация и отопление",
    heroDescription:
      "Осигуряваме комфортен и здравословен микроклимат в дома и офиса — от проектиране и доставка на оборудване до монтаж и сервизно обслужване.",
    howWorkEyebrow: "Как работим",
    howWorkTitle: "Етапи на изграждане на проекта",
    flagshipEyebrow: "Флагманско решение",
    flagshipTitle: "Пълна система за отопление и охлаждане",
    flagshipDescription:
      "Термопомпа + Подово отопление + БГВ + Климатици — едно комплексно решение, което съчетава ефективност, комфорт и икономия през цялата година.",
    servicesEyebrow: "Нашите услуги",
    servicesTitle: "Пълен набор от инженерни решения",
    galleryEyebrow: "Реализирани обекти",
    galleryTitle: "От нашите монтажи",
    ctaTitle: "Нуждаете се от климатична или отоплителна система?",
    ctaDescription: "Свържете се с нас за оглед и безплатна оферта.",
  },
  en: {
    heroTitle: "Air Conditioning & Heating",
    heroDescription:
      "We provide a comfortable and healthy microclimate at home and in the office — from design and equipment supply to installation and service.",
    howWorkEyebrow: "How We Work",
    howWorkTitle: "Project stages",
    flagshipEyebrow: "Flagship Solution",
    flagshipTitle: "A complete heating and cooling system",
    flagshipDescription:
      "Heat pump + Underfloor heating + DHW + Air conditioners — one comprehensive solution combining efficiency, comfort and savings all year round.",
    servicesEyebrow: "Our Services",
    servicesTitle: "A full range of engineering solutions",
    galleryEyebrow: "Completed Projects",
    galleryTitle: "From our installations",
    ctaTitle: "Need an air conditioning or heating system?",
    ctaDescription: "Contact us for a site visit and a free quote.",
  },
  stats: [
    { value: { bg: "COP 5", en: "COP 5" }, label: { bg: "Ефективност", en: "Efficiency" } },
    {
      value: { bg: "55°C", en: "55°C" },
      label: { bg: "Гореща вода целогодишно", en: "Hot water year-round" },
    },
    { value: { bg: "0 CO₂", en: "0 CO₂" }, label: { bg: "Емисии", en: "Emissions" } },
    {
      value: { bg: "4 в 1", en: "4-in-1" },
      label: { bg: "Решения в една система", en: "Solutions in one system" },
    },
  ],
  advantages: [
    {
      icon: "SparklesIcon",
      title: { bg: "Разумна инвестиция", en: "A Smart Investment" },
      description: {
        bg: "Висока ефективност при оптимално съотношение цена — качество.",
        en: "High efficiency at an optimal price-to-quality ratio.",
      },
    },
    {
      icon: "ThermometerIcon",
      title: { bg: "Равномерен топлинен комфорт", en: "Even Thermal Comfort" },
      description: {
        bg: "Подовото отопление затопля равномерно цялата стая.",
        en: "Underfloor heating warms the entire room evenly.",
      },
    },
    {
      icon: "DropletIcon",
      title: { bg: "Гореща вода 55°C целогодишно", en: "Hot Water at 55°C Year-Round" },
      description: {
        bg: "БГВ бойлер, захранван директно от термопомпата.",
        en: "A DHW boiler powered directly by the heat pump.",
      },
    },
    {
      icon: "SnowflakeIcon",
      title: { bg: "Ефективно охлаждане", en: "Efficient Cooling" },
      description: {
        bg: "Климатиците охлаждат по-ефективно от конвекторите през лятото.",
        en: "Air conditioners cool more efficiently than convectors in summer.",
      },
    },
    {
      icon: "FlameIcon",
      title: { bg: "Бързо отопление в преходния сезон", en: "Fast Heating in the Transitional Season" },
      description: {
        bg: "Климатиците затоплят помещението само за минути.",
        en: "Air conditioners warm the room in just minutes.",
      },
    },
    {
      icon: "ShieldCheckIcon",
      title: { bg: "Екологична и без емисии", en: "Eco-Friendly & Emission-Free" },
      description: {
        bg: "Без изгаряне на газ или твърдо гориво — 0 емисии CO₂.",
        en: "No gas or solid fuel combustion — 0 CO₂ emissions.",
      },
    },
  ],
  services: [
    {
      icon: "SnowflakeIcon",
      title: { bg: "Климатизация", en: "Air Conditioning" },
      description: {
        bg: "Проектиране и монтаж на климатични системи за жилищни, търговски и промишлени обекти.",
        en: "Design and installation of air conditioning systems for residential, commercial and industrial sites.",
      },
    },
    {
      icon: "FlameIcon",
      title: { bg: "Отопление", en: "Heating" },
      description: {
        bg: "Монтаж на отоплителни системи и котли за ефективно и сигурно отопление през студените месеци.",
        en: "Installation of heating systems and boilers for efficient, reliable heating through the cold months.",
      },
    },
    {
      icon: "ThermometerIcon",
      title: { bg: "Термопомпи", en: "Heat Pumps" },
      description: {
        bg: "Енергийно ефективни решения за отопление, охлаждане и топла вода целогодишно.",
        en: "Energy-efficient solutions for heating, cooling and hot water all year round.",
      },
    },
    {
      icon: "RulerIcon",
      title: { bg: "Проектиране", en: "Design" },
      description: {
        bg: "Индивидуални технически проекти, съобразени със спецификата на обекта и нуждите на клиента.",
        en: "Individual technical projects tailored to the specifics of the site and the client's needs.",
      },
    },
    {
      icon: "WrenchIcon",
      title: { bg: "Поддръжка и сервиз", en: "Maintenance & Service" },
      description: {
        bg: "Профилактика, диагностика и ремонт на вече инсталирани климатични и отоплителни системи.",
        en: "Prevention, diagnostics and repair of already installed air conditioning and heating systems.",
      },
    },
  ],
  gallery: [
    { src: "/images/klimatizatsia-real/klim-01.jpg", alt: { bg: "Външно тяло Mitsubishi Electric на балкон", en: "Mitsubishi Electric outdoor unit on a balcony" } },
    { src: "/images/klimatizatsia-real/klim-02.jpg", alt: { bg: "Вътрешно тяло Mitsubishi Electric над врата", en: "Mitsubishi Electric indoor unit above a door" } },
    { src: "/images/klimatizatsia-real/klim-03.jpg", alt: { bg: "Вътрешно тяло Mitsubishi Electric", en: "Mitsubishi Electric indoor unit" } },
    { src: "/images/klimatizatsia-real/klim-04.jpg", alt: { bg: "Вътрешно тяло Mitsubishi Electric, черен модел", en: "Mitsubishi Electric indoor unit, black model" } },
    { src: "/images/klimatizatsia-real/klim-05.jpg", alt: { bg: "Вътрешно тяло Daikin", en: "Daikin indoor unit" } },
    { src: "/images/klimatizatsia-real/klim-06.jpg", alt: { bg: "Монтаж на външно тяло на климатик", en: "Installation of an outdoor AC unit" } },
    { src: "/images/klimatizatsia-real/klim-07.jpg", alt: { bg: "Външно тяло Daikin на терасa", en: "Daikin outdoor unit on a terrace" } },
    { src: "/images/klimatizatsia-real/klim-08.jpg", alt: { bg: "Външно тяло Mitsubishi Electric на ъглов монтаж", en: "Mitsubishi Electric outdoor unit, corner mount" } },
    { src: "/images/klimatizatsia-real/klim-09.jpg", alt: { bg: "Две външни тела Mitsubishi Electric", en: "Two Mitsubishi Electric outdoor units" } },
    { src: "/images/klimatizatsia-real/klim-10.jpg", alt: { bg: "Монтиран котел Viessmann", en: "Installed Viessmann boiler" } },
    { src: "/images/klimatizatsia-real/klim-11.jpg", alt: { bg: "Табло за управление на котел Viessmann", en: "Viessmann boiler control panel" } },
    { src: "/images/klimatizatsia-real/klim-12.jpg", alt: { bg: "Сервизно обслужване на климатик", en: "AC service and maintenance" } },
  ],
};

const baseyniSpaCopy = {
  bg: {
    heroTitle: "Басейни, СПА и водни съоръжения",
    heroDescription:
      "Integrated Building Systems Engineering — проектираме и изграждаме, разглеждайки обекта като една екосистема. Именно този интегриран подход се използва при проектирането на съвременни СПА комплекси, басейни, аквапаркове, лечебни и уелнес центрове от най-висок клас. Двете работещи заедно направления на Hvac Technology позволяват изготвянето на правилна концепция, направа на безупречен проект, безпроблемно изпълнение и дългосрочна експлоатация в полза на инвеститори и клиенти.",
    servicesEyebrow: "Нашите услуги",
    servicesTitle: "Водни съоръжения с внимание към детайла",
    howWorkEyebrow: "Как работим",
    howWorkTitle: "Етапи на изграждане на проекта",
    auditEyebrow: "Партньорство",
    auditTitle: "Технически одит на водни съоръжения",
    auditDescription:
      "Нашият екип изготвя пълен детайлен анализ на съоръжението и оценка на работата на всички системи – филтрация, дезинфекция, циркулация, отопление, автоматизация и енергийна ефективност.",
    galleryEyebrow: "Реализирани обекти",
    galleryTitle: "От нашите изградени съоръжения",
    ctaTitle: "Планирате басейн или СПА зона?",
    ctaDescription: "Свържете се с нас за консултация и индивидуална оферта.",
  },
  en: {
    heroTitle: "Pools, Spa & Water Facilities",
    heroDescription:
      "Integrated Building Systems Engineering — we design and build by treating the site as one ecosystem. This is the integrated approach used in designing modern spa complexes, pools, water parks, and top-class wellness centers. The two divisions of Hvac Technology working together enable a sound concept, a flawless project, smooth execution and long-term operation for the benefit of investors and clients.",
    servicesEyebrow: "Our Services",
    servicesTitle: "Water facilities with attention to detail",
    howWorkEyebrow: "How We Work",
    howWorkTitle: "Project stages",
    auditEyebrow: "Partnership",
    auditTitle: "Technical Audit of Water Facilities",
    auditDescription:
      "Our team prepares a full, detailed analysis of the facility and an assessment of all systems — filtration, disinfection, circulation, heating, automation and energy efficiency.",
    galleryEyebrow: "Completed Projects",
    galleryTitle: "From our built facilities",
    ctaTitle: "Planning a pool or spa area?",
    ctaDescription: "Contact us for a consultation and an individual quote.",
  },
  showcaseImage: "/images/baseyni-spa-real/pool-01.jpg",
  auditImage: "/images/baseyni-spa/pool-filtration-room.jpg",
  services: [
    {
      icon: "WavesIcon",
      title: { bg: "Изграждане на басейни", en: "Pool Construction" },
      description: {
        bg: "Проектиране и строителство на басейни за дома, хотели и обществени обекти.",
        en: "Design and construction of pools for homes, hotels and public facilities.",
      },
    },
    {
      icon: "SparklesIcon",
      title: { bg: "СПА и уелнес центрове", en: "Spa & Wellness Centers" },
      description: {
        bg: "Комплексно оборудване на СПА зони за релакс, възстановяване и уелнес преживяване.",
        en: "Complete equipping of spa areas for relaxation, recovery and a wellness experience.",
      },
    },
    {
      icon: "DropletIcon",
      title: { bg: "Джакузи и хидромасажни вани", en: "Jacuzzis & Hot Tubs" },
      description: {
        bg: "Доставка и монтаж на джакузита и хидромасажни вани за дома и бизнеса.",
        en: "Supply and installation of jacuzzis and hot tubs for home and business.",
      },
    },
    {
      icon: "ShieldCheckIcon",
      title: { bg: "Пречистване на вода", en: "Water Purification" },
      description: {
        bg: "Системи за филтрация и дезинфекция, гарантиращи чиста и безопасна вода.",
        en: "Filtration and disinfection systems that guarantee clean and safe water.",
      },
    },
    {
      icon: "RulerIcon",
      title: { bg: "Проектиране и облицовка", en: "Design & Tiling" },
      description: {
        bg: "Индивидуални проекти и качествена облицовка, съобразени с визията на обекта.",
        en: "Individual projects and quality tiling, tailored to the vision of the site.",
      },
    },
    {
      icon: "WrenchIcon",
      title: { bg: "Поддръжка и сервиз", en: "Maintenance & Service" },
      description: {
        bg: "Редовно обслужване и сервиз на басейни, СПА съоръжения и водна техника.",
        en: "Regular servicing and maintenance of pools, spa facilities and water equipment.",
      },
    },
  ],
  gallery: [],
};

const zaNasCopy = {
  bg: {
    heroEyebrow: "Hvac Technology",
    heroTitle: "Едно име, две направления, общ стремеж към качество",
    heroDescription:
      "Hvac Technology е компания, изградена около два взаимно допълващи се екипа от специалисти — един в областта на климатизацията и отоплението, и друг в изграждането на басейни, СПА и водни съоръжения.",
    missionEyebrow: "Мисия",
    missionTitle: "Комфорт и качество във всеки проект",
    missionDescription:
      "Вярваме, че добрият микроклимат и качествените водни съоръжения имат пряко значение за комфорта на дома и бизнеса. Затова подхождаме към всеки проект индивидуално — от малка климатична инсталация до цялостно изграждане на СПА зона.",
    valuesEyebrow: "Нашите ценности",
    valuesTitle: "Какво ни отличава",
  },
  en: {
    heroEyebrow: "Hvac Technology",
    heroTitle: "One name, two divisions, a shared commitment to quality",
    heroDescription:
      "Hvac Technology is a company built around two complementary teams of specialists — one in air conditioning and heating, and another in the construction of pools, spas and water facilities.",
    missionEyebrow: "Mission",
    missionTitle: "Comfort and quality in every project",
    missionDescription:
      "We believe that a good microclimate and quality water facilities have a direct impact on the comfort of a home or business. That is why we approach every project individually — from a small air conditioning installation to the complete construction of a spa area.",
    valuesEyebrow: "Our Values",
    valuesTitle: "What sets us apart",
  },
  directions: [
    {
      icon: "SnowflakeIcon",
      title: { bg: "Климатизация и отопление", en: "Air Conditioning & Heating" },
      description: {
        bg: "Решения за поддържане на здравословен и комфортен климат целогодишно.",
        en: "Solutions for maintaining a healthy and comfortable climate all year round.",
      },
    },
    {
      icon: "WavesIcon",
      title: { bg: "Басейни, СПА и водни съоръжения", en: "Pools, Spa & Water Facilities" },
      description: {
        bg: "Изграждане на пространства за релакс, спорт и отдих около водата.",
        en: "Building spaces for relaxation, sport and leisure around water.",
      },
    },
  ],
  values: [
    {
      icon: "UsersIcon",
      title: { bg: "Екип от специалисти", en: "A Team of Specialists" },
      description: {
        bg: "Инженери и техници с опит в проектирането и изпълнението на инсталации и съоръжения.",
        en: "Engineers and technicians experienced in designing and executing installations and facilities.",
      },
    },
    {
      icon: "WrenchIcon",
      title: { bg: "Комплексен подход", en: "A Complete Approach" },
      description: {
        bg: "От първоначалната консултация, през проектиране и монтаж, до сервиз и поддръжка.",
        en: "From the initial consultation, through design and installation, to service and maintenance.",
      },
    },
    {
      icon: "ShieldCheckIcon",
      title: { bg: "Качество и гаранция", en: "Quality & Warranty" },
      description: {
        bg: "Работим с доказани марки оборудване и стоим зад извършената работа.",
        en: "We work with proven equipment brands and stand behind our work.",
      },
    },
    {
      icon: "ClockIcon",
      title: { bg: "Дългосрочно партньорство", en: "Long-Term Partnership" },
      description: {
        bg: "Изграждаме доверие чрез коректност, срокове и грижа за клиента и след приключване на проекта.",
        en: "We build trust through reliability, meeting deadlines, and caring for the client even after the project is complete.",
      },
    },
  ],
};

const kontaktiCopy = {
  bg: {
    heroEyebrow: "Hvac Technology",
    heroTitle: "Свържете се с нас",
    heroDescription:
      "Пишете ни за консултация, оглед или оферта — независимо дали въпросът е за климатизация, отопление, басейн или СПА.",
    formTitle: "Изпратете запитване",
    formDescription: "Попълнете формата и ще се свържем с вас възможно най-скоро.",
    contactDetailsTitle: "Данни за контакт",
    followUsTitle: "Последвайте ни",
    locationEyebrow: "Локация",
    locationTitle: "Намерете ни на картата",
  },
  en: {
    heroEyebrow: "Hvac Technology",
    heroTitle: "Get in Touch",
    heroDescription:
      "Write to us for a consultation, site visit or quote — whether your question is about air conditioning, heating, a pool or a spa.",
    formTitle: "Send an Inquiry",
    formDescription: "Fill out the form and we will get back to you as soon as possible.",
    contactDetailsTitle: "Contact Details",
    followUsTitle: "Follow Us",
    locationEyebrow: "Location",
    locationTitle: "Find Us on the Map",
  },
};

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
  pages: {
    klimatizatsia: klimatizatsiaCopy,
    baseyniSpa: baseyniSpaCopy,
    zaNas: zaNasCopy,
    kontakti: kontaktiCopy,
  },
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

function isPlainObject(v) {
  return v != null && typeof v === "object" && !Array.isArray(v);
}

// Дълбоко обединява настройките с дефолтите: обектите се сливат поле по
// поле (рекурсивно), а масивите/примитивите от `overrides` изместват
// изцяло тези от `base` (масивите — продукти, галерии — се управляват
// изцяло от admin панела, не се "сливат" ред по ред).
export function mergeWithDefaults(overrides, base = DEFAULT_SETTINGS) {
  if (!isPlainObject(overrides)) return base;
  const result = { ...base };
  for (const key of Object.keys(base)) {
    if (!(key in overrides)) continue;
    const baseVal = base[key];
    const overrideVal = overrides[key];
    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = mergeWithDefaults(overrideVal, baseVal);
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }
  return result;
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
