import { getMockClient } from "./clients/mockClient";
import { getShopifyClient } from "./clients/shopifyClient";


export interface Storefront {
listProducts(): Promise<import("./viewModels").Product[]>;
getProductByHandle(handle: string): Promise<import("./viewModels").Product | null>;
createCart(lines?: { merchandiseId: string; quantity: number }[]): Promise<import("./viewModels").Cart>;
addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<import("./viewModels").Cart>;
updateCart(cartId: string, lines: { id: string; quantity: number }[]): Promise<import("./viewModels").Cart>;
}


export function getStorefront(): Storefront {
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "1";
return useMock ? getMockClient() : getShopifyClient();
}