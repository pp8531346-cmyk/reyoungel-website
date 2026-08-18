"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animate, motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type FaceMarker = {
  label: string;
  description: string;
  /** Position as a percentage of the image box. */
  x: number;
  y: number;
};

// Calibrated against the treatment-compare-before/after pair (724x1030,
// frontal studio portrait, hair pulled back) — measured directly against
// these images via a percentage grid overlay, not reused from the prior pair.
const DEFAULT_MARKERS: FaceMarker[] = [
  { label: "שפתיים", description: "נפח והגדרה טבעיים לקו השפה.", x: 50, y: 57 },
  { label: "עצמות לחיים", description: "עיצוב עדין של קווי המתאר.", x: 66, y: 45 },
  { label: "קו לסת", description: "חידוד וייצוב קו המתאר התחתון.", x: 25, y: 64 },
];

const ANIMATION_TARGET = 78;
const ANIMATION_LEG_MS = 1100;

/**
 * Draggable before/after comparison. "Before" sits on the right (RTL reading
 * start, matches the "לפני" label reading first) and "after" on the left —
 * the divider position (0-100, measured from the left edge) controls how much
 * of the "after" layer is revealed.
 *
 * Built as a single self-contained item so the right column can hold more of
 * these side by side or stacked later without restructuring — see usage in
 * ProductRange.tsx, which renders this inside a plain flex list.
 */
export function BeforeAfterCompare({
  beforeSrc,
  afterSrc,
  markers = DEFAULT_MARKERS,
  className,
}: {
  beforeSrc: string;
  afterSrc: string;
  markers?: FaceMarker[];
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [percent, setPercent] = useState(50);
  const [interactive, setInteractive] = useState(false);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  // First-load out-and-back reveal, then hand off to the user — skipped entirely
  // under reduced motion, landing straight on the interactive centered state.
  useEffect(() => {
    if (shouldReduceMotion) {
      setInteractive(true);
      return;
    }
    const out = animate(50, ANIMATION_TARGET, {
      duration: ANIMATION_LEG_MS / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setPercent,
      onComplete: () => {
        const back = animate(ANIMATION_TARGET, 50, {
          duration: ANIMATION_LEG_MS / 1000,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: setPercent,
          onComplete: () => setInteractive(true),
        });
        cleanups.push(back.stop);
      },
    });
    const cleanups = [out.stop];
    return () => cleanups.forEach((stop) => stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function percentFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return percent;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (!interactive) return;
    draggingRef.current = true;
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // Capture can fail for a pointer that's already gone (e.g. a fast
      // tap-and-release) — harmless, the move/up handlers below still work
      // via normal event bubbling.
    }
    setPercent(percentFromClientX(e.clientX));
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    setPercent(percentFromClientX(e.clientX));
  }

  function handlePointerUp(e: React.PointerEvent) {
    draggingRef.current = false;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // Already released/never captured — fine, dragging is already stopped above.
    }
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <div
        ref={containerRef}
        className="relative h-full w-full touch-none select-none overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] border border-hairline bg-stone/10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Before — base layer, full bleed. Plain centered object-cover: checked the
            math against this source's proportions (724x1030, minimal headroom above
            the hair) at both a short and a tall container height, and a centered
            crop keeps lips/cheek/jaw — and the markers pointing at them — in frame
            at both, so no object-position bias is needed here (unlike the previous
            source image, which had much more empty space above the hairline). */}
        <Image
          src={beforeSrc}
          alt="לפני הטיפול"
          fill
          sizes="45vw"
          quality={90}
          className="object-cover"
          priority
        />

        {/* After — clipped to [0, percent%] from the left, revealing more as the divider moves right */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        >
          <Image src={afterSrc} alt="אחרי הטיפול" fill sizes="45vw" quality={90} className="object-cover" />
        </div>

        {/* Facial markers — always visible regardless of divider position, on top of both layers */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {markers.map((marker, i) => (
            <div
              key={marker.label}
              className="pointer-events-auto absolute"
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            >
              <button
                type="button"
                className="relative -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
                onMouseEnter={() => setActiveMarker(i)}
                onMouseLeave={() => setActiveMarker((cur) => (cur === i ? null : cur))}
                onFocus={() => setActiveMarker(i)}
                onBlur={() => setActiveMarker((cur) => (cur === i ? null : cur))}
                onClick={() => setActiveMarker((cur) => (cur === i ? null : i))}
                aria-label={marker.label}
              >
                <motion.span
                  className="absolute inset-0 m-auto rounded-full bg-wine"
                  animate={{
                    width: activeMarker === i ? 30 : 20,
                    height: activeMarker === i ? 30 : 20,
                    opacity: activeMarker === i ? 0.22 : 0.16,
                    filter: "blur(4px)",
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="relative block rounded-full border-solid bg-ivory/25 backdrop-blur-[1px]"
                  style={{ borderColor: "var(--color-wine)" }}
                  animate={{
                    width: activeMarker === i ? 16 : 12,
                    height: activeMarker === i ? 16 : 12,
                    borderWidth: 1.25,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />

                <AnimatePresence>
                  {activeMarker === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pointer-events-none absolute bottom-full start-1/2 mb-2.5 w-max max-w-[10rem] -translate-x-1/2 rounded-sm border border-hairline bg-ivory px-3 py-2 text-start shadow-sm"
                    >
                      <p className="text-xs font-bold text-ink">{marker.label}</p>
                      <p className="mt-0.5 text-[11px] leading-snug text-stone">{marker.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          ))}
        </div>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-cream/80"
          style={{ left: `${percent}%` }}
        >
          <div
            className="pointer-events-auto absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-cream text-wine shadow-[0_6px_18px_-4px_rgba(26,20,20,0.4)]"
            onPointerDown={handlePointerDown}
          >
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <ChevronLeft className="-ms-1 h-3.5 w-3.5" aria-hidden />
          </div>
        </div>

        {/* Labels — small unobtrusive captions in opposite corners */}
        <span
          className="pointer-events-none absolute bottom-3 end-3 z-10 rounded-full bg-ink/40 px-2.5 py-1 text-[10px] font-bold text-cream backdrop-blur-sm"
          data-edit-id="src/components/sections/BeforeAfterCompare.tsx#label-before"
        >
          {/* @edit:label-before */}
          לפני
        </span>
        <span
          className="pointer-events-none absolute bottom-3 start-3 z-10 rounded-full bg-ink/40 px-2.5 py-1 text-[10px] font-bold text-cream backdrop-blur-sm"
          data-edit-id="src/components/sections/BeforeAfterCompare.tsx#label-after"
        >
          {/* @edit:label-after */}
          אחרי טיפול
        </span>
      </div>

      <p
        className="mt-2 text-center text-[10px] leading-snug text-stone"
        data-edit-id="src/components/sections/BeforeAfterCompare.tsx#caption"
      >
        {/* @edit:caption */}
        הדמיה להמחשה בלבד, אינה מייצגת תוצאה קלינית בפועל.
      </p>
    </div>
  );
}
