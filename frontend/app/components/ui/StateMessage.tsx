import type { ReactNode } from "react";

type StateMessageProps = {
  tone?: "neutral" | "error";
  children: ReactNode;
};

export default function StateMessage({
  tone = "neutral",
  children,
}: StateMessageProps) {
  const colorClassName = tone === "error" ? "text-orange" : "text-ink-mute";

  return (
    <p
      role="status"
      className={`rounded-md border border-line bg-surface px-4 py-3 text-sm ${colorClassName}`}
    >
      {children}
    </p>
  );
}
