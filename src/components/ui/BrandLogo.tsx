import Image from "next/image";
import { cn } from "@/lib/utils";

// Natural dimensions of the trimmed wordmark asset (ink-to-ink bounding box,
// no internal padding) — used to keep the inline <Image> from ever
// intrinsic-size-flashing before its CSS height/width resolve.
const LOGO_WIDTH = 813;
const LOGO_HEIGHT = 297;

const VARIANT_SRC = {
  ink: "/images/reyoungel-logo-ink.png",
  white: "/images/reyoungel-logo-white-inline.png",
} as const;

/**
 * Inline brand wordmark — replaces plain "Reyoungel" / "ריונג'ל" text
 * wherever it appears mid-sentence, in a heading, or as a standalone label.
 * Scales with the surrounding font-size (em-based), so drop it directly into
 * a heading or a small paragraph and it sizes itself accordingly.
 */
export function BrandLogo({
  variant = "ink",
  className,
}: {
  /** "ink" for light/ivory backgrounds, "white" for wine/ink (dark) backgrounds. */
  variant?: "ink" | "white";
  className?: string;
}) {
  return (
    <Image
      src={VARIANT_SRC[variant]}
      alt="Reyoungel"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={cn("inline-block h-[1.1em] w-auto align-[-0.08em] mx-[0.2em]", className)}
    />
  );
}
