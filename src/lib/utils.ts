import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Packaging colors are sampled from real product photos, so some run very
// pale (e.g. Fine Lines) and read as invisible against the ivory background
// when used as a border/dot accent. Deepen every swatch by the same fixed
// ratio so all five carry comparable visual weight, not just the pale one.
export function accentColor(hex: string) {
  return `color-mix(in srgb, ${hex} 55%, #1a1414 45%)`;
}
