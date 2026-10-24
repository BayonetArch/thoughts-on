"use client";

import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/app/components/ui/Button";

type Status = {
  message: string;
  ok: boolean;
};

export default function AddThought() {
  const [thought, setThought] = useState("");
  const [status, setStatus] = useState<Status | null>(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading || user === null) {
    return <p className="text-sm text-ink-mute">Checking your session...</p>;
  }

  async function submit() {
    if (thought === "") {
      setStatus({ message: "Write something first.", ok: false });
      return;
    }

    const base =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

    let res;
    try {
      res = await fetch(`${base}/api/thoughts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thought: thought }),
      });
    } catch (e) {
      console.log("could not post", e);
      setStatus({ message: "Could not reach the server.", ok: false });
      return;
    }

    if (!res) return;

    const data = await res.json();
    if (data.error) {
      setStatus({ message: data.error, ok: false });
      return;
    }

    setThought("");
    setStatus({ message: "Posted.", ok: true });
    if (data.ok) router.refresh();
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <header className="flex flex-col gap-3">
        <span aria-hidden className="block h-px w-12 bg-orange" />
        <h1 className="text-2xl font-medium tracking-tight">Add a thought</h1>
        <p className="text-sm text-ink-dim">
          Keep it short. It goes straight to the feed.
        </p>
      </header>
      <form
        className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label htmlFor="thought" className="text-sm text-ink-mute">
          Your thought
        </label>
        <textarea
          id="thought"
          rows={4}
          placeholder="What is on your mind?"
          className="resize-none rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-mint"
          value={thought}
          onChange={(event) => setThought(event.target.value)}
        />
        <div className="flex items-center justify-between gap-4">
          <p
            role="status"
            className={`text-sm ${
              status === null
                ? "text-ink-mute"
                : status.ok
                  ? "text-green"
                  : "text-orange"
            }`}
          >
            {status?.message}
          </p>
          <Button type="submit">Post thought</Button>
        </div>
      </form>
    </div>
  );
}
