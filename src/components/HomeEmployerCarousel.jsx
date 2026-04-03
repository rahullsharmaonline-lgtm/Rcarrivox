import HomeEmployerCard from "./HomeEmployerCard";

export default function HomeEmployerCarousel({ items }) {
  return (
    <div className="relative mt-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/85 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent" />

      <div className="home-employer-marquee">
        <div className="home-employer-marquee-track">
          {[items, items].map((group, groupIndex) => (
            <div key={groupIndex} className="home-employer-marquee-group">
              {group.map((item) => (
                <HomeEmployerCard
                  key={`${groupIndex}-${item.title}`}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
