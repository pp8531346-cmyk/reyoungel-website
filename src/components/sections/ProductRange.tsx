import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DepthGauge } from "@/components/ui/DepthGauge";
import { FaceZone } from "@/components/decor/FaceZone";
import { accentColor } from "@/lib/utils";
import { products } from "@/lib/data";

export function ProductRange() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-28 lg:px-10">
      <Reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold tracking-wide text-plum">מגוון המוצרים</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-black text-ink lg:text-4xl">
            חמישה מוצרים, לכל שלב ואזור טיפול
          </h2>
          <p className="mt-2 text-sm font-bold text-stone">
            פיסול פנים · מילוי שפתיים · פיסול אף · פיסול קו לסת
          </p>
        </div>
        <Button href="/products" variant="outline" className="shrink-0">
          לכל המוצרים
        </Button>
      </Reveal>

      <div className="mt-14 flex flex-col gap-5">
        {products.map((product, i) => {
          const accent = accentColor(product.packagingColor);
          return (
            <Reveal key={product.code} delay={i * 70}>
              <Link
                href="/products"
                className="group relative flex flex-col gap-6 overflow-hidden rounded-[1.75rem] border border-hairline bg-cream/60 p-6 transition-all duration-300 hover:border-wine/25 hover:shadow-[0_18px_40px_-20px_rgba(26,20,20,0.25)] sm:flex-row sm:items-center sm:gap-8 lg:p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 start-0 w-1"
                  style={{ backgroundColor: accent }}
                />

                <div className="flex shrink-0 items-center gap-5 sm:gap-6">
                  <span className="font-display text-2xl font-black text-stone/50 lg:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-16 w-14 shrink-0 text-ink/70 lg:h-20 lg:w-16">
                    <FaceZone depth={product.depth} />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold tracking-wide" style={{ color: accent }}>
                    {product.tagline}
                  </p>
                  <span dir="ltr" className="mt-1 block font-display text-xl font-black text-ink lg:text-2xl">
                    {product.name}
                  </span>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-stone">
                    {product.areas}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-6 border-hairline sm:border-s sm:ps-8">
                  <DepthGauge depth={product.depth} size="sm" />
                  <div className="text-xs leading-relaxed text-stone">
                    <p className="font-bold text-ink">{product.duration}</p>
                    <p dir="ltr">{product.particleSize}</p>
                  </div>
                  <ArrowLeft
                    size={20}
                    className="hidden shrink-0 text-wine transition-transform duration-200 group-hover:-translate-x-1 lg:block"
                  />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
