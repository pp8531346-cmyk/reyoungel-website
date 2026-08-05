"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DepthGauge } from "@/components/ui/DepthGauge";
import { TreatmentMarkers } from "./TreatmentMarkers";
import { products } from "@/lib/data";
import { showcaseEntries, journeyImage, type ShowcaseEntry } from "@/lib/productShowcaseContent";
import { cn } from "@/lib/utils";

type Product = (typeof products)[number];
type Item = { product: Product; entry: ShowcaseEntry };

export const journeyItems: Item[] = products
  .map((product) => {
    const entry = showcaseEntries.find((e) => e.code === product.code);
    return entry ? { product, entry } : null;
  })
  .filter((v): v is Item => v !== null);

const N = journeyItems.length;

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const textItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

/**
 * Arrow-driven product journey — the model photo stays fixed while the current
 * product's copy, spec block, and treatment markers change on each arrow click.
 * `activeIndex` is controlled from ProductsExperience so the hero's product boxes
 * can also jump directly to a given step.
 */
export function ProductJourney({
  activeIndex,
  onIndexChange,
  sectionRef,
}: {
  activeIndex: number;
  onIndexChange: (index: number) => void;
  /** Forwarded to the section element so ProductsExperience can scrollIntoView it
   * when a hero product box is clicked. */
  sectionRef?: React.Ref<HTMLElement>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const { product, entry } = journeyItems[activeIndex];

  const goPrev = () => onIndexChange(Math.max(0, activeIndex - 1));
  const goNext = () => onIndexChange(Math.min(N - 1, activeIndex + 1));

  const exitTransition = { duration: shouldReduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      ref={sectionRef}
      id="product-journey"
      aria-label="כל המוצרים"
      className="relative flex h-screen flex-col justify-center gap-[clamp(0.75rem,2.2vh,1.5rem)] overflow-hidden border-t border-hairline bg-ivory px-6 pb-[3vh] pt-[max(5.5rem,3vh)] lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="relative mx-auto lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] h-[27vh] overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] bg-stone/10 shadow-[0_30px_60px_-30px_rgba(26,20,20,0.25)] lg:h-[62vh]">
            <Image
              src={journeyImage.src}
              alt="מודל להדגמת אזורי הזרקה"
              fill
              priority
              sizes="(min-width: 1024px) 24rem, 60vw"
              className="object-cover"
              style={{ objectPosition: journeyImage.focus }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={product.code}
                className="absolute inset-0"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, filter: "blur(3px)" }}
                transition={exitTransition}
              >
                <TreatmentMarkers markers={entry.markers} accent={entry.accent} productCode={product.code} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.code}
              variants={shouldReduceMotion ? undefined : textContainer}
              initial="hidden"
              animate="visible"
              exit={shouldReduceMotion ? undefined : { opacity: 0, transition: exitTransition }}
              className="mx-auto flex w-full max-w-xl flex-col items-start text-start"
            >
              <motion.div variants={textItem} className="flex items-center gap-3">
                <span className="rounded-md bg-catalog-gray px-2 py-1 font-display text-lg font-black text-ink/70">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-hairline" aria-hidden />
                <span className="text-xs font-bold tracking-wide" style={{ color: entry.accent }}>
                  {product.tagline}
                </span>
              </motion.div>

              <motion.h2
                variants={textItem}
                dir="ltr"
                className="mt-3 text-right font-display text-3xl font-black leading-[1.05] text-ink lg:text-5xl"
              >
                {product.name}
              </motion.h2>

              <motion.p variants={textItem} className="mt-3 max-w-lg text-sm leading-relaxed text-stone lg:text-base">
                {entry.description}
              </motion.p>

              <motion.div variants={textItem} className="mt-3">
                <p className="text-[11px] font-bold tracking-wide text-plum">אזורי טיפול עיקריים</p>
                <p className="mt-1 max-w-lg text-sm leading-relaxed text-ink">{product.areas}</p>
              </motion.div>

              <motion.div
                variants={textItem}
                className="mt-5 flex w-full items-stretch gap-6 border-t border-catalog-gray pt-5 lg:gap-10 lg:pt-6"
              >
                <DepthGauge depth={product.depth} size="lg" trackColor="catalog-gray" />
                <div className="flex-1">
                  <dl className="grid grid-cols-2">
                    <div className="border-e border-b border-catalog-gray pb-3 pe-6">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70">עומק הזרקה</dt>
                      <dd className="mt-1 font-display text-xl font-black leading-none text-ink lg:text-2xl">
                        {entry.injectionDepth}
                      </dd>
                    </div>
                    <div className="border-b border-catalog-gray pb-3 ps-6">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70">מבנה הג׳ל</dt>
                      <dd
                        dir="ltr"
                        className="mt-1 text-right font-display text-xl font-black leading-none tabular-nums text-ink lg:text-2xl"
                      >
                        {entry.structureLabel}
                      </dd>
                    </div>
                    <div className="border-e border-b border-catalog-gray py-3 pe-6">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70">ריכוז HA</dt>
                      <dd
                        dir="ltr"
                        className="mt-1 text-right font-display text-xl font-black leading-none tabular-nums text-ink lg:text-2xl"
                      >
                        {entry.haConcentration}
                      </dd>
                    </div>
                    <div className="border-b border-catalog-gray py-3 ps-6">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70">משך תוצאה</dt>
                      <dd className="mt-1 font-display text-xl font-black leading-none text-ink lg:text-2xl">
                        {product.duration}
                      </dd>
                    </div>
                    <div className="col-span-2 pt-3">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70">מחט מומלצת</dt>
                      <dd
                        dir="ltr"
                        className="mt-1 text-right font-display text-xl font-black leading-none tabular-nums text-ink lg:text-2xl"
                      >
                        {entry.needleGauge}
                      </dd>
                    </div>
                  </dl>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5">
        <ArrowButton direction="prev" onClick={goPrev} disabled={activeIndex === 0} />
        <div className="h-1 w-40 overflow-hidden rounded-full bg-catalog-gray">
          <motion.div
            className="h-full rounded-full"
            style={{ transformOrigin: "right", background: "var(--color-wine)" }}
            animate={{ scaleX: Math.max(0.03, activeIndex / (N - 1)) }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <ArrowButton direction="next" onClick={goNext} disabled={activeIndex === N - 1} />
      </div>
    </section>
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  // RTL: "previous" (toward the start of the sequence) points right, "next" points left.
  const Icon = direction === "prev" ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "המוצר הקודם" : "המוצר הבא"}
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[color,border-color,opacity] duration-200",
        disabled
          ? "cursor-default border-ink/10 text-ink/20"
          : "border-ink/25 text-ink hover:border-wine hover:text-wine active:scale-[0.97]",
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
}
