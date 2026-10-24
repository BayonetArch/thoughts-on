import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { buttonClassName } from "./ui/Button";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 md:px-8">
        <Link
          className="mr-auto font-mono text-sm tracking-tight text-mint"
          href="/"
        >
          thoughts on
        </Link>
        <Link
          className="text-sm text-ink-dim transition-colors hover:text-mint"
          href="/"
        >
          Home
        </Link>
        <AuthButtons />
        <Link className={buttonClassName("primary")} href="/add-thoughts">
          Add thoughts
        </Link>
      </nav>
    </header>
  );
}
