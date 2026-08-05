import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 text-cream/80 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Bioha Laboratories Group Ltd
            <br />
            9 Pantygraigwen Road, Pontypridd, UK CF37 2RR
            <br />
            מילויים היאלורוניים · טכנולוגיית SAX-HA®
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {[...navLinks, { label: "צור קשר", href: "/contact" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm text-cream/70 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-cream/10 pt-6 text-xs text-cream/40">
        © {new Date().getFullYear()} Reyoungel® · Bioha Laboratories. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
