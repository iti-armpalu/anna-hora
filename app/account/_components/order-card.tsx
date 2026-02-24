"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type OrderSummary = {
    id: string;
    name: string;
    processedAt: string;
    fulfillmentStatus: string;
    financialStatus?: string | null;
    totalPrice: { amount: string; currencyCode: string };
};

type OrderDetails = {
    id: string;
    lineItems: {
        nodes: Array<{
            id: string;
            title: string;
            quantity: number;
            variantTitle?: string | null;
            image: { url: string; altText: string };
        }>;
    };
};

function formatDate(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function OrderCard({ order }: { order: OrderSummary }) {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function toggle() {
        const next = !open;
        setOpen(next);

        if (next && !details && !loading) {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`/api/account/order-details?id=${encodeURIComponent(order.id)}`, {
                    method: "GET",
                    cache: "no-store",
                });

                if (!res.ok) {
                    const body = await res.json().catch(() => null);
                    throw new Error(body?.error ?? "Failed to load order details");
                }

                const json = (await res.json()) as { order: OrderDetails };
                setDetails(json.order);
            } catch (e: any) {
                setError(e?.message ?? "Failed to load order details");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="border border-stone-200 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h3 className="font-medium text-stone-800 mb-1">{order.name}</h3>
                    <p className="text-sm text-stone-600">Placed on {formatDate(order.processedAt)}</p>
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-stone-100 text-stone-800">
                        {order.fulfillmentStatus}
                    </Badge>

                    {order.financialStatus ? (
                        <Badge variant="secondary" className="bg-stone-100 text-stone-800">
                            {order.financialStatus}
                        </Badge>
                    ) : null}

                    <span className="text-sm font-medium text-stone-800">
                        {order.totalPrice.amount} {order.totalPrice.currencyCode}
                    </span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    className="border-stone-300 text-stone-700 bg-transparent"
                    onClick={toggle}
                >
                    {open ? "Hide items" : "View items"}
                </Button>

                {/* you can add "View details" link later */}
            </div>

            {open ? (
                <div className="mt-4">
                    {loading ? (
                        <p className="text-sm text-stone-600">Loading items…</p>
                    ) : error ? (
                        <p className="text-sm text-red-600">{error}</p>
                    ) : details ? (
                        <div className="space-y-3">
                            {details.lineItems.nodes.map((li) => (
                                <div key={li.id} className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <Image
                                            src={li.image.url}
                                            width={200}
                                            height={200}
                                            alt={li.title}
                                        />
                                        <p className="text-sm font-medium text-stone-800 truncate">{li.title}</p>
                                        {li.variantTitle ? (
                                            <p className="text-xs text-stone-600">{li.variantTitle}</p>
                                        ) : null}
                                    </div>
                                    <div className="text-sm text-stone-700 whitespace-nowrap">× {li.quantity}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-stone-600">No items found.</p>
                    )}
                </div>
            ) : null}
        </div>
    );
}
