"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Shares one normalized mouse position (-1..1 per axis, relative to the hero
 * section) between the background and product-image layers, each applying
 * its own small multiplier. The listener lives directly on the <section>
 * itself (no extra positioning wrapper), so it never changes the containing
 * block that the existing absolutely-positioned decor (ribbon/wave/grain)
 * relies on. Desktop pointer devices only — gated behind matchMedia, so
 * touch/mobile never pays for it.
 */
type ParallaxContextValue = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

export function HeroParallaxSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <ParallaxContext.Provider value={{ x, y }}>{children}</ParallaxContext.Provider>
    </section>
  );
}

function useParallax() {
  const ctx = useContext(ParallaxContext);
  if (!ctx) {
    throw new Error("Parallax layers must be used within a HeroParallaxSection");
  }
  return ctx;
}

/** Background layer — ribbon + glow. Max ~5px shift. */
export function ParallaxBackground({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { x, y } = useParallax();
  const translateX = useTransform(x, (v) => v * 5);
  const translateY = useTransform(y, (v) => v * 5);

  return (
    <motion.div className={className} style={{ x: translateX, y: translateY }}>
      {children}
    </motion.div>
  );
}

/**
 * Product image layer — load-in entrance (opacity/translateY/scale) lives on
 * an outer element, and the continuous mouse-parallax offset (max ~2.5px) on
 * an inner element, so the two transform animations never fight over the
 * same motion value.
 */
export function ParallaxImage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { x, y } = useParallax();
  const translateX = useTransform(x, (v) => v * 2.5);
  const translateY = useTransform(y, (v) => v * 2.5);

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ x: translateX, y: translateY }}>{children}</motion.div>
    </motion.div>
  );
}
