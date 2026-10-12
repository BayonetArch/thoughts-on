"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteComment({ id }: { id: string }) {
  const router = useRouter();

  async function deleteComment() {
    let res;
    try {
      res = await fetch(`/api/comment/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.log("could not delete", e);
    }
    if (!res) return;
    const data = await res.json();
    if (data.error) {
      console.log("error from server\n", data.error);
      return;
    }
    router.refresh();
  }

  return (
    <X
      className="absolute stroke-red-200 top-2 right-2 hover:cursor-pointer hover:bg-red-400"
      onClick={() => deleteComment()}
    />
  );
}
