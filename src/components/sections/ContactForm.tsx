"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FloatingField } from "@/components/ui/FloatingField";

type FormValues = {
  name: string;
  clinicName: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "נא למלא שם מלא";
  if (!values.clinicName.trim()) errors.clinicName = "נא למלא שם קליניקה / מרפאה";
  if (!values.phone.trim()) errors.phone = "נא למלא מספר טלפון";
  if (!values.email.trim()) {
    errors.email = "נא למלא כתובת אימייל";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "כתובת אימייל אינה תקינה";
  }
  if (!values.message.trim()) errors.message = "נא לכתוב הודעה קצרה";
  if (!values.consent) errors.consent = "יש לאשר את מדיניות הפרטיות כדי לשלוח את הטופס";
  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: FormValues = {
      name: String(data.get("name") ?? ""),
      clinicName: String(data.get("clinicName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      // Checkboxes only appear in FormData when checked — absence means false,
      // not an empty string, so this can't reuse the `String(... ?? "")` pattern
      // the text fields above use.
      consent: data.get("consent") === "on",
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const fieldOrder: (keyof FormValues)[] = [
        "name",
        "clinicName",
        "phone",
        "email",
        "message",
        "consent",
      ];
      const firstInvalidField = fieldOrder.find((key) => nextErrors[key]);
      if (firstInvalidField) {
        const field = form.elements.namedItem(firstInvalidField);
        if (field instanceof HTMLElement) field.focus();
      }
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setSubmitError("שליחת הפנייה נכשלה. נסו שוב או צרו קשר בטלפון.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-tr-[3rem] rounded-bl-[3rem] border border-hairline bg-cream px-8 py-16 text-center"
      >
        <p
          className="font-display text-2xl font-black text-ink"
          data-edit-id="src/components/sections/ContactForm.tsx#success-headline"
        >
          {/* @edit:success-headline */}
          תודה על פנייתכם
        </p>
        <p
          className="max-w-sm text-sm leading-relaxed text-stone"
          data-edit-id="src/components/sections/ContactForm.tsx#success-body"
        >
          {/* @edit:success-body */}
          קיבלנו את פנייתכם, ונציג מטעם הצוות המקצועי שלנו יחזור אליכם בהקדם.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-tr-[3rem] rounded-bl-[3rem] border border-hairline bg-cream p-6 lg:p-10"
    >
      <FloatingField
        name="name"
        label={/* @edit:label-name */ "שם מלא"}
        labelEditId="src/components/sections/ContactForm.tsx#label-name"
        autoComplete="name"
        error={errors.name}
      />
      <FloatingField
        name="clinicName"
        label={/* @edit:label-clinic */ "שם הקליניקה / המרפאה"}
        labelEditId="src/components/sections/ContactForm.tsx#label-clinic"
        autoComplete="organization"
        error={errors.clinicName}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FloatingField
          name="phone"
          label={/* @edit:label-phone */ "טלפון"}
          labelEditId="src/components/sections/ContactForm.tsx#label-phone"
          type="tel"
          inputMode="tel"
          dir="ltr"
          autoComplete="tel"
          error={errors.phone}
        />
        <FloatingField
          name="email"
          label={/* @edit:label-email */ "אימייל"}
          labelEditId="src/components/sections/ContactForm.tsx#label-email"
          type="email"
          inputMode="email"
          spellCheck={false}
          dir="ltr"
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <FloatingField
        as="textarea"
        name="message"
        label={/* @edit:label-message */ "הודעה"}
        labelEditId="src/components/sections/ContactForm.tsx#label-message"
        rows={5}
        error={errors.message}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-wine"
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-ink">
            קראתי ואני מסכים/ה ל
            <Link href="/privacy" className="font-bold text-wine underline underline-offset-2 hover:text-wine-dark">
              מדיניות הפרטיות
            </Link>
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" role="alert" className="text-xs text-wine">
            {errors.consent}
          </p>
        )}
      </div>

      {submitError && (
        <p role="alert" className="text-sm text-wine">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-wine bg-wine px-8 py-3 text-sm font-bold text-cream transition-colors duration-200 hover:border-wine-dark hover:bg-wine-dark active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span data-edit-id="src/components/sections/ContactForm.tsx#submit-label">
          {/* @edit:submit-label */}
          {submitting ? "שולח..." : "שליחת הפנייה"}
        </span>
      </button>
    </form>
  );
}
