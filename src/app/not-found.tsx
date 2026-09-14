import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

// The brand mark is already the fixed Navbar's own logo above this page (see
// Navbar.tsx) — Logo (src/components/ui/Logo.tsx) only has a white-on-dark
// variant, unsuitable for this page's light bg-ivory, and repeating the mark
// here would be redundant with the navbar anyway.
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ivory px-6 pt-[max(7rem,11vh)] text-center">
        <p className="font-display text-6xl font-black text-wine lg:text-8xl">404</p>
        <h1 className="font-display text-2xl font-black text-ink lg:text-3xl">
          העמוד שחיפשתם לא נמצא
        </h1>
        <Button href="/">חזרה לעמוד הבית</Button>
      </main>
      <Footer />
    </>
  );
}
