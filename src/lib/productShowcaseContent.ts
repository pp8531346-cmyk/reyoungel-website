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
  /** Virtual canvas the 5 box images below are positioned within — matches the
   * original hero photo's own dimensions so heroBoxes' rects (measured against
   * that photo) still line up exactly. */
  canvasWidth: 2746,
  canvasHeight: 1366,
};

/** The 5 product boxes from the hero photo, background-removed and cropped
 * individually (not one flat image) so each box can be its own interactive
 * element — hover lift and click-to-jump need a real element to animate, which a
 * single flat image with invisible hit-zones on top can't give us. `rect` is each
 * box's position within showcaseIntro's virtual canvas, as a percentage — measured
 * directly against the source photo, not eyeballed. */
export const heroBoxes: {
  code: ProductCode;
  src: string;
  width: number;
  height: number;
  rect: { x1: number; y1: number; x2: number; y2: number };
}[] = [
  { code: "R001", src: "/images/hero-box-r001.png", width: 398, height: 1147, rect: { x1: 2, y1: 1, x2: 16.5, y2: 85 } },
  { code: "R002", src: "/images/hero-box-r002.png", width: 439, height: 1147, rect: { x1: 22, y1: 1, x2: 38, y2: 85 } },
  { code: "R003", src: "/images/hero-box-r003.png", width: 439, height: 1161, rect: { x1: 42, y1: 1, x2: 58, y2: 86 } },
  { code: "R004", src: "/images/hero-box-r004.png", width: 426, height: 1134, rect: { x1: 62, y1: 1, x2: 77.5, y2: 84 } },
  { code: "R005", src: "/images/hero-box-r005.png", width: 434, height: 1141, rect: { x1: 82, y1: 1, x2: 97.8, y2: 84.5 } },
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
      /* @edit:showcaseEntries-R003-description */ "צמיגות בינונית–גבוהה המותאמת לנפח שפתיים ולתיקון קפל האף–שפה - משלבת תמיכה מבנית עם מרקם חלק המתאים לאזורים דינמיים בפנים.",
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
    ],
  },
  {
    code: "R005",
    description:
      /* @edit:showcaseEntries-R005-description */ "הצמיגות הגבוהה ביותר בסדרה, לדרמיס העמוק ולרקמה התת–עורית — מיועדת לעיצוב קונטור הפנים והגוף ולשחזור נפח מבני משמעותי.",
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
    ],
  },
];
