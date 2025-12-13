"use server";

import { cookies } from "next/headers";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/config/free-shipping";

export async function getFreeShippingThreshold(): Promise<{
  country: string;
  threshold: number;
  currency: string;
}> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const threshold =
    FREE_SHIPPING_THRESHOLD[country] ?? FREE_SHIPPING_THRESHOLD["GB"];

  const currencyMap: Record<string, string> = {
    GB: "GBP",
    US: "USD",
    AE: "AED",
    CZ: "CZK",

    // DE: "EU",
    // FR: "EU",
    // IT: "EU",
  };

  return {
    country,
    threshold,
    currency: currencyMap[country] ?? "GBP",
  };
}
