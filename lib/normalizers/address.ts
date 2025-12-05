// lib/shopify/normalizers/address.ts

import { ShopifyAddress } from "../shopify/types/address";

/**
 * Frontend-friendly normalized address shape.
 * No edges, no optional props that can be undefined.
 */
export interface Address {
  id: string;

  firstName: string | null;
  lastName: string | null;
  company: string | null;

  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  provinceCode: string | null;
  zip: string | null;
  country: string | null;
  countryCode: string | null;

  phone: string | null;
}

/**
 * Normalize a ShopifyAddress into our internal Address type.
 * - Converts all `undefined` to `null`
 * - Safe to use in strict mode and on the client
 */
export function normalizeAddress(
  addr: ShopifyAddress | null | undefined
): Address | null {
  if (!addr) return null;

  return {
    id: addr.id,

    firstName: addr.firstName ?? null,
    lastName: addr.lastName ?? null,
    company: addr.company ?? null,

    address1: addr.address1 ?? null,
    address2: addr.address2 ?? null,
    city: addr.city ?? null,
    province: addr.province ?? null,
    provinceCode: addr.provinceCode ?? null,
    zip: addr.zip ?? null,
    country: addr.country ?? null,
    countryCode: addr.countryCodeV2 ?? null,

    phone: addr.phone ?? null,
  };
}
