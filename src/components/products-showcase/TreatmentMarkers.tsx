"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { TreatmentMarker } from "@/lib/productShowcaseContent";
import { useEditMode } from "@/dev-editor/EditModeContext";

export function TreatmentMarkers({
  markers,
  accent = "var(--color-ink)",
  productCode,
}: {
  markers: TreatmentMarker[];
  /** CSS color driving the ring, core dot, and label pill — ties the markers to the
   * section's own tonal identity instead of a fixed ink color across every product. */
  accent?: string;
  /** Product code these markers belong to — required for drag-to-reposition in dev
   * edit mode, since the save request needs to know which entry to write back to. */
  productCode?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const { editMode } = useEditMode();
  const shouldReduceMotion = useReducedMotion();
  // Initialized once from props; edit-mode drags only ever mutate this local copy
  // (the props array is a static module-level constant that doesn't change at runtime).
  const [localMarkers, setLocalMarkers] = useState(markers);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleEditMouseDown(e: React.MouseEvent, i: number) {
    if (!editMode || !productCode) return;
    e.preventDefault();
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    function moveTo(clientX: number, clientY: number) {
      const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
      setLocalMarkers((prev) => prev.map((m, idx) => (idx === i ? { ...m, x, y } : m)));
      return { x, y };
    }

    function handleMove(moveEvent: MouseEvent) {
      moveTo(moveEvent.clientX, moveEvent.clientY);
    }

    function handleUp(upEvent: MouseEvent) {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      const { x, y } = moveTo(upEvent.clientX, upEvent.clientY);
      fetch("/api/dev-editor/save-marker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: productCode, label: localMarkers[i].label, x, y }),
      });
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  }

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden={false}>
      {localMarkers.map((marker, i) => (
        <motion.div
          key={marker.label}
          className="absolute"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <button
            type="button"
            className="relative -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
            onMouseEnter={() => !editMode && setActive(i)}
            onMouseLeave={() => !editMode && setActive((cur) => (cur === i ? null : cur))}
            onFocus={() => !editMode && setActive(i)}
            onBlur={() => !editMode && setActive((cur) => (cur === i ? null : cur))}
            onMouseDown={(e) => handleEditMouseDown(e, i)}
            aria-label={marker.label}
            style={editMode ? { cursor: "grab" } : undefined}
          >
            {/* Soft ambient glow — a deliberate, always-on halo so the marker reads as
                a designed element even before interaction, not just a hover affordance. */}
            <motion.span
              className="absolute inset-0 m-auto rounded-full"
              style={{ background: accent }}
              animate={{
                width: active === i ? 40 : 26,
                height: active === i ? 40 : 26,
                opacity: active === i ? 0.22 : 0.14,
                filter: "blur(6px)",
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="relative block rounded-full bg-ivory/20 backdrop-blur-[1px]"
              style={{ borderStyle: "solid", borderColor: accent }}
              animate={{
                width: active === i ? 24 : 17,
                height: active === i ? 24 : 17,
                borderWidth: active === i ? 1.5 : 1.25,
                opacity: active === i ? 1 : 0.88,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute inset-0 m-auto rounded-full"
              style={{ background: accent }}
              animate={{
                width: active === i ? 5 : 3.5,
                height: active === i ? 5 : 3.5,
                opacity: 1,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />

            <AnimatePresence>
              {active === i && (
                <motion.span
                  initial={{ opacity: 0, y: 5, scale: 0.94, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 5, scale: 0.94, filter: "blur(2px)" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: accent }}
                  className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold text-cream shadow-[0_8px_20px_-6px_rgba(26,20,20,0.45)]"
                >
                  {marker.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
