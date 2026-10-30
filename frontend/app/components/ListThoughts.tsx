"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ThoughtCard from "./ThoughtCard";
import StateMessage from "./ui/StateMessage";

type Thought = {
  id: string;
  user_id: string;
  thought: string;
};

type ThoughtsResponse = {
  thoughts?: Thought[];
  error?: string;
};

export default function ListThoughts() {
  const [thoughts, setThoughts] = useState<Thought[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadThoughts() {
      try {
        const res = await api("/api/thoughts", { cache: "no-store" });
        const data: ThoughtsResponse = await res.json();
        if (data.error) {
          setErrMsg(data.error);
          return;
        }
        setThoughts(data.thoughts ?? []);
      } catch (error) {
        console.error("could not load thoughts", error);
        setErrMsg("Could not reach the server.");
      } finally {
        setLoading(false);
      }
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
