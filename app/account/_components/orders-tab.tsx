import { Button } from "@/components/ui/button";
import { serializeOrder } from "@/lib/serializers/serializeOrder";
import { ShopifyCustomer } from "@/lib/types/order";
import { Badge } from "lucide-react";
import Link from "next/link";
import { OrderCard } from "./order-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OrdersTab({ customer }: { customer: ShopifyCustomer }) {
  const orders = customer.orders.edges;

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <p className="text-lg font-serif text-stone-800 mb-4">You have no orders yet</p>
        <p className="text-stone-600 mb-6 max-w-sm">
          Discover our collection of premium silk loungewear, crafted for moments of quiet luxury.
        </p>
        <Button asChild className="bg-anna-green-950 hover:bg-stone-700 text-white inline-block">
          <Link href="/shop">
            Start Shopping
          </Link>
        </Button>
      </div>
    );
  }

  const serialized = orders
    // 1. Sort by newest first
    .sort((a, b) => {
      const dateA = new Date(a.node.processedAt).getTime();
      const dateB = new Date(b.node.processedAt).getTime();
      return dateB - dateA; // newest → oldest
    })
    // 2. Convert to UI-friendly structure
    .map(({ node }) => serializeOrder(node));


  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-stone-800">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {serialized.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}