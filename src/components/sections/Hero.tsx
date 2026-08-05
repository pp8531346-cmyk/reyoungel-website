import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { HeroRibbon } from "@/components/decor/HeroRibbon";
import { HeaderWave } from "@/components/decor/HeaderWave";
import {
  HeroParallaxSection,
  ParallaxBackground,
  ParallaxImage,
} from "@/components/decor/HeroParallax";
import { heroRail, heroValueBullets } from "@/lib/data";
import { cn } from "@/lib/utils";

const PACKAGING_SRC = "/images/hero-hand-syringe.png";

function PackagingArt({ className }: { className?: string }) {
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
      />
    </div>
  );
}

function HeroRail() {
  return (
    <div className="hidden w-28 shrink-0 flex-col gap-8 self-center lg:flex">
      {heroRail.map((item) => (
        <div key={item.number} className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className="h-px w-7 bg-hairline" aria-hidden />
            <span className="font-display text-lg font-black text-wine">{item.number}</span>
          </div>
          <span className="text-xs font-bold text-stone">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function ValueChecklist({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-1.5", className)}>
      {heroValueBullets.map((bullet) => (
        <li key={bullet} className="flex items-center gap-2 text-xs font-bold text-ink lg:text-sm">
          <Check className="h-4 w-4 shrink-0 text-wine" aria-hidden />
          {bullet}
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  return (
    <HeroParallaxSection className="relative isolate flex h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-ivory pb-[3vh] pt-[max(7rem,11vh)]">
      <ParallaxBackground className="pointer-events-none absolute inset-0 h-full w-full">
        <HeroRibbon className="absolute inset-0 h-full w-full" />
        {/* soft studio light glow, positioned behind where the product photography sits */}
        <div
          aria-hidden
          className="absolute left-[2%] top-[30%] h-[45%] w-[30%] rounded-full bg-[radial-gradient(circle,var(--color-plum)_0%,var(--color-wine)_45%,transparent_72%)] opacity-[0.14] blur-3xl"
        />
      </ParallaxBackground>
      <div className="grain absolute inset-0" />

      {/* Bleeds down from beneath the fixed navbar, scrolls away with the page instead of
          staying pinned. Offset by the navbar's own height (75.5px) so it starts exactly
          at the navbar's bottom edge rather than under it. */}
      <HeaderWave className="pointer-events-none absolute inset-x-0 top-[75.5px] h-[130px] w-full" />

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
              lines={[
                ["להיראות", "כמו", "עצמך"],
                ["רק", "במיטבך."],
              ]}
            />
          </div>
          <p className="max-w-md text-xs font-normal leading-relaxed text-stone lg:text-sm">
            חומצה היאלורונית מצולבת מתקדמת לעיצוב והרמוניזציה של תווי הפנים, מבוססת טכנולוגיית השזירה הפטנטית SAX-HA® לשליטה מדויקת בעומק ההזרקה ותוצאה יציבה לאורך זמן.
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
              <PackagingArt />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 lg:mt-1 lg:justify-start">
            <Button href="/products" variant="primary-glow">
              צפו במוצרים
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/contact" variant="glass">
              צרו קשר מקצועי
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Photography — desktop only (mobile has its own in-flow copy above, paired with the
          checklist). Absolutely positioned, pinned flush to the true left edge of the
          viewport. top/bottom mirror the section's own pt/pb so it centers within the same
          band as the text column instead of the section's full (nav-clearance-inclusive)
          height, which previously read as sitting too high. */}
      <ParallaxImage className="pointer-events-none absolute left-0 top-[max(7rem,11vh)] bottom-[3vh] z-0 hidden w-[19rem] content-center lg:grid xl:w-[21rem]">
        <PackagingArt />
      </ParallaxImage>
    </HeroParallaxSection>
  );
}
