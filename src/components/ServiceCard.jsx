import Image from "next/image";

export default function ServiceCard({
  code,
  title,
  description,
  image,
  imageAlt,
  index,
}) {
  return (
    <article className="group relative isolate overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/80 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_80px_-30px_rgba(30,58,138,0.28)]">
      <div className="absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.64),rgba(255,255,255,0.22))]" />
      <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.16),transparent_44%),linear-gradient(145deg,rgba(219,234,254,0),rgba(191,219,254,0.22))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        <div className="relative h-56 overflow-hidden rounded-[1.5rem]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/64 via-slate-900/28 to-slate-900/8 transition-all duration-300 group-hover:from-slate-950/72 group-hover:via-slate-900/36 group-hover:to-slate-900/12" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70" />

          <div className="absolute inset-x-6 top-6 flex items-start justify-between gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/18 text-sm font-semibold tracking-[0.22em] text-white shadow-sm backdrop-blur-md">
              {code}
            </div>
            <span className="rounded-full border border-white/20 bg-slate-950/20 px-3 py-1.5 text-xs font-semibold tracking-[0.3em] text-white/90 backdrop-blur-md">
              0{index + 1}
            </span>
          </div>

          <div className="absolute inset-x-6 bottom-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-100">
              Recruitment service
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {title}
            </h3>
          </div>
        </div>

        <div className="px-8 pb-8 pt-7">
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            {description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-blue-200 via-slate-200 to-transparent transition-colors duration-300 group-hover:from-blue-400 group-hover:via-blue-200" />
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 transition-colors duration-300 group-hover:text-blue-800">
              R Carrivox
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
