import PageIntro from "../../components/PageIntro";

export const metadata = {
  title: "Apply",
  description: "Apply with R Carrivox using the frontend-ready form.",
};

function InputField({ label, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-900"
      />
    </label>
  );
}

export default function ApplyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Apply"
        title="Share your profile and preferred opportunity."
        description="This application form is UI-ready for the frontend phase, including resume upload styling and role preference inputs."
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
                "Upload your resume as part of the frontend-ready UI.",
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

          <form className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <InputField label="Full Name" placeholder="Enter your full name" />
              <InputField label="Email Address" type="email" placeholder="Enter your email" />
              <InputField label="Phone Number" type="tel" placeholder="Enter your phone number" />
              <InputField label="Current Location" placeholder="Enter your city" />
              <InputField label="Current Designation" placeholder="Enter current role" />
              <InputField label="Preferred Role" placeholder="Enter preferred role" />
            </div>

            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Years of Experience
              </span>
              <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-900">
                <option>0 - 2 Years</option>
                <option>2 - 5 Years</option>
                <option>5 - 8 Years</option>
                <option>8+ Years</option>
              </select>
            </label>

            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Upload Resume
              </span>
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-sm font-medium text-slate-700">
                  Drag and drop your resume here
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  PDF, DOC, DOCX up to 5 MB
                </p>
                <input
                  type="file"
                  className="mt-4 block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
              </div>
            </label>

            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Additional Notes
              </span>
              <textarea
                rows="5"
                placeholder="Share notice period, preferred locations, or key strengths"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-900"
              />
            </label>

            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Submit application
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
