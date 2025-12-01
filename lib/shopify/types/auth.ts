// lib/shopify/types/auth.ts

export interface ShopifyUserError {
    field?: string[] | null;
    message: string;
}

export interface ShopifyAccessToken {
    accessToken: string;
    expiresAt: string;
}

export interface TokenCreateData {
    customerAccessTokenCreate: {
        customerAccessToken: ShopifyAccessToken | null;
        customerUserErrors: ShopifyUserError[];
    };
}

export interface TokenDeleteData {
    customerAccessTokenDelete: {
        deletedAccessToken: string | null;
        userErrors: ShopifyUserError[];
    };
}
