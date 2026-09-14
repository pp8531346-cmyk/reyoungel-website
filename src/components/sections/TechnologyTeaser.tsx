import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";

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
          <p className="text-sm font-bold tracking-wide text-cream/70">
            <span data-edit-id="src/components/sections/TechnologyTeaser.tsx#eyebrow">
              {/* @edit:eyebrow */}
              הטכנולוגיה שמאחורי
            </span>
          </p>
          <h2 className="max-w-md font-display text-lg font-black leading-tight sm:text-3xl lg:text-4xl">
            <span data-edit-id="src/components/sections/TechnologyTeaser.tsx#headline-lead">
              {/* @edit:headline-lead */}
              SAX-HA - טכנולוגיית{" "}
            </span>
            <br className="lg:hidden" />
            <span data-edit-id="src/components/sections/TechnologyTeaser.tsx#headline-tail">
              {/* @edit:headline-tail */}
              ההצלבה הייחודית של{" "}
            </span>
            <BrandLogo variant="white" />
          </h2>
          <p className="max-w-md text-base leading-relaxed text-cream/85">
            <span data-edit-id="src/components/sections/TechnologyTeaser.tsx#body-lead">
              {/* @edit:body-lead */}
              בזכות הפטנט הבלעדי שלנו (ZL 2012 1 0372786.0),טכנולוגיית ההצלבה של{" "}
            </span>
            <BrandLogo variant="white" />
            <span data-edit-id="src/components/sections/TechnologyTeaser.tsx#body-tail">
              {/* @edit:body-tail */}
               מסלקת שיעור גבוה משמעותית של שאריות מצלב ה-BDDE מהג’ל, לעומת שיטות הצלבה סטנדרטיות מבוססות BDDE/DVS והתוצאה-פחות תגובות רגישות, ושימור של נפח הג’ל לאורך זמן במקום ההזרקה
            </span>
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

        {/* Centered at every breakpoint, matching mobile — the old asymmetric
            lg:ms-auto offset (from when this held the abstract SVG diagram) reads
            as off-balance now that it's a photographic illustration; centered
            under the equally-centered text above it looks intentional instead. */}
        <Reveal
          delay={150}
          className="relative mx-auto mt-14 w-full max-w-md rounded-[2rem] border border-cream/10 bg-cream/5 px-6 py-10 lg:mt-16 lg:px-10"
        >
          {/* saturate-75 + brightness-90: the source photo's blue is vivid enough to
              fight the wine/cream palette around it — muted here at the display level
              (not baked into the asset) so the molecules still read clearly distinct
              from the card background without popping as a jarring bright-blue sticker. */}
          <Image
            src="/images/ChatGPT-Image-Aug-25-2026-12_19_17-AM-1787606372219.png"
            alt="איור תלת-ממדי של שרשרת חומצה היאלורונית משוזרת בטכנולוגיית SAX-HA, בצורת סליל מולקולות כחול מחוברות"
            width={1672}
            height={766}
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="h-auto w-full object-contain saturate-75 brightness-90"
            data-edit-id="src/components/sections/TechnologyTeaser.tsx#crosslink-diagram-image"
          />
        </Reveal>
      </div>
    </section>
  );
}
