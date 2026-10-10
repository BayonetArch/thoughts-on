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
    <div className="flex flex-col gap-4  rounded-xl p-4 outline">
      <p className="bold text-2xl">Name: {name}</p>
      <p className="bold text-xl">Comment: {comment}</p>
    </div>
  );
}

export default async function CommentList() {
  const comments = await fetchData("http://localhost:5000/api/comment", {
    cache: "no-store",
  });
  const commentJSON: commentObject[] = await comments.json;

  console.log(commentJSON);

  return (
    <div className="flex flex-col gap-6">
      {commentJSON.length === 0 || commentJSON === undefined ? (
        <div>Comments not found.</div>
      ) : (
        commentJSON.map((obj) => (
          <Comments key={obj.id} name={obj.name} comment={obj.comment} />
        ))
      )}
    </div>
  );
}
