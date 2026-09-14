export const navLinks = [
  { label: /* @edit:navLinks-0-label */ "בית", href: "/" },
  { label: /* @edit:navLinks-1-label */ "מוצרים", href: "/products" },
  { label: /* @edit:navLinks-2-label */ "טכנולוגיה", href: "/technology" },
  { label: /* @edit:navLinks-3-label */ "אודות", href: "/about" },
];

// Technical specs (particle size, needle/cannula gauge) sourced from the official
// Reyoungel PDF catalog (brand-assets/). `areas` below is sourced from the Canva
// "קטלוג Reyoungel" catalog instead, which is the approved source of truth for
// treatment-area copy shown on the /products page.
export const products = [
  {
    code: "R001",
    name: /* @edit:products-R001-name */ "Fine Lines",
    tagline: /* @edit:products-R001-tagline */ "לקמטי ההבעה העדינים ביותר",
    sizes: ["1ml", "2ml"],
    areas: /* @edit:products-R001-areas */ "שקעי עיניים , ברקודים, גלאבלה, קמטים בצידי העיניים",
    duration: /* @edit:products-R001-duration */ "6-9 חודשים",
    particleSize: /* @edit:products-R001-particleSize */ "0.10–0.15mm",
    needleGauge: "30G/30G",
    // 1 = superficial dermis, 5 = subdermal — depth of injection increases through the range
    depth: 1,
    // Real physical packaging color, sampled from the official product photos
    packagingColor: "#D9D2C7",
  },
  {
    code: "R002",
    name: /* @edit:products-R002-name */ "Derm",
    tagline: /* @edit:products-R002-tagline */ "לשפתיים ולקמטים בעומק בינוני",
    sizes: ["1ml", "2ml"],
    areas: /* @edit:products-R002-areas */ "קמטים בינוניים, קו תיאור שפה",
    duration: /* @edit:products-R002-duration */ "6-12 חודשים",
    particleSize: /* @edit:products-R002-particleSize */ "0.15–0.28mm",
    needleGauge: "30G/30G",
    depth: 2,
    packagingColor: "#9B2359",
  },
  {
    code: "R003",
    name: /* @edit:products-R003-name */ "Derm Deep",
    tagline: /* @edit:products-R003-tagline */ "לנפח שפתיים ולחיים, לקפל האף-שפה",
    sizes: ["1ml", "2ml", "10ml"],
    areas: /* @edit:products-R003-areas */ "שפתיים, קמטי מריונטה, קמטים נזולביאליים, נפח לחיים",
    duration: /* @edit:products-R003-duration */ "6-12 חודשים",
    particleSize: /* @edit:products-R003-particleSize */ "0.28–0.5mm",
    needleGauge: "26G/27G",
    depth: 3,
    packagingColor: "#18161A",
  },
  {
    code: "R004",
    name: /* @edit:products-R004-name */ "Derm Plus",
    tagline: /* @edit:products-R004-tagline */ "לעיצוב עצמות הלחי, הסנטר והנפח העמוק",
    sizes: ["10ml"],
    areas: /* @edit:products-R004-areas */ "קו לסת, סנטר, עצמות לחיים, נפח ללחיים, רקות",
    duration: /* @edit:products-R004-duration */ "9-18 חודשים",
    particleSize: /* @edit:products-R004-particleSize */ "0.5–1.25mm",
    needleGauge: "23G/25G",
    depth: 4,
    packagingColor: "#A8A29B",
  },
  {
    code: "R005",
    name: /* @edit:products-R005-name */ "Sub Skin",
    tagline: /* @edit:products-R005-tagline */ "לעיצוב מתאר הפנים והגוף",
    sizes: ["2ml", "10ml"],
    areas: /* @edit:products-R005-areas */ "קו לסת, סנטר, עצמות לחיים, אף, רקות ",
    duration: /* @edit:products-R005-duration */ "9-18 חודשים",
    particleSize: /* @edit:products-R005-particleSize */ "1.25–2.0mm",
    needleGauge: "22G/23G",
    depth: 5,
    packagingColor: "#6E6862",
  },
] as const;

export const certifications = [
  {
    id: "ce",
    label: /* @edit:certifications-ce-label */ "CE2764",
    description: /* @edit:certifications-ce-description */ "תו תקן אירופי CE",
  },
  {
    id: "iso",
    label: /* @edit:certifications-iso-label */ "ISO 13485",
    description: /* @edit:certifications-iso-description */ "EN ISO 13485:2016",
  },
  {
    id: "moh",
    label: /* @edit:certifications-moh-label */ "משרד הבריאות",
    description: /* @edit:certifications-moh-description */ "אושר על ידי משרד הבריאות הישראלי",
  },
] as const;

// `value` (the counted-up number) is intentionally not wired to the text editor —
// it drives the Counter animation and isn't a plain string/JSX-text literal the
// marker-based replace can target safely. `suffix`/`label` are.
export const stats = [
  { value: 70, suffix: /* @edit:stats-0-suffix */ "+", label: /* @edit:stats-0-label */ "מדינות ברחבי העולם" },
  { value: 2003, suffix: "", label: /* @edit:stats-1-label */ "שנת הקמת בית המעבדה" },
  {
    value: 357,
    suffix: "",
    label: /* @edit:stats-2-label */ "מטופלים במחקר הטרום-שיווקי",
    citation: 1,
  },
] as const;

// Short highlight rail — hero side panel
export const heroRail = [
  { number: /* @edit:heroRail-0-number */ "01", label: /* @edit:heroRail-0-label */ "אזורי טיפול" },
  { number: /* @edit:heroRail-1-number */ "02", label: /* @edit:heroRail-1-label */ "טכנולוגיה" },
  { number: /* @edit:heroRail-2-number */ "03", label: /* @edit:heroRail-2-label */ "ותק" },
] as const;

// Icon + title + description row directly beneath the hero
export const heroHighlights = [
  {
    icon: "shield",
    title: /* @edit:heroHighlights-0-title */ "בטיחות ואיכות מוכחת ",
    description:
      /* @edit:heroHighlights-0-description */ "בעלי תווי תקן CE ו-ISO 13485, ומאושרים על ידי משרד הבריאות הישראלי",
  },
  {
    icon: "dna",
    title: /* @edit:heroHighlights-1-title */ "טכנולוגיית SAX-HA הפטנטית",
    description:
      /* @edit:heroHighlights-1-description */ "הסרה יסודית יותר של שאריות מצלב ה-BDDE, למינימום תגובות רגישות ותוצאה יציבה יותר קלינית",
  },
  {
    icon: "layers",
    title: /* @edit:heroHighlights-2-title */ "תוצאות עמידות לאורך זמן",
    description:
      /* @edit:heroHighlights-2-description */ "מחקר קליני שכלל מעל 350 מטופלים מוכיח כי Reyoungel נשמר זמן רב יותר בהשוואה למותגים מובילים באירופה",
    citation: 1,
  },
] as const;

// Approved brand value bullets — official marketing wording, used verbatim
export const heroValueBullets = [
  /* @edit:heroValueBullets-0 */ "עיצוב עדין והרמוני של תווי הפנים",
  /* @edit:heroValueBullets-1 */ "תוצאות מאוזנות ואסתטיות",
  /* @edit:heroValueBullets-2 */ "מרקם חלק והומוגני להזרקה נוחה ומדוייקת",
] as const;
