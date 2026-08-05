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
        sizes="(min-width: 1024px) 19rem, 45vw"
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

      {/* Text column + rail — a single, ordinary in-flow block. On mobile the photography
          below is just the next stacked block (no special-casing needed); at lg it becomes
          `absolute` and drops out of flex-item generation entirely (per spec), so this row
          alone gets centered and the reserved padding-end keeps text clear of it. */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-10 lg:pe-[19rem] xl:pe-[21rem]">
        {/* Rail — physically rightmost in the RTL flex row (first DOM child) */}
        <HeroRail />

        {/* Text column — center */}
        <Reveal className="flex flex-col items-center gap-4 text-center lg:max-w-lg lg:flex-1 lg:items-start lg:text-start">
          <div className="max-w-xl lg:max-w-md">
            <AnimatedHeadline
              className="font-display text-[clamp(2rem,4.2vw,3.25rem)] font-black leading-[1.08] tracking-[0.01em]"
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
          <ul className="flex flex-col gap-1.5">
            {heroValueBullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2 text-xs font-bold text-ink lg:text-sm">
                <Check className="h-4 w-4 shrink-0 text-wine" aria-hidden />
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-1 flex flex-wrap justify-center gap-4 lg:justify-start">
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

      {/* Photography — an ordinary stacked block on mobile (centered, modest size); at lg it
          switches to `absolute`, pinning flush to the true left edge of the viewport as an
          accent beside the text rather than a dominant visual. */}
      <ParallaxImage className="relative mx-auto w-full max-w-[11rem] px-6 lg:absolute lg:inset-y-0 lg:left-0 lg:z-0 lg:mx-0 lg:flex lg:w-[17rem] lg:max-w-none lg:items-center lg:px-0 xl:w-[19rem]">
        <PackagingArt />
      </ParallaxImage>
    </HeroParallaxSection>
  );
}
