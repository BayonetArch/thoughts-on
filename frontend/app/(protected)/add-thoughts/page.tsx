"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddThought() {
  const [name, setName] = useState<string>("");
  const [thought, setThought] = useState<string>("");

  const router = useRouter();

  async function submit() {
    if (name === "" || thought === "") return;
    const base =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

    let res;
    try {
      res = await fetch(`${base}/api/thoughts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, thought: thought }),
      });
    } catch (e) {
      console.log("could not post", e);
    }
    if (!res) return;
    const data = await res.json();
    if (data.error) {
      console.log("error from server", data.error);
      return;
    }

    setName("");
    setThought("");
    if (data.ok) router.refresh();
    console.log(data);
  }

  return (
    <div className="mt-14 flex flex-col items-center gap-2">
      <p className="font-bold  text-3xl">thoughts ?...</p>
      <form
        className="flex flex-col items-center gap-4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="text"
          placeholder="your thoughts.."
          className="border border-gray-300 p-2 rounded-md"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />
        <button className="bg-sky-500/40 text-white p-2 rounded-md">
          Add your thoughts
        </button>
      </form>
    </div>
  );
}
