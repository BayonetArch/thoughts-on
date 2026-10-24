"use client";

import { useAuth } from "@/app/AuthContext";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import ThoughtCard from "@/app/components/ThoughtCard";
import StateMessage from "@/app/components/ui/StateMessage";

type Thought = {
  id: number;
  user_id: string;
  thought: string;
  created_at: string;
};

function formatTimestamp(value: string) {
  const [date, fullTime = ""] = value.split("T");
  const time = fullTime.split(".")[0];
  return time === "" ? date : `${date} ${time}`;
}

export default function Me() {
  const { user } = useAuth();
  const [myThoughts, setMyThoughts] = useState<Thought[] | null>(null);

  useEffect(() => {
    async function loadMyThoughts() {
      const res = await api(`/api/thoughts/me`, {
        credentials: "include",
      });
      const json = await res.json();
      setMyThoughts(json.thoughts);
    }

    loadMyThoughts();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <span aria-hidden className="block h-px w-12 bg-blue" />
        <p className="text-sm text-ink-mute">your profile</p>
        <h1 className="text-3xl font-medium tracking-tight">
          {user?.username}
        </h1>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-sm text-ink-mute">Posts</h2>
        {myThoughts === null ? (
          <StateMessage>Loading posts.</StateMessage>
        ) : myThoughts.length === 0 ? (
          <StateMessage>No posts yet.</StateMessage>
        ) : (
          myThoughts.map((thought) => (
            <ThoughtCard
              key={thought.id}
              author={user?.username ?? thought.user_id}
              thought={thought.thought}
              timestamp={formatTimestamp(thought.created_at)}
            />
          ))
        )}
      </section>
    </div>
  );
}
