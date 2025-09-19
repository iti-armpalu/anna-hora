import type { Storefront } from "../storefront";
import type { Cart, Product } from "../viewModels";


// -- Mock catalog --
const MOCK_PRODUCTS: Product[] = [
{
id: "gid://shopify/Product/1",
handle: "midi-dress-azure",
title: "Anna Hora Midi Dress — Azure",
descriptionHtml: "<p>A lightweight midi dress in azure blue.</p>",
image: { url: "https://picsum.photos/seed/azure/800/800", alt: "Azure dress" },
variants: [
{ id: "gid://shopify/ProductVariant/1", title: "XS", available: true, price: { amount: "129.00", currencyCode: "GBP" } },
{ id: "gid://shopify/ProductVariant/2", title: "S", available: true, price: { amount: "129.00", currencyCode: "GBP" } },
],
},
{
id: "gid://shopify/Product/2",
handle: "linen-shirt-sand",
title: "Anna Hora Linen Shirt — Sand",
descriptionHtml: "<p>Breathable linen in a warm sand tone.</p>",
image: { url: "https://picsum.photos/seed/sand/800/800", alt: "Sand shirt" },
variants: [
{ id: "gid://shopify/ProductVariant/3", title: "M", available: true, price: { amount: "89.00", currencyCode: "GBP" } },
],
},
];


// -- In-memory cart --
let CART: Cart = { id: "mock-cart", lines: [] };


export function getMockClient(): Storefront {
return {
async listProducts() { return MOCK_PRODUCTS; },
async getProductByHandle(handle) { return MOCK_PRODUCTS.find(p => p.handle === handle) ?? null; },
async createCart(lines = []) {
CART = { id: "mock-cart", lines: [] };
if (lines.length) {
CART.lines.push(...lines.map((l, i) => ({ id: `line-${Date.now()}-${i}`, merchandiseId: l.merchandiseId, quantity: l.quantity })));
}
CART.checkoutUrl = "/cart"; // placeholder
return CART;
},
async addToCart(cartId, lines) {
if (cartId !== CART.id) await this.createCart();
lines.forEach((l, i) => CART.lines.push({ id: `line-${Date.now()}-${i}`, merchandiseId: l.merchandiseId, quantity: l.quantity }));
return CART;
},
async updateCart(cartId, lines) {
if (cartId !== CART.id) return CART;
lines.forEach(u => {
const line = CART.lines.find(x => x.id === u.id);
if (line) line.quantity = u.quantity;
});
return CART;
},
};
}