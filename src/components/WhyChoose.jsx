import { whyChooseItems } from "../data/siteContent";

export default function WhyChoose() {
  return (
    <section className="bg-slate-950 px-6 py-16 text-white">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
            Why Choose Us
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            A composed hiring partner for important recruitment decisions.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            We combine research, responsiveness, and relationship-led execution
            so employers hire with more certainty and candidates feel respected
            at every stage.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {whyChooseItems.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:border-blue-400/40 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
