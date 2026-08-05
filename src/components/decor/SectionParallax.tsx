"use client";

import {
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Scroll-linked depth parallax for a single full-viewport section — distinct from
 * HeroParallax's mouse-driven layers. Each layer moves by a different pixel range
 * as the section transits the viewport, so background/image/text read as physically
 * separated depths rather than a shared drift.
 *
 * Desktop-only (matches the existing lg-only enhancement pattern used for the
 * showcase progress rail and other decor) and off under prefers-reduced-motion —
 * mobile always gets the plain entrance fade, never this.
 */
type ParallaxCtx = {
  scrollYProgress: MotionValue<number>;
  enabled: boolean;
};

const SectionParallaxContext = createContext<ParallaxCtx | null>(null);

function subscribeToDesktopQuery(callback: () => void) {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToDesktopQuery,
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

export function ParallaxSection({
  children,
  className,
  style,
  "data-showcase-section": dataShowcaseSection,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "data-showcase-section"?: number;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className={className}
      style={style}
      data-showcase-section={dataShowcaseSection}
      aria-label={ariaLabel}
    >
      <SectionParallaxContext.Provider
        value={{ scrollYProgress, enabled: isDesktop && !shouldReduceMotion }}
      >
        {children}
      </SectionParallaxContext.Provider>
    </section>
  );
}

function useParallaxContext() {
  const ctx = useContext(SectionParallaxContext);
  if (!ctx) {
    throw new Error("ParallaxLayer must be used within a ParallaxSection");
  }
  return ctx;
}

/**
 * A layer that shifts by `range` px in each direction as the section crosses the
 * viewport. Larger `range` reads as closer/faster; smaller reads as anchored.
 */
export function ParallaxLayer({
  range,
  className,
  children,
}: {
  range: number;
  className?: string;
  children: ReactNode;
}) {
  const { scrollYProgress, enabled } = useParallaxContext();
  const y = useTransform(scrollYProgress, [0, 1], enabled ? [range, -range] : [0, 0]);

  return (
    <motion.div className={className} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
