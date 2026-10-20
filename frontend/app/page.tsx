// import Image from "next/image";

import { Suspense } from "react";
import ThoughtList from "./components/ThoughtsList";

export default async function Home() {
  return (
    <div className="text-center p-4 bold md:p-14 md:text-2xl text-lg flex flex-col gap-4">
      <Suspense fallback={<p>Loading Thoughts...</p>}>
        <ThoughtList />
      </Suspense>
    </div>
  );
}
