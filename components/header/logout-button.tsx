"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

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
    <Button
      variant="outline"
      className="mt-4 sm:mt-0 border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
}
