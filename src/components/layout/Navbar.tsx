"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ComplianceBar } from "@/components/layout/ComplianceBar";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
// Inert data — just saved x/y offsets (and, for images, scale) from the dev editor's
// drag-to-reposition / drag-to-resize. Empty by default, so this has zero visual effect
// until something is dragged and saved. Read directly here (rather than relying on the
// dev-editor overlay's own reapply effect) so the saved value is real production styling
// for every visitor, not just a dev-mode preview — the overlay itself never ships to
// production at all (see DevEditorGate).
import devPositions from "@/dev-editor/positions.json";
import devSizes from "@/dev-editor/sizes.json";

const logoOffset = (devPositions as Record<string, { x: number; y: number }>)["navbar-logo"] ?? {
  x: 0,
  y: 0,
};
const logoOffsetMobile = (devPositions as Record<string, { x: number; y: number }>)[
  "navbar-logo-mobile"
] ?? { x: 0, y: 0 };
const logoScaleMobile =
  (devSizes as Record<string, { kind: string; scale: number }>)[
    "src/components/layout/Navbar.tsx#navbar-logo-mobile-img"
  ]?.scale ?? 1;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Publishes the flat bar's real height (compliance strip + logo/nav row) as
  // --navbar-h so decor layers glued to the navbar's bottom edge (HeaderWave)
  // stay aligned even when the compliance strip wraps to two lines on narrow
  // mobile widths. Measures only this wrapper, not the conditional mobile
  // dropdown below it, since that overlay expanding shouldn't shift the wave.
  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty("--navbar-h", `${el.offsetHeight}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
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
      <div ref={barRef}>
        <ComplianceBar />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1 lg:px-10">
        {/* Mobile: a real, compact logo sitting in-flow in this row, next to the hamburger —
            the desktop treatment (large, absolutely-positioned, bleeding down over the wave)
            doesn't translate to mobile, where the compliance bar wraps to two lines and there's
            no headroom for a large overlay logo without either overlapping that text or
            spilling past the flat bar into the hero band below. Desktop: collapses to an
            invisible 1px placeholder (pointer-events-none, so it's also inert as a dev-editor
            drag/resize target there) that only reserves the enlarged logo's width in this flex
            row so the nav links / contact button keep their centered position — the real
            desktop logo is the separate absolutely-positioned element further down.
            Draggable + resizable in dev mode like the desktop logo below: data-dev-positionable
            makes the Link itself drag-to-reposition (saved under "navbar-logo-mobile", applied
            above as a base translate independent of the desktop logo's own offset); the img's
            data-edit-id gives it the same corner resize handle every dev-editor image gets,
            saved to sizes.json and applied above as a base scale. */}
        <Link
          href="/"
          aria-label="Reyoungel — עמוד הבית"
          onClick={() => setOpen(false)}
          data-dev-positionable="navbar-logo-mobile"
          className="flex h-9 w-24 shrink-0 items-center justify-start lg:pointer-events-none lg:h-px"
          style={{ transform: `translate(${logoOffsetMobile.x}px, ${2 + logoOffsetMobile.y}px)` }}
        >
          <Logo
            imgClassName="h-9 w-auto object-contain lg:hidden"
            imgStyle={{ transform: `scale(${logoScaleMobile})` }}
            data-edit-id="src/components/layout/Navbar.tsx#navbar-logo-mobile-img"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-bold text-cream/85 transition-colors hover:text-cream"
              data-edit-id={`src/lib/data.ts#navLinks-${i}-label`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hover-lift-btn hidden rounded-full border border-cream/40 px-5 py-2 text-sm font-bold text-cream transition-colors hover:bg-cream/10 sm:inline-flex md:hidden lg:inline-flex"
          data-edit-id="src/components/layout/Navbar.tsx#contact-link-desktop"
        >
          {/* @edit:contact-link-desktop */}
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
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-cream/15 bg-wine px-6 pb-6 pt-2 md:hidden"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-bold text-cream/90 transition-colors hover:text-cream"
              data-edit-id={`src/lib/data.ts#navLinks-${i}-label`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="hover-lift-btn mt-2 inline-flex w-fit rounded-full border border-cream/40 px-5 py-2 text-sm font-bold text-cream transition-colors hover:bg-cream/10"
            data-edit-id="src/components/layout/Navbar.tsx#contact-link-mobile"
          >
            {/* @edit:contact-link-mobile */}
            צור קשר
          </Link>
        </nav>
      )}

      {/* Enlarged logo — desktop only. Spans the flat bar and bleeds down over the wave,
          staying within the red area; mobile has its own compact in-flow logo above instead. */}
      <Link
        href="/"
        aria-label="Reyoungel — עמוד הבית"
        onClick={() => setOpen(false)}
        data-dev-positionable="navbar-logo"
        className="absolute right-10 top-1 z-10 hidden lg:block"
        style={{ transform: `translate(${logoOffset.x}px, ${logoOffset.y}px)` }}
      >
        <Logo
          imgClassName="h-[56px] w-auto object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
          data-edit-id="src/components/layout/Navbar.tsx#navbar-logo-img"
        />
      </Link>
    </header>
  );
}
