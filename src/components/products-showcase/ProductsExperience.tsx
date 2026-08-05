"use client";

import { useRef, useState } from "react";
import { ShowcaseIntro } from "./ShowcaseIntro";
import { ProductJourney } from "./ProductJourney";

/**
 * Holds the product journey's active step so the hero's product boxes can jump
 * straight to a given product — the journey section itself is no longer
 * scroll-driven, so this state has to live above both of them.
 */
export function ProductsExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const journeyRef = useRef<HTMLElement>(null);

  function jumpToProduct(index: number) {
    setActiveIndex(index);
    journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <ShowcaseIntro onSelectProduct={jumpToProduct} />
      <ProductJourney activeIndex={activeIndex} onIndexChange={setActiveIndex} sectionRef={journeyRef} />
    </>
  );
}
