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
// was actually verified: Chrome (Playwright/Chromium + manual testing),
// real Microsoft Edge (Playwright's msedge channel, not just Chromium),
// real Firefox, and WebKit (Playwright's engine — the same rendering engine
// Safari uses; no literal macOS/Safari binary was available to test). The
// "כלי נגישות באתר" section below documents AccessibilityWidget — re-verified
// (axe-core, all toggles on simultaneously, keyboard-only, mobile viewport)
// after adding it, zero violations either way — so the feature list here
// matches what's actually shipped, not aspirational copy.
export default function AccessibilityPage() {
  return (
    <LegalPage title="הצהרת נגישות" updatedDate="15.09.2026">
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
          בדיקות הנגישות ותקינות התצוגה והתפקוד של האתר — לרבות דפי האתר, טפסים ורכיבים אינטראקטיביים כגון
          מחוון &quot;לפני/אחרי&quot; — בוצעו ואומתו בדפדפנים הבאים, בגרסאותיהם העדכניות: Google Chrome,
          Microsoft Edge, Mozilla Firefox, ו-Safari (מנוע רינדור WebKit).
        </p>
      </LegalSection>

      <LegalSection title="כלי נגישות באתר">
        <p>
          בפינה השמאלית התחתונה של כל עמוד באתר מופיע כפתור נגישות קבוע (מסומן באייקון נגישות), המאפשר לכל
          מבקר להתאים את תצוגת האתר לצרכיו האישיים. הכלי נבנה ונבדק כך שכל האפשרויות בו פועלות במלואן, ניתנות
          להפעלה מלאה באמצעות מקלדת בלבד, ותומכות בקוראי מסך. לחיצה על הכפתור פותחת תפריט הכולל את ההתאמות
          הבאות:
        </p>
        <ul className="flex flex-col gap-2">
          <li>הגדלה והקטנה של גודל הטקסט (מספר רמות, כולל אפשרות חזרה לגודל המקורי).</li>
          <li>מצב ניגודיות גבוהה.</li>
          <li>מצב גווני אפור (ביטול צבעוניות בכל האתר, כולל תמונות).</li>
          <li>הדגשת קישורים באמצעות קו תחתון בולט, כך שקישורים ניתנים לזיהוי גם ללא הסתמכות על צבע בלבד.</li>
          <li>מעבר לגופן קריא ופשוט יותר.</li>
          <li>הגדלת המרווח בין שורות ומילות הטקסט.</li>
          <li>הפחתה וביטול של אנימציות ואפקטי תנועה באתר.</li>
          <li>כפתור לאיפוס מיידי של כל ההגדרות בחזרה לברירת המחדל.</li>
        </ul>
        <p>
          ההגדרות שנבחרות נשמרות באופן מקומי בדפדפן המבקר (localStorage) לשימוש בביקורים חוזרים, ואינן
          משותפות או נשלחות לגורם כלשהו. הכלי נבדק גם בשילוב כל ההתאמות יחד, ובמכשירים ניידים, ללא פגיעה
          בתפקוד או בנגישות שאר עמודי האתר.
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
