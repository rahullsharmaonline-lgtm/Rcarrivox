export default function PageIntro({ eyebrow, title, description, tone = "light" }) {
  const isDark = tone === "dark";

  return (
    <section
      className={`px-6 py-16 ${
        isDark
          ? "bg-slate-950 text-white"
          : "bg-[radial-gradient(circle_at_top_left,_rgba(30,58,138,0.12),_transparent_40%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.28em] ${
              isDark ? "text-blue-300" : "text-blue-900"
            }`}
          >
            {eyebrow}
          </p>
          <h1
            className={`mt-4 text-4xl font-semibold tracking-tight sm:text-5xl ${
              isDark ? "text-white" : "text-slate-950"
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-5 text-lg leading-8 ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
