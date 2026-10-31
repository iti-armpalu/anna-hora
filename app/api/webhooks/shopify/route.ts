import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { applyOrderToFabric, type OrderWebhookPayload } from "@/lib/preorder/fabric-stock";

const WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;

const TOPICS = {
  orderCreated: "orders/create",
  orderCancelled: "orders/cancelled",
} as const;

/** Constant-time comparison of Shopify's signature against one computed from the raw body. */
function isValidSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest();
  const received = Buffer.from(signature, "base64");

  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!WEBHOOK_SECRET) {
    console.error("Missing SHOPIFY_WEBHOOK_SECRET env var");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  // Must be the raw text — re-serialising parsed JSON changes bytes and breaks the HMAC
  const rawBody = await request.text();

  if (!isValidSignature(rawBody, request.headers.get("x-shopify-hmac-sha256"), WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const topic = request.headers.get("x-shopify-topic");
  const order = JSON.parse(rawBody) as OrderWebhookPayload; // safe: signature proves it's Shopify's payload

  try {
    if (topic === TOPICS.orderCreated) await applyOrderToFabric(order, "deduct");
    else if (topic === TOPICS.orderCancelled) await applyOrderToFabric(order, "restore");

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error(
      `Webhook ${topic} failed for order ${order.name}:`,
      err instanceof Error ? err.message : err
    );
    // Non-2xx makes Shopify retry; the order tags keep retries from double-applying
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
