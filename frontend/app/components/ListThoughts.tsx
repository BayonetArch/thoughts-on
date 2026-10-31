"use client";
import api from "@/lib/api";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

type thoughtObject = {
  id: string;
  user_id: string;
  thought: string;
};

function Thoughts({
  name: userName,
  thought,
}: {
  name: string;
  thought: string;
}) {
  return (
    <div className="flex flex-col gap-4  rounded-xl p-6  relative bg-mauve-900 justify-center">
      <p className="flex gap-2 bold text-xl md:text-2xl items-center text-gray-400 min-w-0">
        <User className="shrink-0 stroke-green-200 " />
        <span className="min-w-0 wrap-break-word">{userName}</span>
      </p>
      <p className="flex gap-2 bold text-xl text-gray-800 min-w-0 ">
        <span className="shrink-0">{">>"}</span>{" "}
        <span className="italic text-lg text-[white]/65 min-w-0 wrap-break-word">
          {thought}
        </span>
      </p>
    </div>
  );
}

export default function ListThoughts() {
  const [thoughts, setThoughts] = useState<thoughtObject[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrMsg] = useState<string | null>(null);
  useEffect(() => {
    async function loadThoughts() {
      const res = await api("/api/thoughts", {
        cache: "no-store",
      });

      if (!res.ok) {
        setThoughts([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.error) {
        setErrMsg(data.error);
        setLoading(false);
        return;
      }

      setThoughts(data.thoughts);
      setLoading(false);
    }
    loadThoughts();
  }, []);

  if (!loading && thoughts === null) {
    return <p>Internal server error while getting thoughts: {errorMsg}</p>;
  }

  if (loading || thoughts === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {!thoughts || thoughts.length === 0 ? (
        <div>thoughts not found.</div>
      ) : (
        thoughts.map((obj) => (
          <Thoughts key={obj.id} name={obj.user_id} thought={obj.thought} />
        ))
      )}
    </div>
  );
}
