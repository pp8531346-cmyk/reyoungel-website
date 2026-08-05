export const navLinks = [
  { label: "מוצרים", href: "/products" },
  { label: "טכנולוגיה", href: "/technology" },
  { label: "אודות", href: "/about" },
];

// Technical specs (particle size, needle/cannula gauge) sourced from the official
// Reyoungel PDF catalog (brand-assets/). `areas` below is sourced from the Canva
// "קטלוג Reyoungel" catalog instead, which is the approved source of truth for
// treatment-area copy shown on the /products page.
export const products = [
  {
    code: "R001",
    name: "Fine Lines",
    tagline: "לקמטי ההבעה העדינים ביותר",
    sizes: ["1ml", "2ml"],
    areas: "שקעי עיניים , ברקודים",
    duration: "6–9 חודשים",
    particleSize: "0.10–0.15mm",
    needleGauge: "30G/30G",
    // 1 = superficial dermis, 5 = subdermal — depth of injection increases through the range
    depth: 1,
    // Real physical packaging color, sampled from the official product photos
    packagingColor: "#D9D2C7",
  },
  {
    code: "R002",
    name: "Derm",
    tagline: "לשפתיים ולקמטים בעומק בינוני",
    sizes: ["1ml", "2ml"],
    areas: "קמטים בינוניים, קו תיאור שפה",
    duration: "6–12 חודשים",
    particleSize: "0.15–0.28mm",
    needleGauge: "30G/30G",
    depth: 2,
    packagingColor: "#9B2359",
  },
  {
    code: "R003",
    name: "Derm Deep",
    tagline: "לנפח שפתיים ולחיים, לקפל האף–שפה",
    sizes: ["1ml", "2ml", "10ml"],
    areas: "שפתיים, קמטי מריונטה, קמטים נזולביאליים, נפח לחיים",
    duration: "6–12 חודשים",
    particleSize: "0.28–0.5mm",
    needleGauge: "26G/27G",
    depth: 3,
    packagingColor: "#18161A",
  },
  {
    code: "R004",
    name: "Derm Plus",
    tagline: "לעיצוב עצמות הלחי, הסנטר והנפח העמוק",
    sizes: ["10ml"],
    areas: "קו לסת, סנתר, עצמות לחיים, נפח ללחיים",
    duration: "9–18 חודשים",
    particleSize: "0.5–1.25mm",
    needleGauge: "23G/25G",
    depth: 4,
    packagingColor: "#A8A29B",
  },
  {
    code: "R005",
    name: "Sub Skin",
    tagline: "לעיצוב מתאר הפנים והגוף",
    sizes: ["2ml", "10ml"],
    areas: "קו לסת, סנתר, עצמות לחיים, אף",
    duration: "9–18 חודשים",
    particleSize: "1.25–2.0mm",
    needleGauge: "22G/23G",
    depth: 5,
    packagingColor: "#6E6862",
  },
] as const;

export const certifications = [
  {
    id: "ce",
    label: "CE2764",
    description: "תו תקן אירופי CE",
  },
  {
    id: "iso",
    label: "ISO 13485",
    description: "EN ISO 13485:2016",
  },
  {
    id: "moh",
    label: "משרד הבריאות",
    description: "אושר על ידי משרד הבריאות הישראלי",
  },
] as const;

export const stats = [
  { value: 70, suffix: "+", label: "מדינות ברחבי העולם" },
  { value: 2003, suffix: "", label: "שנת הקמת בית המעבדה" },
  { value: 357, suffix: "", label: "מטופלים במחקר הטרום-שיווקי", citation: 1 },
] as const;

// Short highlight rail — hero side panel
export const heroRail = [
  { number: "01", label: "מדע" },
  { number: "02", label: "בטיחות" },
  { number: "03", label: "ותק" },
] as const;

// Icon + title + description row directly beneath the hero
export const heroHighlights = [
  {
    icon: "shield",
    title: "בטיחות מוכחת קלינית",
    description: "בעלי תווי תקן CE ו-ISO 13485, ומאושרים על ידי משרד הבריאות הישראלי.",
  },
  {
    icon: "dna",
    title: "טכנולוגיית SAX-HA® הפטנטית",
    description:
      "הסרה יסודית יותר של שאריות מצלב ה-BDDE, למינימום תגובות רגישות ותוצאה יציבה יותר קלינית.",
  },
  {
    icon: "layers",
    title: "עמידות מוארכת בהזרקה",
    description:
      "מנגנון ההתגבשות העצמית של הג'ל מצמצם נדידה ברקמה, לתוצאת פיסול יציבה על פני 6–18 חודשים.",
    citation: 1,
  },
] as const;

// Approved brand value bullets — official marketing wording, used verbatim
export const heroValueBullets = [
  "עיצוב עדין והרמוני של תווי הפנים",
  "תוצאות מאוזנות ואסתטיות",
  "ייצור בסטנדרטים בינלאומיים",
] as const;
