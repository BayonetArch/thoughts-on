import { User } from "lucide-react";

type thoughtObject = {
  id: string;
  name: string;
  thought: string;
};

export async function fetchData(url: string, opts?: RequestInit) {
  let res;
  try {
    res = await fetch(url, { method: "GET", ...opts });
  } catch (e) {
    // (digest: HANGING_PROMISE_REJECTION). That is expected, not an error during production.
    if ((e as { digest?: string })?.digest !== "HANGING_PROMISE_REJECTION") {
      console.error("could not fetch", e);
    }
    return null;
  }

  if (!res) return null;
  return res.json();
}

function Thoughts({
  id,
  name: userName,
  thought,
}: {
  id: string;
  name: string;
  thought: string;
}) {
  return (
    <div className="flex flex-col gap-4  rounded-xl p-6  relative bg-mauve-900 justify-center">
      <p className="flex gap-2 bold text-xl md:text-2xl items-center text-gray-400 min-w-0">
        <User className="shrink-0 stroke-green-200 " />
        <span className="min-w-0 wrap-break-word">{userName}</span>
      </p>
      <p className="flex gap-2 bold text-xl text-gray-800 min-w-0 ">
        <span className="shrink-0">{">>"}</span>{" "}
        <span className="italic text-lg text-[white]/65 min-w-0 wrap-break-word">
          {thought}
        </span>
      </p>
    </div>
  );
}

export default async function ThoughtList() {
  const base =
    process.env.NEXT_PUBLIC_API_URL ?? "https://thoughts-on.vercel.app";
  const res = await fetchData(`${base}/api/thoughts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Internal server error while getting thoughts: {res.error}</p>;
  }

  const thoughtJSON: thoughtObject[] | undefined = res?.data;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {!thoughtJSON || thoughtJSON.length === 0 ? (
        <div>thoughts not found.</div>
      ) : (
        thoughtJSON.map((obj) => (
          <Thoughts
            key={obj.id}
            id={obj.id}
            name={obj.name}
            thought={obj.thought}
          />
        ))
      )}
    </div>
  );
}
