import "server-only";
import { cookies } from "next/headers";

export type AuthSession = {
  isAuthenticated: boolean;
  accessToken?: string;
};

export async function getAuthSession(): Promise<AuthSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_access_token")?.value;

  return {
    isAuthenticated: Boolean(token),
    accessToken: token,
  };
}
