import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionCurve } from "@/components/decor/SectionCurve";

export function CtaBand() {
  return (
    <section className="relative bg-ivory px-6 py-20 lg:px-10">
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-1/2 -top-8 z-10 -translate-x-1/2">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-cream/60 shadow-md">
            <Image
              src="/images/hero-model.png"
              alt=""
              fill
              sizes="64px"
              className="object-cover"
              style={{ objectPosition: "50% 20%" }}
              data-edit-id="src/components/sections/CtaBand.tsx#avatar"
            />
          </div>
        </div>

        {/* Design-audit fix #2: this exact component closes every page, so its
            shape and internal layout were the most-repeated wine block on the
            site. Corner asymmetry pushed further so it actually registers, and
            at lg the headline+buttons move from a stacked-centered column into
            a single start/end row — no longer the identical "centered
            headline, centered button row" formula used elsewhere. */}
        <div className="grain relative overflow-hidden rounded-tl-[7rem] rounded-br-[7rem] bg-wine px-6 pb-16 pt-20 text-cream lg:rounded-tl-[9rem] lg:rounded-br-[9rem] lg:px-16 lg:py-20">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center lg:max-w-none lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-start">
            <h2
              className="font-display text-3xl font-black leading-tight lg:max-w-md lg:text-4xl"
              data-edit-id="src/components/sections/CtaBand.tsx#headline"
            >
              {/* @edit:headline */}
              מוכנים לשלב את Reyoungel® בקליניקה שלכם?
            </h2>
            <div className="flex flex-wrap justify-center gap-4 lg:shrink-0 lg:flex-nowrap lg:justify-end">
              <Button href="/contact" variant="primary-on-wine">
                צרו קשר עם הצוות המקצועי
              </Button>
              <Button href="/products" variant="outline-on-wine">
                לכל המוצרים
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <SectionCurve
        fill="var(--color-ink)"
        className="absolute inset-x-0 bottom-0 z-20 h-14 w-full lg:h-20"
      />
    </section>
  );
}
