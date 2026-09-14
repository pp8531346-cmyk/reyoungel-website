import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "מדיניות עוגיות",
};

export default function CookiesPage() {
  return (
    <LegalPage title="מדיניות עוגיות" updatedDate="14.09.2026">
      <p>
        האתר reyoungel.co.il, המופעל על ידי גובש בע&quot;מ, עושה שימוש בעוגיות (קבצי טקסט קטנים הנשמרים
        בדפדפן) לצורך תפעולו הבסיסי.
      </p>
      <p>
        <strong>
          נכון למועד עדכון זה, האתר אינו עושה שימוש בעוגיות ניתוח נתונים (Analytics) או עוגיות שיווק/פרסום,
          ומשתמש אך ורק בעוגיות חיוניות הנדרשות לתפעולו הבסיסי.
        </strong>{" "}
        במידה שיתווספו בעתיד כלים נוספים (כגון Google Analytics, פיקסלים פרסומיים, או כלי רימרקטינג), מדיניות
        זו תעודכן בהתאם, ותוצג לגולשים הודעת הסכמה מתאימה טרם הפעלת אותם כלים.
      </p>
      <p>
        ניתן לחסום עוגיות באמצעות הגדרות הדפדפן בכל עת. חסימת עוגיות חיוניות עשויה לפגוע בתפקוד תקין של האתר.
      </p>
      <p>לשאלות: b8114949@gmail.com.</p>
    </LegalPage>
  );
}
