import PageIntro from "../../components/PageIntro";

export const metadata = {
  title: "Contact",
  description: "Contact R Carrivox for recruitment support.",
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

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let&apos;s discuss your hiring needs or career plans."
        description="Use the form below to share your requirement. This is the UI-ready frontend and can be connected to a backend workflow in the next phase."
      />

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
              Contact Details
            </p>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Email
                </p>
                <p className="mt-2 text-lg text-white">hello@rcarrivox.com</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Phone
                </p>
                <p className="mt-2 text-lg text-white">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Availability
                </p>
                <p className="mt-2 text-lg text-white">Mon - Sat | 9:00 AM - 6:30 PM</p>
              </div>
            </div>
          </article>

          <form className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <InputField label="Full Name" placeholder="Enter your full name" />
              <InputField
                label="Company / Organization"
                placeholder="Enter company name"
              />
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
              />
              <InputField
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>

            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Requirement Type
              </span>
              <select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-900">
                <option>Employer Requirement</option>
                <option>Candidate Enquiry</option>
                <option>Partnership / General Enquiry</option>
              </select>
            </label>

            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Message
              </span>
              <textarea
                rows="6"
                placeholder="Tell us a little about your requirement"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-900"
              />
            </label>

            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
