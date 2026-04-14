import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button asChild variant="outline">
      <a href="/api/auth/logout">
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </a>
    </Button>
  );
}