import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 text-cream/80 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:justify-between">
        <div>
          <Logo data-edit-id="src/components/layout/Footer.tsx#footer-logo-img" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            <span data-edit-id="src/components/layout/Footer.tsx#address-line-1">
              {/* @edit:address-line-1 */}
              Bioha Laboratories Group Ltd
            </span>
            <br />
            <span data-edit-id="src/components/layout/Footer.tsx#address-line-2">
              {/* @edit:address-line-2 */}
              
            </span>
            <br />
            <span data-edit-id="src/components/layout/Footer.tsx#address-line-3">
              {/* @edit:address-line-3 */}
              מילויים היאלורוניים · טכנולוגיית SAX-HA
            </span>
            <br />
            <a href="tel:0502328000" className="transition-colors hover:text-cream" dir="ltr">
              050-232-8000
            </a>
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {[...navLinks, { label: "צור קשר", href: "/contact" }].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm text-cream/70 transition-colors hover:text-cream"
              data-edit-id={i < navLinks.length ? `src/lib/data.ts#navLinks-${i}-label` : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-cream/10 pt-6 text-xs text-cream/40">
        {/* Year is computed, not editable — only the static tail is wired to the dev editor. */}
        © {new Date().getFullYear()} <span data-edit-id="src/components/layout/Footer.tsx#footer-copyright">{/* @edit:footer-copyright */}Reyoungel · Bioha Laboratories. כל הזכויות שמורות.</span>
      </div>
    </footer>
  );
}
