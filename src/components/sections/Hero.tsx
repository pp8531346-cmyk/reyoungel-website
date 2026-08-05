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

const PACKAGING_SRC = "/images/hero-boxes-source-trimmed.png";

function PackagingArt({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* glass platform — soft blurred ellipse the product appears to rest on, not a literal 3D render */}
      <div
        aria-hidden
        className="absolute inset-x-[8%] bottom-[4%] h-1/5 rounded-full bg-gradient-to-t from-cream/70 via-cream/20 to-transparent blur-xl"
      />
      {/* directional ground shadow — offset down-and-inward instead of a flat centered blob */}
      <div
        aria-hidden
        className="absolute inset-x-[14%] bottom-[2%] h-1/4 translate-y-[10%] scale-x-110 rounded-full bg-ink/25 blur-2xl"
      />
      <Image
        src={PACKAGING_SRC}
        alt="מארזי מוצרי Reyoungel מבית Bioha Laboratories, עם מזרק להדגמה"
        width={1046}
        height={750}
        priority
        sizes="(min-width: 1024px) 34rem, 90vw"
        className="relative h-auto w-full object-contain drop-shadow-[8px_30px_28px_rgba(26,20,20,0.18)]"
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
    <HeroParallaxSection className="relative isolate overflow-hidden bg-ivory pb-16 pt-32 lg:pb-20 lg:pt-40">
      <ParallaxBackground className="pointer-events-none absolute inset-0 h-full w-full">
        <HeroRibbon className="absolute inset-0 h-full w-full" />
        {/* soft studio light glow, positioned behind where the product photography sits */}
        <div
          aria-hidden
          className="absolute left-[4%] top-[22%] h-[55%] w-[45%] rounded-full bg-[radial-gradient(circle,var(--color-plum)_0%,var(--color-wine)_45%,transparent_72%)] opacity-[0.14] blur-3xl"
        />
      </ParallaxBackground>
      <div className="grain absolute inset-0" />

      {/* Bleeds down from beneath the fixed navbar, scrolls away with the page instead of
          staying pinned. Offset by the navbar's own height (75.5px) so it starts exactly
          at the navbar's bottom edge rather than under it. */}
      <HeaderWave className="pointer-events-none absolute inset-x-0 top-[75.5px] h-[130px] w-full" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10">
        {/* Rail — physically rightmost in the RTL flex row (first DOM child) */}
        <HeroRail />

        {/* Text column — center */}
        <Reveal className="flex flex-col items-center gap-6 text-center lg:max-w-lg lg:flex-1 lg:items-start lg:text-start">
          <p className="text-sm font-bold tracking-wide text-stone">
            
          </p>
          <div className="max-w-xl lg:max-w-md">
            <AnimatedHeadline
              className="font-display text-[clamp(1.5rem,4.2vw,3.5rem)] font-black leading-[1.08] tracking-[0.01em]"
              lineClassNames={["text-wine", "text-ink"]}
              lines={[
                ["להיראות", "כמו", "עצמך"],
                ["רק", "במיטבך."],
              ]}
            />
          </div>
          <p className="max-w-md text-base leading-relaxed text-stone lg:text-lg">
            חומצה היאלורונית מצולבת מתקדמת לעיצוב והרמוניזציה של תווי הפנים, מבוססת טכנולוגיית השזירה הפטנטית SAX-HA® לשליטה מדויקת בעומק ההזרקה ותוצאה יציבה לאורך זמן.
          </p>
          <ul className="flex flex-col gap-2">
            {heroValueBullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2 text-sm font-bold text-ink">
                <Check className="h-4 w-4 shrink-0 text-wine" aria-hidden />
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button href="/products" variant="primary-glow">
              צפו במוצרים
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/contact" variant="glass">
              צרו קשר מקצועי
            </Button>
          </div>
        </Reveal>

        {/* Photography — physically leftmost (last DOM child) */}
        <ParallaxImage className="w-full max-w-md lg:max-w-2xl lg:flex-[1.4]">
          <PackagingArt />
        </ParallaxImage>
      </div>
    </HeroParallaxSection>
  );
}
