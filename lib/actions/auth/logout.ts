"use server";

import { cookies } from "next/headers";
import { AuthActionState } from "./auth-state";

export async function logoutAction(): Promise<AuthActionState> {
  const cookieStore = await cookies();

  // Remove the Shopify customer token cookie
  cookieStore.set("customerAccessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // instantly expire
  });

  return { ok: true };
}
