"use client";

import { useEffect, useState, type RefObject } from "react";

/** Whether `ref`'s element currently intersects the viewport — IntersectionObserver
 * only, never a scroll listener (see design-taste-frontend skill's forbidden-patterns
 * list: window scroll listeners re-render on every frame and are jank-prone). */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0,
  rootMargin = "0px",
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
      rootMargin,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return inView;
}
