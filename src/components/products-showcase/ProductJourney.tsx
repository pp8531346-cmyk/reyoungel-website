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
      <div className="mx-auto grid w-full max-w-6xl items-center gap-3 lg:grid-cols-12 lg:gap-16">
        <div className="relative mx-auto lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] h-[33vh] overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] bg-stone/10 shadow-[0_30px_60px_-30px_rgba(26,20,20,0.25)] lg:h-[62vh]">
            <Image
              src={journeyImage.src}
              alt="מודל להדגמת אזורי הזרקה"
              fill
              priority
              sizes="(min-width: 1024px) 24rem, 60vw"
              className="object-cover"
              style={{ objectPosition: journeyImage.focus }}
              data-edit-id="src/lib/productShowcaseContent.ts#journeyImage"
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
                <span
                  className="text-xs font-bold tracking-wide"
                  style={{ color: entry.accent }}
                  data-edit-id={`src/lib/data.ts#products-${product.code}-tagline`}
                >
                  {product.tagline}
                </span>
              </motion.div>

              <motion.h2
                variants={textItem}
                dir="ltr"
                className="mt-2 text-right font-display text-3xl font-black leading-[1.05] text-ink lg:mt-3 lg:text-5xl"
                data-edit-id={`src/lib/data.ts#products-${product.code}-name`}
              >
                {product.name}
              </motion.h2>

              <motion.p
                variants={textItem}
                className="mt-2 max-w-lg text-sm leading-relaxed text-stone lg:mt-3 lg:text-base"
                data-edit-id={`src/lib/productShowcaseContent.ts#showcaseEntries-${product.code}-description`}
              >
                {entry.description}
              </motion.p>

              <motion.div variants={textItem} className="mt-2 lg:mt-3">
                <p
                  className="text-[11px] font-bold tracking-wide text-plum"
                  data-edit-id="src/components/products-showcase/ProductJourney.tsx#label-areas"
                >
                  {/* @edit:label-areas */}
                  אזורי טיפול עיקריים
                </p>
                <p
                  className="mt-1 max-w-lg text-sm leading-relaxed text-ink"
                  data-edit-id={`src/lib/data.ts#products-${product.code}-areas`}
                >
                  {product.areas}
                </p>
              </motion.div>

              <motion.div
                variants={textItem}
                className="mt-2 flex w-full items-stretch gap-6 border-t border-catalog-gray pt-2 lg:mt-5 lg:gap-10 lg:pt-6"
              >
                <DepthGauge depth={product.depth} size="lg" trackColor="catalog-gray" />
                <div className="flex-1">
                  <dl className="grid grid-cols-2">
                    <div className="border-e border-b border-catalog-gray pb-2 pe-6 lg:pb-3">
                      <dt
                        className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70"
                        data-edit-id="src/components/products-showcase/ProductJourney.tsx#label-depth"
                      >
                        {/* @edit:label-depth */}
                        עומק הזרקה
                      </dt>
                      <dd
                        className="mt-1 font-display text-xl font-black leading-none text-ink lg:text-2xl"
                        data-edit-id={`src/lib/productShowcaseContent.ts#showcaseEntries-${product.code}-injectionDepth`}
                      >
                        {entry.injectionDepth}
                      </dd>
                    </div>
                    <div className="border-b border-catalog-gray pb-2 ps-6 lg:pb-3">
                      <dt
                        className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70"
                        data-edit-id="src/components/products-showcase/ProductJourney.tsx#label-structure"
                      >
                        {/* @edit:label-structure */}
                        מבנה הג׳ל
                      </dt>
                      <dd
                        dir="ltr"
                        className="mt-1 text-right font-display text-xl font-black leading-none tabular-nums text-ink lg:text-2xl"
                        data-edit-id={`src/lib/productShowcaseContent.ts#showcaseEntries-${product.code}-structureLabel`}
                      >
                        {entry.structureLabel}
                      </dd>
                    </div>
                    <div className="border-e border-b border-catalog-gray py-2 pe-6 lg:py-3">
                      <dt
                        className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70"
                        data-edit-id="src/components/products-showcase/ProductJourney.tsx#label-concentration"
                      >
                        {/* @edit:label-concentration */}
                        ריכוז HA
                      </dt>
                      <dd
                        dir="ltr"
                        className="mt-1 text-right font-display text-xl font-black leading-none tabular-nums text-ink lg:text-2xl"
                        data-edit-id={`src/lib/productShowcaseContent.ts#showcaseEntries-${product.code}-haConcentration`}
                      >
                        {entry.haConcentration}
                      </dd>
                    </div>
                    <div className="border-b border-catalog-gray py-2 ps-6 lg:py-3">
                      <dt
                        className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70"
                        data-edit-id="src/components/products-showcase/ProductJourney.tsx#label-duration"
                      >
                        {/* @edit:label-duration */}
                        משך תוצאה
                      </dt>
                      <dd
                        className="mt-1 font-display text-xl font-black leading-none text-ink lg:text-2xl"
                        data-edit-id={`src/lib/data.ts#products-${product.code}-duration`}
                      >
                        {product.duration}
                      </dd>
                    </div>
                    <div className="col-span-2 pt-3">
                      <dt
                        className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone/70"
                        data-edit-id="src/components/products-showcase/ProductJourney.tsx#label-needle"
                      >
                        {/* @edit:label-needle */}
                        מחט מומלצת
                      </dt>
                      <dd
                        dir="ltr"
                        className="mt-1 text-right font-display text-xl font-black leading-none tabular-nums text-ink lg:text-2xl"
                        data-edit-id={`src/lib/productShowcaseContent.ts#showcaseEntries-${product.code}-needleGauge`}
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

      {/* Arrow + progress control. Physical left-to-right layout (not RTL reading
          order): the right-hand arrow always advances Fine Lines → Sub Skin,
          matching the box row's left-to-right order — see ArrowButton below. */}
      <div className="flex items-center justify-center gap-5">
        <ArrowButton side="right" onClick={goNext} disabled={activeIndex === N - 1} label="המוצר הבא" />
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-catalog-gray shadow-[0_2px_10px_-2px_rgba(26,20,20,0.2)]">
          <motion.div
            className="h-full rounded-full"
            style={{ transformOrigin: "left", background: "var(--color-wine)" }}
            initial={false}
            animate={{ scaleX: Math.max(0.03, activeIndex / (N - 1)) }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <ArrowButton side="left" onClick={goPrev} disabled={activeIndex === 0} label="המוצר הקודם" />
      </div>
    </section>
  );
}

function ArrowButton({
  side,
  onClick,
  disabled,
  label,
}: {
  /** Physical screen side this button renders on — the icon and its forward/back
   * meaning are locked to physical left/right, not RTL reading order. In an RTL
   * flex row the first DOM child renders rightmost, so `side="right"` must be the
   * first ArrowButton in JSX and `side="left"` the last. */
  side: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  const Icon = side === "right" ? ChevronRight : ChevronLeft;
  // Nudge direction matches the chevron's own point, not the semantic
  // forward/back meaning — reads as "the icon leans the way it's pointing."
  const nudge = side === "right" ? 3 : -3;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      initial="rest"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      className={cn(
        "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 shadow-[0_8px_20px_-10px_rgba(26,20,20,0.35)] transition-[color,background-color,border-color,opacity] duration-200",
        disabled
          ? "cursor-default border-ink/10 text-ink/20 shadow-none"
          : "border-wine/25 bg-cream text-wine hover:border-wine hover:bg-wine hover:text-cream",
      )}
    >
      {/* Soft ambient glow bloom on hover — echoes the treatment markers' own
          halo directly above this control, so the arrows read as part of the
          same interactive vocabulary rather than a one-off hover effect. */}
      {!disabled && (
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-wine blur-md"
          variants={{ rest: { opacity: 0, scale: 0.8 }, hover: { opacity: 0.3, scale: 1.3 } }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <motion.span
        className="flex"
        variants={{ rest: { x: 0 }, hover: { x: nudge } }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <Icon className="h-6 w-6" aria-hidden />
      </motion.span>
    </motion.button>
  );
}
