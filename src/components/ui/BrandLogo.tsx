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
 *
 * Sizing: 1.3em, not a plain 1em — the script logotype's own letter-baseline
 * (where "eoungel" actually sits) falls ~51% down its trimmed bounding box,
 * not near the bottom (the y/g swash tails descend almost as far below that
 * as the R's flourish rises above it — measured directly against the asset's
 * alpha channel, both variants, not eyeballed). Only the top half of the box
 * is the visible letterforms proper, so sizing off the box's raw height alone
 * reads noticeably smaller than the surrounding text's own cap height.
 *
 * Vertical position: `vertical-align: middle`, not a hand-computed offset. An
 * earlier version of this fix solved a fixed `-0.637em` offset that puts the
 * wordmark's own letter-baseline exactly on the surrounding text's baseline —
 * correct against the asset's own geometry in isolation, but it read as sitting
 * too low once actually checked against real text: the real baseline a browser
 * aligns an inline replaced element against depends on the *surrounding font's*
 * own metrics too (this site mixes font-display headings with font-body
 * paragraphs, at sizes from text-sm up to a 5rem hero), which a fixed em offset
 * derived purely from the logo asset can't account for. `middle` delegates that
 * per-context math to the browser (aligned against each line's own real x-height
 * rather than a value baked in here), which is what actually keeps this reading
 * as centered — not floating high or sitting low — across every font/size it's
 * dropped into.
 */
const HEIGHT_EM = 1.3;

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
      className={cn("inline-block w-auto align-middle mx-[0.2em]", className)}
      style={{ height: `${HEIGHT_EM}em` }}
    />
  );
}
