"use client";

import { useRouter } from "next/navigation";
import { LogOutIcon } from "@/components/Icons";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-red-300 hover:text-red-600"
    >
      <LogOutIcon className="h-4 w-4" />
      Изход
    </button>
  );
}
