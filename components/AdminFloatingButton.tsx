"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdAdminPanelSettings } from "react-icons/md";

export function AdminFloatingButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.isAdmin) {
    return null;
  }

  return (
    <button
      onClick={() => router.push("/admin/dashboard")}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 group"
      aria-label="Admin Dashboard"
      title="Admin Dashboard"
    >
      <MdAdminPanelSettings className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Admin Dashboard
      </span>
    </button>
  );
}
