import { User } from "lucide-react";
import DeleteComment from "./DeleteComment";

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
    <div className="flex flex-col gap-4  rounded-xl p-6  relative bg-mauve-900 justify-center ">
      <p className="flex gap-2 bold text-2xl items-center text-gray-400 ">
        <User className="stroke-green-200" /> {name}
      </p>
      <p className="flex gap-2 bold text-xl text-gray-800">
        {">>"}{" "}
        <span className="italic text-2xl text-[white]/65">{comment}</span>
      </p>
      <DeleteComment id={id} />
    </div>
  );
}

export default async function CommentList() {
  const res = await fetchData("http://localhost:5000/api/comment", {
    cache: "no-store",
  });
  const commentJSON: commentObject[] | undefined = res?.json;

  return (
    <div className="flex flex-col gap-6">
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
