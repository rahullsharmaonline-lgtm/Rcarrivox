import Image from "next/image";
import Link from "next/link";

export default function BrandLogo({
  href = "/",
  onClick,
  variant = "nav",
}) {
  const isFooter = variant === "footer";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center rounded-xl transition duration-300 hover:scale-[1.01] hover:opacity-90 ${
        isFooter ? "px-0 py-0" : "px-1 py-1"
      }`}
    >
      <Image
        src="/brand/rcarrivox-logo-transparent.png?v=2"
        alt="RCarrivox Consulting Pvt Ltd logo"
        width={689}
        height={521}
        priority={!isFooter}
        unoptimized
        sizes={
          isFooter
            ? "(max-width: 640px) 170px, (max-width: 1024px) 190px, 220px"
            : "(max-width: 640px) 195px, (max-width: 1024px) 234px, 286px"
        }
        className={
          isFooter
            ? "h-12 w-auto object-contain sm:h-14 lg:h-16"
            : "h-[3.25rem] w-auto object-contain sm:h-14 lg:h-[3.9rem]"
        }
      />
    </Link>
  );
}
