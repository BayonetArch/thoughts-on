"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

export type AuthResult = {
  message: string;
  ok: boolean;
};

type AuthFormProps = {
  submitLabel: string;
  passwordAutoComplete?: string;
  onSubmit: (username: string, password: string) => Promise<AuthResult>;
};

export default function AuthForm({
  submitLabel,
  passwordAutoComplete = "current-password",
  onSubmit,
}: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<AuthResult | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username === "" || password === "") {
      setResult({ message: "Enter a username and password.", ok: false });
      return;
    }

    setPending(true);
    setResult(await onSubmit(username, password));
    setPending(false);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <Input
        id="username"
        label="Username"
        type="text"
        autoComplete="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete={passwordAutoComplete}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {result !== null ? (
        <p
          role="status"
          className={`text-sm ${result.ok ? "text-green" : "text-orange"}`}
        >
          {result.message}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Working..." : submitLabel}
      </Button>
    </form>
  );
}
