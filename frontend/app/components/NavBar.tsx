import Link from "next/link";
import AuthButtons from "./AuthButtons";

function RouteAddThoughts() {
  return (
    <div>
      <Link
        className="bg-green-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/add-thoughts"
      >
        Add Thoughts
      </Link>
    </div>
  );
}

export default function NavBar() {
  return (
    <nav className="p-4 flex gap-4 items-center justify-end">
      <Link className="text-lg" href="/">
        Home
      </Link>
      <AuthButtons />
      <RouteAddThoughts />
    </nav>
  );
}
