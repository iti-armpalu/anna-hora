"use client";

import { useAuth } from "@/context/auth-context";

export default function LogoutButton() {
  const { setAuthenticated } = useAuth();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      // Update UI state ONLY (server is the real auth controller)
      setAuthenticated(false);

      // Redirect user after logout
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 hover:underline ml-4"
    >
      Logout
    </button>
  );
}
