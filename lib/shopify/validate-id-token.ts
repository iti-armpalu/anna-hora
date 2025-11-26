import { createRemoteJWKSet, jwtVerify } from "jose";
import { ShopifyIdTokenPayload } from "../types/shopify-payload";


const JWKS = createRemoteJWKSet(
    new URL(`https://${process.env.SHOPIFY_STORE_DOMAIN}/.well-known/oauth/jwks.json`)
);

export async function validateShopifyIdToken(
    token: string
): Promise<ShopifyIdTokenPayload> {
    const { payload } = await jwtVerify(token, JWKS, {
        issuer: `https://${process.env.SHOPIFY_STORE_DOMAIN}/auth/oauth`,
        audience: process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID,
    });

    return payload as unknown as ShopifyIdTokenPayload;

}
