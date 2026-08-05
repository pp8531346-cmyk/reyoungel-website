/**
 * Soft diagonal wavy ribbon backdrop for the hero — two translucent bands in
 * the brand wine/plum tones, blurred for a dreamy studio-backdrop feel, fading
 * to white toward the text side instead of a flat color block.
 */
export function HeroRibbon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 760"
      preserveAspectRatio="none"
      className={className ? `${className} animate-ribbon-drift` : "animate-ribbon-drift"}
      aria-hidden
    >
      <defs>
        <linearGradient id="ribbonA" x1="0%" y1="30%" x2="100%" y2="70%">
          <stop offset="0%" stopColor="var(--color-plum)" stopOpacity="0.32" />
          <stop offset="55%" stopColor="var(--color-wine)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--color-wine)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ribbonB" x1="0%" y1="10%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="var(--color-wine-dark)" stopOpacity="0.4" />
          <stop offset="60%" stopColor="var(--color-wine)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-wine)" stopOpacity="0" />
        </linearGradient>
        <filter id="ribbonBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <path
        d="M-100,560 C120,460 320,660 560,580 C860,480 1040,340 1340,420 L1560,300 L1560,820 L-100,820 Z"
        fill="url(#ribbonA)"
        filter="url(#ribbonBlur)"
      />
      <path
        d="M-100,660 C160,610 300,740 520,690 C780,630 980,480 1300,540 L1560,480 L1560,820 L-100,820 Z"
        fill="url(#ribbonB)"
        filter="url(#ribbonBlur)"
      />
    </svg>
  );
}
