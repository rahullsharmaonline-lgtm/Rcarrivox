import Link from "next/link";
import { businessStats } from "../data/siteContent";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(30,58,138,0.18),_transparent_45%),linear-gradient(180deg,_#eff6ff_0%,_#ffffff_55%,_#f8fafc_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
      <div className="max-w-7xl mx-auto grid gap-14 px-6 py-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-900 shadow-sm">
            Recruitment Consultancy
          </span>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Precision hiring for businesses that want stronger teams.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            R Carrivox connects employers with high-intent talent and supports
            candidates with thoughtful, transparent career opportunities.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/employers"
              className="inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Hire with confidence
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-900 hover:text-blue-900"
            >
              Explore opportunities
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-blue-900/10 blur-3xl" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur">
            <div className="grid gap-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-900">
                  Search approach
                </p>
                <div className="mt-6 space-y-5">
                  {[
                    {
                      step: "01",
                      title: "Brief with depth",
                      text: "We define business context, role outcomes, and success signals before outreach starts.",
                    },
                    {
                      step: "02",
                      title: "Curated shortlist",
                      text: "Shortlists are built around capability, communication, intent, and long-term fit.",
                    },
                    {
                      step: "03",
                      title: "Close with care",
                      text: "Interview coordination and offer follow-through stay consistent through joining.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="grid gap-3 border-b border-slate-200 pb-5 last:border-b-0 last:pb-0 sm:grid-cols-[auto_1fr]"
                    >
                      <span className="text-xs font-semibold tracking-[0.3em] text-slate-400">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-lg font-semibold text-slate-950">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {businessStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:shadow-md"
                  >
                    <p className="text-lg font-semibold text-slate-950">{stat.value}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
