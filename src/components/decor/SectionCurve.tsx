/**
 * A single asymmetric arc (not a repeating wave) placed at the bottom edge of
 * a section, filled with the color of whatever comes next — turns a hard
 * section boundary into an organic transition.
 */
export function SectionCurve({
  fill,
  className,
}: {
  fill: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path d="M0,90 C 420,10 1040,80 1440,20 L1440,90 L0,90 Z" fill={fill} />
    </svg>
  );
}
