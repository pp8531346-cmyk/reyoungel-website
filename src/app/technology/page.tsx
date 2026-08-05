import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { EnzymolysisChart } from "@/components/decor/EnzymolysisChart";

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
        <PageHero eyebrow="הטכנולוגיה שלנו" title="SAX-HA® — הטכנולוגיה הפטנטית שלנו">
          טכנולוגיית השזירה הפטנטית שמאחורי Reyoungel® (פטנט מס&rsquo; ZL 2012 1
          0372786.0) מסלקת שיעור גבוה יותר של שאריות שזירה מהג&rsquo;ל, לתוצאה
          נקייה ויציבה יותר קלינית.
        </PageHero>

        <section className="bg-ivory px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-bold tracking-wide text-plum">כימיה שעושה הבדל</p>
            <h2 className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl">
              פחות שאריות שזירה, יותר זמן איתך
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
              מילויים היאלורוניים עוברים תהליך שזירה (cross-linking) באמצעות
              חומר בשם BDDE, שמייצב את מולקולות החומצה ההיאלורונית ומאריך את
              זמן ההשפעה שלהן בגוף. הבעיה: ברוב המילויים הסטנדרטיים בשוק
              נשארות שאריות שזירה לא מגיבות בתוך הג&rsquo;ל — ואלו עלולות
              לגרום לתגובות רגישות ולפרק את הג&rsquo;ל מהר יותר.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
              טכנולוגיית <span className="font-bold text-wine">SAX-HA®</span> הפטנטית
              שלנו (פטנט מס&rsquo; ZL 2012 1 0372786.0) פותחה כדי לפתור בדיוק
              את זה: תהליך טיהור מתקדם שמעניק לג&rsquo;ל רמת ניקיון וטיהור
              גבוהה משמעותית משאריות ה-BDDE, לעומת שיטות שזירה סטנדרטיות —
              ג&rsquo;ל נקי יותר ופחות תגובות לוואי.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
              מעבר לכך, שיטת ה-SAX-HA® יוצרת קשרים דינמיים מבוססי היפופוביות
              בין שרשראות הפולימר בתוך הג&rsquo;ל — מנגנון שגורם למולקולות
              להיצמד ולהתגבש יחד במקום ההזרקה. כך הג&rsquo;ל שומר על צורתו
              טוב יותר, נודד פחות ברקמה, ותוצאת הפיסול נשארת טבעית ויציבה
              לאורך זמן (6–18 חודשים, בהתאם למוצר).
            </p>
          </Reveal>

          <Reveal delay={150} className="mx-auto mt-14 w-full max-w-sm">
            <div className="relative aspect-[3/4] overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] border border-hairline">
              <Image
                src="/images/product-syringe-hand.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 24rem, 80vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </section>

        <section className="grain relative bg-wine px-6 py-28 text-center text-cream lg:py-40">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-balance font-display text-3xl font-black leading-tight lg:text-5xl">
              פחות שאריות. פחות תגובות. יותר זמן איתך.
            </p>
          </Reveal>
        </section>

        <section className="bg-ivory px-6 pb-20 pt-20 lg:px-10 lg:pb-28 lg:pt-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-bold tracking-wide text-plum">ההוכחה במעבדה</p>
            <h2 className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl">
              עמידות גבוהה יותר לאורך זמן
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
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
            הטכנולוגיה עברה מחקר טרום-שיווקי בהשתתפות{" "}
            <span className="font-bold text-ink">357 מטופלים</span> בסין וברוסיה.
          </Reveal>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
