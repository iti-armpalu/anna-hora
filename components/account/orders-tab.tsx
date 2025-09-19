import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order } from "@/data/account"
import { siteContent } from "@/data/content"

interface OrdersTabProps {
  orders: Order[]
}

export function OrdersTab({ orders }: OrdersTabProps) {
  const { orders: ordersContent } = siteContent.account

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-stone-800">{ordersContent.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-stone-200 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h3 className="font-medium text-stone-800 mb-1">Order {order.id}</h3>
                  <p className="text-sm text-stone-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <Badge
                    variant={order.status === "Delivered" ? "default" : "secondary"}
                    className={
                      order.status === "Delivered" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                    }
                  >
                    {order.status}
                  </Badge>
                  <span className="font-medium text-stone-800">${order.total}</span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-stone-800 text-sm">{item.name}</h4>
                      <p className="text-xs text-stone-600">
                        {item.color} • {item.size}
                      </p>
                      <p className="text-sm font-medium text-stone-800 mt-1">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-stone-200">
                {ordersContent.actions.map((action) => (
                  <Button
                    key={action}
                    variant="outline"
                    size="sm"
                    className="border-stone-300 text-stone-700 bg-transparent"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
