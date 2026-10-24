import { User } from "lucide-react";

type ThoughtCardProps = {
  author: string;
  thought: string;
  timestamp?: string;
};

export default function ThoughtCard({
  author,
  thought,
  timestamp,
}: ThoughtCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 md:p-6">
      <header className="flex min-w-0 items-center gap-2">
        <User aria-hidden className="size-4 shrink-0 text-blue" />
        <span className="min-w-0 truncate font-mono text-xs text-ink-dim">
          {author}
        </span>
        {timestamp !== undefined ? (
          <time className="ml-auto shrink-0 font-mono text-xs text-ink-mute">
            {timestamp}
          </time>
        ) : null}
      </header>
      <p className="flex min-w-0 gap-3 text-[15px] leading-relaxed text-ink md:text-base">
        <span aria-hidden className="shrink-0 select-none font-mono text-green">
          {">>"}
        </span>
        <span className="min-w-0 wrap-break-word">{thought}</span>
      </p>
    </article>
  );
}
