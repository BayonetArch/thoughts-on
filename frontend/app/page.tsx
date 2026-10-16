// import Image from "next/image";

import { Suspense } from "react";
import AddComment from "./components/AddComment";
import CommentList from "./components/CommentList";

// const postURL = "/api/comment";

export default async function Home() {
  return (
    <div className="text-center p-4 bold md:p-14 md:text-2xl text-lg">
      <Suspense fallback={<p>Loading Thoughts...</p>}>
        <CommentList />
      </Suspense>
      <AddComment />
    </div>
  );
}
