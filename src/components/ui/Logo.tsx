import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Real brand wordmark asset (white, transparent background) — only suits
 * dark/wine surfaces. No ink-colored variant exists yet, so this renders the
 * same white mark regardless of context until one is supplied.
 */
export function Logo({
  className,
  imgClassName,
  imgStyle,
  "data-edit-id": editId,
}: {
  className?: string;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  "data-edit-id"?: string;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      <Image
        src="/images/reyoungel-logo-white.png"
        alt="Reyoungel"
        width={716}
        height={420}
        priority
        className={imgClassName ?? "h-[3.25rem] w-auto object-contain"}
        style={imgStyle}
        data-edit-id={editId}
      />
    </span>
  );
}
