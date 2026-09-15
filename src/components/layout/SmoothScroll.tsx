"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/scrollTo";

/**
 * Site-wide inertia scrolling. Desktop/mouse/trackpad only — on touch devices
 * Lenis is never constructed at all, so native touch scrolling (which already
 * has its own momentum) is untouched. Same for prefers-reduced-motion: reduce,
 * where native instant scroll is kept instead.
 *
 * Mounted once (by AccessibilityWidget, which also owns the "reduce
 * animations" a11y toggle — see `disabled` below); Lenis drives the real
 * document scroll position (no wrapper element), so position:fixed/sticky
 * elements and native scroll/hashchange events all keep working as if this
 * weren't here.
 */
export function SmoothScroll({ disabled = false }: { disabled?: boolean }) {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion || disabled) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    // Lenis owns the real scroll position once mounted — a plain scrollIntoView()
    // or window.scrollTo() gets fought back to wherever Lenis's own rAF loop
    // thinks the scroll should be. Any programmatic jump (arrow buttons, the hero
    // box row) has to go through Lenis's own scrollTo instead — see lib/scrollTo.
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    let frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, [disabled]);

  return null;
}
