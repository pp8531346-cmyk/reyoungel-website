"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { heroBoxes } from "@/lib/productShowcaseContent";

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
          <Image
            src={box.src}
            alt={productName}
            width={box.width}
            height={box.height}
            className="h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(26,20,20,0.2)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
