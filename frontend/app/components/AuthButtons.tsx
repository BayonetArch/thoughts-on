"use client";
import Link from "next/link";
import { useAuth } from "../AuthContext";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

function RouteRegister() {
  return (
    <div>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
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

function LogoutButton() {
  const { logout } = useAuth();
  return (
    <div>
      <button
        className="bg-blue-700 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default function AuthButtons() {
  const { user, loading } = useAuth();
  const router = useRouter();
  if (loading) return null;

  if (!loading && user === null) {
    return (
      <div className="flex gap-4 items-center">
        <RouteRegister />
        <RouteLogin />
      </div>
    );
  }

  return (
    <div className=" text-white font-bold flex gap-4 items-center ">
      <div
        className="flex gap-2 items-center hover:cursor-pointer hover:bg-gray-700 p-2 rounded"
        onClick={() => {
          router.push("/me");
        }}
      >
        <User /> <span>{user?.username}</span>
      </div>
      <LogoutButton />
    </div>
  );
}
