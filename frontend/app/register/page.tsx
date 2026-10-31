"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMessage] = useState("");
  const router = useRouter();

  async function registerUser() {
    if (password === "" || username === "") {
      setMessage("password or username empty");
      return;
    }

    const res = await api(`/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      setMessage(`Could not register user: ${data.error}`);
      return;
    }

    setMessage("Registred!!");
    router.replace("/login");
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
