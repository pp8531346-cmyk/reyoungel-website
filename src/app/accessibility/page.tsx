import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
};

// The two sections below reflect the real axe-core + Playwright audit run
// against every page (see the previous session's summary for the full
// methodology and findings) — not generic boilerplate.
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
        </ul>
      </LegalSection>

      <LegalSection title="מגבלות ידועות">
        <p>
          חלק מטקסט הגוף באתר (כגון תיאורי מוצרים ותוויות משניות), הצבוע בגוון המותג &quot;stone&quot;, מציג
          יחס ניגודיות של כ-3.28–3.65:1 מול הרקע שסביבו בגדלי פונט קטנים — מתחת ליחס המינימלי הנדרש לפי תקן
          AA (4.5:1). התופעה קיימת במספר עמודים באתר, בטקסט שיווקי קיים מראש. תיקון מלא של הסוגיה מצריך שינוי
          של גוון מותג משותף (design token) המשמש בקבצים רבים באתר, ולכן הוגדר כמחוץ לתחום סבב עמידה זה, המוקד
          שלו בהיבטים משפטיים/רגולטוריים. הנושא ידוע לנו ומתועד לטיפול בסבב עיצוב עתידי.
        </p>
      </LegalSection>

      <LegalSection title="דרכי פנייה נגישות">
        <p>טלפון: 050-232-8000</p>
        <p>דוא&quot;ל: b8114949@gmail.com</p>
        <p>במידה ונתקלתם בקושי בנגישות האתר, נשמח שתדווחו לנו בפרטים לעיל ונפעל לתיקון בהקדם.</p>
      </LegalSection>

      <LegalSection title="רכז נגישות">
        <p>פז בר שלום — b8114949@gmail.com — 050-232-8000</p>
      </LegalSection>
    </LegalPage>
  );
}
