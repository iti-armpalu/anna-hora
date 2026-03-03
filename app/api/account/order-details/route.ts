import { NextRequest, NextResponse } from "next/server";
import { customerAccountGraphql } from "@/lib/shopify/customer-account-graphql";
import { ORDER_DETAILS_QUERY } from "@/lib/shopify/queries/customer";
import { requireAuthApi } from "@/lib/auth/require-auth-api";

/* --------------------------------------------------------
 * Types
 * ------------------------------------------------------ */

type MoneyV2 = { amount: string; currencyCode: string };

type OrderDetailsRes = {
  order: {
    id: string;
    name: string;
    processedAt: string;
    fulfillmentStatus: string;
    financialStatus: string | null;
    totalPrice: MoneyV2;

    // ✅ NEW: order returns (to grey out items already requested/approved)
    returns: {
      nodes: Array<{
        id: string;
        status: string; // e.g. REQUESTED, APPROVED, DECLINED, CLOSED
        returnLineItems: {
          nodes: Array<{
            quantity: number;
            lineItem: {
              id: string;
            };
          }>;
        };
      }>;
    };

    lineItems: {
      nodes: Array<{
        id: string;
        name: string;
        title: string;
        quantity: number;

        // ✅ NEW: enforce return qty <= returnableQuantity
        returnableQuantity: number;

        variantTitle?: string | null;
        variantOptions: Array<{
          name: string;
          value: string;
        }>;

        unitPrice: {
          price: MoneyV2;
        } | null;

        currentTotalPrice: MoneyV2 | null;

        image?: {
          url: string;
          altText?: string | null;
        } | null;
      }>;
    };
  } | null;
};

/* --------------------------------------------------------
 * Route Handler
 * ------------------------------------------------------ */

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing order id" },
      { status: 400 }
    );
  }

  const auth = await requireAuthApi();
  if (!auth.ok) {
    return NextResponse.json({ error: "Not authenticated" }, { status: auth.status });
  }


  try {
    const data = await customerAccountGraphql<OrderDetailsRes>(
      ORDER_DETAILS_QUERY,
      {
        id,
        lineItemsFirst: 50,
      },
    );

    if (!data?.order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order: data.order });
  } catch (error: any) {
    console.error("ORDER DETAILS ERROR:", error);

    return NextResponse.json(
      {
        error:
          error?.message ??
          "Failed to fetch order details from Shopify",
      },
      { status: 500 }
    );
  }
}