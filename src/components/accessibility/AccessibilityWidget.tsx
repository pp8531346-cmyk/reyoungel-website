"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import { MotionConfig } from "framer-motion";
import {
  Accessibility,
  AlignJustify,
  ALargeSmall,
  Contrast,
  Link2,
  Minus,
  Palette,
  Plus,
  RotateCcw,
  Type,
  X,
  ZapOff,
} from "lucide-react";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "reyoungel-a11y-settings";
/** Percentage steps the root font-size cycles through — index 1 (100%) is the
 * unmodified default. Scaling `html`'s own font-size (rather than per-element
 * font sizes) is the same mechanism native browser zoom uses, so it scales
 * every rem-based size (type AND most spacing) together — the behavior WCAG
 * 2.1 SC 1.4.4 actually measures against, and it needs zero per-component
 * changes since the whole site is already rem/Tailwind-driven. */
const SCALE_STEPS = [90, 100, 112, 124, 136] as const;
const DEFAULT_SCALE_INDEX = 1;

type Settings = {
  scaleIndex: number;
  contrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  textSpacing: boolean;
  reduceMotion: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  scaleIndex: DEFAULT_SCALE_INDEX,
  contrast: false,
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
  textSpacing: false,
  reduceMotion: false,
};

function readStoredSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Mirrors what the pre-hydration inline script (see layout.tsx) already did
 * synchronously before paint — reapplying here is harmless/idempotent, and
 * keeps this component the single source of truth once React has mounted. */
function applySettingsToDocument(settings: Settings) {
  const root = document.documentElement;
  for (let i = 0; i < SCALE_STEPS.length; i++) root.classList.remove(`a11y-scale-${i}`);
  root.classList.add(`a11y-scale-${settings.scaleIndex}`);
  root.classList.toggle("a11y-contrast", settings.contrast);
  root.classList.toggle("a11y-grayscale", settings.grayscale);
  root.classList.toggle("a11y-highlight-links", settings.highlightLinks);
  root.classList.toggle("a11y-readable-font", settings.readableFont);
  root.classList.toggle("a11y-text-spacing", settings.textSpacing);
  root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
}

export function AccessibilityWidget({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // Lazy initializer: reads localStorage synchronously during the first client
  // render (readStoredSettings() no-ops to defaults during SSR, where `window`
  // doesn't exist). This value is never used to shape the initial (closed-panel)
  // server-rendered HTML — AnimatePresence renders nothing while `open` is
  // false, and `open` only ever becomes true from a client-side click — so
  // there's no server/client markup to mismatch regardless of what this
  // resolves to. The pre-hydration inline script in layout.tsx has already
  // applied the matching classes to <html> before first paint either way.
  const [settings, setSettings] = useState<Settings>(() => readStoredSettings());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const headingId = useId();

  // Reacts to every settings change (including the initial one from the lazy
  // initializer above) by re-syncing <html>'s classes and persisting — a
  // legitimate effect (mirroring React state into an external system/store),
  // not a setState-in-effect cascade.
  useEffect(() => {
    applySettingsToDocument(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // localStorage can throw in private-browsing/storage-restricted contexts —
      // the settings still apply for this page view, just won't persist.
    }
  }, [settings]);

  // Focus trap + Escape-to-close while the panel is open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));

    getFocusable()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Click/tap outside the panel (and outside the trigger, so re-clicking the
  // trigger toggles rather than closing-then-reopening) closes it.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Return focus to the trigger button when the panel closes, so keyboard
  // users don't lose their place.
  useEffect(() => {
    if (wasOpenRef.current && !open) triggerRef.current?.focus();
    wasOpenRef.current = open;
  }, [open]);

  function update(patch: Partial<Settings>) {
    setSettings((prev) => ({ ...prev, ...patch }));
  }

  function reset() {
    setSettings(DEFAULT_SETTINGS);
  }

  const scalePercent = SCALE_STEPS[settings.scaleIndex];

  return (
    <MotionConfig reducedMotion={settings.reduceMotion ? "always" : "user"}>
      <SmoothScroll disabled={settings.reduceMotion} />
      <ScrollProgress />
      {children}

      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="כלי נגישות"
        onClick={() => setOpen((v) => !v)}
        className="hover-lift-btn fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 z-[90] flex h-14 w-14 items-center justify-center rounded-full border-2 border-cream/70 bg-wine text-cream shadow-[0_10px_26px_-8px_rgba(171,33,58,0.55)]"
      >
        <Accessibility className="h-7 w-7" aria-hidden />
      </button>

      {/* Always mounted (never conditionally rendered) — toggling visibility via
          CSS transition + `inert` instead of Framer Motion's AnimatePresence
          mount/unmount sidesteps a real bug found while testing: with
          MotionConfig's reducedMotion="always" active (the "reduce
          animations" toggle above), AnimatePresence's exit animation doesn't
          reliably fire its completion callback, leaving an invisible but
          still-focusable "ghost" panel in the DOM forever — a real keyboard
          trap for exactly the users this widget exists to help. A plain CSS
          transition (which already respects .a11y-reduce-motion via the
          global `transition-duration` override in globals.css, consistent
          with every other animation on the site) plus the native `inert`
          attribute — which removes the whole subtree from both the tab order
          and the accessibility tree the instant it's set, no animation
          lifecycle involved — is simpler and doesn't have that failure mode. */}
      <div
        id="a11y-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby={headingId}
        aria-hidden={!open}
        inert={!open}
        dir="rtl"
        className={cn(
          "fixed bottom-[max(5.75rem,calc(env(safe-area-inset-bottom)+5.75rem))] left-4 z-[90] flex max-h-[min(34rem,calc(100vh-7rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-hairline bg-cream text-ink shadow-[0_24px_60px_-20px_rgba(26,20,20,0.45)] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-[0.97] opacity-0",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-hairline px-5 py-4">
          <h2 id={headingId} className="font-display text-lg font-black text-ink">
            כלי נגישות
          </h2>
          <button
            type="button"
            aria-label="סגירת תפריט הנגישות"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-5 py-4">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-hairline bg-ivory px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-bold text-ink">
              <ALargeSmall className="h-5 w-5 shrink-0" aria-hidden />
              גודל טקסט
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="הקטנת גודל הטקסט"
                disabled={settings.scaleIndex === 0}
                onClick={() => update({ scaleIndex: Math.max(0, settings.scaleIndex - 1) })}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-cream text-ink transition-colors hover:border-wine hover:text-wine disabled:cursor-default disabled:opacity-30 disabled:hover:border-hairline disabled:hover:text-ink"
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span
                aria-live="polite"
                dir="ltr"
                className="w-11 text-center text-xs font-bold tabular-nums text-stone"
              >
                {scalePercent}%
              </span>
              <button
                type="button"
                aria-label="הגדלת גודל הטקסט"
                disabled={settings.scaleIndex === SCALE_STEPS.length - 1}
                onClick={() =>
                  update({ scaleIndex: Math.min(SCALE_STEPS.length - 1, settings.scaleIndex + 1) })
                }
                className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-cream text-ink transition-colors hover:border-wine hover:text-wine disabled:cursor-default disabled:opacity-30 disabled:hover:border-hairline disabled:hover:text-ink"
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <ToggleRow
            icon={Contrast}
            label="ניגודיות גבוהה"
            pressed={settings.contrast}
            onToggle={() => update({ contrast: !settings.contrast })}
          />
          <ToggleRow
            icon={Palette}
            label="גווני אפור"
            pressed={settings.grayscale}
            onToggle={() => update({ grayscale: !settings.grayscale })}
          />
          <ToggleRow
            icon={Link2}
            label="הדגשת קישורים"
            pressed={settings.highlightLinks}
            onToggle={() => update({ highlightLinks: !settings.highlightLinks })}
          />
          <ToggleRow
            icon={Type}
            label="גופן קריא"
            pressed={settings.readableFont}
            onToggle={() => update({ readableFont: !settings.readableFont })}
          />
          <ToggleRow
            icon={AlignJustify}
            label="ריווח טקסט מוגדל"
            pressed={settings.textSpacing}
            onToggle={() => update({ textSpacing: !settings.textSpacing })}
          />
          <ToggleRow
            icon={ZapOff}
            label="הפחתת אנימציות"
            pressed={settings.reduceMotion}
            onToggle={() => update({ reduceMotion: !settings.reduceMotion })}
          />
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t border-hairline px-5 py-4">
          <button
            type="button"
            onClick={reset}
            className="flex items-center justify-center gap-2 rounded-full border border-hairline bg-ivory px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-wine/40 hover:text-wine"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            איפוס כל ההגדרות
          </button>
          <Link
            href="/accessibility"
            onClick={() => setOpen(false)}
            className="link-underline text-center text-xs font-bold text-stone"
          >
            הצהרת הנגישות המלאה
          </Link>
        </div>
      </div>
    </MotionConfig>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  pressed,
  onToggle,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  pressed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-start text-sm font-bold transition-colors",
        pressed ? "border-wine bg-wine text-cream" : "border-hairline bg-ivory text-ink hover:border-wine/40",
      )}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-5 w-5 shrink-0" />
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors",
          pressed ? "justify-end bg-cream/30" : "justify-start bg-ink/15",
        )}
      >
        <span className="h-4 w-4 rounded-full bg-cream" />
      </span>
    </button>
  );
}
