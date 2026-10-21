const DEFAULT_PATH = "/";

export function getSafeRedirectPath(next: string | null) {
  if (next === null) return DEFAULT_PATH;

  const startsWithSlash = next.startsWith("/");
  const looksExternal = next.startsWith("//") || next.startsWith("/\\");

  if (!startsWithSlash || looksExternal) return DEFAULT_PATH;

  return next;
}
