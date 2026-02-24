import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "lucide-react";
import { getAuthSession } from "@/lib/auth/session";

export default async function AuthNav() {
  const { isAuthenticated } = await getAuthSession();
  const href = isAuthenticated ? "/account" : "/signin";

  return (
    <Button
      asChild
      variant="ghost"
      className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-stone-100"
    >
      <Link href={href}>
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Link>
    </Button>
  );
}
