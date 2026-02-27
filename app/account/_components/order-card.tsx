"use client";

import { useState } from "react";
import { ChevronDown, Headphones, LifeBuoy, PackageSearch, RotateCcw, ShoppingCart, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
            title: string;
            quantity: number;
            variantTitle?: string | null;
            price?: { amount: string; currencyCode: string };

            variantOptions: Array<{ name: string; value: string }>;
            unitPrice: Money | null;
            currentTotalPrice: Money | null;

            image?: { url: string; altText?: string | null } | null;
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

    const lineItems = details?.lineItems.nodes ?? [];

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

                    {/* {order.financialStatus ? (
                        <Badge variant="secondary" className="bg-stone-100 text-stone-800">
                            {order.financialStatus}
                        </Badge>
                    ) : null} */}

                    <span className="text-sm font-medium text-stone-900">
                        {order.totalPrice.amount} {order.totalPrice.currencyCode}
                    </span>

                    <ChevronDown className={`w-5 h-5 text-stone-600 transition-transform ${open ? "rotate-180" : ""}`} />
                </div>
            </button>

            {/* Expanded details */}
            {/* {open ? (
                <div className="border-t border-stone-200 p-6">
                    {loading ? (
                        <p className="text-sm text-stone-600">Loading items…</p>
                    ) : error ? (
                        <p className="text-sm text-red-600">{error}</p>
                    ) : lineItems.length ? (
                        <div className="space-y-3">
        
                            <div className="hidden sm:grid grid-cols-[64px_1fr_140px_90px_120px] gap-4 text-xs text-stone-500 pb-2 border-b border-stone-200">
                                <div />
                                <div>Item</div>
                                <div className="text-right">Unit price</div>
                                <div className="text-right">Qty</div>
                                <div className="text-right">Total</div>
                            </div>

               
                            {lineItems.map((li) => {
                                const opts = optionsToText(li.variantOptions);
                                return (
                                    <div
                                        key={li.id}
                                        className="grid grid-cols-[64px_1fr] sm:grid-cols-[64px_1fr_140px_90px_120px] gap-4 items-center py-3 border-b border-stone-100 last:border-b-0"
                                    >
                               
                                        <div className="w-16 h-16 rounded-md overflow-hidden bg-stone-100 shrink-0">
                                            {li.image?.url ? (
                                                <Image
                                                    src={li.image.url}
                                                    width={64}
                                                    height={64}
                                                    alt={li.image.altText ?? li.title}
                                                    className="w-16 h-16 object-cover"
                                                />
                                            ) : (
                                                <div className="w-16 h-16" />
                                            )}
                                        </div>

                    
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-stone-900 truncate">{li.title}</p>
                                            {opts ? <p className="text-xs text-stone-500 truncate">{opts}</p> : null}

                                   
                                            <div className="sm:hidden mt-2 flex items-center justify-between text-xs text-stone-600">
                                                <span>Unit: {formatMoney(li.unitPrice)}</span>
                                                <span>Qty: {li.quantity}</span>
                                                <span>Total: {formatMoney(li.currentTotalPrice)}</span>
                                            </div>
                                        </div>

                         
                                        <div className="hidden sm:block text-sm text-stone-700 text-right">
                                            {formatMoney(li.unitPrice)}
                                        </div>
                                        <div className="hidden sm:block text-sm text-stone-700 text-right">
                                            {li.quantity}
                                        </div>
                                        <div className="hidden sm:block text-sm font-medium text-stone-900 text-right">
                                            {formatMoney(li.currentTotalPrice)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-stone-600">No items found.</p>
                    )}

      
                    <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap gap-2">
            
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-stone-300 text-stone-700 bg-transparent"
                            asChild={Boolean(trackingUrl)}
                            disabled={!trackingUrl}
                            title={!trackingUrl ? "Tracking will appear once the order ships" : undefined}
                        >
                            {trackingUrl ? (
                                <a href={trackingUrl} target="_blank" rel="noreferrer">
                                    <PackageSearch className="w-4 h-4 mr-2" />
                                    Track shipment
                                </a>
                            ) : (
                                <span>
                                    <PackageSearch className="w-4 h-4 mr-2 inline" />
                                    Track shipment
                                </span>
                            )}
                        </Button>

                    
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-stone-300 text-stone-700 bg-transparent"
                            asChild
                        >
                            <a href={`/account/returns?orderId=${encodeURIComponent(order.id)}`}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Request return
                            </a>
                        </Button>

                
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-stone-300 text-stone-700 bg-transparent"
                            asChild
                        >
                            <a href={`/api/account/reorder?orderId=${encodeURIComponent(order.id)}`}>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Reorder
                            </a>
                        </Button>

 
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-stone-300 text-stone-700 bg-transparent"
                            asChild
                        >
                            <a href={`/contact?subject=${encodeURIComponent(`Help with ${order.name}`)}`}>
                                <LifeBuoy className="w-4 h-4 mr-2" />
                                Contact support
                            </a>
                        </Button>
                    </div>
                </div>
            ) : null} */}

            <div
                className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-border">
                        {/* Product rows */}
                        <div className="divide-y divide-border">
                            {lineItems.map((li) => (
                                <div key={li.id} className="flex items-center gap-4 p-5 md:p-6">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
                                        <img
                                            src={li.image.url}
                                            alt={li.image.altText}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* <div className="flex-1 min-w-0">
                                        <p className="font-medium text-card-foreground truncate">{li.title}</p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                            <span>Color: {li.color}</span>
                                            <span>Size: {li.size}</span>
                                            <span>Quantity: {li.quantity}</span>
                                        </div>
                                    </div> */}
                                    <p className="font-display font-semibold text-card-foreground text-right whitespace-nowrap">
                                        $
                                    </p>
                                </div>
                            ))}
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
                            {/* <RequestReturnDialog open={returnOpen} onOpenChange={setReturnOpen} products={order.products} orderNumber={order.orderNumber} /> */}
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
