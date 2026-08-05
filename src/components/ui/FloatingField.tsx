import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  label: string;
  error?: string;
};

type InputFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: "input" };

type TextareaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

export type FloatingFieldProps = InputFieldProps | TextareaFieldProps;

export function FloatingField(props: FloatingFieldProps) {
  const autoId = useId();
  const { label, error, className, id = autoId, ...rest } = props;
  const errorId = `${id}-error`;

  const fieldClassName = cn(
    "peer w-full rounded-xl border bg-cream px-4 pb-2.5 pt-6 text-base text-ink placeholder-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-wine/15",
    error ? "border-wine/60 focus:border-wine" : "border-hairline focus:border-wine",
    className,
  );

  const labelClassName = cn(
    "pointer-events-none absolute start-4 top-2 text-xs font-bold tracking-wide text-wine transition-all",
    "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-stone",
    "peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:font-bold peer-focus:tracking-wide peer-focus:text-wine",
  );

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        {props.as === "textarea" ? (
          <textarea
            id={id}
            placeholder=" "
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn(fieldClassName, "min-h-32 resize-y pt-6")}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            placeholder=" "
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={fieldClassName}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-xs font-bold text-wine">
          {error}
        </p>
      )}
    </div>
  );
}
