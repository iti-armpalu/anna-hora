/**
 * API Route: /api/collections/[handle]
 * 
 * Purpose:
 * - Allow the client-side shop page to dynamically load products
 *   when the user selects a different collection in the FiltersPanel.
 * 
 * Why needed?
 * - Filtering happens on the client side.
 * - Client cannot call Shopify Storefront API directly.
 * - This route acts as a bridge between the browser and Shopify.
 * 
 * Returns:
 * {
 *    products: Product[]
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { getCollectionByHandle } from "@/lib/shopify";

export async function GET(
  req: NextRequest,
  context: { params: { handle: string } }
) {
  try {
    const { handle } = context.params;

    if (!handle) {
      return NextResponse.json(
        { error: "Missing collection handle" },
        { status: 400 }
      );
    }

    const collection = await getCollectionByHandle(handle);

    if (!collection) {
      return NextResponse.json(
        { error: `Collection '${handle}' not found` },
        { status: 404 }
      );
    }

    const products = collection.products?.nodes ?? [];

    return NextResponse.json({ products });
  } catch (error) {
    console.error("API /collections error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

