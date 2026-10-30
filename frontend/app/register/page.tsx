"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import AuthForm from "../components/AuthForm";
import AuthPanel from "../components/AuthPanel";
import type { AuthResult } from "../components/AuthForm";

type RegisterResponse = {
  error?: string;
};

export default function Register() {
  const router = useRouter();

  async function handleRegister(
    username: string,
    password: string,
  ): Promise<AuthResult> {
    try {
      const res = await api("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data: RegisterResponse = await res.json();

      if (!res.ok) {
        return { message: data.error ?? "Could not register.", ok: false };
      }
    } catch (error) {
      console.log("could not register", error);
      return { message: "Something went wrong.", ok: false };
    }

    router.replace("/login");
    return { message: "Account created. Redirecting to sign in.", ok: true };
  }

  return (
    <AuthPanel
      title="Register"
      description="Pick a username and a password to get started."
    >
      <AuthForm
        submitLabel="Create account"
        passwordAutoComplete="new-password"
        onSubmit={handleRegister}
      />
      <p className="text-sm text-ink-mute">
        Already have an account?{" "}
        <Link
          className="text-mint underline-offset-4 hover:underline"
          href="/login"
        >
          Sign in
        </Link>
      </p>
    </AuthPanel>
  );
}
