"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../AuthContext";
import { getSafeRedirectPath } from "@/lib/redirect";
import AuthForm from "../components/AuthForm";
import AuthPanel from "../components/AuthPanel";
import { buttonClassName } from "../components/ui/Button";
import type { AuthResult } from "../components/AuthForm";

function LoginForm() {
  const { user, loading, login } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  async function handleLogin(
    username: string,
    password: string,
  ): Promise<AuthResult> {
    try {
      await login(username, password);
      const safeRedirectPath = getSafeRedirectPath(searchParams.get("next"));
      router.push(safeRedirectPath);
      return { message: "Signed in.", ok: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      return { message: errorMessage, ok: false };
    }
  }

  if (loading) {
    return <p className="text-sm text-ink-mute">Checking your session...</p>;
  }

  if (user !== null) {
    return (
      <AuthPanel
        title="Already signed in"
        description={`You are signed in as ${user.username}.`}
      >
        <Link className={buttonClassName("secondary")} href="/">
          Go to the feed
        </Link>
      </AuthPanel>
    );
  }

  return (
    <AuthPanel title="Sign in" description="Use your username and password.">
      <AuthForm submitLabel="Sign in" onSubmit={handleLogin} />
      <p className="text-sm text-ink-mute">
        Need an account?{" "}
        <Link
          className="text-mint underline-offset-4 hover:underline"
          href="/register"
        >
          Register
        </Link>
      </p>
    </AuthPanel>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<p className="text-sm text-ink-mute">Loading...</p>}>
      <LoginForm />
    </Suspense>
  );
}
