import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint disabled:cursor-not-allowed disabled:opacity-60";

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "bg-mint text-bg hover:bg-mint/80",
  secondary:
    "border border-line bg-surface text-ink hover:border-ink-mute hover:text-mint",
  ghost: "text-ink-dim hover:text-mint",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className = "",
) {
  return `${baseClassName} ${variantClassNames[variant]} ${className}`.trim();
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, className)}
      {...props}
    />
  );
}
