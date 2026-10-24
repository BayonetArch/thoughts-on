"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThoughtCard from "./ThoughtCard";
import StateMessage from "./ui/StateMessage";

type Thought = {
  id: string;
  user_id: string;
  thought: string;
};

export async function fetchData(url: string, opts?: RequestInit) {
  let res;
  try {
    res = await fetch(url, { method: "GET", ...opts });
  } catch (e) {
    if ((e as { digest?: string })?.digest !== "HANGING_PROMISE_REJECTION") {
      console.error("could not fetch", e);
    }
    return null;
  }

  if (!res) return null;
  return res.json();
}

export default function ListThoughts() {
  const [thoughts, setThoughts] = useState<Thought[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadThoughts() {
      const base =
        process.env.NEXT_PUBLIC_API_URL ?? "https://thoughts-on.vercel.app";
      const res = await fetchData(`${base}/api/thoughts`, {
        cache: "no-store",
      });
      setLoading(false);
      if (res?.error) {
        setErrMsg(res.error);
        return;
      }
      setThoughts(res?.thoughts);
    }

    loadThoughts();
  }, []);

  if (loading) {
    return <StateMessage>Loading thoughts.</StateMessage>;
  }

  if (thoughts === null) {
    return (
      <StateMessage tone="error">
        Could not load thoughts. {errorMsg}
      </StateMessage>
    );
  }

  if (thoughts.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface p-6">
        <p className="text-ink-dim">No thoughts yet.</p>
        <Link
          className="text-sm text-mint underline-offset-4 hover:underline"
          href="/add-thoughts"
        >
          Write the first one
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought.id}
          author={thought.user_id}
          thought={thought.thought}
        />
      ))}
    </div>
  );
}
