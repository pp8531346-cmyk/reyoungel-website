"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { showcaseIntro, heroBoxes } from "@/lib/productShowcaseContent";
import { products } from "@/lib/data";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SpriteBoxImage } from "./SpriteBoxImage";

/** heroBoxes' rects only cover the ~7.6%-93.73% horizontal / ~34%-72.33% vertical
 * band of heroBoxesSprite (min x1/y1, max x2/y2 across heroBoxes — measured, not
 * eyeballed) — the sprite has a lot of headroom above/below the row itself, unlike
 * the old individually-cropped box images, which filled their row edge-to-edge.
 * Reproducing the row's pre-sprite on-screen size therefore means rendering a
 * (square, to match heroBoxesSprite's own 1:1 aspect — required so object-contain
 * doesn't letterbox and throw off every box's rect-based crop) canvas considerably
 * bigger than the row's actual visible footprint, then centering it on that
 * footprint via this origin (its content band's own midpoint, not plain 50/50) and
 * clipping the overflow via the footprint element's own overflow-hidden — see the
 * frame/canvas sizing comments below for the rest of the derivation. */
const CANVAS_ORIGIN = { x: 50.665, y: 53.165 };

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
        className="max-w-3xl whitespace-nowrap font-display text-[clamp(1.375rem,3.4vw,2.75rem)] font-black leading-[1.15] text-ink"
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

        {/* Frame — sized to the row's own visible footprint (the pre-sprite version's
            on-screen size: heroBoxesSprite has a lot of headroom above/below the row
            itself, so reproducing that size means the canvas below has to render
            considerably bigger than this footprint — see the module comment above).
            This div's own declared size is what the surrounding flex column budgets
            space for, so it stays tightly fit to that footprint — but deliberately
            has NO `overflow-hidden`: the canvas below is `position: absolute` and
            paints nothing itself (only its five button children do, each already
            cropped by its own `overflow-hidden` — see below), so an absolute canvas
            far bigger than this frame never bleeds or inflates this frame's layout
            size regardless of overflow. Clipping here anyway (an earlier version of
            this fix did, "just to be safe") bought nothing at rest — the buttons
            already land within this footprint by construction — and instead clipped
            every box's own whileHover scale/lift the moment it grew past this div's
            edge. Leaving overflow visible is what lets that hover growth render
            uncropped. */}
        <div className="relative mx-auto h-[min(22.1vh,40.05vw)] w-[min(90vw,49.7vh)] lg:h-[min(30.6vh,40.05vw)] lg:w-[min(90vw,68.8vh)]">
          {/* Canvas — square, matching heroBoxesSprite's own 1500×1500 aspect exactly
              (required: object-contain inside a non-square box would letterbox and
              throw off every box's rect-based crop below). Sized so that, once
              centered on the frame above via CANVAS_ORIGIN, exactly the row's own
              content band lands inside the frame's footprint — i.e. canvas side ×
              contentPct = frame side. Paints nothing of its own; see the frame
              comment above for why its own (much larger) size is harmless. */}
          <div
            className="absolute h-[min(57.7vh,104.5vw)] w-[min(57.7vh,104.5vw)] lg:h-[min(79.8vh,104.5vw)] lg:w-[min(79.8vh,104.5vw)]"
            style={{ left: "50%", top: "50%", transform: `translate(-${CANVAS_ORIGIN.x}%, -${CANVAS_ORIGIN.y}%)` }}
          >
            {heroBoxes.map((box, i) => {
              const product = products[i];
              // This button is a clipped "window" onto heroBoxesSprite (one shared image,
              // all 5 boxes together — supplied as-is, not cropped by us). SpriteBoxImage
              // renders that SAME full sprite at a size/offset computed so only this box's
              // own slice (box.rect) lands inside the window — no distortion, since the
              // canvas above is square like the sprite itself. Hover/focus lift+scale is
              // applied to this OUTER window, not the inner sprite — scaling the inner div
              // directly would zoom from its own transform-origin (mostly off-screen, since
              // it's rendered many times larger than the visible slice), displacing the
              // visible content instead of zooming it in place.
              const boxWidthPct = box.rect.x2 - box.rect.x1;
              const boxHeightPct = box.rect.y2 - box.rect.y1;
              return (
                <motion.button
                  key={box.code}
                  type="button"
                  onClick={() => onSelectProduct(i)}
                  aria-label={`עברו למוצר ${product.name}`}
                  className="group absolute overflow-hidden outline-none"
                  style={{
                    left: `${box.rect.x1}%`,
                    top: `${box.rect.y1}%`,
                    width: `${boxWidthPct}%`,
                    height: `${boxHeightPct}%`,
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.05, zIndex: 2 }}
                  whileFocus={shouldReduceMotion ? undefined : { y: -8, scale: 1.05, zIndex: 2 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SpriteBoxImage
                    box={box}
                    alt={product.name}
                    sizes="90vw"
                    editable
                    imageClassName="object-contain drop-shadow-[0_10px_20px_rgba(26,20,20,0.14)] transition-[filter] duration-300 group-hover:drop-shadow-[0_20px_34px_rgba(171,33,58,0.3)] group-focus-visible:drop-shadow-[0_20px_34px_rgba(171,33,58,0.3)]"
                  />
                </motion.button>
              );
            })}
          </div>
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
