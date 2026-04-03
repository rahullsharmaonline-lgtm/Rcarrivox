export default function HomeEmployerCard({ title, description }) {
  return (
    <article className="group min-w-[300px] rounded-[1.5rem] border border-white/80 bg-white/92 p-6 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.24)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_80px_-30px_rgba(30,58,138,0.28)] md:min-w-[330px]">
      <h3 className="text-xl font-semibold tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
