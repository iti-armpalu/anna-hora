import type { Storefront } from "../storefront";
import type { Product, Cart } from "../viewModels";

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!;
const API = process.env.NEXT_PUBLIC_STOREFRONT_API_VERSION || "2024-07";


async function gql<T>(query: string, variables?: any): Promise<T> {
const res = await fetch(`https://${DOMAIN}/api/${API}/graphql.json`, {
method: "POST",
headers: {
"Content-Type": "application/json",
"X-Shopify-Storefront-Access-Token": TOKEN,
},
body: JSON.stringify({ query, variables }),
cache: "no-store",
});
if (!res.ok) throw new Error(`Shopify ${res.status}`);
const json = await res.json();
if (json.errors) throw new Error(JSON.stringify(json.errors));
return json.data;
}


export function getShopifyClient(): Storefront {
return {
async listProducts() {
const q = `query { products(first: 12) { nodes { id handle title featuredImage { url altText } variants(first: 10){ nodes { id title availableForSale price { amount currencyCode } } } } } }`;
const data = await gql<{ products: { nodes: any[] } }>(q);
return data.products.nodes.map(toVMProduct);
},
async getProductByHandle(handle) {
const q = `query($handle:String!){ product(handle:$handle){ id handle title descriptionHtml featuredImage{ url altText } variants(first:10){ nodes{ id title availableForSale price{ amount currencyCode } } } } }`;
const data = await gql<{ product: any }>(q, { handle });
return data.product ? toVMProduct(data.product) : null;
},
async createCart(lines=[]) {
const q = `mutation($lines:[CartLineInput!]){ cartCreate(input:{ lines:$lines }){ cart{ id checkoutUrl lines(first:50){ nodes{ id quantity merchandise{ ... on ProductVariant { id } } } } } userErrors{ message } } }`;
const data = await gql<{ cartCreate: { cart: any } }>(q, { lines });
return toVMCart(data.cartCreate.cart);
},
async addToCart(cartId, lines){
const q = `mutation($cartId:ID!,$lines:[CartLineInput!]!){ cartLinesAdd(cartId:$cartId, lines:$lines){ cart{ id checkoutUrl lines(first:50){ nodes{ id quantity merchandise{ ... on ProductVariant { id } } } } } } }`;
const data = await gql<{ cartLinesAdd: { cart: any } }>(q, { cartId, lines });
return toVMCart(data.cartLinesAdd.cart);
},
async updateCart(cartId, lines){
const q = `mutation($cartId:ID!,$lines:[CartLineUpdateInput!]!){ cartLinesUpdate(cartId:$cartId, lines:$lines){ cart{ id checkoutUrl lines(first:50){ nodes{ id quantity merchandise{ ... on ProductVariant { id } } } } } } }`;
const data = await gql<{ cartLinesUpdate: { cart: any } }>(q, { cartId, lines });
return toVMCart(data.cartLinesUpdate.cart);
},
};
}


function toVMProduct(p:any): Product {
return {
id: p.id,
handle: p.handle,
title: p.title,
descriptionHtml: p.descriptionHtml,
image: p.featuredImage ? { url: p.featuredImage.url, alt: p.featuredImage.altText ?? undefined } : undefined,
variants: (p.variants?.nodes ?? []).map((v:any)=>({
id: v.id,
title: v.title,
available: !!(v.availableForSale ?? v.available),
price: { amount: v.price.amount, currencyCode: v.price.currencyCode },
})),
};
}


function toVMCart(c:any): Cart {
return {
id: c.id,
checkoutUrl: c.checkoutUrl,
lines: (c.lines?.nodes ?? []).map((n:any)=>({ id: n.id, quantity: n.quantity, merchandiseId: n.merchandise?.id })),
};
}