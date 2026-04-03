import Link from "next/link";
import { candidateSupport, employerSolutions } from "../data/siteContent";
import HomeEmployerCarousel from "./HomeEmployerCarousel";

export default function SplitSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto grid gap-6 xl:grid-cols-2">
        <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] p-8 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.22)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(30,58,138,0.08),_transparent_36%)]" />
          <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
            For Employers
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            Hiring support that keeps quality high and process friction low.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Explore our core employer services through a premium moving card
            rail that keeps the homepage feeling active, polished, and easy to
            scan.
          </p>
          <HomeEmployerCarousel items={employerSolutions} />
          <Link
            href="/employers"
            className="mt-8 inline-flex rounded-full bg-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Explore employer solutions
          </Link>
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_100%)] p-8 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
            For Candidates
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            Career opportunities with guidance, clarity, and momentum.
          </h2>
          <div className="mt-8 space-y-4">
            {candidateSupport.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <Link
            href="/candidates"
            className="mt-8 inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-900 hover:text-blue-900"
          >
            View candidate support
          </Link>
        </article>
      </div>
    </section>
  );
}
