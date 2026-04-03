import Link from "next/link";
import CTA from "../../components/CTA";
import EmployerCard from "../../components/EmployerCard";
import PageIntro from "../../components/PageIntro";
import { employerSolutions } from "../../data/siteContent";

export const metadata = {
  title: "Employers",
  description: "Hiring support and recruitment solutions for employers.",
};

const sectors = [
  "Information Technology",
  "Operations and Shared Services",
  "Sales and Business Development",
  "Finance and Support Functions",
];

export default function EmployersPage() {
  return (
    <>
      <PageIntro
        eyebrow="For Employers"
        title="A reliable recruitment extension for teams that need stronger hiring control."
        description="We help employers define the search, attract relevant talent, and maintain momentum through interviews, feedback, and offer closure."
      />

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] p-8 shadow-sm">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
                For Employers
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                Hiring support that keeps quality high and process friction low.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Explore the employer-side support model through a horizontal set
                of service cards built for quick scanning and smooth browsing.
              </p>
            </div>

            <div className="relative mt-10">
              <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-16 [scroll-behavior:smooth]">
                {employerSolutions.map((solution, index) => (
                  <EmployerCard key={solution.title} index={index} {...solution} />
                ))}
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-white via-white/92 to-transparent lg:block" />
              <div className="pointer-events-none absolute bottom-6 right-0 hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 shadow-sm backdrop-blur lg:inline-flex">
                Scroll
                <span className="text-blue-900">-&gt;</span>
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
              Hiring Focus Areas
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Sector familiarity helps us move with better context.
            </h2>
            <div className="mt-8 space-y-4">
              {sectors.map((sector) => (
                <div
                  key={sector}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm transition hover:shadow-md"
                >
                  <p className="text-sm leading-7 text-slate-200">{sector}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
                Ready to Start
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                Share your hiring brief and we&apos;ll shape the search with you.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Ideal for companies hiring key roles, building teams, or
                improving recruitment responsiveness.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Contact R Carrivox
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
