"use client";

import { staggerDelay, useScrollReveal } from "@/hooks/useScrollReveal";

export type Source = { n: number; text: string };

function SourceItem({ source, index }: { source: Source; index: number }) {
  const revealRef = useScrollReveal<HTMLLIElement>();

  return (
    <li
      ref={revealRef}
      id={`source-${source.n}`}
      className="reveal-on-scroll flex gap-2 text-xs leading-relaxed text-stone"
      style={{ transitionDelay: `${staggerDelay(index)}ms` }}
    >
      <span className="shrink-0 font-bold text-wine" data-dev-no-edit="true">
        {source.n}.
      </span>
      <span data-edit-id={`src/app/page.tsx#sources-${index}-text`}>{source.text}</span>
    </li>
  );
}

export function SourcesList({ sources }: { sources: Source[] }) {
  return (
    <section className="border-t border-hairline bg-ivory px-6 py-10 lg:px-10">
      <ol className="mx-auto max-w-3xl space-y-2">
        {sources.map((s, i) => (
          <SourceItem key={s.n} source={s} index={i} />
        ))}
      </ol>
    </section>
  );
}
