import { User } from "lucide-react";

type commentObject = {
  id: string;
  name: string;
  comment: string;
};

async function fetchData(url: string, opts?: RequestInit) {
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

function Comments({
  id,
  name,
  comment,
}: {
  id: string;
  name: string;
  comment: string;
}) {
  return (
    <div className="flex flex-col gap-4  rounded-xl p-6  relative bg-mauve-900 justify-center">
      <p className="flex gap-2 bold text-xl md:text-2xl items-center text-gray-400 min-w-0">
        <User className="shrink-0 stroke-green-200" />
        <span className="min-w-0 wrap-break-word">{name}</span>
      </p>
      <p className="flex gap-2 bold text-xl text-gray-800 min-w-0">
        <span className="shrink-0">{">>"}</span>{" "}
        <span className="italic text-lg text-[white]/65 min-w-0 wrap-break-word">
          {comment}
        </span>
      </p>
    </div>
  );
}

export default async function CommentList() {
  const res = await fetchData("/api/comments", {
    cache: "no-store",
  });
  const commentJSON: commentObject[] | undefined = res?.data;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {!commentJSON || commentJSON.length === 0 ? (
        <div>Comments not found.</div>
      ) : (
        commentJSON.map((obj) => (
          <Comments
            key={obj.id}
            id={obj.id}
            name={obj.name}
            comment={obj.comment}
          />
        ))
      )}
    </div>
  );
}
