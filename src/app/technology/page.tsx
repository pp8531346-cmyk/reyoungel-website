import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { EnzymolysisChart } from "@/components/decor/EnzymolysisChart";
import { SectionCurve } from "@/components/decor/SectionCurve";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const metadata: Metadata = {
  title: "טכנולוגיה",
  description:
    "טכנולוגיית SAX-HA הפטנטית של Reyoungel (פטנט מס' ZL 2012 1 0372786.0) - שזירה נקייה יותר, פחות תגובות לוואי, ותוצאה יציבה לאורך זמן.",
};

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="הטכנולוגיה שלנו"
          title={
            <>
              SAX-HA - הטכנולוגיה
              <br className="lg:hidden" />
              הייחודית שלנו
            </>
          }
          eyebrowEditId="src/app/technology/page.tsx#hero-eyebrow"
          titleEditId="src/app/technology/page.tsx#hero-title"
        >
          <span data-edit-id="src/app/technology/page.tsx#hero-description-lead">
            {/* @edit:hero-description-lead */}
            טכנולוגיית ההצלבה הפטנטית שמאחורי 
          </span>
          <BrandLogo variant="white" />
          <span data-edit-id="src/app/technology/page.tsx#hero-description-tail">
            {/* @edit:hero-description-tail */}
                 מסלקת שיעור גבוה יותר של שאריות BDDE מהג’ל, ומביאה לתוצאה נקייה ויציבה יותר קלינית.
          </span>
        </PageHero>

        <section className="bg-ivory px-6 py-20 lg:px-10 lg:py-28">
          {/* Same asymmetric-split treatment as About's s1 (design audit fix #1)
              — start-aligned text column beside the image at lg, instead of
              the site-wide stacked-and-centered default. */}
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-12 lg:max-w-6xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="flex flex-col items-center gap-4 text-center lg:col-span-7 lg:items-start lg:text-start">
              <p
                className="text-sm font-bold tracking-wide text-plum"
                data-edit-id="src/app/technology/page.tsx#s1-eyebrow"
              >
                {/* @edit:s1-eyebrow */}
                
              </p>
              <h2 className="max-w-lg font-display text-2xl font-black text-ink sm:text-3xl lg:text-4xl">
                <span data-edit-id="src/app/technology/page.tsx#s1-headline-lead">
                  {/* @edit:s1-headline-lead */}
                  ניקיון גבוה יותר-
                </span>
                <br className="lg:hidden" />
                <span data-edit-id="src/app/technology/page.tsx#s1-headline-tail">
                  {/* @edit:s1-headline-tail */}
                  {" "}ביצועים יציבים יותר
                </span>
              </h2>
              <p
                className="max-w-xl text-base leading-relaxed text-stone lg:text-lg"
                data-edit-id="src/app/technology/page.tsx#s1-p1"
              >
                {/* @edit:s1-p1 */}
                כל ג’ל המבוסס על חומצה היאלורונית עובר תהליך הצלבה (Cross-Linking), שנועד לייצב את שרשראות החומצה ההיאלורונית ולהאריך את עמידות הג’ל ברקמה. במהלך תהליך זה נעשה שימוש בחומר השזירה BDDE, ולכן איכות תהליך הטיהור שלאחר השזירה מהווה שלב מרכזי בקביעת איכות המוצר הסופי.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
                <span data-edit-id="src/app/technology/page.tsx#s1-p1b-lead">
                  {/* @edit:s1-p1b-lead */}
                  טכנולוגיית{" "}
                </span>
                <span className="font-bold text-wine">SAX-HA</span>{" "}
                <span data-edit-id="src/app/technology/page.tsx#s1-p1b-mid">
                  {/* @edit:s1-p1b-mid */}
                  הפטנטית שלנו (פטנט מס’ ZL 2012 1 0372786.0) פותחה כדי לפתור בדיוק את זה: תהליך טיהור מתקדם שמעניק לג’ל רמת ניקיון וטיהור גבוהה משמעותית משאריות ה-BDDE, לעומת שיטות שזירה סטנדרטיות.
                </span>
                <span data-edit-id="src/app/technology/page.tsx#s1-p2">
                  {/* @edit:s1-p2 */}
                   מעניק ג’ל נקי יותר ופחות תגובות לוואי.
                </span>
              </p>
              <p
                className="max-w-xl text-base leading-relaxed text-stone lg:text-lg"
                data-edit-id="src/app/technology/page.tsx#s1-p3"
              >
                {/* @edit:s1-p3 */}
                התוצאה היא ג’ל הומוגני, יציב ואיכותי, המאופיין בהשתלבות טובה ברקמה, שמירה על מאפייניו לאורך זמן ופרופיל איכות המתאים לדרישות הרפואה האסתטית המודרנית.
              </p>
            </Reveal>

            <Reveal
              delay={150}
              className="flex w-full max-w-sm justify-center lg:col-span-5 lg:max-w-none lg:justify-start"
            >
              {/* Natural-ratio sizing (not a fixed aspect-ratio + object-cover box) so the
                  full photo is always visible, never side-cropped — width and height both
                  scale down together, capped by max-h-[80vh] so the image never grows
                  taller than the viewport (roughly 100vh minus the fixed navbar) on any
                  screen, and by max-w-full so it never overflows its column on mobile.
                  width/height below are the actual file's intrinsic pixel dimensions —
                  keep them in sync if the source image is ever swapped, since a mismatch
                  skews the reserved layout box's ratio (Next.js Image doesn't re-derive
                  these from the file itself outside of `fill` mode). */}
              <div className="relative overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] border border-hairline">
                <Image
                  src="/images/4ea9567b-3f40-4cf7-81fb-247aa5cfc88a-1787555924639.jpg"
                  alt=""
                  width={895}
                  height={989}
                  sizes="(min-width: 1024px) 32rem, 80vw"
                  className="h-auto max-h-[80vh] w-full max-w-full object-contain"
                  data-edit-id="src/app/technology/page.tsx#s1-image"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Design-audit fix #2: was a flat, un-rounded wine rectangle — the most
            literal "plain rectangle" wine block on the site. Bookended with the
            same organic SectionCurve wave already used at PageHero/CtaBand
            boundaries instead of inventing a new shape primitive. */}
        <section className="grain relative overflow-hidden bg-wine px-6 py-16 text-center text-cream lg:py-20">
          <SectionCurve
            fill="var(--color-ivory)"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 w-full -scale-y-100 lg:h-20"
          />
          <Reveal className="relative z-20 mx-auto max-w-3xl lg:max-w-4xl">
            <p
              className="whitespace-nowrap font-display text-sm font-black leading-tight sm:text-3xl lg:text-5xl"
              data-edit-id="src/app/technology/page.tsx#banner-text"
            >
              {/* @edit:banner-text */}
              פחות שאריות. פחות תגובות. יותר זמן איתך.
            </p>
          </Reveal>
          <SectionCurve
            fill="var(--color-ivory)"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 w-full lg:h-20"
          />
        </section>

        <section className="bg-ivory px-6 pb-20 pt-20 lg:px-10 lg:pb-28 lg:pt-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2
              className="max-w-lg whitespace-nowrap font-display text-lg font-black text-ink sm:text-3xl lg:text-4xl"
              data-edit-id="src/app/technology/page.tsx#s3-headline"
            >
              {/* @edit:s3-headline */}
              עמידות גבוהה יותר לאורך זמן
            </h2>
            <p
              className="max-w-xl text-base leading-relaxed text-stone lg:text-lg"
              data-edit-id="src/app/technology/page.tsx#s3-p1"
            >
              {/* @edit:s3-p1 */}
              במחקר הטרום-שיווקי, נבדק גם קצב הפירוק האנזימטי (hydrolysis) של הג’ל במבחנה (in-vitro) בהשוואה למותג מוביל באירופה. קצב הפירוק הנמוך יותר של Reyoungel מצביע על השפעה שנמשכת זמן רב יותר בגוף.
            </p>
          </Reveal>

          <Reveal delay={150} className="mx-auto mt-14 w-full max-w-3xl">
            <EnzymolysisChart />
          </Reveal>

          <Reveal delay={200} className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-stone lg:text-lg">
            <span data-edit-id="src/app/technology/page.tsx#s3-p2-lead">
              {/* @edit:s3-p2-lead */}
              הטכנולוגיה עברה מחקר טרום-שיווקי בהשתתפות{" "}
            </span>
            <span className="font-bold text-ink" data-edit-id="src/app/technology/page.tsx#s3-p2-count">
              {/* @edit:s3-p2-count */}
              357 מטופלים
            </span>
            <span data-edit-id="src/app/technology/page.tsx#s3-p2-tail">
              {/* @edit:s3-p2-tail */}
              
            </span>
          </Reveal>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
