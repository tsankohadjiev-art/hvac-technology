const themes = {
  climate: "from-navy via-climate-dark to-climate",
  aqua: "from-navy via-aqua-dark to-aqua",
  navy: "from-navy-dark via-navy to-navy-light",
};

export default function PageHero({ eyebrow, title, description, theme = "navy", logo }) {
  return (
    <section className={`bg-gradient-to-br ${themes[theme]} text-white`}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        {logo && <div className="mb-6">{logo}</div>}
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
