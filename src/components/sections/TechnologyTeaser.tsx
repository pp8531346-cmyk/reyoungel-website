import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Citation } from "@/components/ui/Citation";
import { CrossLinkDiagram } from "@/components/decor/CrossLinkDiagram";

export function TechnologyTeaser() {
  return (
    <section className="bg-ivory px-6 py-20 lg:px-10 lg:py-28">
      <div
        className="grain relative mx-auto max-w-5xl overflow-hidden rounded-tr-[7rem] rounded-bl-[7rem] px-6 py-16 text-cream lg:rounded-tr-[10rem] lg:rounded-bl-[10rem] lg:px-16 lg:py-20"
        style={{
          background:
            "linear-gradient(205deg, var(--color-wine-dark) 0%, var(--color-wine) 50%, var(--color-plum) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 55% at 82% 12%, rgba(250,245,239,0.14), transparent 70%)",
          }}
        />

        <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p
            className="text-sm font-bold tracking-wide text-cream/70"
            data-edit-id="src/components/sections/TechnologyTeaser.tsx#eyebrow"
          >
            {/* @edit:eyebrow */}
            הטכנולוגיה שמאחורי Reyoungel
          </p>
          <h2
            className="max-w-md font-display text-3xl font-black leading-tight lg:text-4xl"
            data-edit-id="src/components/sections/TechnologyTeaser.tsx#headline"
          >
            {/* @edit:headline */}
            SAX-HA®- טכנולוגיית ההצלבה הייחודית של Reyoungel
          </h2>
          <p className="max-w-md text-base leading-relaxed text-cream/85">
            <span data-edit-id="src/components/sections/TechnologyTeaser.tsx#body">
              {/* @edit:body */}
              בזכות הפטנט הבלעדי שלנו (ZL 2012 1 0372786.0),טכנולוגיית ההצלבה של Reyoungel מסלקת שיעור גבוה משמעותית של שאריות מצלב ה-BDDE מהג’ל ,לעומת שיטות הצלבה סטנדרטיות מבוססות BDDE/DVS התוצאה:פחות תגובות רגישות, ושימור של נפח הג’ל לאורך זמן במקום ההזרקה                        
            </span>
            <Citation n={2} onWine />
          </p>
          <Link
            href="/technology"
            className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream"
            data-edit-id="src/components/sections/TechnologyTeaser.tsx#cta-link"
          >
            {/* @edit:cta-link */}
            לעומק הטכנולוגיה והנתונים הקליניים
          </Link>
        </Reveal>

        {/* Design-audit fix #2: shifted off-center at lg (was mx-auto,
            dead-center under the centered text above it) so the panel reads
            as one asymmetric composition rather than everything stacked on
            the same centerline. */}
        <Reveal
          delay={150}
          className="relative mx-auto mt-14 w-full max-w-md rounded-[2rem] border border-cream/10 bg-cream/5 px-6 py-10 lg:mt-16 lg:me-0 lg:ms-auto lg:px-10"
        >
          <CrossLinkDiagram onWine className="w-full text-cream" />
        </Reveal>
      </div>
    </section>
  );
}
