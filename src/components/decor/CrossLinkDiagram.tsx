"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const nodes = [
  { x: 60, r: 18 },
  { x: 160, r: 10 },
  { x: 260, r: 18 },
  { x: 360, r: 10 },
  { x: 460, r: 18 },
];

const residue = [
  { x: 40, y: 30, r: 5 },
  { x: 95, y: 130, r: 4 },
  { x: 130, y: 40, r: 6 },
  { x: 185, y: 120, r: 4 },
  { x: 215, y: 35, r: 5 },
  { x: 240, y: 130, r: 4 },
  { x: 295, y: 45, r: 6 },
  { x: 330, y: 115, r: 4 },
  { x: 380, y: 30, r: 5 },
  { x: 405, y: 125, r: 4 },
  { x: 440, y: 40, r: 6 },
  { x: 485, y: 115, r: 4 },
  { x: 20, y: 90, r: 4 },
  { x: 500, y: 80, r: 5 },
];

export function CrossLinkDiagram({
  className,
  onWine = false,
}: {
  className?: string;
  onWine?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [purified, setPurified] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPurified(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("relative", className)}>
      <svg ref={ref} viewBox="0 0 520 160" className="h-auto w-full" aria-hidden>
        <line
          x1={nodes[0].x}
          y1="80"
          x2={nodes[nodes.length - 1].x}
          y2="80"
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={1}
        />
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={80}
            r={n.r}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.6}
            strokeWidth={1}
          />
        ))}
        {residue.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="currentColor"
            className={cn(onWine ? "text-cream/50" : "text-stone", "transition-all ease-out")}
            style={{
              opacity: purified ? 0 : 0.55,
              transform: purified ? "scale(0)" : "scale(1)",
              transformOrigin: `${d.x}px ${d.y}px`,
              transitionDuration: "900ms",
              transitionDelay: `${i * 60}ms`,
            }}
          />
        ))}
      </svg>
      <div className="mt-4 flex items-center justify-between text-xs font-bold tracking-wide">
        <span
          className="transition-opacity duration-700"
          style={{ opacity: purified ? 0.35 : 1 }}
          data-edit-id="src/components/decor/CrossLinkDiagram.tsx#label-standard"
        >
          {/* @edit:label-standard */}
          שזירה סטנדרטית
        </span>
        <span
          dir="ltr"
          className={cn(onWine ? "text-cream" : "text-wine", "transition-opacity duration-700")}
          style={{ opacity: purified ? 1 : 0.35 }}
          data-edit-id="src/components/decor/CrossLinkDiagram.tsx#label-saxha"
        >
          {/* @edit:label-saxha */}
          SAX-HA
        </span>
      </div>
    </div>
  );
}
