export default async function api(path: string, options: RequestInit = {}) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}${path}`, options);
}
