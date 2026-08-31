"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { showcaseIntro, heroBoxes } from "@/lib/productShowcaseContent";
import { products } from "@/lib/data";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function ShowcaseIntro({
  onSelectProduct,
  sectionRef,
}: {
  onSelectProduct: (index: number) => void;
  /** Forwarded to the box-row element itself (not the whole hero section) purely so
   * ProductsExperience can tell when the row has scrolled out of view, for the
   * floating badge below — tracking the full section instead would only flip once
   * all the surrounding headline/scroll-hint space clears too, well after the row
   * itself is already gone. */
  sectionRef?: React.Ref<HTMLDivElement>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: shouldReduceMotion ? undefined : { opacity: 0, y: 16 },
    animate: shouldReduceMotion ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative flex h-screen flex-col items-center justify-center gap-[clamp(0.75rem,2.6vh,2rem)] bg-ivory px-6 py-[5vh] text-center">
      <motion.p
        {...rise(0)}
        className="text-xs font-bold tracking-[0.3em] text-stone"
        data-edit-id="src/lib/productShowcaseContent.ts#showcaseIntro-eyebrow"
      >
        {/* @edit:showcaseIntro-eyebrow */}
        {showcaseIntro.eyebrow}
      </motion.p>

      <motion.h1
        {...rise(0.1)}
        className="max-w-3xl text-balance font-display text-[clamp(1.5rem,3.4vw,2.75rem)] font-black leading-[1.15] text-ink"
        data-edit-id="src/lib/productShowcaseContent.ts#showcaseIntro-headline"
      >
        {showcaseIntro.headline} <BrandLogo variant="ink" />
      </motion.h1>

      <motion.div ref={sectionRef} {...rise(0.25)} className="relative mx-auto w-full max-w-[90vw]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,var(--color-plum)_0%,transparent_70%)] opacity-[0.06] blur-3xl"
        />
        {/* Soft contact shadow so the cut-out boxes read as grounded, not pasted */}
        <div
          aria-hidden
          className="absolute inset-x-[8%] bottom-[8%] -z-10 h-[12%] rounded-[100%] bg-ink/10 blur-2xl"
        />

        {/* Children are all `absolute` (no in-flow content), so shrink-to-fit sizing
            (w-fit + aspect-ratio) collapses to 0×0 — width/height are computed
            explicitly instead, each capped by whichever of the vh or vw budget is
            more restrictive, so the row never overflows its max-w-[90vw] ancestor. */}
        <div
          className="relative mx-auto w-[min(90vw,calc(26vh*2.0102))] h-[min(26vh,calc(90vw/2.0102))] lg:w-[min(90vw,calc(36vh*2.0102))] lg:h-[min(36vh,calc(90vw/2.0102))]"
        >
          {heroBoxes.map((box, i) => {
            const product = products[i];
            return (
              <button
                key={box.code}
                type="button"
                onClick={() => onSelectProduct(i)}
                aria-label={`עברו למוצר ${product.name}`}
                className="group absolute outline-none"
                style={{
                  left: `${box.rect.x1}%`,
                  top: `${box.rect.y1}%`,
                  width: `${box.rect.x2 - box.rect.x1}%`,
                  height: `${box.rect.y2 - box.rect.y1}%`,
                }}
              >
                <motion.div
                  className="relative h-full w-full"
                  whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.05, zIndex: 2 }}
                  whileFocus={shouldReduceMotion ? undefined : { y: -8, scale: 1.05, zIndex: 2 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={box.src}
                    alt={product.name}
                    fill
                    sizes="10vw"
                    className="object-contain drop-shadow-[0_10px_20px_rgba(26,20,20,0.14)] transition-[filter] duration-300 group-hover:drop-shadow-[0_20px_34px_rgba(171,33,58,0.3)] group-focus-visible:drop-shadow-[0_20px_34px_rgba(171,33,58,0.3)]"
                    data-edit-id={`src/lib/productShowcaseContent.ts#heroBoxes-${box.code}`}
                  />
                </motion.div>
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div {...rise(0.5)} className="flex flex-col items-center gap-1.5 text-stone">
        <span
          className="text-[11px] font-bold tracking-[0.2em]"
          data-edit-id="src/components/products-showcase/ShowcaseIntro.tsx#scroll-hint"
        >
          {/* @edit:scroll-hint */}
          גלו את הסדרה
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
      </motion.div>
    </section>
  );
}
