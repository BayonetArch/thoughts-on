import { Suspense } from "react";
import ListThoughts from "./components/ListThoughts";
import StateMessage from "./components/ui/StateMessage";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <span aria-hidden className="block h-px w-12 bg-mint" />
        <p className="text-sm text-ink-mute">the feed</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          thoughts on
        </h1>
        <p className="max-w-xl text-ink-dim">
          Short notes posted by people using the app.
        </p>
      </header>

      <Suspense fallback={<StateMessage>Loading thoughts.</StateMessage>}>
        <ListThoughts />
      </Suspense>
    </div>
  );
}
