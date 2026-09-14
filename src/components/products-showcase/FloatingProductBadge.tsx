"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { heroBoxes } from "@/lib/productShowcaseContent";
import { SpriteBoxImage } from "./SpriteBoxImage";

type HeroBox = (typeof heroBoxes)[number];

/** Small sticky indicator shown only once the 5-box row has scrolled out of view —
 * a lightweight reminder of which product's section is currently on screen, without
 * repeating the full box row. Reuses the same cut-out box photo as the row above, at
 * a much smaller size, floating directly on the page the same way the row above
 * does — no card, no background, no border, just the box and its own drop shadow —
 * so it reads as "the same box, still with you" rather than a second UI element. */
export function FloatingProductBadge({
  box,
  productName,
  visible,
}: {
  box: HeroBox;
  productName: string;
  visible: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const boxWidthPct = box.rect.x2 - box.rect.x1;
  const boxHeightPct = box.rect.y2 - box.rect.y1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-6 top-24 z-40 h-16 w-11"
        >
          {/* mx-auto + aspectRatio (matching box.rect's own width:height) lets this
              shrink-fit within the h-16 w-11 footprint the same way object-contain on
              a plain <img> would — needed here because SpriteBoxImage's crop math
              only stays undistorted when its wrapper has that exact aspect (see
              SpriteBoxImage's own doc comment). */}
          <div
            className="relative mx-auto h-full overflow-hidden"
            style={{ aspectRatio: `${boxWidthPct} / ${boxHeightPct}` }}
          >
            <SpriteBoxImage
              box={box}
              alt={productName}
              sizes="44px"
              imageClassName="object-contain drop-shadow-[0_10px_18px_rgba(26,20,20,0.2)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
