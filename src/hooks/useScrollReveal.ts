"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide scroll-reveal: fade + rise on first intersection, one-time only.
 * Single shared IntersectionObserver instance backs every hook consumer
 * (module-level singleton, lazily created) instead of one observer per
 * element/component. Class-based state toggle only — never inline styles —
 * so the CSS in globals.css stays the single source of truth for the effect.
 */

const REVEAL_THRESHOLD = 0.15;
const REVEAL_ROOT_MARGIN = "0px 0px -10% 0px";

let sharedObserver: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function getObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target;
        const onReveal = callbacks.get(target);
        sharedObserver?.unobserve(target);
        callbacks.delete(target);
        onReveal?.();
      }
    },
    { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
  );
  return sharedObserver;
}

const MAX_STAGGER_STEPS = 4;
const STAGGER_STEP_MS = 100;

/** Delay (ms) for the nth child (0-indexed) in a staggered reveal group, capped at 4 steps. */
export function staggerDelay(index: number) {
  return Math.min(index, MAX_STAGGER_STEPS - 1) * STAGGER_STEP_MS;
}

/** Ref callback: attaches the element to the shared observer for a one-time reveal. */
export function useScrollReveal<T extends Element = HTMLElement>() {
  const elRef = useRef<T | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const setRef = (el: T | null) => {
    const prev = elRef.current;
    if (prev && callbacks.has(prev)) {
      getObserver().unobserve(prev);
      callbacks.delete(prev);
    }
    elRef.current = el;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const reveal = () => {
      el.classList.add("is-revealing");
      el.classList.add("is-visible");
      const clearWillChange = () => {
        el.classList.remove("is-revealing");
        el.removeEventListener("transitionend", clearWillChange);
      };
      el.addEventListener("transitionend", clearWillChange);
    };

    callbacks.set(el, reveal);
    getObserver().observe(el);
  };

  return setRef;
}
