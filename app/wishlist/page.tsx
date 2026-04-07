import { pageMeta } from "@/lib/config/metadata";
import { Metadata } from "next";

import WishlistClient from "./wishlist-client";

export const metadata: Metadata = pageMeta.wishlist;

export default function WishlistPage() {
  return <WishlistClient />;
}
