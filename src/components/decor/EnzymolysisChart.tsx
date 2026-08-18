"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reproduces the shape of the real enzymolysis-in-vitro bar chart from the
 * official Reyoungel catalog (brand-assets/): values rise from week 1 to
 * week 20 for both series, with Reyoungel consistently above the competitor
 * at every checkpoint. The catalog gives no exact published figures, so
 * these bar heights are a close visual estimate of the source chart, not a
 * citable dataset — labeled as such in the caption below.
 */
const checkpoints = [
  { week: 1, reyoungel: 28, competitor: 18 },
  { week: 3, reyoungel: 35, competitor: 24 },
  { week: 5, reyoungel: 55, competitor: 30 },
  { week: 10, reyoungel: 62, competitor: 38 },
  { week: 20, reyoungel: 75, competitor: 48 },
];

const VIEW_W = 640;
const VIEW_H = 340;
const PLOT_LEFT = 60;
const PLOT_RIGHT = 600;
const PLOT_TOP = 20;
const PLOT_BOTTOM = 280;

const SLOT_WIDTH = (PLOT_RIGHT - PLOT_LEFT) / checkpoints.length;
const BAR_WIDTH = 26;
const BAR_GAP = 8;

// RTL layout: week 1 sits at the right (reading start), week 20 at the left.
const slotCenterForIndex = (i: number) => PLOT_RIGHT - (i + 0.5) * SLOT_WIDTH;
const barHeight = (v: number) => (v / 100) * (PLOT_BOTTOM - PLOT_TOP);

function roundedTopRect(x: number, width: number, height: number, radius = 4) {
  const yTop = PLOT_BOTTOM - height;
  const r = Math.min(radius, width / 2, height);
  return `M${x},${PLOT_BOTTOM} L${x},${yTop + r} Q${x},${yTop} ${x + r},${yTop} L${x + width - r},${yTop} Q${x + width},${yTop} ${x + width},${yTop + r} L${x + width},${PLOT_BOTTOM} Z`;
}

const gridValues = [0, 25, 50, 75, 100];

export function EnzymolysisChart({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const active = hovered !== null ? checkpoints[hovered] : null;
  const lastIndex = checkpoints.length - 1;

  return (
    <div className={cn("relative", className)}>
      {/* double hairline frame — a nod to a printed clinical data sheet */}
      <div className="border border-hairline p-1.5 sm:p-2">
        <div className="relative border border-hairline p-4 sm:p-8">
          <svg
            ref={ref}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="h-auto w-full overflow-visible"
            role="img"
            aria-label="גרף המחשה: קצב פירוק אנזימטי (in-vitro) לאורך זמן, Reyoungel לעומת מותג מוביל באירופה"
          >
            {gridValues.map((v) => (
              <g key={v}>
                <line
                  x1={PLOT_LEFT}
                  x2={PLOT_RIGHT}
                  y1={PLOT_BOTTOM - (v / 100) * (PLOT_BOTTOM - PLOT_TOP)}
                  y2={PLOT_BOTTOM - (v / 100) * (PLOT_BOTTOM - PLOT_TOP)}
                  stroke="var(--color-hairline)"
                  strokeWidth={1}
                />
                <text
                  x={PLOT_LEFT - 14}
                  y={PLOT_BOTTOM - (v / 100) * (PLOT_BOTTOM - PLOT_TOP) + 4}
                  textAnchor="end"
                  className="fill-stone text-[11px]"
                >
                  {v}%
                </text>
              </g>
            ))}

            {checkpoints.map((c, i) => (
              <text
                key={c.week}
                x={slotCenterForIndex(i)}
                y={PLOT_BOTTOM + 26}
                textAnchor="middle"
                className="fill-stone text-[11px] font-bold"
              >
                שבוע {c.week}
              </text>
            ))}

            {hovered !== null && (
              <rect
                x={slotCenterForIndex(hovered) - SLOT_WIDTH / 2}
                y={PLOT_TOP}
                width={SLOT_WIDTH}
                height={PLOT_BOTTOM - PLOT_TOP}
                fill="var(--color-stone)"
                fillOpacity={0.08}
              />
            )}

            {checkpoints.map((c, i) => {
              const center = slotCenterForIndex(i);
              const reyoungelX = center + BAR_GAP / 2;
              const competitorX = center - BAR_GAP / 2 - BAR_WIDTH;
              const reyoungelH = barHeight(c.reyoungel);
              const competitorH = barHeight(c.competitor);
              return (
                <g key={c.week}>
                  <path
                    d={roundedTopRect(competitorX, BAR_WIDTH, competitorH)}
                    fill="var(--color-stone)"
                    style={{
                      transform: drawn ? "scaleY(1)" : "scaleY(0)",
                      transformOrigin: `${competitorX + BAR_WIDTH / 2}px ${PLOT_BOTTOM}px`,
                      transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                      transitionDelay: `${i * 70}ms`,
                    }}
                  />
                  <path
                    d={roundedTopRect(reyoungelX, BAR_WIDTH, reyoungelH)}
                    fill="var(--color-wine)"
                    style={{
                      transform: drawn ? "scaleY(1)" : "scaleY(0)",
                      transformOrigin: `${reyoungelX + BAR_WIDTH / 2}px ${PLOT_BOTTOM}px`,
                      transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                      transitionDelay: `${i * 70 + 80}ms`,
                    }}
                  />
                  {i === lastIndex && (
                    <>
                      <text
                        x={reyoungelX + BAR_WIDTH / 2}
                        y={PLOT_BOTTOM - reyoungelH - 10}
                        textAnchor="middle"
                        className="fill-wine text-[13px] font-bold"
                      >
                        {c.reyoungel}%
                      </text>
                      <text
                        x={competitorX + BAR_WIDTH / 2}
                        y={PLOT_BOTTOM - competitorH - 10}
                        textAnchor="middle"
                        className="fill-stone text-[13px] font-bold"
                      >
                        {c.competitor}%
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            {/* keyboard/hover hit targets — one per checkpoint slot */}
            {checkpoints.map((c, i) => (
              <rect
                key={c.week}
                x={slotCenterForIndex(i) - SLOT_WIDTH / 2}
                y={PLOT_TOP}
                width={SLOT_WIDTH}
                height={PLOT_BOTTOM - PLOT_TOP}
                fill="transparent"
                tabIndex={0}
                role="button"
                aria-label={`שבוע ${c.week}: Reyoungel ${c.reyoungel} אחוז, מותג מוביל באירופה ${c.competitor} אחוז`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="cursor-pointer outline-none"
              />
            ))}
          </svg>

          {active && (
            <div
              className="pointer-events-none absolute top-4 rounded-sm border border-hairline bg-ivory px-3 py-2 text-xs shadow-sm sm:top-8"
              style={{
                left: `${(slotCenterForIndex(hovered!) / VIEW_W) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              <p className="font-bold text-ink">שבוע {active.week}</p>
              <p className="mt-1 text-wine">
                <span className="font-bold">Reyoungel®</span> · {active.reyoungel}%
              </p>
              <p className="text-stone">
                <span className="font-bold">מותג מוביל באירופה</span> · {active.competitor}%
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        <span className="flex items-center gap-2 text-sm font-bold text-ink">
          <span className="h-2.5 w-2.5 rounded-full bg-wine" aria-hidden />
          <span data-edit-id="src/components/decor/EnzymolysisChart.tsx#legend-reyoungel">
            {/* @edit:legend-reyoungel */}
            Reyoungel®
          </span>
        </span>
        <span className="flex items-center gap-2 text-sm font-bold text-stone">
          <span className="h-2.5 w-2.5 rounded-full bg-stone" aria-hidden />
          <span data-edit-id="src/components/decor/EnzymolysisChart.tsx#legend-competitor">
            {/* @edit:legend-competitor */}
            מותג מוביל באירופה
          </span>
        </span>
      </div>

      <p
        className="mx-auto mt-4 max-w-lg text-center text-xs leading-relaxed text-stone"
        data-edit-id="src/components/decor/EnzymolysisChart.tsx#caption"
      >
        {/* @edit:caption */}
        להמחשת המגמה בלבד
      </p>

      <details className="mx-auto mt-4 max-w-lg text-center">
        <summary
          className="cursor-pointer text-xs font-bold text-plum underline decoration-plum/40 underline-offset-4 hover:decoration-plum"
          data-edit-id="src/components/decor/EnzymolysisChart.tsx#table-toggle"
        >
          {/* @edit:table-toggle */}
          הצג נתונים כטבלה
        </summary>
        <table className="mx-auto mt-4 w-full max-w-sm text-sm">
          <caption className="sr-only">קצב פירוק אנזימטי (%) לפי שבוע</caption>
          <thead>
            <tr className="border-b border-hairline text-stone">
              <th scope="col" className="py-2 text-start font-bold">
                שבוע
              </th>
              <th scope="col" className="py-2 text-start font-bold text-wine">
                Reyoungel®
              </th>
              <th scope="col" className="py-2 text-start font-bold">
                מותג מוביל
              </th>
            </tr>
          </thead>
          <tbody>
            {checkpoints.map((c) => (
              <tr key={c.week} className="border-b border-hairline">
                <td className="py-2 text-ink">{c.week}</td>
                <td className="py-2 text-wine">{c.reyoungel}%</td>
                <td className="py-2 text-stone">{c.competitor}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
