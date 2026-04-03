import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto rounded-[2rem] bg-blue-900 px-8 py-12 text-white shadow-sm sm:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">
              Let&apos;s Connect
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start a recruitment conversation built on clarity and follow-through.
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100">
              Whether you are hiring for growth or looking for the next step in
              your career, we are ready to support the move.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
            >
              Book a consultation
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Submit your profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
