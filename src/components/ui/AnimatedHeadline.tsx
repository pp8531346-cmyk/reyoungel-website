"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedHeadline({
  lines,
  className,
  lineClassNames,
}: {
  lines: string[][];
  className?: string;
  /** Optional per-line className (e.g. a different color per line), applied on
   * top of the shared `className` (font/size/weight) on the outer element. */
  lineClassNames?: string[];
}) {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 },
    },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.h1
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={container}
    >
      {lines.map((line, li) => (
        <span
          key={li}
          className={cn("block overflow-hidden whitespace-nowrap", lineClassNames?.[li])}
        >
          {line.map((w, wi) => (
            <motion.span key={wi} variants={word} className="inline-block">
              {w}
              {wi < line.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
