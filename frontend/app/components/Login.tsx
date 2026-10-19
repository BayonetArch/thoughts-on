"use client";

export default function Login() {
  function login() {}

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}
