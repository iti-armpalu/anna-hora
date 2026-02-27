"use client";

import { useState } from "react";
import { ChevronDown, Headphones, LifeBuoy, PackageSearch, RotateCcw, ShoppingCart, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RequestReturnDialog } from "./request-return-dialog";
import { LineItemRow, type LineItemDetails } from "./line-item-row";

type Money = { amount: string; currencyCode: string };

type OrderSummary = {
    id: string;
    name: string;
    processedAt: string;
    fulfillmentStatus: string;
    financialStatus?: string | null;
    totalPrice: Money;
};

type OrderDetails = {
    id: string;
    lineItems: {
        nodes: Array<{
            id: string;
            name: string;
            title: string;
            quantity: number;

            variantTitle?: string | null;

            variantOptions: Array<{
                name: string;
                value: string;
            }>;

            unitPrice: {
                price: Money;
            } | null;

            currentTotalPrice: Money | null;

            image?: {
                url: string;
                altText?: string | null;
            } | null;
        }>;
    };
};

function formatDate(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatMoney(m?: Money | null) {
    if (!m) return "—";
    const n = Number(m.amount);
    const amt = Number.isFinite(n) ? n.toFixed(2) : m.amount;
    return `${amt} ${m.currencyCode}`;
}

function optionsToText(opts: Array<{ name: string; value: string }>) {
    if (!opts?.length) return "";
    return opts.map((o) => `${o.name}: ${o.value}`).join(" • ");
}


export function OrderCard({ order }: { order: OrderSummary }) {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [returnOpen, setReturnOpen] = useState(false);
    const [trackingOpen, setTrackingOpen] = useState(false);

    // If you later add tracking to the API response, you can compute a best tracking URL here.
    const trackingUrl: string | null = null;

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

    const items: LineItemDetails[] =
        details?.lineItems.nodes.map((li) => ({
            id: li.id,
            name: li.name,
            quantity: li.quantity,
            variantOptions: li.variantOptions,
            imageUrl: li.image?.url ?? null,
            imageAlt: li.image?.altText ?? null,
            currentTotalPrice: li.currentTotalPrice ?? null,
            unitPrice: li.unitPrice ?? null,
        })) ?? [];



    return (
        <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
            {/* Header (click to toggle) */}
            <button
                type="button"
                onClick={toggle}
                className="w-full p-6 flex items-center justify-between gap-4 hover:bg-stone-50 transition"
                aria-expanded={open}
            >
                <div className="text-left min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-stone-900 truncate">{order.name}</h3>
                    </div>
                    <p className="text-sm text-stone-500">Placed {formatDate(order.processedAt)}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="secondary" className="bg-stone-100 text-stone-800">
                        {order.fulfillmentStatus}
                    </Badge>

                    <span className="text-sm font-medium text-stone-900">
                        {order.totalPrice.amount} {order.totalPrice.currencyCode}
                    </span>

                    <ChevronDown className={`w-5 h-5 text-stone-600 transition-transform ${open ? "rotate-180" : ""}`} />
                </div>
            </button>

            <div
                className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-border">
                        {/* Product rows */}
                        <div className="divide-y divide-border">
                            <div className="space-y-3">
                                {items.map((item) => (
                                    <LineItemRow key={item.id} item={item} />
                                ))}
                            </div>
                        </div>

                        {/* Mobile total */}
                        <div className="sm:hidden px-5 pb-2 flex justify-between items-center border-t border-border pt-3">
                            <span className="text-sm text-muted-foreground">Total</span>
                            <span className="font-display font-bold text-card-foreground">$</span>
                        </div>

                        {/* Footer actions */}
                        <div className="flex flex-wrap gap-2 p-5 md:p-6 pt-3 md:pt-4 border-t border-border bg-accent/30">
                            <Button variant="outline" size="sm" className="gap-2 text-sm" onClick={() => setTrackingOpen(true)}>
                                <Truck className="w-4 h-4" />
                                {order.fulfillmentStatus === "FULFILLED" ? "View Tracking" : "Track Order"}
                            </Button>
                            {/* <ViewTrackingDialog open={trackingOpen} onOpenChange={setTrackingOpen} orderNumber={order.orderNumber} trackingNumber={order.trackingNumber} status={order.status} delivery={order.delivery} /> */}
                            <Button variant="outline" size="sm" className="gap-2 text-sm" onClick={() => setReturnOpen(true)}>
                                <RotateCcw className="w-4 h-4" />
                                Request Return
                            </Button>
                            <RequestReturnDialog open={returnOpen} onOpenChange={setReturnOpen} orderNumber={order.name} items={items} />
                            <Button variant="outline" size="sm" className="gap-2 text-sm">
                                <ShoppingCart className="w-4 h-4" />
                                Reorder
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 text-sm">
                                <Headphones className="w-4 h-4" />
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
