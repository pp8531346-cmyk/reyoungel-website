import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Assistant } from "next/font/google";
import { AccessibilityWidget } from "@/components/accessibility/AccessibilityWidget";
import { DevEditorGate } from "@/dev-editor/DevEditorGate";
import "./globals.css";

// Applies any persisted accessibility-toolbar settings to <html> BEFORE
// React hydrates, so a returning visitor never sees a flash of default
// styling that then snaps to their saved preferences. Mirrors
// AccessibilityWidget's own applySettingsToDocument() — kept in sync by
// hand since this has to run as a plain inline script, before any bundle
// loads. Never touches JSX-rendered className, so there's no hydration
// mismatch: React never reconciles these classes.
const A11Y_INIT_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem("reyoungel-a11y-settings")||"{}");var c=document.documentElement.classList;var scaleIndex=typeof s.scaleIndex==="number"?s.scaleIndex:1;c.add("a11y-scale-"+scaleIndex);if(s.contrast)c.add("a11y-contrast");if(s.grayscale)c.add("a11y-grayscale");if(s.highlightLinks)c.add("a11y-highlight-links");if(s.readableFont)c.add("a11y-readable-font");if(s.textSpacing)c.add("a11y-text-spacing");if(s.reduceMotion)c.add("a11y-reduce-motion");}catch(e){}})();`;

const frankRuhlLibre = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  // 900 remains the default for every headline/numeral (unchanged brand rule).
  // 400 is loaded for exactly one spot: the Technology page's mid-page quote
  // banner, which gets a deliberately quieter editorial weight instead of
  // repeating the black-weight default (see globals.css + technology/page.tsx).
  weight: ["400", "900"],
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reyoungel.example.com"),
  title: {
    default: "Reyoungel - להיראות כמו עצמך, רק במיטבך",
    template: "%s · Reyoungel",
  },
  description:
    "Reyoungel מבית Bioha Laboratories - חומצה היאלורונית מצולבת מבוססת טכנולוגיית SAX-HA הפטנטית, לאנשי מקצוע רפואיים ולקליניקות. מאושר ע”י ה-CE האירופאי ומשרד הבריאות בישראל.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${frankRuhlLibre.variable} ${assistant.variable}`}
    >
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: A11Y_INIT_SCRIPT }} />
        <AccessibilityWidget>
          <DevEditorGate>{children}</DevEditorGate>
        </AccessibilityWidget>
      </body>
    </html>
  );
}
