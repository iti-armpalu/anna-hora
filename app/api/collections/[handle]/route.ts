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

import { NextResponse } from "next/server";
import { getCollectionByHandle } from "@/lib/shopify/collection";

export async function GET(
  _req: Request,
  { params }: { params: { handle: string } }
) {
  try {
    const handle = params.handle;

    const collection = await getCollectionByHandle(handle);

    // If the collection doesn't exist
    if (!collection) {
      return NextResponse.json({ products: [] });
    }

    return NextResponse.json({
      products: collection.products.nodes || [],
    });
  } catch (err) {
    console.error("Error fetching collection:", err);

    return NextResponse.json(
      { products: [], error: "Failed to load collection" },
      { status: 500 }
    );
  }
}
