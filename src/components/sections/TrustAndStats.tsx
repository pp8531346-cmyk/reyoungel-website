import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Citation } from "@/components/ui/Citation";
import { certifications, stats } from "@/lib/data";

export function TrustAndStats() {
  return (
    <section className="tinted-wine-soft px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 text-center sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100}>
            <p className="font-display text-4xl font-black text-wine lg:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
              {"citation" in stat && <Citation n={stat.citation} />}
            </p>
            <p className="mt-3 text-sm text-stone" data-edit-id={`src/lib/data.ts#stats-${i}-label`}>
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300} className="mx-auto mt-16 max-w-4xl border-t border-hairline pt-10">
        <p
          className="mb-6 text-center text-sm font-bold tracking-wide text-stone"
          data-edit-id="src/components/sections/TrustAndStats.tsx#approved-line"
        >
          {/* @edit:approved-line */}
          מאושר ע&rdquo;י ה-CE האירופאי ומשרד הבריאות בישראל
        </p>
        {/* flex-nowrap (not flex-wrap) is load-bearing: with wrap allowed, 2 items
            fit the row's available width and the 3rd — whichever has the widest
            natural (unwrapped) content, usually MOH's much longer description —
            got pushed to its own line alone. Removing wrap and giving every level
            (item, then its text column) `min-w-0` forces all 3 to always share one
            row instead: the description text wraps *within* its own narrow column
            (2-3 short lines is fine here — normal, not a bug) rather than the row
            itself ever breaking. gap/icon/font shrink at the base (mobile) tier and
            open back up at sm: purely to buy width headroom on the narrowest
            phones, where 3 columns plus MOH's long description needs it most. */}
        <div className="flex flex-nowrap items-start justify-center gap-x-3 gap-y-6 sm:items-center sm:gap-x-10">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex min-w-0 items-start gap-1.5 sm:items-center sm:gap-3">
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-wine sm:h-6 sm:w-6"
                strokeWidth={1.5}
                aria-hidden
              />
              <div className="min-w-0 text-start">
                <p
                  dir="ltr"
                  className="text-xs font-bold text-ink sm:text-sm"
                  data-edit-id={`src/lib/data.ts#certifications-${cert.id}-label`}
                >
                  {cert.label}
                </p>
                <p
                  className="text-[10px] leading-snug text-stone sm:text-xs"
                  data-edit-id={`src/lib/data.ts#certifications-${cert.id}-description`}
                >
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
