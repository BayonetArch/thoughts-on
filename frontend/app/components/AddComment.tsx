"use client";

import { useState } from "react";

type commmentObject = {
  id: string;
  name: string;
  comment: string;
};

export default function AddComment() {
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  async function submit() {
    if (name === "" || comment === "") return;

    const id = crypto.randomUUID();

    let res;
    try {
      res = await fetch("http://localhost:5000/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, name: name, comment: comment }),
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

    console.log(data);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <form
        className="flex flex-col items-center gap-2 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 p-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Comment"
          className="border border-gray-300 p-2 rounded-md"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
