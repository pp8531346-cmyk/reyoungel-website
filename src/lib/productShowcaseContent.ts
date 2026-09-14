import type { products } from "@/lib/data";

type ProductCode = (typeof products)[number]["code"];

export type TreatmentMarker = {
  /** Stable identifier — the marker's persistence key for both position drags
   * (save-marker) and label text edits (data-edit-id), so edits never depend on
   * the mutable `label` text itself. */
  id: string;
  label: string;
  /** Position as a percentage of the image box, front-facing portrait framing. */
  x: number;
  y: number;
};

export type ShowcaseEntry = {
  code: ProductCode;
  /** One short, clinical-register description — written for the treating physician first. */
  description: string;
  injectionDepth: string;
  /** Literal G' (gel firmness/elasticity) rating, transcribed verbatim from the
   * Reyoungel Canva catalog — a plus-sign scale, not a paraphrase. */
  structureLabel: string;
  haConcentration: string;
  /** Recommended needle gauge, from the Canva catalog's "מחט מומלצת" field. */
  needleGauge: string;
  /** Marker coordinates are all remapped onto the single shared journeyImage below —
   * percentages of that image's own display box, not of a per-product photo. */
  markers: TreatmentMarker[];
  /** The brand token this product's markers/tagline are drawn from. */
  accent: string;
};

export const showcaseIntro = {
  eyebrow: /* @edit:showcaseIntro-eyebrow */ "Reyoungel",
  headline: /* @edit:showcaseIntro-headline */ "סדרת המזרקים של",
  /** Canvas the 5 box hit-zones below are positioned within — the actual pixel
   * dimensions of heroBoxesSprite itself (a real, square 1:1 image now, not a
   * virtual/approximated one), so heroBoxes' rects line up exactly against it. */
  canvasWidth: 1500,
  canvasHeight: 1500,
};

/** The single flat, watermark-free product photo (all 5 boxes together, supplied
 * directly — not cropped/composited by us) used for the showcase intro row.
 * Each product still needs its own independently hoverable/clickable element, so
 * ShowcaseIntro renders this SAME sprite once per product inside a clipped
 * (overflow-hidden) window sized to that product's `rect` below, offset so only
 * that slice shows — rather than 5 separate image files. */
export const heroBoxesSprite = {
  src: "/images/hero-boxes-collection.png",
  width: 1500,
  height: 1500,
};

/** `rect` is each box's position within heroBoxesSprite, as a percentage of its
 * 1500×1500 canvas — measured directly against the sprite (column/row alpha and
 * color-transition scans), not eyeballed. Every on-page usage (the hero row, the
 * product detail badge, the home product list) renders this same sprite through
 * SpriteBoxImage, clipped to `rect` — there are no more standalone per-product box
 * image files. */
export const heroBoxes: {
  code: ProductCode;
  rect: { x1: number; y1: number; x2: number; y2: number };
}[] = [
  { code: "R001", rect: { x1: 7.6, y1: 34, x2: 21.67, y2: 72.27 } },
  { code: "R002", rect: { x1: 26, y1: 34, x2: 39.4, y2: 72.27 } },
  { code: "R003", rect: { x1: 44.13, y1: 34.07, x2: 57.27, y2: 72.33 } },
  { code: "R004", rect: { x1: 62, y1: 34, x2: 75.4, y2: 72.27 } },
  { code: "R005", rect: { x1: 79.73, y1: 34, x2: 93.73, y2: 72.27 } },
];

/** The single fixed model photo used for all 5 products in the horizontal product
 * journey — it never changes as the user scrolls between products, only the
 * copy/spec/markers overlaid on top of it do. */
export const journeyImage = {
  src: "/images/hero-derm-deep.png",
  focus: "50% 50%",
  width: 1920,
  height: 1607,
};

export const showcaseEntries: ShowcaseEntry[] = [
  {
    code: "R001",
    description:
      /* @edit:showcaseEntries-R001-description */ "ג׳ל היאלורוני עדין, המיועד לדרמיס השטחי - לריכוך קמטי הבעה ראשוניים תוך שמירה קפדנית על תנועתיות טבעית של הבעות הפנים.",
    injectionDepth: /* @edit:showcaseEntries-R001-injectionDepth */ "דרמיס שטחי",
    structureLabel: /* @edit:showcaseEntries-R001-structureLabel */ "+",
    haConcentration: /* @edit:showcaseEntries-R001-haConcentration */ "20 מ״ג/מ״ל",
    needleGauge: /* @edit:showcaseEntries-R001-needleGauge */ "30G",
    accent: "var(--color-wine)",
    markers: [
      { id: "eye-hollows", label: /* @edit:showcaseEntries-R001-markers-eye-hollows-label */ "שקעי עיניים", x: 39, y: 48.6 },
      { id: "crows-feet", label: /* @edit:showcaseEntries-R001-markers-crows-feet-label */ "קמטים סביב העיניים", x: 74.5, y: 40.1 },
      { id: "perioral-lines", label: /* @edit:showcaseEntries-R001-markers-perioral-lines-label */ "קמטים סביב הפה", x: 49.6, y: 60.4 },
      { id: "forehead-lines", label: /* @edit:showcaseEntries-R001-markers-forehead-lines-label */ "גלאבלה", x: 50.6, y: 35.3 },
    ],
  },
  {
    code: "R002",
    description:
      /* @edit:showcaseEntries-R002-description */ "פורמולציה מאוזנת לדרמיס הבינוני, מיועדת לחידוד ועיצוב השפתיים - לתוצאה הרמונית שאינה פוגעת בטבעיות ההבעה.",
    injectionDepth: /* @edit:showcaseEntries-R002-injectionDepth */ "דרמיס בינוני/שטחי",
    structureLabel: /* @edit:showcaseEntries-R002-structureLabel */ "++",
    haConcentration: /* @edit:showcaseEntries-R002-haConcentration */ "20 מ״ג/מ״ל",
    needleGauge: /* @edit:showcaseEntries-R002-needleGauge */ "30G",
    accent: "var(--color-wine)",
    markers: [
      { id: "glabella", label: /* @edit:showcaseEntries-R002-markers-glabella-label */ "קפלי מריונטה קלים", x: 67.1, y: 67.4 },
      { id: "perioral-area", label: /* @edit:showcaseEntries-R002-markers-perioral-area-label */ "אזור פריאורלי", x: 53.4, y: 59.4 },
      { id: "eye-hollows", label: /* @edit:showcaseEntries-R002-markers-eye-hollows-label */ "קפלי נזולביאל קלים", x: 42.3, y: 57.4 },
    ],
  },
  {
    code: "R003",
    description:
      /* @edit:showcaseEntries-R003-description */ "צמיגות בינונית-גבוהה המותאמת לנפח שפתיים ולתיקון קפל האף-שפה - משלבת תמיכה מבנית עם מרקם חלק המתאים לאזורים דינמיים בפנים.",
    injectionDepth: /* @edit:showcaseEntries-R003-injectionDepth */ "דרמיס בינוני - עמוק",
    structureLabel: /* @edit:showcaseEntries-R003-structureLabel */ "++",
    haConcentration: /* @edit:showcaseEntries-R003-haConcentration */ "20 מ״ג/מ״ל",
    needleGauge: /* @edit:showcaseEntries-R003-needleGauge */ "27G",
    accent: "var(--color-plum)",
    markers: [
      { id: "lips", label: /* @edit:showcaseEntries-R003-markers-lips-label */ "שפתיים", x: 53.7, y: 62.1 },
      { id: "marionette-lines", label: /* @edit:showcaseEntries-R003-markers-marionette-lines-label */ "קמטי מריונטה", x: 67.4, y: 67.4 },
      { id: "nasolabial-folds", label: /* @edit:showcaseEntries-R003-markers-nasolabial-folds-label */ "קפלים נזוליאביאליים", x: 64.9, y: 56.9 },
      { id: "cheeks", label: /* @edit:showcaseEntries-R003-markers-cheeks-label */ "נפח ללחיים", x: 72.8, y: 53.9 },
    ],
  },
  {
    code: "R004",
    description:
      /* @edit:showcaseEntries-R004-description */ "ג׳ל בעל מבנה יציב לדרמיס העמוק, לעיצוב עצמות הלחי, קו הלסת והסנטר - מיועד לשחזור נפח משמעותי עם תמיכה מבנית ארוכת טווח.",
    injectionDepth: /* @edit:showcaseEntries-R004-injectionDepth */ "דרמיס עמוק",
    structureLabel: /* @edit:showcaseEntries-R004-structureLabel */ "++++",
    haConcentration: /* @edit:showcaseEntries-R004-haConcentration */ "20 מ״ג/מ״ל",
    needleGauge: /* @edit:showcaseEntries-R004-needleGauge */ "23G",
    accent: "var(--color-plum)",
    markers: [
      { id: "jawline", label: /* @edit:showcaseEntries-R004-markers-jawline-label */ "קו לסת", x: 77.5, y: 63.8 },
      { id: "chin", label: /* @edit:showcaseEntries-R004-markers-chin-label */ "סנטר", x: 55.6, y: 74.9 },
      { id: "cheekbones", label: /* @edit:showcaseEntries-R004-markers-cheekbones-label */ "עצמות לחיים", x: 75.5, y: 47.5 },
      { id: "cheek-volume", label: /* @edit:showcaseEntries-R004-markers-cheek-volume-label */ "אף", x: 51.8, y: 47.6 },
      { id: "temples", label: /* @edit:showcaseEntries-R004-markers-temples-label */ "רקות", x: 76.8, y: 31.9 },
    ],
  },
  {
    code: "R005",
    description:
      /* @edit:showcaseEntries-R005-description */ "הצמיגות הגבוהה ביותר בסדרה, לדרמיס העמוק ולרקמה התת-עורית - מיועדת לעיצוב קונטור הפנים והגוף ולשחזור נפח מבני משמעותי.",
    injectionDepth: /* @edit:showcaseEntries-R005-injectionDepth */ "דרמיס עמוק, תת עורי",
    structureLabel: /* @edit:showcaseEntries-R005-structureLabel */ "+++++",
    haConcentration: /* @edit:showcaseEntries-R005-haConcentration */ "20 מ״ג/מ״ל",
    needleGauge: /* @edit:showcaseEntries-R005-needleGauge */ "23G",
    accent: "var(--color-wine-dark)",
    markers: [
      { id: "jawline", label: /* @edit:showcaseEntries-R005-markers-jawline-label */ "קו לסת", x: 74, y: 65 },
      { id: "chin", label: /* @edit:showcaseEntries-R005-markers-chin-label */ "סנטר", x: 54.6, y: 74.4 },
      { id: "cheekbones", label: /* @edit:showcaseEntries-R005-markers-cheekbones-label */ "עצמות לחיים", x: 75.9, y: 49.6 },
      { id: "nose", label: /* @edit:showcaseEntries-R005-markers-nose-label */ "אף", x: 52.4, y: 47.9 },
      { id: "temples", label: /* @edit:showcaseEntries-R005-markers-temples-label */ "רקות", x: 77.8, y: 33.7 },
    ],
  },
];
