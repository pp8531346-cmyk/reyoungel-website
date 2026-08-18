import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "לרופאים, קליניקות ומרכזי רפואה אסתטית המעוניינים לשלב את Reyoungel® בפרקטיקה שלהם — צרו קשר עם הצוות המקצועי שלנו.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="צור קשר"
          title="בואו נדבר על שיתוף פעולה מקצועי"
          eyebrowEditId="src/app/contact/page.tsx#hero-eyebrow"
          titleEditId="src/app/contact/page.tsx#hero-title"
          descriptionEditId="src/app/contact/page.tsx#hero-description"
        >
          {/* @edit:hero-description */}
          לרופאים, קליניקות ומרכזי רפואה אסתטית המעוניינים לשלב את Reyoungel®
          בפרקטיקה שלהם — נשמח לשמוע מכם ולספק את כל המידע המקצועי הנדרש.
        </PageHero>

        <section className="bg-ivory px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={150} className="flex flex-col justify-center gap-6">
              <div>
                {/* Design-audit fixes #1 and #5: dropped the eyebrow (PageHero
                    above already establishes "צור קשר" as the page context)
                    and normalized this h2 up to the site's default h2 scale
                    — it had no viewport-height constraint like ProductRange's,
                    so the smaller size here was an unexplained inconsistency
                    rather than a deliberate exception. */}
                <h2
                  className="max-w-sm font-display text-3xl font-black text-ink lg:text-4xl"
                  data-edit-id="src/app/contact/page.tsx#s1-headline"
                >
                  {/* @edit:s1-headline */}
                  לרופאים, קליניקות ומרכזי רפואה אסתטית
                </h2>
                <p
                  className="mt-4 max-w-sm text-sm leading-relaxed text-stone lg:text-base"
                  data-edit-id="src/app/contact/page.tsx#s1-p1"
                >
                  {/* @edit:s1-p1 */}
                  מלאו את הפרטים ונציג מטעם הצוות המקצועי שלנו יחזור אליכם עם
                  מידע על המוצרים, התיעוד הרגולטורי, וזמינות להזמנה עבור
                  הקליניקה שלכם.
                </p>
              </div>

              <div className="border-t border-hairline pt-6">
                <p
                  className="text-xs font-bold tracking-wide text-plum"
                  data-edit-id="src/app/contact/page.tsx#company-name"
                >
                  {/* @edit:company-name */}
                  Bioha Laboratories Group Ltd
                </p>
                <p
                  className="mt-2 text-sm leading-relaxed text-stone"
                  data-edit-id="src/app/contact/page.tsx#company-address"
                >
                  {/* @edit:company-address */}
                  9 Pantygraigwen Road, Pontypridd, UK CF37 2RR
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
