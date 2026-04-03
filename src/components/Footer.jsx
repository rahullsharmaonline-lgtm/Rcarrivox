import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { navigationLinks } from "../data/siteContent";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M13.5 21v-7.2H16l.4-2.8h-2.9V9.2c0-.8.3-1.6 1.7-1.6h1.4V5.2c-.2 0-1-.2-2-.2-2.1 0-3.5 1.3-3.5 3.8V11H9v2.8h2.2V21h2.3Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M18.9 3H21l-4.6 5.3L21.8 21h-4.9l-3.8-5-4.4 5H6.6l4.9-5.6L2.2 3h5l3.4 4.6L18.9 3Zm-1.7 15.9h1.3L6.5 5h-1.4l12.1 13.9Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.4 8.3A1.7 1.7 0 1 0 6.4 5a1.7 1.7 0 0 0 0 3.3ZM5.2 9.8h2.5V19H5.2V9.8Zm4.1 0h2.4v1.3h.1c.3-.6 1.2-1.5 2.5-1.5 2.7 0 3.2 1.8 3.2 4.1V19H15v-4.7c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V19H9.3V9.8Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#020617] text-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 px-6 py-16 md:grid-cols-3">
        <div className="flex flex-col items-start">
          <div className="mb-5">
            <BrandLogo variant="footer" />
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-400">
            Premium recruitment support for employers seeking dependable talent
            and professionals ready for their next meaningful move.
          </p>

          <div className="mt-6 flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/10 hover:text-white"
                >
                  <Icon />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Explore
          </p>
          <div className="grid grid-cols-2 gap-x-10 gap-y-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 transition duration-200 hover:translate-x-1 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Contact
          </p>
          <div className="flex flex-col gap-4 text-sm text-slate-400">
            <p>hello@rcarrivox.com</p>
            <p>+91 8789458173</p>
            <p>Mon - Sat | 9:00 AM - 6:30 PM</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 RCarrivox Consulting Pvt Ltd. All rights reserved.</p>
          <p>Built for confident hiring conversations and candidate journeys.</p>
        </div>
      </div>
    </footer>
  );
}
