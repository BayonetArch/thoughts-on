// import Image from "next/image";

import { Suspense } from "react";
import AddComment from "./components/AddComment";
import CommentList from "./components/CommentList";

const postURL = "/api/comment";

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
