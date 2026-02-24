"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard } from "./order-card";

type OrderSummary = {
  id: string;
  name: string;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus?: string | null;
  totalPrice: { amount: string; currencyCode: string };
  statusPageUrl?: string | null;
};

export function OrdersTab({ orders }: { orders: OrderSummary[] }) {
  const sorted = [...orders].sort(
    (a, b) => new Date(b.processedAt).getTime() - new Date(a.processedAt).getTime()
  );

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <p className="text-lg font-serif text-stone-800 mb-4">You have no orders yet</p>
        <p className="text-stone-600 mb-6 max-w-sm">
          Discover our collection of premium silk loungewear, crafted for moments of quiet luxury.
        </p>
        <Button asChild className="bg-anna-green-950 hover:bg-anna-green-800 text-white inline-block">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-stone-800">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sorted.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
