"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const INTRO_START = 30;
const INTRO_END = 70;
const INTRO_DURATION = 1.4;
// Brief "this is draggable" wiggle, played once the reveal sweep settles:
// two small back-and-forth nudges around the resting position, then still.
const WIGGLE_KEYFRAMES = [INTRO_END, INTRO_END - 5, INTRO_END + 4, INTRO_END - 2, INTRO_END];
const WIGGLE_DURATION = 1.1;
const WIGGLE_EASE = "easeInOut";
// Softer than a snappy UI spring on purpose — this drives the visible divider
// position, so it should read as smooth/weighted, not twitchy.
const DRAG_SPRING = { stiffness: 260, damping: 32, mass: 0.4 };

/**
 * Draggable before/after comparison. "Before" sits on the right (RTL reading
 * start, matches the "לפני" label reading first) and "after" on the left —
 * the divider position (0-100, measured from the left edge) controls how much
 * of the "after" layer is revealed.
 *
 * The divider/handle position is a MotionValue, not React state. A pointer
 * *down* glides to that point with a spring (nice for "click elsewhere on
 * the image to jump there"), but the moment the pointer actually moves, that
 * spring is stopped and the value is set directly — so live dragging tracks
 * the cursor 1:1 with zero lag, and release leaves it exactly where dropped.
 *
 * Self-contained (just an image pair as props) so it drops into any page —
 * see usage in ProductRange.tsx (Home).
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  // Default calibrated for the treatment-compare pair: face center sits around
  // 35-40% down a 724x1030 frontal portrait. Biasing object-position there (vs.
  // a plain 50% center) means the container can be cropped to any aspect ratio —
  // including the wide, short shape this slider ends up with when it's stretched
  // to match a taller sidebar of content — while what gets cut is always chest/
  // shoulders below, never the top of the head or the chin.
  focalPosition = "50% 35%",
  className,
}: {
  beforeSrc: string;
  afterSrc: string;
  focalPosition?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const introPlayedRef = useRef(false);
  const activeAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const introAnimationRef = useRef<ReturnType<typeof animate> | null>(null);

  const percent = useMotionValue(shouldReduceMotion ? 50 : INTRO_START);
  const revealPercent = useTransform(percent, (v) => 100 - v);
  const afterClipPath = useMotionTemplate`inset(0 ${revealPercent}% 0 0)`;
  const handleLeft = useMotionTemplate`${percent}%`;

  // Reduced motion skips the reveal sweep entirely and is interactive from the
  // first render — folded into a derived value rather than set via an effect,
  // since `shouldReduceMotion` is already known synchronously on render.
  const isInteractive = interactive || !!shouldReduceMotion;

  // Slow reveal sweep once the slider first scrolls into view, then a brief
  // back-and-forth wiggle around the resting position to signal "this is
  // draggable" — then hands control to the user. Owns a raw IntersectionObserver
  // directly (rather than reacting to `useInView`'s state) so it can disconnect
  // itself the instant it fires once: the visibility crossing can flip back and
  // forth right around the threshold (e.g. Lenis's scroll momentum overshooting
  // past the target and settling back), and reacting to that as a dependency
  // would re-run this effect on every flip, tearing down and restarting the
  // animation mid-flight each time.
  useEffect(() => {
    if (shouldReduceMotion) return;
    const node = containerRef.current;
    if (!node || introPlayedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || introPlayedRef.current) return;
        introPlayedRef.current = true;
        observer.disconnect();
        introAnimationRef.current = animate(percent, INTRO_END, {
          duration: INTRO_DURATION,
          ease: [0.16, 1, 0.3, 1],
          onComplete: () => {
            introAnimationRef.current = animate(percent, WIGGLE_KEYFRAMES, {
              duration: WIGGLE_DURATION,
              ease: WIGGLE_EASE,
              onComplete: () => setInteractive(true),
            });
          },
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      introAnimationRef.current?.stop();
    };
  }, [shouldReduceMotion, percent]);

  function percentFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return percent.get();
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (!isInteractive) return;
    draggingRef.current = true;
    setIsDragging(true);
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // Capture can fail for a pointer that's already gone (e.g. a fast
      // tap-and-release) — harmless, the move/up handlers below still work
      // via normal event bubbling.
    }
    // A bare click (no drag) glides to the pressed point with a spring — nice
    // for "click elsewhere on the image to jump there". The instant real
    // movement starts, handlePointerMove stops this and takes over directly.
    activeAnimationRef.current?.stop();
    activeAnimationRef.current = animate(percent, percentFromClientX(e.clientX), {
      type: "spring",
      ...DRAG_SPRING,
    });
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    // Live drag must track the cursor 1:1 with zero lag — stop any in-flight
    // glide animation so it can't fight these direct, per-pixel sets.
    activeAnimationRef.current?.stop();
    percent.set(percentFromClientX(e.clientX));
  }

  function handlePointerUp(e: React.PointerEvent) {
    // Finalize from the release coordinates themselves, not just whatever the
    // last pointermove happened to set — browsers can coalesce/throttle move
    // events, so the up event's position is the only one guaranteed to match
    // exactly where the cursor was actually released.
    if (draggingRef.current) {
      activeAnimationRef.current?.stop();
      percent.set(percentFromClientX(e.clientX));
    }
    draggingRef.current = false;
    setIsDragging(false);
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
        className="relative h-full w-full touch-none select-none overflow-hidden rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Before — base layer, full bleed */}
        <Image
          src={beforeSrc}
          alt="לפני הטיפול"
          fill
          sizes="45vw"
          quality={90}
          className="object-cover"
          style={{ objectPosition: focalPosition }}
          priority
        />

        {/* After — clipped to [0, percent%] from the left, revealing more as the divider moves right */}
        <motion.div className="absolute inset-0" style={{ clipPath: afterClipPath }}>
          <Image
            src={afterSrc}
            alt="אחרי הטיפול"
            fill
            sizes="45vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: focalPosition }}
          />
        </motion.div>

        {/* Divider + handle */}
        <motion.div className="pointer-events-none absolute inset-y-0 z-20" style={{ left: handleLeft }}>
          <div
            className="absolute inset-y-0 left-0 w-[2px] -translate-x-1/2 bg-cream/90"
            style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))" }}
          />

          <motion.div
            dir="ltr"
            className="pointer-events-auto absolute left-0 top-1/2 flex h-[46px] w-[46px] cursor-ew-resize items-center justify-center rounded-full"
            style={{ background: "var(--color-wine)", x: "-50%", y: "-50%" }}
            animate={{
              scale: isDragging ? 1.1 : 1,
              boxShadow: isDragging
                ? "0 10px 26px rgba(171,33,58,0.5)"
                : "0 4px 12px rgba(171,33,58,0.35)",
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onPointerDown={handlePointerDown}
          >
            {/* Soft outer glow ring, only while actively dragging */}
            <AnimatePresence>
              {isDragging && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 0 8px rgba(171,33,58,0.25)" }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </AnimatePresence>
            <ChevronRight className="h-4 w-4 text-cream" aria-hidden />
            <ChevronLeft className="-ms-1 h-4 w-4 text-cream" aria-hidden />
          </motion.div>
        </motion.div>

        {/* Labels — pill badges, fade/slide in on mount */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute bottom-3 end-3 z-10 rounded-full px-3 py-1.5 text-[11px] font-bold text-cream"
          style={{ background: "rgba(0,0,0,0.55)" }}
          data-edit-id="src/components/sections/BeforeAfterSlider.tsx#label-before"
        >
          {/* @edit:label-before */}
          לפני
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute bottom-3 start-3 z-10 rounded-full px-3 py-1.5 text-[11px] font-bold text-cream"
          style={{ background: "rgba(0,0,0,0.55)" }}
          data-edit-id="src/components/sections/BeforeAfterSlider.tsx#label-after"
        >
          {/* @edit:label-after */}
          אחרי טיפול
        </motion.span>
      </div>

      <p
        className="mt-2 text-center text-[10px] leading-snug text-stone"
        data-edit-id="src/components/sections/BeforeAfterSlider.tsx#caption"
      >
        {/* @edit:caption */}
        הדמיה להמחשה בלבד, אינה מייצגת תוצאה קלינית בפועל.
      </p>
    </div>
  );
}
