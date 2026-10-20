"use client";

import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && user === null) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || user === null) {
    return <p>Loading...</p>;
  }

  return <div>{children}</div>;
}
