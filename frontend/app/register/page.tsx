"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchData } from "../components/ListThoughts";
import AuthForm from "../components/AuthForm";
import AuthPanel from "../components/AuthPanel";
import type { AuthResult } from "../components/AuthForm";

export default function Register() {
  const router = useRouter();

  async function handleRegister(
    username: string,
    password: string,
  ): Promise<AuthResult> {
    try {
      const res = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
        },
      );

      if (res === null) {
        return { message: "Could not reach the server.", ok: false };
      }

      if (!res.ok) {
        return { message: res.error ?? "Could not register.", ok: false };
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
