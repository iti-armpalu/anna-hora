// lib/shopify/types/address.ts

export interface ShopifyAddress {
    id: string;
  
    firstName: string | null;
    lastName: string | null;
    company?: string | null;
  
    address1: string | null;
    address2: string | null;
    city: string | null;
    province: string | null;
    zip: string | null;
    country: string | null;
    countryCodeV2?: string | null;
    provinceCode?: string | null;
  
    phone: string | null;
  }
  