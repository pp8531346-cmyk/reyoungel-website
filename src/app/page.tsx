import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HeroHighlights } from "@/components/sections/HeroHighlights";
import { ProductRange } from "@/components/sections/ProductRange";
import { TechnologyTeaser } from "@/components/sections/TechnologyTeaser";
import { TrustAndStats } from "@/components/sections/TrustAndStats";
import { CtaBand } from "@/components/sections/CtaBand";
import { SourcesList } from "@/components/sections/SourcesList";

const sources = [
  {
    n: 1,
    text: /* @edit:sources-0-text */ "נתוני מחקר קליני טרום-שיווקי שביצעה Bioha Laboratories, במעקב אחר 357 מטופלים בסין וברוסיה, כולל השוואת קצב פירוק אנזימטי (in-vitro) למותג מוביל באירופה.",
  },
  { n: 2, text: /* @edit:sources-1-text */ "נתוני שביעות רצון רופאים ומטופלים — ממחקרי החברה." },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroHighlights />
        <ProductRange />
        <TechnologyTeaser />
        <TrustAndStats />
        <CtaBand />
        <SourcesList sources={sources} />
      </main>
      <Footer />
    </>
  );
}
