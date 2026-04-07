
import { Metadata } from "next";
import { pageMeta } from "@/lib/config/metadata";

import CartPageClient from "./cart-page-client"

export const metadata: Metadata = pageMeta.cart;

export default async function CartPage() {
  return <CartPageClient />;

}
