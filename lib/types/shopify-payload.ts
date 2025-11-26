export interface ShopifyIdTokenPayload {
    sub: string;           // customer id
    email: string;
    email_verified: boolean;
    name: string;
    given_name: string;
    family_name: string;
  }
  