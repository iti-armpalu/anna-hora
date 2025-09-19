import { NextResponse } from "next/server";
import { getStorefront } from "@/lib/storefront";


export async function POST(req: Request) {
const { lineId, quantity } = await req.json();
const sf = getStorefront();
// mock keeps a single cart id; real Shopify should pass cartId from cookie/localStorage
const cart = await sf.createCart();
const updated = await sf.updateCart(cart.id, [{ id: lineId, quantity }]);
return NextResponse.json(updated);
}