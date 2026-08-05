import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Citation } from "@/components/ui/Citation";
import { certifications, stats } from "@/lib/data";

export function TrustAndStats() {
  return (
    <section className="bg-ivory px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 text-center sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100}>
            <p className="font-display text-4xl font-black text-wine lg:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
              {"citation" in stat && <Citation n={stat.citation} />}
            </p>
            <p className="mt-3 text-sm text-stone">{stat.label}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300} className="mx-auto mt-16 max-w-4xl border-t border-hairline pt-10">
        <p className="mb-6 text-center text-sm font-bold tracking-wide text-stone">
          מאושר ע&rdquo;י ה-CE האירופאי ומשרד הבריאות בישראל
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 shrink-0 text-wine" strokeWidth={1.5} aria-hidden />
              <div className="text-start">
                <p dir="ltr" className="text-sm font-bold text-ink">
                  {cert.label}
                </p>
                <p className="text-xs text-stone">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm font-bold text-ink">
          98% שביעות רצון רופאים · 95% שביעות רצון מטופלים
          <Citation n={2} />
        </p>
      </Reveal>
    </section>
  );
}
