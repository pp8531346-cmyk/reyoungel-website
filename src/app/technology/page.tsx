import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { EnzymolysisChart } from "@/components/decor/EnzymolysisChart";
import { SectionCurve } from "@/components/decor/SectionCurve";

export const metadata: Metadata = {
  title: "טכנולוגיה",
  description:
    "טכנולוגיית SAX-HA® הפטנטית של Reyoungel® (פטנט מס' ZL 2012 1 0372786.0) — שזירה נקייה יותר, פחות תגובות לוואי, ותוצאה יציבה לאורך זמן.",
};

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="הטכנולוגיה שלנו"
          title="SAX-HA® — הטכנולוגיה הפטנטית שלנו"
          eyebrowEditId="src/app/technology/page.tsx#hero-eyebrow"
          titleEditId="src/app/technology/page.tsx#hero-title"
          descriptionEditId="src/app/technology/page.tsx#hero-description"
        >
          {/* @edit:hero-description */}
          טכנולוגיית השזירה הפטנטית שמאחורי Reyoungel® (פטנט מס&rsquo; ZL 2012 1
          0372786.0) מסלקת שיעור גבוה יותר של שאריות שזירה מהג&rsquo;ל, לתוצאה
          נקייה ויציבה יותר קלינית.
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
                כימיה שעושה הבדל
              </p>
              <h2
                className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl"
                data-edit-id="src/app/technology/page.tsx#s1-headline"
              >
                {/* @edit:s1-headline */}
                טיהור מתקדם, ניקיון גבוה יותר, ביצועים יציבים יותר
              </h2>
              <p
                className="max-w-xl text-base leading-relaxed text-stone lg:text-lg"
                data-edit-id="src/app/technology/page.tsx#s1-p1"
              >
                {/* @edit:s1-p1 */}
                כל ג’ל המבוסס על חומצה היאלורונית עובר תהליך שזירה (Cross-Linking), שנועד לייצב את שרשראות החומצה ההיאלורונית ולהאריך את עמידות הג’ל ברקמה. במהלך תהליך זה נעשה שימוש בחומר השזירה BDDE, ולכן איכות תהליך הטיהור שלאחר השזירה מהווה שלב מרכזי בקביעת איכות המוצר הסופי.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
                <span data-edit-id="src/app/technology/page.tsx#s1-p1b-lead">
                  {/* @edit:s1-p1b-lead */}
                  טכנולוגיית{" "}
                </span>
                <span className="font-bold text-wine">SAX-HA®</span>
                <span data-edit-id="src/app/technology/page.tsx#s1-p1b-mid">
                  {/* @edit:s1-p1b-mid */}
                  {" "}הפטנטית שלנו (פטנט מס&rsquo; ZL 2012 1 0372786.0) פותחה כדי
                  לפתור בדיוק את זה: תהליך טיהור מתקדם שמעניק לג&rsquo;ל רמת
                  ניקיון וטיהור גבוהה משמעותית משאריות ה-BDDE, לעומת שיטות
                  שזירה סטנדרטיות —
                </span>
                <span data-edit-id="src/app/technology/page.tsx#s1-p2">
                  {/* @edit:s1-p2 */}
                  {" "}ג&rsquo;ל נקי יותר ופחות תגובות לוואי.
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

            <Reveal delay={150} className="w-full max-w-sm lg:col-span-5 lg:max-w-none">
              <div className="relative aspect-[3/4] overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] border border-hairline">
                <Image
                  src="/images/5C3F908A-BD33-44B5-96CF-4714D1E3A76B-1786996879325.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  className="object-cover"
                  data-edit-id="src/app/technology/page.tsx#s1-image"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Design-audit fix #2: was a flat, un-rounded wine rectangle — the most
            literal "plain rectangle" wine block on the site. Bookended with the
            same organic SectionCurve wave already used at PageHero/CtaBand
            boundaries instead of inventing a new shape primitive. Fix #4: the
            quote itself drops to the one lighter weight loaded for Frank Ruhl
            Libre (400) instead of the site's otherwise-universal 900 — the
            single deliberately quiet typographic moment on the site. */}
        <section className="grain relative overflow-hidden bg-wine px-6 py-24 text-center text-cream lg:py-32">
          <SectionCurve
            fill="var(--color-ivory)"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 w-full -scale-y-100 lg:h-20"
          />
          <Reveal className="relative z-20 mx-auto max-w-3xl">
            <p
              className="text-balance font-display text-3xl font-normal leading-tight lg:text-5xl"
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
              className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl"
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
              במחקר הטרום-שיווקי, נבדק גם קצב הפירוק האנזימטי (hydrolysis)
              של הג&rsquo;ל במבחנה (in-vitro) בהשוואה למותג מוביל באירופה.
              קצב הפירוק הנמוך יותר של Reyoungel® מצביע על השפעה שנמשכת
              זמן רב יותר בגוף.
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
              {" "}בסין וברוסיה.
            </span>
          </Reveal>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
