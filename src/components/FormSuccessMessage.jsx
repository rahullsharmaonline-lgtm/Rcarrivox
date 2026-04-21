export default function FormSuccessMessage({
  eyebrow = "Submitted",
  title,
  description,
}) {
  return (
    <div className="rounded-[1.75rem] border border-blue-100 bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_100%)] p-8 shadow-sm">
      <div className="flex flex-col items-start gap-6">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-blue-200/60 animate-ping" />
          <span className="absolute inset-2 rounded-full bg-blue-100" />
          <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-900 text-white shadow-[0_16px_34px_-18px_rgba(30,58,138,0.8)]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12.5 9.2 16.7 19 7.5" />
            </svg>
          </span>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-800">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
