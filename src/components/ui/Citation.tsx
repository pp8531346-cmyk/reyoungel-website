import { cn } from "@/lib/utils";

export function Citation({ n, onWine = false }: { n: number; onWine?: boolean }) {
  return (
    <sup className="ms-0.5" data-dev-no-edit="true">
      <a
        href={`#source-${n}`}
        className={cn(
          "text-[0.7em] font-bold no-underline hover:underline",
          onWine ? "text-cream" : "text-wine",
        )}
      >
        {n}
      </a>
    </sup>
  );
}
