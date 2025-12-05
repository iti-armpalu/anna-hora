"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Package } from "lucide-react";
import ReturnOrderDialog from "./return-order-dialog";
import { Order } from "@/lib/normalizers/order";

export function OrderCard({ order }: { order: Order }) {
    const [returnDialogOpen, setReturnDialogOpen] = useState(false)

    return (
        <>
            <div className="border border-stone-200 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                        <h3 className="font-medium text-stone-800 mb-1">Order {order.name}</h3>
                        <p className="text-sm text-stone-600">Placed on {order.processedAt}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <Badge
                            variant={order.fulfillmentStatus === "Delivered" ? "default" : "secondary"}
                            className={
                                order.fulfillmentStatus === "Delivered" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                            }
                        >
                            {/* {order.status} */}
                        </Badge>
                        {/* <span className="font-medium text-stone-800">${order.total}</span> */}
                    </div>
                </div>

                <div className="space-y-3">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-md">
                                <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-stone-800 text-sm">{item.title}</h4>
                                <p className="text-xs text-stone-600">
                                    {/* {item.color} • {item.size} */}
                                </p>
                                <p className="text-sm font-medium text-stone-800 mt-1">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t border-stone-200">
                    {["Track Order", "Reorder", "View invoice"].map((action) => (
                        <Button
                            key={action}
                            variant="outline"
                            size="sm"
                            className="border-stone-300 text-stone-700 bg-transparent"
                        >
                            {action}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-stone-300 text-stone-700 bg-transparent"
                        onClick={() => setReturnDialogOpen(true)}
                    >
                        <Package className="w-4 h-4 mr-2" />
                        Return Items
                    </Button>
                </div>
            </div>

            <ReturnOrderDialog
                open={returnDialogOpen}
                onOpenChange={setReturnDialogOpen}
                order={order}
            />
        </>
    );
}
