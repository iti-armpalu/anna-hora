import { NextRequest, NextResponse } from "next/server";
import { customerAccountGraphql } from "@/lib/shopify/customer-account-graphql";
import { ORDER_DETAILS_QUERY } from "@/lib/shopify/queries/customer";

type OrderDetailsRes = {
    order: {
        id: string;
        name: string;
        processedAt: string;
        fulfillmentStatus: string;
        financialStatus: string;
        totalPrice: { amount: string; currencyCode: string };
        lineItems: {
            nodes: Array<{
                id: string;
                title: string;
                quantity: number;
                variantTitle?: string | null;
                image: { url: string; altText: string };
            }>;
        };
    } | null;
};

export async function GET(req: NextRequest) {

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    try {
        const data = await customerAccountGraphql<OrderDetailsRes>(ORDER_DETAILS_QUERY, {
            id,
            lineItemsFirst: 50,
        });

        if (!data.order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ order: data.order });
    } catch (e) {
        return NextResponse.json({ error: "Failed to load order" }, { status: 500 });
    }
}
