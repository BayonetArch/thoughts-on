// import Image from "next/image";

import { Suspense } from "react";
import AddComment from "./components/AddComment";

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
    console.log("could not fetch", e);
  }

  if (!res) return;
  const jsonData = await res.json();
  console.log(jsonData);
  return jsonData;
}

function Comments({ name, comment }: { name: string; comment: string }) {
  return (
    <div>
      <p className="bold text-2xl">{name}</p>
      <p className="bold text-xl">{comment}</p>
    </div>
  );
}

async function CommentList() {
  const comments = await fetchData("http://localhost:5000/api/comment", {
    cache: "no-store",
  });
  const commentJSON: commentObject[] = await comments.json;

  console.log(commentJSON);

  return (
    <>
      {commentJSON.length === 0 || commentJSON === undefined ? (
        <div>Comments not found.</div>
      ) : (
        commentJSON.map((obj) => (
          <Comments key={obj.id} name={obj.name} comment={obj.comment} />
        ))
      )}
    </>
  );
}

export default async function Home() {
  return (
    <div className="text-center p-20 bold text-2xl">
      <Suspense fallback={<p>Loading Comments...</p>}>
        <CommentList />
      </Suspense>
      <AddComment />
    </div>
  );
}
