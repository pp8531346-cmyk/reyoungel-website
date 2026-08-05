"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ComplianceBar } from "@/components/layout/ComplianceBar";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
// Inert data — just saved x/y offsets from the dev editor's drag-to-reposition.
// Empty by default, so this has zero visual effect until something is dragged and saved.
import devPositions from "@/dev-editor/positions.json";

const logoOffset = (devPositions as Record<string, { x: number; y: number }>)["navbar-logo"] ?? {
  x: 0,
  y: 0,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-[background,box-shadow] duration-300",
        scrolled ? "shadow-md" : "shadow-none",
      )}
      style={{
        background: scrolled
          ? "linear-gradient(to left, color-mix(in srgb, var(--color-wine), transparent 16%) 0%, color-mix(in srgb, color-mix(in srgb, var(--color-wine), white 12%), transparent 16%) 100%)"
          : "linear-gradient(to left, var(--color-wine) 0%, color-mix(in srgb, var(--color-wine), white 12%) 100%)",
      }}
    >
      <ComplianceBar />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1 lg:px-10">
        {/* Invisible placeholder — preserves the logo's original width in the flex layout so
            nav links / contact button keep their normal position; the real, enlarged logo is
            rendered separately below as an absolutely-positioned element. */}
        <span aria-hidden className="block h-px w-[85px] shrink-0" />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-bold text-cream/85 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full border border-cream/40 px-5 py-2 text-sm font-bold text-cream transition-colors hover:bg-cream/10 sm:inline-flex md:hidden lg:inline-flex"
        >
          צור קשר
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "סגירת התפריט" : "פתיחת התפריט"}
          onClick={() => setOpen((v) => !v)}
          className="text-cream md:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-cream/15 bg-wine px-6 pb-6 pt-2 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-bold text-cream/90 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-fit rounded-full border border-cream/40 px-5 py-2 text-sm font-bold text-cream transition-colors hover:bg-cream/10"
          >
            צור קשר
          </Link>
        </nav>
      )}

      {/* Enlarged logo — spans the flat bar and bleeds down over the wave, staying within the red area */}
      <Link
        href="/"
        aria-label="Reyoungel — עמוד הבית"
        onClick={() => setOpen(false)}
        data-dev-positionable="navbar-logo"
        className="absolute right-6 top-1 z-10 lg:right-10"
        style={{ transform: `translate(${logoOffset.x}px, ${logoOffset.y}px)` }}
      >
        <Logo imgClassName="h-[56px] w-auto object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)]" />
      </Link>
    </header>
  );
}
