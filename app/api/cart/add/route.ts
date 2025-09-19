import { NextResponse } from "next/server";
import { getStorefront } from "@/lib/storefront";


export async function POST(req: Request) {
const { variantId, quantity = 1 } = await req.json();
const sf = getStorefront();
// ensure a cart exists first
const cart = await sf.createCart();
const updated = await sf.addToCart(cart.id, [{ merchandiseId: variantId, quantity }]);
return NextResponse.json(updated);
}