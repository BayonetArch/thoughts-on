"use client";

import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && user === null) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading || user === null) {
    return <p className="text-sm text-ink-mute">Checking your session...</p>;
  }

  return <div>{children}</div>;
}
