import { Dna, Layers, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Citation } from "@/components/ui/Citation";
import { heroHighlights } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  dna: Dna,
  layers: Layers,
};

export function HeroHighlights() {
  return (
    <section className="bg-ivory px-6 pb-20 lg:px-10 lg:pb-28">
      <div className="hero-highlights-panel mx-auto grid max-w-6xl grid-cols-1 divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:rtl:divide-x-reverse">
        {heroHighlights.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <Reveal key={item.title}>
              <div className="hero-highlights-card flex h-full flex-col items-center gap-3 px-8 py-8 text-center">
                <Icon className="h-8 w-8 text-wine" strokeWidth={1.5} aria-hidden />
                <p
                  className="font-display text-lg font-black text-ink"
                  data-edit-id={`src/lib/data.ts#heroHighlights-${i}-title`}
                >
                  {item.title}
                </p>
                <p className="max-w-[22rem] text-sm leading-relaxed text-stone">
                  <span data-edit-id={`src/lib/data.ts#heroHighlights-${i}-description`}>{item.description}</span>
                  {"citation" in item && <Citation n={item.citation} />}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
