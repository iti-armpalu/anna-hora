import "server-only";
import { redirect } from "next/navigation";
import { getAuthSession } from "./session";

/**
 * Protects server-rendered routes.
 * Redirects unauthenticated users to /signin.
 */
export async function requireAuth() {
  const session = await getAuthSession();

  if (!session.isAuthenticated || !session.accessToken) {
    redirect("/signin");
  }

  return session.accessToken;
}
