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
        <PageHero eyebrow="צור קשר" title="בואו נדבר על שיתוף פעולה מקצועי">
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
                <p className="text-sm font-bold tracking-wide text-plum">יצירת קשר ישירה</p>
                <h2 className="mt-3 max-w-sm font-display text-2xl font-black text-ink lg:text-3xl">
                  לרופאים, קליניקות ומרכזי רפואה אסתטית
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone lg:text-base">
                  מלאו את הפרטים ונציג מטעם הצוות המקצועי שלנו יחזור אליכם עם
                  מידע על המוצרים, התיעוד הרגולטורי, וזמינות להזמנה עבור
                  הקליניקה שלכם.
                </p>
              </div>

              <div className="border-t border-hairline pt-6">
                <p className="text-xs font-bold tracking-wide text-plum">Bioha Laboratories Group Ltd</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">
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
