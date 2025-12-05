"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { Button } from "../ui/button";
import { logoutAction } from "@/lib/actions/auth/logout";

export default function LogoutButton() {
  const router = useRouter();
  const { setAuthenticated } = useAuth();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();        // ⬅️ DIRECT CALL, NO FORM NEEDED
      setAuthenticated(false);
      router.push("/");
    });
  }

  return (
    <Button
      variant="outline"
      className="mt-4 sm:mt-0 border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
      onClick={handleLogout}
      disabled={isPending}
    >
      <LogOut className="w-4 h-4 mr-2" />
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
