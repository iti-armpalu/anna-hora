import "server-only";
import { getAuthSession } from "./session";

export async function requireAuthApi() {
  const session = await getAuthSession();

  if (!session.isAuthenticated || !session.accessToken) {
    return { ok: false as const, status: 401 as const, accessToken: null };
  }

  return { ok: true as const, status: 200 as const, accessToken: session.accessToken };
}