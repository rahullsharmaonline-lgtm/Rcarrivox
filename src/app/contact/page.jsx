import PageIntro from "../../components/PageIntro";
import ContactQueryForm from "../../components/ContactQueryForm";

export const metadata = {
  title: "Contact",
  description: "Contact R Carrivox for recruitment support.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let&apos;s discuss your hiring needs or career plans."
        description="Use the form below to share your hiring requirement, candidate enquiry, or partnership request directly with our team."
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
                <p className="mt-2 text-lg text-white">+91 8789458173</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Availability
                </p>
                <p className="mt-2 text-lg text-white">Mon - Sat | 9:00 AM - 6:30 PM</p>
              </div>
            </div>
          </article>

          <ContactQueryForm />
        </div>
      </section>
    </>
  );
}
