"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "./BrandLogo";
import { navigationLinks } from "../data/siteContent";

function NavLink({ href, label, active, onNavigate }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
        active
          ? "bg-blue-900 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between gap-8 py-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-5">
            <BrandLogo onClick={() => setMenuOpen(false)} />
            <div className="hidden h-10 w-px bg-slate-200 sm:block" />
            <p className="max-w-[7.2rem] text-[0.5rem] leading-[1.2] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:max-w-none sm:whitespace-nowrap sm:text-[0.68rem] sm:leading-none sm:tracking-[0.32em] lg:text-xs">
              Carrying Talent Forward
            </p>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                active={pathname === link.href}
              />
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-blue-900 hover:text-blue-900 lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="max-w-7xl mx-auto flex flex-col gap-2 px-6 py-4">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                active={pathname === link.href}
                onNavigate={() => setMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
