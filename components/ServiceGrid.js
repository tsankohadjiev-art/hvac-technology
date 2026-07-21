const themeStyles = {
  climate: "bg-climate/10 text-climate-dark",
  aqua: "bg-aqua/10 text-aqua-dark",
};

export default function ServiceGrid({ items, theme = "climate" }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${themeStyles[theme]}`}
          >
            <item.icon className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
