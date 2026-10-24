import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({
  label,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-ink-mute">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-mint ${className}`}
        {...props}
      />
    </div>
  );
}
