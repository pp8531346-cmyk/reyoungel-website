import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCurve } from "@/components/decor/SectionCurve";
import { HeaderWave } from "@/components/decor/HeaderWave";

const DEFAULT_TITLE_SIZE = "text-2xl font-black leading-tight sm:text-4xl lg:text-5xl";

export function PageHero({
  eyebrow,
  title,
  children,
  eyebrowEditId,
  titleEditId,
  descriptionEditId,
  titleSizeClassName = DEFAULT_TITLE_SIZE,
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
  /** Font-size(+weight/leading) utility classes for the title, replacing (not
   * merging with — `cn` here is plain clsx, not tailwind-merge, so concatenating
   * a second `text-*` class wouldn't reliably win the cascade) the default. Each
   * of this component's 3 callers has a title of very different length, so one
   * shared size can't be "as large as possible while fitting its own required
   * line count" for all three at once — override per caller when the default
   * doesn't fit that page's specific title. */
  titleSizeClassName?: string;
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
        <h1 className={`mt-3 font-display ${titleSizeClassName}`} data-edit-id={titleEditId}>
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
