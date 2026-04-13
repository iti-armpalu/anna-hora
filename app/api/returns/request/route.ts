import { NextRequest, NextResponse } from "next/server";
import { requireAuthApi } from "@/lib/auth/require-auth-api";
import { customerAccountGraphql } from "@/lib/shopify/customer-account-graphql";

/* -------------------------------------------------------
 * Shopify Mutation
 * ----------------------------------------------------- */

const ORDER_REQUEST_RETURN_MUTATION = /* GraphQL */ `
  mutation OrderRequestReturn(
    $orderId: ID!
    $requestedLineItems: [RequestedLineItemInput!]!
  ) {
    orderRequestReturn(orderId: $orderId, requestedLineItems: $requestedLineItems) {
      return {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;


/* -------------------------------------------------------
 * Types
 * ----------------------------------------------------- */

type RequestedLineItem = {
  lineItemId: string;
  quantity: number;
  returnReason: string;
  customerNote?: string;
};

type Body = {
  orderId?: string;
  requestedLineItems?: RequestedLineItem[];
};

/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

function mask(value?: string | null, start = 10, end = 6) {
  if (!value) return value;
  if (value.length <= start + end) return `${value.slice(0, 4)}…`;
  return `${value.slice(0, start)}…${value.slice(-end)}`;
}

/* -------------------------------------------------------
 * Route
 * ----------------------------------------------------- */

export async function POST(req: NextRequest) {

  /* -----------------------------
   * Auth Guard
   * --------------------------- */

  const auth = await requireAuthApi();

  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  /* -----------------------------
   * Parse body
   * --------------------------- */

  let body: Body;

  try {
    body = await req.json();
  } catch {
    console.error("Invalid JSON body");
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const orderId = (body.orderId ?? "").trim();
  const items = body.requestedLineItems ?? [];

  if (!orderId) {
    return NextResponse.json(
      { ok: false, error: "Missing orderId" },
      { status: 400 }
    );
  }

  if (!items.length) {
    return NextResponse.json(
      { ok: false, error: "No items selected" },
      { status: 400 }
    );
  }

  /* -----------------------------
   * Validate + sanitize items
   * --------------------------- */

  const requestedLineItems = items.map((item) => {
    const lineItemId = (item.lineItemId ?? "").trim();
    const quantity = Math.max(1, Math.floor(Number(item.quantity ?? 1)));
    const returnReason = (item.returnReason ?? "").trim();
    const customerNote = (item.customerNote ?? "").trim();

    if (!lineItemId || !returnReason) {
      throw new Error("Invalid line item payload");
    }

    const payload: Record<string, unknown> = {
      lineItemId,
      quantity,
      returnReason,
    };

    // Only include note if provided
    if (customerNote.length > 0) {
      payload.customerNote = customerNote;
    }

    return payload;
  });

  /* -----------------------------
   * Call Shopify
   * --------------------------- */

  try {
    const data = await customerAccountGraphql<{
      orderRequestReturn: {
        return: { id: string; status: string } | null;
        userErrors: Array<{
          field: string[] | null;
          message: string;
        }>;
      };
    }>(ORDER_REQUEST_RETURN_MUTATION, {
      orderId,
      requestedLineItems,
    });

    const result = data?.orderRequestReturn;
    const userErrors = result?.userErrors ?? [];

    if (userErrors.length) {
      return NextResponse.json(
        { ok: false, userErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        return: result?.return,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Shopify request failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error?.message ?? "Failed to request return",
      },
      { status: 500 }
    );
  } finally {
    console.log("==============================\n");
  }
}