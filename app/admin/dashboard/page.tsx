"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  username: string | null;
  image: string | null;
  createdAt: string;
  isAdmin: boolean;
}

interface UsersResponse {
  users: User[];
  total: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    if (status === "authenticated" && !session?.isAdmin) {
      router.push("/");
      return;
    }

    if (status === "authenticated" && session?.isAdmin) {
      fetchUsers();
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: UsersResponse = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Username", "Created At", "Is Admin"];
    const rows = users.map((user) => [
      user.name || "",
      user.email || "",
      user.username || "",
      new Date(user.createdAt).toLocaleDateString(),
      user.isAdmin ? "Yes" : "No",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-export.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">
              Total Users: {users.length}
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Export to CSV
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Admin
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.image && (
                          <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <span className="font-medium">
                          {user.name || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {user.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {user.username ? (
                        <a
                          href={`https://github.com/${user.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          @{user.username}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {user.isAdmin ? (
                        <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                          Yes
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm font-medium">
                          No
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
