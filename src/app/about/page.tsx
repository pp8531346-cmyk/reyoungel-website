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
    value: /* @edit:milestones-0-value */ "2003",
    label: /* @edit:milestones-0-label */ "שנת הקמת בית המעבדה בבריטניה",
  },
  {
    value: /* @edit:milestones-1-value */ "70+",
    label: /* @edit:milestones-1-label */ "מדינות ברחבי העולם בהן נמכרים מוצרי Reyoungel®",
  },
  {
    value: /* @edit:milestones-2-value */ "1,000,000+",
    label: /* @edit:milestones-2-label */ "קופסאות מוצר שנמכרו עד היום",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="אודות Bioha Laboratories"
          title="המעבדה שמאחורי Reyoungel®"
          eyebrowEditId="src/app/about/page.tsx#hero-eyebrow"
          titleEditId="src/app/about/page.tsx#hero-title"
          descriptionEditId="src/app/about/page.tsx#hero-description"
        >
          {/* @edit:hero-description */}
          מאז 2003, בית המעבדה שלנו מתמחה בפיתוח וייצור מכשור רפואי להזרקה
          ולהשתלה בתחומי הרפואה האסתטית, הדרמטולוגיה וטיפולי אנטי-אייג&rsquo;ינג.
        </PageHero>

        <section className="bg-ivory px-6 py-20 lg:px-10 lg:py-28">
          {/* Asymmetric split at lg — text (start-aligned) and image side by side,
              instead of the site's otherwise-universal stacked-and-centered
              formula. Mobile keeps the original stacked/centered treatment.
              No RTL override needed: text is the first DOM child, so under
              dir="rtl" it renders at the inline-start (right) and the image
              fills the remaining columns to the left, matching how Hero's own
              rail/text/photography split already works. */}
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-12 lg:max-w-6xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="flex flex-col items-center gap-4 text-center lg:col-span-7 lg:items-start lg:text-start">
              <p
                className="text-sm font-bold tracking-wide text-plum"
                data-edit-id="src/app/about/page.tsx#s1-eyebrow"
              >
                {/* @edit:s1-eyebrow */}
                חלוצים ברפואה אסתטית
              </p>
              <h2
                className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl"
                data-edit-id="src/app/about/page.tsx#s1-headline"
              >
                {/* @edit:s1-headline */}
                עשרים שנות התמחות, צוות מדעי בין-לאומי
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
                טכנולוגיית <span className="font-bold text-wine">SAX-HA®</span> הפטנטית
                שמאחורי Reyoungel® פותחה על ידי צוות מדענים ומהנדסים המתמחים
                במכשור רפואי להזרקת ביופולימרים, עם ניסיון מצטבר של למעלה
                מ-20 שנה משווייץ ומצרפת.
              </p>
              <p
                className="max-w-xl text-base leading-relaxed text-stone lg:text-lg"
                data-edit-id="src/app/about/page.tsx#s1-p2"
              >
                {/* @edit:s1-p2 */}
                מאז הקמת Bioha Laboratories ב-2003, מיליוני קופסאות של מוצרי
                Reyoungel® נמכרו ביותר מ-70 מדינות ברחבי העולם — תוך מתן חוויה
                אסתטית בטוחה, יעילה ואלגנטית ללקוחותינו.
              </p>
            </Reveal>

            <Reveal delay={150} className="w-full max-w-sm lg:col-span-5 lg:max-w-none">
              <div className="relative aspect-[3/4] overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] border border-hairline">
                <Image
                  src="/images/1-1786222290536.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 24rem, 80vw"
                  className="object-cover"
                  style={{ objectPosition: "30% 65%" }}
                  data-edit-id="src/app/about/page.tsx#s1-image"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-ivory px-6 pb-20 lg:px-10 lg:pb-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2
              className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl"
              data-edit-id="src/app/about/page.tsx#s2-headline"
            >
              {/* @edit:s2-headline */}
              מבית מעבדה בבריטניה, לעולם כולו
            </h2>
          </Reveal>

          <div className="mx-auto mt-14 max-w-3xl border-t border-hairline">
            {milestones.map((m, i) => (
              <Reveal key={m.label} delay={i * 90}>
                <div className="rail-item flex items-center gap-6 border-b border-hairline py-6 sm:gap-10">
                  <span className="rail-number font-display text-2xl font-black text-stone/60 lg:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span
                      dir="ltr"
                      className="rail-label font-display text-xl font-black text-wine lg:text-2xl"
                      data-edit-id={`src/app/about/page.tsx#milestones-${i}-value`}
                    >
                      {m.value}
                    </span>
                    <span
                      className="rail-label text-sm leading-relaxed text-stone lg:text-base"
                      data-edit-id={`src/app/about/page.tsx#milestones-${i}-label`}
                    >
                      {m.label}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Soft wine tint (fix #3 from the design audit) — the site's one other
            application besides Home's TrustAndStats, giving wine a tonal step
            between "full solid block" and "tiny text accent" instead of only
            ever appearing as one of those two extremes. */}
        <section className="tinted-wine-soft px-6 pb-20 lg:px-10 lg:pb-28">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2
              className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl"
              data-edit-id="src/app/about/page.tsx#s3-headline"
            >
              {/* @edit:s3-headline */}
              מעבדה המתמחה במכשור רפואי אסתטי
            </h2>
            <p
              className="max-w-xl text-base leading-relaxed text-stone lg:text-lg"
              data-edit-id="src/app/about/page.tsx#s3-p1"
            >
              {/* @edit:s3-p1 */}
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
