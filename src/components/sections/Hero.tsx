import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { HeaderWave } from "@/components/decor/HeaderWave";
import { ParallaxSection, ParallaxLayer } from "@/components/decor/SectionParallax";
import { heroRail, heroValueBullets } from "@/lib/data";
import { cn } from "@/lib/utils";

const PACKAGING_SRC = "/images/hero-hand-syringe.png";

function PackagingArt({ className, variant }: { className?: string; variant: "mobile" | "desktop" }) {
  return (
    <div className={cn("pointer-events-none relative", className)}>
      {/* Very soft contact shadow — just enough to ground the cutout, not a heavy blob */}
      <div
        aria-hidden
        className="absolute inset-x-[18%] bottom-0 h-[10%] translate-y-[20%] rounded-full bg-ink/15 blur-xl"
      />
      <Image
        src={PACKAGING_SRC}
        alt="יד עם כפפה אוחזת במזרק ומארז מוצר Reyoungel מבית Bioha Laboratories"
        width={1313}
        height={1504}
        priority
        sizes="(min-width: 1280px) 21rem, (min-width: 1024px) 19rem, 45vw"
        className="relative h-auto w-full object-contain drop-shadow-[0_10px_18px_rgba(26,20,20,0.12)]"
        data-edit-id={`src/components/sections/Hero.tsx#packaging-art-${variant}`}
      />
    </div>
  );
}

function HeroRail() {
  return (
    <div className="hidden w-28 shrink-0 flex-col gap-8 self-center lg:flex">
      {heroRail.map((item, i) => (
        <div key={item.number} className="rail-item flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="h-px w-7 bg-hairline" aria-hidden />
            <span
              className="rail-number font-display text-lg font-black text-wine"
              data-edit-id={`src/lib/data.ts#heroRail-${i}-number`}
            >
              {item.number}
            </span>
          </div>
          <span
            className="rail-label text-xs font-bold text-stone"
            data-edit-id={`src/lib/data.ts#heroRail-${i}-label`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ValueChecklist({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-1.5", className)}>
      {heroValueBullets.map((bullet, i) => (
        <li key={bullet} className="flex items-center gap-2 text-xs font-bold text-ink lg:text-sm">
          <Check className="h-4 w-4 shrink-0 text-wine" aria-hidden />
          <span data-edit-id={`src/lib/data.ts#heroValueBullets-${i}`}>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  return (
    <ParallaxSection className="relative isolate flex h-screen flex-col items-center justify-center gap-6 overflow-hidden pb-[3vh] pt-[max(7rem,11vh)]">
      {/* Back layer — ambient gradient + grain, drifts least as the hero scrolls
          through the viewport so it reads as furthest from the viewer. */}
      <ParallaxLayer range={12} className="pointer-events-none absolute inset-0 h-full w-full">
        <div className="hero-gradient-bg absolute inset-0 h-full w-full" aria-hidden />
        <div className="grain absolute inset-0" />
      </ParallaxLayer>

      {/* Mid layer — bleeds down from beneath the fixed navbar, scrolls away with the
          page instead of staying pinned. Offset by the navbar's own height (75.5px) so
          it starts exactly at the navbar's bottom edge rather than under it. */}
      <ParallaxLayer
        range={22}
        className="pointer-events-none absolute inset-x-0 top-[75.5px] h-[130px] w-full"
      >
        <HeaderWave className="h-full w-full drop-shadow-[0_10px_14px_rgba(26,20,20,0.16)]" />
      </ParallaxLayer>

      {/* Text column + rail. At lg the photography below becomes `absolute` and drops out of
          flex-item generation entirely (per spec), so this row alone gets centered and the
          reserved padding-end keeps text clear of it. */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-10 lg:pe-[21rem] xl:pe-[23rem]">
        {/* Rail — physically rightmost in the RTL flex row (first DOM child) */}
        <HeroRail />

        {/* Text column — center. Mobile order: headline, paragraph, image+checklist row,
            buttons. Desktop order (unchanged): headline, paragraph, checklist, buttons —
            photography floats separately, absolutely positioned beside this column. */}
        <Reveal className="flex w-full flex-col items-center gap-5 text-center lg:max-w-lg lg:flex-1 lg:items-start lg:gap-4 lg:text-start">
          <div className="max-w-xl lg:max-w-md">
            <AnimatedHeadline
              className="font-display text-[clamp(2.5rem,7vw,4.25rem)] font-black leading-[1.05] tracking-[0.01em] lg:text-[clamp(2.5rem,4.8vw,3.75rem)]"
              lineClassNames={["text-wine", "text-ink"]}
              editFile="src/components/sections/Hero.tsx"
              editIdPrefix="headline"
              lines={[
                [
                  /* @edit:headline-0-0 */ "להיראות ",
                  /* @edit:headline-0-1 */ "כמו",
                  /* @edit:headline-0-2 */ "עצמך",
                ],
                [/* @edit:headline-1-0 */ "רק ", /* @edit:headline-1-1 */ "במיטבך"],
              ]}
            />
          </div>
          <p
            className="mt-5 max-w-md text-xs font-normal leading-relaxed text-stone lg:text-sm"
            data-edit-id="src/components/sections/Hero.tsx#hero-subtext"
          >
            {/* @edit:hero-subtext */}
            חומצה היאלורונית מצולבת מתקדמת לעיצוב והרמוניזציה של תווי הפנים, לשליטה מדויקת בעומק ההזרקה ותוצאה יציבה לאורך זמן.
          </p>

          {/* Desktop-only: checklist stays inline in the text column; photography floats
              elsewhere. Hidden on mobile (display:none — not just visually redundant with
              the row below, also excluded from the accessibility tree). */}
          <ValueChecklist className="hidden lg:flex" />

          {/* Mobile-only: image bled flush to the screen edge — "entering the frame" —
              paired beside the checklist at the same vertical level. Checklist comes first
              in DOM so the image is the row's last child, landing visually leftmost under
              RTL (matching the desktop side); negative left margin on the image then cancels
              this column's inherited left padding (px-6) so it reaches the true screen edge
              without affecting the checklist's own position. */}
          <div className="flex w-full items-center gap-4 lg:hidden">
            <ValueChecklist />
            <div className="-ml-6 w-[8.5rem] shrink-0">
              <PackagingArt variant="mobile" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 lg:mt-1 lg:justify-start">
            <Button href="/products" variant="primary-glow">
              <span data-edit-id="src/components/sections/Hero.tsx#cta-primary-label">
                {/* @edit:cta-primary-label */}
                צפו במוצרים
              </span>
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/contact" variant="glass">
              <span data-edit-id="src/components/sections/Hero.tsx#cta-secondary-label">
                {/* @edit:cta-secondary-label */}
                צרו קשר מקצועי
              </span>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Front layer — photography, desktop only (mobile has its own in-flow copy above,
          paired with the checklist). Absolutely positioned, pinned flush to the true left
          edge of the viewport; top/bottom mirror the section's own pt/pb so it centers
          within the same band as the text column instead of the section's full
          (nav-clearance-inclusive) height, which previously read as sitting too high.
          Drifts furthest of the three layers, reading as closest to the viewer. `grid` +
          `content-center` (not `flex items-center`) is required here — an unstyled child
          nested a couple of levels down only stretches to fill 100% width under grid's
          default item behavior, not flex's shrink-to-content default. */}
      <Reveal className="pointer-events-none absolute left-0 top-[max(7rem,11vh)] bottom-[3vh] z-0 hidden w-[19rem] content-center lg:grid xl:w-[21rem]">
        <ParallaxLayer range={36}>
          <PackagingArt variant="desktop" />
        </ParallaxLayer>
      </Reveal>
    </ParallaxSection>
  );
}
