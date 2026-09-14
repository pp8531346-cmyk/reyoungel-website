import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Shared shell for the long-form legal pages (privacy, terms, cookies,
 * accessibility) — same navbar/footer/RTL/fonts/brand color as every other
 * page, but deliberately plainer than the marketing sections: a simple title
 * + "last updated" line, then prose-width content, no hero band or decorative
 * curves. `max-w-2xl` on the content column keeps line length readable for
 * dense legal text instead of stretching it edge-to-edge.
 */
export function LegalPage({
  title,
  updatedDate,
  children,
}: {
  title: string;
  updatedDate: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>
        <article className="mx-auto max-w-2xl px-6 pb-20 pt-[max(7rem,11vh)] lg:px-0 lg:pb-28">
          <h1 className="font-display text-3xl font-black leading-tight text-ink lg:text-4xl">
            {title}
          </h1>
          {/* text-ink/65, not the site's usual text-stone — text-stone measures
              3.37:1 against bg-ivory here (confirmed via axe-core), under WCAG
              AA's 4.5:1 minimum for text. /65 clears it (5.47:1) while still
              reading as muted secondary text, not full-strength body ink. */}
          <p className="mt-2 text-sm font-bold text-ink/65">עדכון אחרון: {updatedDate}</p>
          <div className="mt-10 flex flex-col gap-6 text-sm leading-relaxed text-ink lg:text-base">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

/** Numbered-section heading used throughout the legal pages — factored out
 * purely so the h2 styling stays identical across all four pages without
 * retyping the className each time. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-display text-lg font-black text-wine lg:text-xl">{title}</h2>
      {children}
    </section>
  );
}
