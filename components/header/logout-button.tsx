import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      asChild
      variant="outline"
      className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
    >
      <Link href="/api/auth/logout" prefetch={false}>
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Link>
    </Button>
  );
}
