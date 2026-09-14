import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
};

// The sections below reflect the real axe-core + Playwright audit run against
// every page (see prior session summaries for methodology) — not generic
// boilerplate. Re-run after the --color-stone token fix (globals.css) came
// back with zero violations across all 10 pages, so the limitations section
// below no longer carries the contrast caveat. Browser line names only what
// was actually verified (Chrome, via Playwright/Chromium + manual testing) —
// no Edge/Safari/Firefox claim without real cross-browser testing.
export default function AccessibilityPage() {
  return (
    <LegalPage title="הצהרת נגישות" updatedDate="14.09.2026">
      <p>
        <strong>גובש בע&quot;מ</strong> רואה חשיבות רבה במתן שירות שוויוני ונגיש לכלל הגולשים, לרבות אנשים עם
        מוגבלות, ופועלת להנגשת אתר האינטרנט שלה בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח-1998,
        ולתקן הישראלי ת&quot;י 5568 (רמה AA).
      </p>

      <LegalSection title="מצב הנגישות באתר">
        <p>בוצעה בדיקת נגישות אוטומטית (axe-core) בכל עמודי האתר. להלן עיקרי הממצאים העומדים בדרישות:</p>
        <ul className="flex flex-col gap-2">
          <li>מבנה סמנטי תקין: לכל עמוד כותרת H1 יחידה, והיררכיית כותרות (H1 ← H2) ללא דילוג רמות.</li>
          <li>לכל התמונות באתר טקסט חלופי (alt) מתאים.</li>
          <li>כל שדות הטופס בעמוד &quot;צור קשר&quot; מקושרים לתוויות (label) כנדרש.</li>
          <li>לכל הכפתורים והקישורים שם נגיש, ואין רכיבים אינטראקטיביים המקוננים בניגוד לתפקידם הסמנטי.</li>
          <li>ניתן לנווט בכל רכיבי האתר האינטראקטיביים באמצעות מקלדת בלבד, עם מצב פוקוס נראה לעין.</li>
          <li>האתר פועל בפרוטוקול מאובטח (HTTPS).</li>
          <li>טקסט הגוף באתר עומד ביחס ניגודיות של לפחות 4.5:1 מול הרקע, בהתאם לדרישת AA.</li>
        </ul>
        <p>
          בדיקות הנגישות ותקינות התצוגה של האתר בוצעו ואומתו בדפדפן Google Chrome, בגרסתו העדכנית.
        </p>
      </LegalSection>

      <LegalSection title="מגבלות ידועות">
        <p>נכון למועד עדכון זה, לא ידועות לנו מגבלות נגישות מהותיות באתר.</p>
      </LegalSection>

      <LegalSection title="דרכי פנייה נגישות">
        <p>טלפון: 050-232-8000</p>
        <p>דוא&quot;ל: b8114949@gmail.com</p>
        <p>במידה ונתקלתם בקושי בנגישות האתר, נשמח שתדווחו לנו בפרטים לעיל ונפעל לתיקון בהקדם.</p>
        <p className="font-bold text-ink">נתקלת בבעיית נגישות? כך תוכלו לעזור לנו לטפל בה מהר יותר</p>
        <p>על מנת שנוכל לסייע לכם במהירות וביעילות המרבית, נשמח שתכלילו בפנייתכם את הפרטים הבאים, ככל שרלוונטי:</p>
        <ul className="flex flex-col gap-2">
          <li>תיאור הבעיה שבה נתקלתם.</li>
          <li>מה ניסיתם לבצע באתר בעת שנתקלתם בקושי.</li>
          <li>באיזה עמוד באתר אירעה הבעיה.</li>
          <li>סוג וגרסת הדפדפן שבו השתמשתם.</li>
          <li>סוג המכשיר שבו השתמשתם (מחשב, טאבלט, טלפון נייד).</li>
          <li>טכנולוגיה מסייעת שבה השתמשתם, אם בכלל (למשל קורא מסך).</li>
        </ul>
      </LegalSection>

      <LegalSection title="רכז נגישות">
        <p>פז בר שלום — b8114949@gmail.com — 050-232-8000</p>
      </LegalSection>
    </LegalPage>
  );
}
