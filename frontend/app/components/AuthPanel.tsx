import type { ReactNode } from "react";

type AuthPanelProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function AuthPanel({
  title,
  description,
  children,
}: AuthPanelProps) {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <header className="flex flex-col gap-3">
        <span aria-hidden className="block h-px w-12 bg-mint" />
        <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
        <p className="text-sm text-ink-dim">{description}</p>
      </header>
      <div className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-6">
        {children}
      </div>
    </div>
  );
}
