import Image from "next/image";
import { heroBoxesSprite, type heroBoxes } from "@/lib/productShowcaseContent";

/** Renders one product's slice of the shared heroBoxesSprite, clipped to `box.rect`.
 * The sprite is rendered at full size inside an inner div positioned/scaled so only
 * that product's own rect lands inside this component's box — the same clipped-window
 * technique ShowcaseIntro's hero row uses, factored out here so the two other spots
 * that need a single product's box image (the floating badge, the home product list)
 * don't hand-duplicate the crop math. Caller must give the wrapping element
 * `overflow-hidden` and the box's own aspect ratio (rect width:height) to avoid
 * distorting the crop. */
export function SpriteBoxImage({
  box,
  alt,
  sizes,
  imageClassName,
  editable = false,
}: {
  box: (typeof heroBoxes)[number];
  alt: string;
  sizes: string;
  imageClassName?: string;
  /** Only one on-page instance of the sprite should carry the shared data-edit-id
   * (the dev editor resolves it by querySelector, which only ever finds the first
   * match) — pass true for exactly one caller per page. */
  editable?: boolean;
}) {
  const boxWidthPct = box.rect.x2 - box.rect.x1;
  const boxHeightPct = box.rect.y2 - box.rect.y1;
  const scaleX = 100 / boxWidthPct;
  const scaleY = 100 / boxHeightPct;

  return (
    <div
      className="absolute"
      style={{
        width: `${scaleX * 100}%`,
        height: `${scaleY * 100}%`,
        left: `${-box.rect.x1 * scaleX}%`,
        top: `${-box.rect.y1 * scaleY}%`,
      }}
    >
      <Image
        src={heroBoxesSprite.src}
        alt={alt}
        fill
        sizes={sizes}
        className={imageClassName}
        data-edit-id={editable ? "src/lib/productShowcaseContent.ts#heroBoxesSprite" : undefined}
      />
    </div>
  );
}
