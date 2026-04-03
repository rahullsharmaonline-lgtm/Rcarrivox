import CTA from "../../components/CTA";
import PageIntro from "../../components/PageIntro";
import { hiringSteps, serviceCards } from "../../data/siteContent";

export const metadata = {
  title: "Services",
  description: "Explore recruitment services offered by R Carrivox.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="Flexible recruitment support for different hiring priorities."
        description="We support focused leadership search, recurring recruitment demand, and hiring strategy refinement with a practical, market-aware process."
      />

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2">
          {serviceCards.map((service) => (
            <article
              key={service.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
                Service
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                {service.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
              Delivery Model
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Structured execution without unnecessary complexity.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Every engagement follows a clear path so hiring teams know what to
              expect and when to act.
            </p>
          </div>

          <div className="grid gap-5">
            {hiringSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-900">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
