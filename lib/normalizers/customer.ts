import type { ShopifyCustomer } from "@/lib/shopify/types/customer";
import type { Customer } from "@/lib/shopify/types/customer-normalized";

import {
  normalizeAddress,
  type Address,
} from "./address";

import {
  normalizeOrder,
  type Order,
} from "./order";

/**
 * Convert ShopifyCustomer → Customer (clean app shape)
 */
export function normalizeCustomer(
  raw: ShopifyCustomer,
  accessToken: string
): Customer {
  return {
    id: raw.id,
    email: raw.email,
    phone: raw.phone ?? null,
    firstName: raw.firstName,
    lastName: raw.lastName,

    // Normalize default address
    defaultAddress: normalizeAddress(raw.defaultAddress),

    // Flatten addresses.edges → Address[]
    addresses:
      raw.addresses?.edges
        ?.map((edge) => normalizeAddress(edge.node))
        .filter((a): a is Address => Boolean(a)) ?? [],

    // Flatten orders.edges → Order[]
    orders:
      raw.orders?.edges
        ?.map((edge) => normalizeOrder(edge.node))
        .filter((o): o is Order => Boolean(o)) ?? [],

    // Needed for cart buyer identity linking
    accessToken,
  };
}
