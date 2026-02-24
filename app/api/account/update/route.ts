import { NextRequest, NextResponse } from "next/server";
import { customerAccountGraphql } from "@/lib/shopify/customer-account-graphql";
import { CUSTOMER_UPDATE_MUTATION } from "@/lib/shopify/queries/customer";

type UpdateRes = {
  customerUpdate: {
    customer: { id: string; firstName: string | null; lastName: string | null } | null;
    userErrors: Array<{ field: string[] | null; message: string; code?: string | null }>;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      firstName?: string;
      lastName?: string;
      // phone?: string; // only add if your schema supports it
    };

    const input: Record<string, unknown> = {};
    if (typeof body.firstName === "string") input.firstName = body.firstName;
    if (typeof body.lastName === "string") input.lastName = body.lastName;

    // If nothing to update, bail early
    if (Object.keys(input).length === 0) {
      return NextResponse.json({ ok: false, errors: [{ message: "No fields to update" }] }, { status: 400 });
    }

    const data = await customerAccountGraphql<UpdateRes>(CUSTOMER_UPDATE_MUTATION, { input });

    const errors = data.customerUpdate.userErrors ?? [];
    if (errors.length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      customer: data.customerUpdate.customer,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Update failed" },
      { status: 500 }
    );
  }
}
