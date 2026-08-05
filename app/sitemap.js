const BASE_URL = "https://hvactechnology.bg";

export default function sitemap() {
  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/klimatizatsia", priority: 0.9, changeFrequency: "monthly" },
    { path: "/baseyni-spa", priority: 0.9, changeFrequency: "monthly" },
    { path: "/za-nas", priority: 0.6, changeFrequency: "yearly" },
    { path: "/kontakti", priority: 0.7, changeFrequency: "yearly" },
  ];

  const now = new Date();

  return routes.flatMap((route) => {
    const bgUrl = `${BASE_URL}${route.path}`;
    const enUrl = `${BASE_URL}/en${route.path}`;
    const alternates = {
      languages: {
        "bg-BG": bgUrl,
        "en-US": enUrl,
      },
    };

    return [
      {
        url: bgUrl,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates,
      },
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority * 0.9,
        alternates,
      },
    ];
  });
}
