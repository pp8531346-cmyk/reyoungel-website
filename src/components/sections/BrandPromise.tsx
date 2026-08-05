import { Reveal } from "@/components/ui/Reveal";

export function BrandPromise() {
  return (
    <section className="relative overflow-hidden border-y border-hairline bg-ivory">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 start-1/2 -translate-x-1/2 select-none font-display text-[14rem] leading-none text-wine/[0.07] lg:-top-24 lg:text-[20rem]"
      >
        &rdquo;
      </span>
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <Reveal>
          <p className="text-balance font-display text-xl leading-relaxed text-ink lg:text-2xl">
            מאז 2003, Bioha Laboratories מפתחת ומייצרת חומצה היאלורונית
            מצולבת ברמה הגבוהה ביותר — נמכרת כיום ביותר מ-70 מדינות, תחת
            בקרת איכות קפדנית, ומאושרת ע&rdquo;י ה-CE האירופאי ומשרד הבריאות
            בישראל.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
