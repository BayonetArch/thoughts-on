"use client";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useSearchParams, useRouter } from "next/navigation";
import { getSafeRedirectPath } from "@/lib/redirect";

export default function Login() {
  const { user, loading, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  if (!loading && user !== null) {
    return <div>Already logged in as {user.username}</div>;
  }

  async function loginUser() {
    if (password === "" || username === "") {
      setMessage("password or username empty");
      return;
    }

    try {
      await login(username, password);
      setMessage("Logged In");

      // make sure we are not immune against the url redirect attacks to malicious urls
      const safeRedirectPath = getSafeRedirectPath(searchParams.get("next"));
      router.push(safeRedirectPath);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      console.error(errorMessage);

      setMessage(`error: ${errorMessage}`);
    }
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
        onClick={() => loginUser()}
      >
        Login
      </button>
    </div>
  );
}
