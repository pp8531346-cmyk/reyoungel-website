import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCurve } from "@/components/decor/SectionCurve";
import { HeaderWave } from "@/components/decor/HeaderWave";

export function PageHero({
  eyebrow,
  title,
  children,
  eyebrowEditId,
  titleEditId,
  descriptionEditId,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  /** Dev editor: the literals live in the calling page, not here, so each caller
   * supplies its own `data-edit-id` (with a matching `/* @edit:... *\/` marker
   * placed next to its own literal) rather than this shared component owning one. */
  eyebrowEditId?: string;
  titleEditId?: string;
  descriptionEditId?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-wine px-6 pb-16 pt-40 text-cream lg:px-10 lg:pb-20 lg:pt-48">
      {/* Bleeds down from beneath the fixed navbar, scrolls away with the page instead of
          staying pinned. Offset by --navbar-h, the navbar's real measured height (see
          Navbar.tsx), so it starts exactly at the navbar's bottom edge rather than under
          it — regardless of whether the compliance strip above it wraps to one or two
          lines on narrow mobile widths. */}
      <HeaderWave className="pointer-events-none absolute inset-x-0 top-[var(--navbar-h)] h-[130px] w-full" />

      <Reveal className="mx-auto max-w-3xl">
        <div className="mb-4 h-px w-12 bg-cream/40" aria-hidden />
        <p className="text-sm font-bold tracking-wide text-cream/70" data-edit-id={eyebrowEditId}>
          {eyebrow}
        </p>
        <h1
          className="mt-3 font-display text-4xl font-black leading-tight lg:text-5xl"
          data-edit-id={titleEditId}
        >
          {title}
        </h1>
        {children && (
          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 lg:text-lg"
            data-edit-id={descriptionEditId}
          >
            {children}
          </p>
        )}
      </Reveal>

      <SectionCurve
        fill="var(--color-ivory)"
        className="absolute inset-x-0 bottom-0 z-20 h-14 w-full lg:h-20"
      />
    </section>
  );
}
