import Link from "next/link";
import ServiceCard from "./ServiceCard";
import { serviceCards } from "../data/siteContent";

export default function Services() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Recruitment support shaped around business goals and hiring pace.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            From priority leadership searches to steady pipeline hiring, we
            design the search around the role, team, and timeline.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {serviceCards.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/services"
            className="inline-flex items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-900 hover:text-blue-900"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}
