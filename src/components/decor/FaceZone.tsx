import { cn } from "@/lib/utils";

const MAX_DEPTH = 5;

// Marker travels from the outer-eye area (depth 1, fine surface lines) down
// toward the jaw/contour (depth 5, deep structural volume) — and grows
// larger + softer with depth, echoing DepthGauge's superficial→subdermal cue.
const positions: Record<number, { x: number; y: number; r: number }> = {
  1: { x: 58, y: 32, r: 3 },
  2: { x: 52, y: 62, r: 4 },
  3: { x: 44, y: 58, r: 5.5 },
  4: { x: 26, y: 60, r: 7 },
  5: { x: 20, y: 74, r: 8.5 },
};

export function FaceZone({
  depth,
  className,
  onWine = false,
}: {
  depth: number;
  className?: string;
  onWine?: boolean;
}) {
  const pos = positions[depth] ?? positions[1];

  return (
    <svg
      viewBox="0 0 80 100"
      className={cn("h-auto w-full", className)}
      aria-hidden
    >
      <ellipse
        cx="40"
        cy="50"
        rx="26"
        ry="36"
        fill="none"
        stroke="currentColor"
        strokeOpacity={onWine ? 0.35 : 0.25}
        strokeWidth={1}
      />
      <line
        x1="17"
        y1="40"
        x2="63"
        y2="40"
        stroke="currentColor"
        strokeOpacity={onWine ? 0.2 : 0.14}
        strokeWidth={0.75}
      />
      <line
        x1="21"
        y1="68"
        x2="59"
        y2="68"
        stroke="currentColor"
        strokeOpacity={onWine ? 0.2 : 0.14}
        strokeWidth={0.75}
      />

      <circle
        cx={pos.x}
        cy={pos.y}
        r={pos.r * 1.8}
        className={onWine ? "fill-cream/15" : "fill-wine/10"}
      />
      <circle
        cx={pos.x}
        cy={pos.y}
        r={pos.r}
        className={onWine ? "fill-cream" : "fill-wine"}
      />
    </svg>
  );
}
