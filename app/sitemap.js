const BASE_URL = "https://hvactechnology.bg";

export default function sitemap() {
  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/klimatizatsia", priority: 0.9, changeFrequency: "monthly" },
    { path: "/baseyni-spa", priority: 0.9, changeFrequency: "monthly" },
    { path: "/za-nas", priority: 0.6, changeFrequency: "yearly" },
    { path: "/kontakti", priority: 0.7, changeFrequency: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
