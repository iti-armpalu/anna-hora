import { NextResponse } from "next/server";
import { getStorefront } from "@/lib/storefront";


export async function POST() {
const sf = getStorefront();
const cart = await sf.createCart();
return NextResponse.json(cart);
}