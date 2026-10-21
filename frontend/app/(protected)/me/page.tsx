"use client";

import { useAuth } from "@/app/AuthContext";
import api from "@/lib/api";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

type Thought = {
  id: number;
  user_id: string;
  thought: string;
  created_at: string;
};

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
      console.log(json.thoughts);
    }

    loadMyThoughts();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <p className="flex gap-2 items-center">
        <User /> {user?.username}
      </p>
      <div className="flex flex-col gap-6">
        <p>Posts</p>
        <div className="flex flex-col gap-6">
          {myThoughts !== null &&
            myThoughts?.map((t: Thought) => {
              const [date, fullTime] = t.created_at.split("T");
              const time = fullTime.split(".")[0];

              return (
                <div key={t.id} className="outline w-max p-6 rounded-lg">
                  <p>{`${date} ${time}`}</p>
                  <p>{t.thought}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
