import Link from "next/link";
import CTA from "../../components/CTA";
import PageIntro from "../../components/PageIntro";
import { candidateSupport } from "../../data/siteContent";

export const metadata = {
  title: "Candidates",
  description: "Career support and job opportunities for candidates.",
};

const candidateSteps = [
  "Share your profile and preferred role direction",
  "Get matched to suitable openings and hiring teams",
  "Prepare for interviews with practical guidance",
  "Stay informed throughout discussions and offer stages",
];

export default function CandidatesPage() {
  return (
    <>
      <PageIntro
        eyebrow="For Candidates"
        title="Thoughtful career support for professionals planning the next move."
        description="We work with candidates who want clarity, relevant opportunities, and a smoother recruitment experience from first discussion to final decision."
      />

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
              Candidate Experience
            </p>
            <div className="mt-8 grid gap-4">
              {candidateSupport.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md"
                >
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_100%)] p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
              How It Works
            </p>
            <div className="mt-8 space-y-4">
              {candidateSteps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <p className="text-xs font-semibold tracking-[0.3em] text-blue-900">
                    0{index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-16 text-white">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
                Ready to Apply
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Send your details and let&apos;s explore opportunities that fit.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Perfect for professionals exploring new openings, better
                alignment, or a structured job search conversation.
              </p>
            </div>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
            >
              Go to application form
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
