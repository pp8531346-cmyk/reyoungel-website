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
            />
          </div>
        </div>

        <div className="grain relative overflow-hidden rounded-tl-[5rem] rounded-br-[5rem] bg-wine px-6 pb-16 pt-20 text-cream lg:px-16 lg:pb-20 lg:pt-24">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <h2 className="font-display text-3xl font-black leading-tight lg:text-4xl">
              מוכנים לשלב את Reyoungel® בקליניקה שלכם?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
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
