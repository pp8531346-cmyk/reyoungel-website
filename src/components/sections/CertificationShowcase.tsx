import { FileCheck2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { certifications } from "@/lib/data";

// Document artwork is a placeholder frame until the real Ministry of Health
// approval and CE certification files are supplied and swapped in.
export function CertificationShowcase() {
  return (
    <section className="bg-ivory px-6 pb-20 lg:px-10 lg:pb-28">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <h2
          className="max-w-lg font-display text-3xl font-black text-ink lg:text-4xl"
          data-edit-id="src/components/sections/CertificationShowcase.tsx#headline"
        >
          {/* @edit:headline */}
          עומדים בתווי התקן המחמירים ביותר
        </h2>
        <p
          className="max-w-xl text-base leading-relaxed text-stone lg:text-lg"
          data-edit-id="src/components/sections/CertificationShowcase.tsx#body"
        >
          {/* @edit:body */}
          מוצרי Reyoungel® מחזיקים באישור משרד הבריאות הישראלי ובתו התקן
          האירופי CE, לצד עמידה בתקן הבינלאומי לניהול איכות במכשור רפואי
          ISO 13485 — שלושה אישורים המעידים על בקרת איכות קפדנית לאורך כל
          שרשרת הייצור.
        </p>
      </Reveal>

      <Reveal delay={150} className="relative mx-auto mt-16 max-w-4xl">
        <div className="grid grid-cols-1 border border-hairline sm:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="feature-card-hover flex flex-col items-center gap-5 border-b border-hairline px-6 py-10 text-center last:border-b-0 sm:border-b-0 sm:border-e sm:border-hairline sm:last:border-e-0"
            >
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-wine/30 bg-wine/[0.03]">
                <FileCheck2 className="h-8 w-8 text-wine/50" strokeWidth={1.5} aria-hidden />
                <span
                  className="absolute -bottom-3 whitespace-nowrap rounded-full border border-hairline bg-ivory px-2 py-0.5 text-[10px] font-bold tracking-wide text-stone"
                  data-edit-id="src/components/sections/CertificationShowcase.tsx#placeholder-label"
                >
                  {/* @edit:placeholder-label */}
                  ממתין למסמך רשמי
                </span>
              </div>
              <div>
                <p
                  dir="ltr"
                  className="font-display text-lg font-black text-ink"
                  data-edit-id={`src/lib/data.ts#certifications-${cert.id}-label`}
                >
                  {cert.label}
                </p>
                <p
                  className="mt-1 max-w-[14rem] text-sm leading-relaxed text-stone"
                  data-edit-id={`src/lib/data.ts#certifications-${cert.id}-description`}
                >
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 border border-dashed border-hairline sm:-inset-4"
        />
      </Reveal>
    </section>
  );
}
