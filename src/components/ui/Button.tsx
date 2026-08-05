"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?:
    | "primary"
    | "outline"
    | "primary-on-wine"
    | "outline-on-wine"
    | "primary-glow"
    | "glass";
  className?: string;
};

const variants = {
  primary:
    "bg-wine text-cream hover:bg-wine-dark border border-wine hover:border-wine-dark",
  outline:
    "bg-transparent text-ink border border-ink/25 hover:border-wine hover:text-wine",
  "primary-on-wine":
    "bg-cream text-wine hover:bg-ivory border border-cream hover:border-ivory",
  "outline-on-wine":
    "bg-transparent text-cream border border-cream/40 hover:border-cream hover:bg-cream/10",
  // Hero-only: primary with a soft wine glow on hover.
  "primary-glow":
    "bg-wine text-cream border border-wine hover:bg-wine-dark hover:border-wine-dark hover:shadow-[0_0_28px_rgba(171,33,58,0.45)]",
  // Hero-only: glass-style secondary. The brief called for a cream/white border, but the
  // hero's actual background is light ivory, not dark — a cream border there would have
  // almost no contrast, so this uses an ink-tinted hairline instead for visibility.
  glass:
    "bg-cream/30 text-ink border border-ink/15 backdrop-blur-md hover:bg-cream/55 hover:border-wine/30 hover:text-wine",
};

// Subtle magnetic pull toward the cursor — a signature micro-interaction,
// capped to a small range so it reads as refined rather than gimmicky.
const MAGNETIC_RANGE = 10;

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * MAGNETIC_RANGE);
    y.set((relY / (rect.height / 2)) * MAGNETIC_RANGE);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Link
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-[color,background-color,border-color,box-shadow] duration-200 active:scale-[0.97]",
          variants[variant],
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
