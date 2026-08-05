export type Source = { n: number; text: string };

export function SourcesList({ sources }: { sources: Source[] }) {
  return (
    <section className="border-t border-hairline bg-ivory px-6 py-10 lg:px-10">
      <ol className="mx-auto max-w-3xl space-y-2">
        {sources.map((s) => (
          <li key={s.n} id={`source-${s.n}`} className="flex gap-2 text-xs leading-relaxed text-stone">
            <span className="shrink-0 font-bold text-wine">{s.n}.</span>
            <span>{s.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
