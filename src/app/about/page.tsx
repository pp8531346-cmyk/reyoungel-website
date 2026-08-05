import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CertificationShowcase } from "@/components/sections/CertificationShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "Bioha Laboratories — בית המעבדה הבריטי מאחורי Reyoungel®, מאז 2003. ניסיון מדעי בינלאומי, נוכחות ביותר מ-70 מדינות, אישור משרד הבריאות ותו תקן CE.",
};

const milestones = [
  {
    value: "2003",
    label: "שנת הקמת בית המעבדה בבריטניה",
  },
  {
    value: "70+",
    label: "מדינות ברחבי העולם בהן נמכרים מוצרי Reyoungel®",
  },
  {
    value: "מיליוני",
    label: "קופסאות מוצר שנמכרו עד היום",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero eyebrow="אודות Bioha Laboratories" title="המעבדה שמאחורי Reyoungel®">
          מאז 2003, בית המעבדה שלנו מתמחה בפיתוח וייצור מכשור רפואי להזרקה
          ולהשתלה בתחומי הרפואה האסתטית, הדרמטולוגיה וטיפולי אנטי-אייג&rsquo;ינג.
        </PageHero>

        <section className="bg-ivory px-6 py-20 lg:px-10 lg:py-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-bold tracking-wide text-plum">חלוצים ברפואה אסתטית</p>
            <h2 className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl">
              עשרים שנות התמחות, צוות מדעי בין-לאומי
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
              טכנולוגיית <span className="font-bold text-wine">SAX-HA®</span> הפטנטית
              שמאחורי Reyoungel® פותחה על ידי צוות מדענים ומהנדסים המתמחים
              במכשור רפואי להזרקת ביופולימרים, עם ניסיון מצטבר של למעלה
              מ-20 שנה משווייץ ומצרפת.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
              מאז הקמת Bioha Laboratories ב-2003, מיליוני קופסאות של מוצרי
              Reyoungel® נמכרו ביותר מ-70 מדינות ברחבי העולם — תוך מתן חוויה
              אסתטית בטוחה, יעילה ואלגנטית ללקוחותינו.
            </p>
          </Reveal>

          <Reveal delay={150} className="mx-auto mt-14 w-full max-w-sm lg:mt-16">
            <div className="relative aspect-[3/4] overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] border border-hairline">
              <Image
                src="/images/poster-syringe-hand-white.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 24rem, 80vw"
                className="object-cover"
                style={{ objectPosition: "30% 65%" }}
              />
            </div>
          </Reveal>
        </section>

        <section className="bg-ivory px-6 pb-20 lg:px-10 lg:pb-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-bold tracking-wide text-plum">נוכחות עולמית</p>
            <h2 className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl">
              מבית מעבדה בבריטניה, לעולם כולו
            </h2>
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl border-t border-hairline">
            {milestones.map((m, i) => (
              <Reveal key={m.label} delay={i * 90}>
                <div className="flex items-center gap-6 border-b border-hairline py-6 sm:gap-10">
                  <span className="font-display text-2xl font-black text-stone/60 lg:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span dir="ltr" className="font-display text-xl font-black text-wine lg:text-2xl">
                      {m.value}
                    </span>
                    <span className="text-sm leading-relaxed text-stone lg:text-base">
                      {m.label}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-ivory px-6 pb-20 lg:px-10 lg:pb-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <p className="text-sm font-bold tracking-wide text-plum">המשפחה מאחורי Reyoungel®</p>
            <h2 className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl">
              מעבדה המתמחה במכשור רפואי אסתטי
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
              Bioha Laboratories היא חברת האם של Reyoungel®, ומתמחה בפיתוח
              מוצרים רפואיים ואסתטיים — ממילויים היאלורוניים ועד חוטי PDO
              וטיפולי מזותרפיה. הליבה שלנו, Reyoungel®, מתמקדת אך ורק
              במילויים היאלורוניים משוזרים: ג&rsquo;ל טבעי, ביודגרדבילי,
              נטול מקור מן החי, בעל מרקם צלול וחסר צבע.
            </p>
          </Reveal>
        </section>

        <CertificationShowcase />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
