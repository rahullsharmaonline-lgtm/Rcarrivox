import CTA from "../../components/CTA";
import PageIntro from "../../components/PageIntro";
import { companyValues, hiringSteps } from "../../data/siteContent";

export const metadata = {
  title: "About",
  description: "Learn about R Carrivox and our recruitment approach.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About R Carrivox"
        title="A recruitment partner focused on dependable hiring outcomes."
        description="R Carrivox was built to bring more structure, responsiveness, and care into the hiring journey for both employers and candidates."
      />

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
              Our Story
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              Built for recruitment conversations that feel informed and honest.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
              <p>
                We work with employers who need more than resumes. They need
                hiring support that understands urgency, team fit, candidate
                intent, and the standards expected from a trusted partner.
              </p>
              <p>
                Our approach stays balanced: deliberate enough to protect
                quality, responsive enough to keep momentum, and transparent
                enough to help both sides make confident decisions.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_100%)] p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
              What We Value
            </p>
            <div className="mt-6 space-y-5">
              {companyValues.map((value) => (
                <article
                  key={value.title}
                  className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-16 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
              Our Process
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A clear workflow from brief to successful joining.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {hiringSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="text-xs font-semibold tracking-[0.3em] text-blue-300">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
