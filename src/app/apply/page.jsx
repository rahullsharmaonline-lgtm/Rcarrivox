import PageIntro from "../../components/PageIntro";
import CandidateApplyForm from "../../components/CandidateApplyForm";

export const metadata = {
  title: "Apply",
  description: "Apply with R Carrivox through our live candidate submission form.",
};

export default function ApplyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Apply"
        title="Share your profile and preferred opportunity."
        description="Take the next step in your career by sharing your details with us. Upload your resume and let our team connect you with opportunities that match your skills and goals. We review every application carefully to ensure the right fit."
      />

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_100%)] p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-900">
              Before You Submit
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Add your latest contact details and location.",
                "Mention the role, function, or industry you are targeting.",
                "Upload your latest resume in PDF, DOC, or DOCX format.",
                "Use the message area to share notice period or preferences.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <CandidateApplyForm />
        </div>
      </section>
    </>
  );
}
