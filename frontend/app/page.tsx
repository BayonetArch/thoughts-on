// import Image from "next/image";

import { Suspense } from "react";
import AddThought from "./components/AddThougts";
import ThoughtList from "./components/ThoughtsList";
import Link from "next/link";

// const postURL = "/api/comment";
function RouteRegister() {
  return (
    <div>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/register"
      >
        Register
      </Link>
    </div>
  );
}

function RouteLogin() {
  return (
    <div>
      <Link
        className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/login"
      >
        Login
      </Link>
    </div>
  );
}
export default async function Home() {
  return (
    <div className="text-center p-4 bold md:p-14 md:text-2xl text-lg flex flex-col gap-4">
      <Suspense fallback={<p>Loading Thoughts...</p>}>
        <ThoughtList />
      </Suspense>
      <AddThought />
      <RouteRegister />
      <RouteLogin />
    </div>
  );
}
