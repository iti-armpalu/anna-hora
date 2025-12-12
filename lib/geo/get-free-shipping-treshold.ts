"use server";

import { cookies } from "next/headers";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/config/free-shipping";

export async function getFreeShippingThreshold(): Promise<{
  country: string;
  threshold: number;
}> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const threshold =
    FREE_SHIPPING_THRESHOLD[country] ?? FREE_SHIPPING_THRESHOLD["GB"];

  return { country, threshold };
}
