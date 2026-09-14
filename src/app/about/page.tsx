import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { CertificationShowcase } from "@/components/sections/CertificationShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "Bioha Laboratories - בית המעבדה הבריטי מאחורי Reyoungel, מאז 2003. ניסיון מדעי בינלאומי, נוכחות ביותר מ-70 מדינות, אישור משרד הבריאות ותו תקן CE.",
};

const milestones = [
  {
    value: /* @edit:milestones-0-value */ "2003",
    label: /* @edit:milestones-0-label */ "שנת הקמת בית המעבדה",
  },
  {
    value: /* @edit:milestones-1-value */ "70+",
    label: /* @edit:milestones-1-label */ "מדינות ברחבי העולם בהן נמכרים מוצרי Reyoungel",
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
          title={
            <>
              המעבדה שמאחורי <BrandLogo variant="white" />
            </>
          }
          eyebrowEditId="src/app/about/page.tsx#hero-eyebrow"
          titleEditId="src/app/about/page.tsx#hero-title"
          titleSizeClassName="text-[25px] font-black leading-tight sm:text-4xl lg:text-5xl"
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
                className="-mt-2 max-w-lg whitespace-nowrap font-display text-xl font-black text-ink sm:text-3xl lg:mt-0 lg:text-4xl"
                data-edit-id="src/app/about/page.tsx#s1-headline"
              >
                {/* @edit:s1-headline */}
                עשרים שנות התמחות ומקצועיות
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-stone lg:text-lg">
                <span data-edit-id="src/app/about/page.tsx#s1-p1-lead">
                  {/* @edit:s1-p1-lead */}
                  טכנולוגיית{" "}
                </span>
                <span className="font-bold text-wine">SAX-HA</span>{" "}
                <span data-edit-id="src/app/about/page.tsx#s1-p1-tail">
                  {/* @edit:s1-p1-tail */}
                  הפטנטית שמאחורי Reyoungel פותחה על ידי צוות מדענים ומהנדסים המתמחים במכשור רפואי וטכנולוגיית הזרקה מתקדמות, עם ניסיון מצטבר של למעלה מ-20 שנה.
                </span>
              </p>
              <p
                className="max-w-xl text-base leading-relaxed text-stone lg:text-lg"
                data-edit-id="src/app/about/page.tsx#s1-p2"
              >
                {/* @edit:s1-p2 */}
                מאז הקמת Bioha Laboratories ב-2003, מיליוני קופסאות של מוצרי Reyoungel נמכרו ביותר מ-70 מדינות ברחבי העולם תוך מתן חוויה אסתטית בטוחה, יעילה ואלגנטית ללקוחותינו.
              </p>
            </Reveal>

            <Reveal
              delay={150}
              className="flex w-full max-w-sm justify-center lg:col-span-5 lg:max-w-none lg:justify-start"
            >
              {/* Same natural-ratio sizing as the Technology page's s1-image, so the two
                  pages are visually consistent — full photo always visible, never
                  side-cropped, capped by max-h-[80vh] so it never grows taller than the
                  viewport (roughly 100vh minus the fixed navbar) on any screen, and by
                  max-w-full so it never overflows its column on mobile. width/height below
                  are the actual file's intrinsic pixel dimensions. */}
              <div className="relative overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] border border-hairline">
                <Image
                  src="/images/4-1787154992521.png"
                  alt=""
                  width={1080}
                  height={1350}
                  sizes="(min-width: 1024px) 32rem, 80vw"
                  className="h-auto max-h-[80vh] w-full max-w-full object-contain"
                  data-edit-id="src/app/about/page.tsx#s1-image"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* No section heading here — the previous h2 (data-edit-id
            "s2-headline") never had any copy filled in, so it rendered as an
            empty <h2>: a heading a screen-reader user would land on with
            nothing announced (flagged in the accessibility audit run
            alongside the new /accessibility page — axe-core doesn't tag
            empty-heading under WCAG A/AA specifically, but it's a real,
            easily-fixable issue, so it's included here rather than left for
            "reasonably fixable" to exclude it on a technicality). Removed
            rather than left blank; add a real h2 back if this section ever
            gets its own copy. */}
        <section className="bg-ivory px-6 pb-20 lg:px-10 lg:pb-28">
          <div className="mx-auto mt-14 max-w-3xl border-t border-hairline">
            {milestones.map((m, i) => (
              <Reveal key={m.label} delay={i * 90}>
                <div className="rail-item flex items-center gap-6 border-b border-hairline py-6 sm:gap-10">
                  <span className="rail-number font-display text-2xl font-black text-stone/60 lg:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Stacked on mobile (value, then label, both start-aligned) rather
                      than side-by-side with justify-between — with justify-between,
                      the countries milestone's long label wraps to 2 lines while its
                      neighbors' short labels don't, so that one row alone read as
                      misaligned/disorganized against its siblings. Stacking removes
                      the length-dependent branch entirely: every row lays out the
                      same way regardless of label length. Reverts to the original
                      side-by-side treatment at sm+, where there's enough width that
                      even the long label comfortably fits on one line beside its
                      value. */}
                  <div className="flex flex-1 flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6 sm:gap-y-1">
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

        <CertificationShowcase />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
