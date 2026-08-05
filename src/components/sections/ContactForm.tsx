"use client";

import { useState, type FormEvent } from "react";
import { FloatingField } from "@/components/ui/FloatingField";

type FormValues = {
  name: string;
  clinicName: string;
  phone: string;
  email: string;
  message: string;
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
  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: FormValues = {
      name: String(data.get("name") ?? ""),
      clinicName: String(data.get("clinicName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);

    // Submission endpoint is intentionally not wired up yet — this only
    // confirms the form passes client-side validation.
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      return;
    }

    const fieldOrder: (keyof FormValues)[] = ["name", "clinicName", "phone", "email", "message"];
    const firstInvalidField = fieldOrder.find((key) => nextErrors[key]);
    if (firstInvalidField) {
      const field = event.currentTarget.elements.namedItem(firstInvalidField);
      if (field instanceof HTMLElement) field.focus();
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-tr-[3rem] rounded-bl-[3rem] border border-hairline bg-cream px-8 py-16 text-center"
      >
        <p className="font-display text-2xl font-black text-ink">תודה על פנייתכם</p>
        <p className="max-w-sm text-sm leading-relaxed text-stone">
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
      <FloatingField name="name" label="שם מלא" autoComplete="name" error={errors.name} />
      <FloatingField
        name="clinicName"
        label="שם הקליניקה / המרפאה"
        autoComplete="organization"
        error={errors.clinicName}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FloatingField
          name="phone"
          label="טלפון"
          type="tel"
          inputMode="tel"
          dir="ltr"
          autoComplete="tel"
          error={errors.phone}
        />
        <FloatingField
          name="email"
          label="אימייל"
          type="email"
          inputMode="email"
          spellCheck={false}
          dir="ltr"
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <FloatingField as="textarea" name="message" label="הודעה" rows={5} error={errors.message} />

      <button
        type="submit"
        className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-wine bg-wine px-8 py-3 text-sm font-bold text-cream transition-colors duration-200 hover:border-wine-dark hover:bg-wine-dark active:scale-[0.97]"
      >
        שליחת הפנייה
      </button>
    </form>
  );
}
