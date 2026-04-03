export default function HomeEmployerCard({ title, description }) {
  return (
    <article className="group min-w-[300px] rounded-[1.5rem] border border-white/80 bg-white/92 p-6 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.24)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_80px_-30px_rgba(30,58,138,0.28)] md:min-w-[330px]">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-900">
          Employer Support
        </span>
        <span className="h-10 w-10 rounded-2xl bg-[linear-gradient(180deg,_#eff6ff_0%,_#dbeafe_100%)] shadow-sm" />
      </div>

      <h3 className="mt-7 text-xl font-semibold tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

      <div className="mt-7 flex items-center gap-3">
        <span className="h-px flex-1 bg-gradient-to-r from-blue-300 via-slate-200 to-transparent transition-colors duration-300 group-hover:from-blue-500 group-hover:via-blue-200" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500 transition-colors duration-300 group-hover:text-blue-800">
          R Carrivox
        </span>
      </div>
    </article>
  );
}
