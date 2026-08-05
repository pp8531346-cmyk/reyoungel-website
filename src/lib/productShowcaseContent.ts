import type { products } from "@/lib/data";

type ProductCode = (typeof products)[number]["code"];

export type TreatmentMarker = {
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
  eyebrow: "Reyoungel®",
  headline: "סדרת המזרקים של ריונג׳ל",
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
      "ג׳ל היאלורוני עדין, המיועד לדרמיס השטחי — לריכוך קמטי הבעה ראשוניים תוך שמירה קפדנית על תנועתיות טבעית של הבעות הפנים.",
    injectionDepth: "דרמיס שטחי",
    structureLabel: "++++",
    haConcentration: "20 מ״ג/מ״ל",
    needleGauge: "30G",
    accent: "var(--color-wine)",
    markers: [
      { label: "שקעי עיניים", x: 39, y: 48.6 },
      { label: "קמטים סביב העיניים", x: 50.6, y: 35.4 },
      { label: "קמטים סביב הפה", x: 49.6, y: 60.4 },
    ],
  },
  {
    code: "R002",
    description:
      "פורמולציה מאוזנת לדרמיס הבינוני, מיועדת לקווי מתאר עדינים סביב אזור הפה והגלבלה — לתוצאה הרמונית שאינה פוגעת בטבעיות ההבעה.",
    injectionDepth: "דרמיס בינוני/שטחי",
    structureLabel: "+",
    haConcentration: "20 מ״ג/מ״ל",
    needleGauge: "30G",
    accent: "var(--color-wine)",
    markers: [
      { label: "גלבלה", x: 67.1, y: 67.4 },
      { label: "אזור פריאורלי", x: 53.4, y: 59.4 },
      { label: "שקעי עיניים", x: 64.3, y: 56.9 },
    ],
  },
  {
    code: "R003",
    description:
      "צמיגות בינונית–גבוהה המותאמת לנפח שפתיים ולתיקון קפל האף–שפה — משלבת תמיכה מבנית עם מרקם חלק המתאים לאזורים דינמיים בפנים.",
    injectionDepth: "דרמיס בינוני - עמוק",
    structureLabel: "++",
    haConcentration: "20 מ״ג/מ״ל",
    needleGauge: "27G",
    accent: "var(--color-plum)",
    markers: [
      { label: "שפתיים", x: 53.7, y: 62.1 },
      { label: "קמטי מריונטה", x: 67.4, y: 67.4 },
      { label: "קפלים נזוליאביאליים", x: 64.9, y: 56.9 },
      { label: "לחיים", x: 72.8, y: 53.9 },
    ],
  },
  {
    code: "R004",
    description:
      "ג׳ל בעל מבנה יציב לדרמיס העמוק, לעיצוב עצמות הלחי, קו הלסת והסנטר — מיועד לשחזור נפח משמעותי עם תמיכה מבנית ארוכת טווח.",
    injectionDepth: "דרמיס עמוק",
    structureLabel: "++++",
    haConcentration: "20 מ״ג/מ״ל",
    needleGauge: "23G",
    accent: "var(--color-plum)",
    markers: [
      { label: "קו לסת", x: 54.6, y: 72.6 },
      { label: "סנטר", x: 74.6, y: 65.4 },
      { label: "עצמות לחיים", x: 73.7, y: 50.4 },
      { label: "נפח ללחיים", x: 51.8, y: 47.6 },
    ],
  },
  {
    code: "R005",
    description:
      "הצמיגות הגבוהה ביותר בסדרה, לדרמיס העמוק ולרקמה התת–עורית — מיועדת לעיצוב קונטור הפנים והגוף ולשחזור נפח מבני משמעותי.",
    injectionDepth: "דרמיס עמוק, תת עורי",
    structureLabel: "++++",
    haConcentration: "20 מ״ג/מ״ל",
    needleGauge: "23G",
    accent: "var(--color-wine-dark)",
    markers: [
      { label: "קו לסת", x: 74, y: 65 },
      { label: "סנטר", x: 54.6, y: 74.4 },
      { label: "עצמות לחיים", x: 75.9, y: 49.6 },
      { label: "אף", x: 52.4, y: 47.9 },
    ],
  },
];
