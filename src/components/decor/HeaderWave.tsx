/**
 * The header's entire bottom edge as ONE continuous asymmetric dome/arc —
 * traced from a supplied reference image: deepest at the far left (y=65),
 * rising smoothly to its shallowest point around 60% across (y≈5), then
 * dipping back down toward the far right (y≈46, shallower than the left
 * edge). Rendered as a single path so the fill and the gold accent stroke
 * both trace the exact same curve with no seam. Anchored flush to the
 * header's own bottom edge (top-full) and bleeds downward from there; the
 * header's own box stays a plain rectangle behind it.
 */
export function HeaderWave({ className }: { className?: string }) {
  const wavePath =
    "M1440,46 C1250,30 1050,7 864,5 C650,4 250,45 0,65";
  const fillPath = `M1440,0 L1440,46 C1250,30 1050,7 864,5 C650,4 250,45 0,65 L0,0 Z`;

  return (
    <svg
      viewBox="0 0 1440 130"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="headerWaveFill" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="var(--color-wine)" />
          <stop offset="100%" stopColor="color-mix(in srgb, var(--color-wine), white 12%)" />
        </linearGradient>
        <linearGradient id="headerWaveGold" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D9B776" stopOpacity="0" />
          <stop offset="10%" stopColor="#D9B776" />
          <stop offset="55%" stopColor="#E8CB94" />
          <stop offset="92%" stopColor="#D9B776" />
          <stop offset="100%" stopColor="#D9B776" stopOpacity="0" />
        </linearGradient>
        <filter id="headerWaveGlow" x="-10%" y="-60%" width="120%" height="220%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <path d={fillPath} fill="url(#headerWaveFill)" />

      <path
        d={wavePath}
        fill="none"
        stroke="url(#headerWaveGold)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
        filter="url(#headerWaveGlow)"
      />
      <path
        d={wavePath}
        fill="none"
        stroke="url(#headerWaveGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
