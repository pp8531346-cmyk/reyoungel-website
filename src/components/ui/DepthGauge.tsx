import { cn } from "@/lib/utils";

const MAX_DEPTH = 5;

export function DepthGauge({
  depth,
  size = "sm",
  onWine = false,
  trackColor,
}: {
  depth: number;
  size?: "sm" | "lg";
  onWine?: boolean;
  /** Optional track color override — used on the products-showcase page to tie the
   * gauge to the Canva catalog's own gray, without touching the default look used
   * elsewhere (homepage product range, face-zone decor). */
  trackColor?: "hairline" | "catalog-gray";
}) {
  const percent = (depth / MAX_DEPTH) * 100;
  const isLg = size === "lg";

  return (
    <div className="flex flex-col items-center gap-1.5">
      {isLg && (
        <span className={cn("text-[10px] font-bold tracking-wide", onWine ? "text-cream/60" : "text-stone")}>
          עורי
        </span>
      )}
      <div
        className={cn(
          "relative w-1 rounded-full",
          isLg ? "h-24" : "h-10",
          onWine
            ? "bg-cream/20"
            : trackColor === "catalog-gray"
              ? "bg-catalog-gray"
              : "bg-hairline",
        )}
      >
        <span
          className={cn(
            "absolute start-1/2 rounded-full",
            isLg ? "h-2.5 w-2.5" : "h-1.5 w-1.5",
            onWine ? "bg-cream" : "bg-wine",
          )}
          style={{
            top: `${percent}%`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      </div>
      {isLg && (
        <span className={cn("text-[10px] font-bold tracking-wide", onWine ? "text-cream/60" : "text-stone")}>
          תת-עורי
        </span>
      )}
    </div>
  );
}
