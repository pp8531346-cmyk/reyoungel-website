import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProductsExperience } from "@/components/products-showcase/ProductsExperience";

export const metadata: Metadata = {
  title: "מוצרים",
  description:
    "סדרת המזרקים של Reyoungel - חמישה ג׳לים היאלורוניים משוזרים, 20 מ״ג/מ״ל, לכל שלב ואזור טיפול מקמטים דקים ועד פיסול נפח.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductsExperience />

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
