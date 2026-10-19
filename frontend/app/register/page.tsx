"use client";

import { useState } from "react";
import { fetchData } from "../components/ThoughtsList";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMessage] = useState("");

  async function registerUser() {
    if (password === "" || username === "") {
      setMessage("password or username empty");
      return;
    }

    const res = await fetchData(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      },
    );
    if (!res.ok) {
      console.error(res.error);
      setMessage(`error: ${res.error}`);
      return;
    }
    setMessage("Registred!!");
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <p> Message: {msg}</p>
      <input
        type="text"
        placeholder="Username"
        className="border border-gray-300 rounded-md p-2"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded-md p-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => registerUser()}
      >
        Register
      </button>
    </div>
  );
}
