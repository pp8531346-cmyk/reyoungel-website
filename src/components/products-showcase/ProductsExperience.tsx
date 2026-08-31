"use client";

import { useRef, useState } from "react";
import { ShowcaseIntro } from "./ShowcaseIntro";
import { ProductJourney, journeyItems } from "./ProductJourney";
import { FloatingProductBadge } from "./FloatingProductBadge";
import { heroBoxes } from "@/lib/productShowcaseContent";
import { useInView } from "@/hooks/useInView";
import { scrollToElement } from "@/lib/scrollTo";

/**
 * Holds the product journey's active step so the hero's product boxes can jump
 * straight to a given product — the journey section itself is not scroll-driven
 * (arrow-driven only), so this state has to live above both of them.
 */
export function ProductsExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const introRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLElement>(null);

  const introInView = useInView(introRef, 0);
  const journeyInView = useInView(journeyRef, 0);

  function jumpToProduct(index: number) {
    setActiveIndex(index);
    // Site-wide Lenis smooth-scroll owns the real scroll position once mounted —
    // a plain scrollIntoView() gets fought back to wherever Lenis's own rAF loop
    // thinks the scroll should be, so this has to go through Lenis's own API
    // (scrollToElement falls back to native scrollIntoView when Lenis isn't
    // mounted at all — touch devices, prefers-reduced-motion).
    scrollToElement(journeyRef.current);
  }

  const activeBox = heroBoxes[activeIndex];
  const activeProduct = journeyItems[activeIndex]?.product;

  return (
    <>
      <ShowcaseIntro onSelectProduct={jumpToProduct} sectionRef={introRef} />
      <ProductJourney activeIndex={activeIndex} onIndexChange={setActiveIndex} sectionRef={journeyRef} />
      {activeBox && activeProduct && (
        <FloatingProductBadge
          box={activeBox}
          productName={activeProduct.name}
          visible={journeyInView && !introInView}
        />
      )}
    </>
  );
}
