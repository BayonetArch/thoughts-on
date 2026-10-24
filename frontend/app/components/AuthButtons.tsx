"use client";

import Link from "next/link";
import { useAuth } from "../AuthContext";
import { User } from "lucide-react";
import { buttonClassName } from "./ui/Button";

function RouteRegister() {
  return (
    <Link className={buttonClassName("secondary")} href="/register">
      Register
    </Link>
  );
}

function RouteLogin() {
  return (
    <Link className={buttonClassName("ghost")} href="/login">
      Sign in
    </Link>
  );
}

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      type="button"
      className={buttonClassName("ghost")}
      onClick={logout}
    >
      Sign out
    </button>
  );
}

export default function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user === null) {
    return (
      <div className="flex items-center gap-2">
        <RouteLogin />
        <RouteRegister />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-ink-dim transition-colors hover:text-mint"
        href="/me"
      >
        <User aria-hidden className="size-4" />
        <span className="max-w-32 truncate">{user.username}</span>
      </Link>
      <LogoutButton />
    </div>
  );
}
