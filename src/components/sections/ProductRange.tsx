import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { SpriteBoxImage } from "@/components/products-showcase/SpriteBoxImage";
import { products } from "@/lib/data";
import { heroBoxes } from "@/lib/productShowcaseContent";

/** Single merged description per product for this compact card layout — combines
 * each product's `tagline` (indication) and `areas` (treatment areas) from
 * src/lib/data.ts into one natural sentence, since the card no longer has room
 * for two separate description lines. This is Home-page-only copy: /products
 * (ProductJourney) still reads `tagline`/`areas` as separate fields from
 * src/lib/data.ts directly and is unaffected. */
const cardDescriptions: Record<(typeof products)[number]["code"], string> = {
  R001: /* @edit:cardDescriptions-R001 */ "לקמטי ההבעה העדינים ביותר באזור שקעי העיניים והברקודים",
  R002: /* @edit:cardDescriptions-R002 */ "לשפתיים ולקמטים בעומק בינוני, ולחידוד קו מתאר השפה.",
  R003: /* @edit:cardDescriptions-R003 */ "לנפח שפתיים ולחיים, ולטיפול בקפל האף-שפה ובקמטי המריונטה.",
  R004: /* @edit:cardDescriptions-R004 */ "לעיצוב עצמות הלחי, הסנטר, קו הלסת והנפח העמוק.",
  R005: /* @edit:cardDescriptions-R005 */ "לעיצוב מתאר הפנים והגוף - קו הלסת, הסנטר, עצמות הלחיים והאף.",
};

// Matched before/after pair — same head position/angle/zoom/framing on both,
// cropped from the source studio photos (724x1030) to remove the baked-in
// "A / PRE-TREATMENT" and "B / POST-HYALURONIC ACID TREATMENT" caption strip,
// which would otherwise duplicate/clash with this component's own labels.
const BEFORE_AFTER_PAIR = {
  before: "/images/treatment-compare-before.png",
  after: "/images/treatment-compare-after.png",
};

export function ProductRange() {
  return (
    <section className="flex flex-col gap-6 bg-ivory px-6 py-16 lg:h-screen lg:justify-center lg:gap-4 lg:overflow-hidden lg:px-10 lg:pb-[3vh] lg:pt-[max(5.5rem,3vh)]">
      {/* sm:items-start (not the old items-end) is what puts the top of this
          heading and the top of the "לכל המוצרים" button on the same line —
          this row used to hold a separate, empty section eyebrow/headline
          (dead weight reserving blank space above the slider's own heading
          one level down); that heading now lives here instead, so there's a
          single aligned header row and nothing left pushing the slider's
          content down before it starts. */}
      <Reveal className="flex flex-col items-start gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p
            className="text-sm font-bold tracking-wide text-plum"
            data-edit-id="src/components/sections/ProductRange.tsx#before-after-eyebrow"
          >
            {/* @edit:before-after-eyebrow */}
            תוצאות אמיתיות
          </p>
          {/* Design-audit fix #5: this h2 intentionally sits one step below the
              site's default h2 scale (text-3xl/text-4xl elsewhere). This
              section is height-constrained (lg:h-screen, the "fits in one
              viewport" pattern) — bumping the size was tested and risks
              overflowing that budget, so the deviation is deliberate and
              documented here rather than silently normalized. */}
          <h2
            className="mt-2 max-w-xl font-display text-2xl font-black text-ink lg:text-3xl"
            data-edit-id="src/components/sections/ProductRange.tsx#before-after-headline"
          >
            {/* @edit:before-after-headline */}
            גררו כדי לראות את השינוי
          </h2>
        </div>
        <Button href="/products" variant="outline" className="shrink-0">
          <span data-edit-id="src/components/sections/ProductRange.tsx#cta-label">
            {/* @edit:cta-label */}
            לכל המוצרים
          </span>
        </Button>
      </Reveal>

      {/* Two halves, split at the site's lg breakpoint (same one every other
          responsive stack on the site uses). Before/after comes first in DOM,
          which satisfies both layouts at once: on mobile (plain flex-col) it
          renders on top per spec; on desktop (flex-row, RTL) the first DOM
          child renders rightmost — so it lands in the right half, cards in
          the left half, exactly as required. No `order-*` override needed. */}
      <div className="flex min-h-0 flex-col gap-6 lg:flex-1 lg:flex-row lg:items-stretch lg:gap-10">
        {/* The heading that used to live inside this column moved up into the
            shared header above (see the Reveal comment) — this is now just
            the image, so it can use the column's entire stretched height
            (lg:min-h-0 is what lets it actually shrink/stretch to match the
            cards column instead of blocking on its own content size) and the
            column's full width (no max-w cap at lg), rather than sharing that
            space with a heading. Mobile: fixed 4:5 card, matches the Products
            page. The slider crops to fit via object-cover; focalPosition (on
            the images themselves) keeps the face safe from that crop. */}
        <div className="mx-auto aspect-[4/5] w-full max-w-sm shrink-0 lg:mx-0 lg:aspect-auto lg:h-full lg:w-1/2 lg:max-w-none lg:min-h-0 lg:flex-1">
          <BeforeAfterSlider
            beforeSrc={BEFORE_AFTER_PAIR.before}
            afterSrc={BEFORE_AFTER_PAIR.after}
            className="h-full w-full"
          />
        </div>

        <div className="flex min-h-0 flex-col justify-center gap-2 lg:w-1/2 lg:flex-1">
          {products.map((product, i) => {
            const box = heroBoxes.find((b) => b.code === product.code);
            return (
              <Reveal key={product.code} delay={i * 60}>
                <Link
                  href="/products"
                  className="hover-lift-card group relative flex items-center gap-4 overflow-hidden rounded-xl border border-hairline bg-cream/60 py-2.5 pe-4 ps-0"
                >
                  {/* 1. Color bar — rightmost element, exact box color (no CSS mute) */}
                  <span
                    aria-hidden
                    className="h-11 w-1.5 shrink-0 self-stretch rounded-full"
                    style={{ backgroundColor: product.packagingColor }}
                  />

                  {/* 2. Number */}
                  <span className="rail-number shrink-0 font-display text-xl font-black text-stone/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* 3. Box image — mx-auto + aspectRatio (matching box.rect's own
                      width:height) lets this shrink-fit within the h-14 w-9 footprint
                      the way object-contain on a plain <img> would; SpriteBoxImage's
                      crop math only stays undistorted when its wrapper has that exact
                      aspect (see SpriteBoxImage's own doc comment). */}
                  {box && (
                    <div className="relative h-14 w-9 shrink-0">
                      <div
                        className="relative mx-auto h-full overflow-hidden"
                        style={{ aspectRatio: `${box.rect.x2 - box.rect.x1} / ${box.rect.y2 - box.rect.y1}` }}
                      >
                        <SpriteBoxImage
                          box={box}
                          alt=""
                          sizes="36px"
                          imageClassName="hover-lift-image object-contain drop-shadow-[0_6px_12px_rgba(26,20,20,0.14)]"
                        />
                      </div>
                    </div>
                  )}

                  {/* 4. Name + description */}
                  <div className="min-w-0 flex-1">
                    <span
                      dir="ltr"
                      className="rail-label block text-right font-display text-lg font-black leading-tight text-ink"
                      data-edit-id={`src/lib/data.ts#products-${product.code}-name`}
                    >
                      {product.name}
                    </span>
                    <p
                      className="mt-1 truncate text-sm leading-snug text-stone"
                      data-edit-id={`src/components/sections/ProductRange.tsx#cardDescriptions-${product.code}`}
                    >
                      {cardDescriptions[product.code]}
                    </p>
                  </div>

                  {/* 5. Arrow — leftmost element, unchanged behavior (Link -> /products) */}
                  <ArrowLeft
                    size={18}
                    className="shrink-0 text-wine transition-transform duration-200 group-hover:-translate-x-1"
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
