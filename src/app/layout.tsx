import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Assistant } from "next/font/google";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { DevEditorGate } from "@/dev-editor/DevEditorGate";
import "./globals.css";

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
    default: "Reyoungel® — להיראות כמו עצמך, רק במיטבך",
    template: "%s · Reyoungel",
  },
  description:
    "Reyoungel® מבית Bioha Laboratories — חומצה היאלורונית מצולבת מבוססת טכנולוגיית SAX-HA® הפטנטית, לאנשי מקצוע רפואיים ולקליניקות. מאושר ע”י ה-CE האירופאי ומשרד הבריאות בישראל.",
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
        <SmoothScroll />
        <ScrollProgress />
        <DevEditorGate>{children}</DevEditorGate>
      </body>
    </html>
  );
}
