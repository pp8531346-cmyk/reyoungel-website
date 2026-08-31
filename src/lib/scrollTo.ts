/** Minimal shape of the bits of Lenis's API this file actually calls — avoids
 * importing the `lenis` package (and its side effects) into every consumer. */
type LenisLike = {
  scrollTo: (target: HTMLElement, options?: { offset?: number; duration?: number }) => void;
};

let lenisInstance: LenisLike | null = null;

/** Registered by SmoothScroll while it's mounted (desktop, no reduced-motion) — null
 * otherwise, in which case scrollToElement falls back to the native API below. */
export function setLenisInstance(instance: LenisLike | null) {
  lenisInstance = instance;
}

/** Scrolls `el` into view — through Lenis when it's driving the page's scroll
 * (see SmoothScroll's comment for why a plain scrollIntoView can't be used there),
 * or natively when Lenis isn't mounted (touch devices, prefers-reduced-motion). */
export function scrollToElement(el: HTMLElement | null | undefined) {
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el);
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
