export default function EmployerCard({ title, description, details }) {
  return (
    <article className="group min-w-[320px] snap-start rounded-[1.75rem] border border-white/80 bg-white p-8 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_80px_-32px_rgba(15,23,42,0.28)] md:min-w-[340px]">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
      </div>

      <ul className="mt-8 space-y-3">
        {details.map((detail) => (
          <li key={detail} className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700" />
            <span className="text-sm leading-7 text-slate-700">{detail}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
