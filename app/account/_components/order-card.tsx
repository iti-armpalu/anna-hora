"use client";

import { useState } from "react";
import { ChevronDown, Headphones, RotateCcw, ShoppingCart, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequestReturnDialog } from "./request-return-dialog";
import { LineItemRow, type LineItemDetails } from "./line-item-row";
import { TrackingDialog } from "./tracking-dialog";
import { Separator } from "@/components/ui/separator";

type Money = { amount: string; currencyCode: string };

type TrackingStep = {
    label: string;
    description: string;
    date: string | null;
    completed: boolean;
    active: boolean;
};

type TrackingDialogData = {
    orderNumber: string;
    steps: TrackingStep[];
};

type OrderSummary = {
    id: string;
    name: string;
    processedAt: string;
    fulfillmentStatus: string;
    financialStatus?: string | null;
    paymentInformation: {
        totalPaidAmount: {
            amount: string;
            currencyCode: string;
        };
    } | null;
    totalPrice: Money;
};

type OrderDetails = {
    id: string;
    name: string;

    createdAt: string;
    processedAt: string;
    fulfillmentStatus: string;


    financialStatus: string | null;
    totalPrice: Money;

    // total refunded across the whole order
    totalRefunded: Money;

    // refund history / events
    refunds: Array<{
        id: string;
        createdAt: string | null;
        updatedAt: string;
        returnName: string | null;
        totalRefunded: Money;
    }>;

    shippingLine: {
        title: string;
        handle: string | null;
        originalPrice: Money;
    } | null;

    fulfillments: {
        nodes: Array<{
            id: string;
            createdAt: string;
            updatedAt: string;
            trackingInformation: Array<{
                company: string | null;
                number: string | null;
                url: string | null;
            }>;
        }>;
    };

    returns: {
        nodes: Array<{
            id: string;
            status: string; // REQUESTED, APPROVED, DECLINED, CLOSED, etc.
            returnLineItems: {
                nodes: Array<{
                    quantity: number;
                    lineItem: { id: string };
                }>;
            };
        }>;
    };

    lineItems: {
        nodes: Array<{
            id: string;
            name: string;
            title: string;
            quantity: number;

            refundableQuantity: number;

            variantTitle?: string | null;
            variantOptions: Array<{ name: string; value: string }>;

            price?: Money | null;
            totalPrice: Money | null;
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

function Skeleton({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse rounded-md bg-stone-200/70 ${className}`} />;
}

function OrderDetailsSkeleton() {
    return (
        <div className="p-5 md:p-6 space-y-4">
            {/* Line item skeletons */}
            <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-4"
                    >
                        <Skeleton className="h-16 w-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-3 w-1/2" />
                            <div className="flex gap-2 pt-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                        <Skeleton className="h-4 w-16" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function formatTrackingDate(iso?: string | null) {
    if (!iso) return null;

    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;

    return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function buildLayerATrackingData(
    order: OrderSummary,
    details: OrderDetails | null
): TrackingDialogData | null {
    if (!details) return null;

    const firstFulfillment = details.fulfillments.nodes[0] ?? null;
    const hasFulfillment = Boolean(firstFulfillment);

    const processingLabel =
        details.fulfillmentStatus === "IN_PROGRESS" ? "In progress" : "Processing";

    const steps: TrackingStep[] = [
        {
            label: "Order confirmed",
            description: "Your order has been placed and confirmed",
            date: formatTrackingDate(details.createdAt),
            completed: true,
            active: !details.processedAt,
        },
        {
            label: processingLabel,
            description: "Order is being prepared for shipment",
            date: formatTrackingDate(details.processedAt),
            completed: hasFulfillment,
            active: !hasFulfillment,
        },
        {
            label: "Shipped",
            description: "Package handed to carrier",
            date: formatTrackingDate(firstFulfillment?.createdAt),
            completed: hasFulfillment,
            active: hasFulfillment,
        },
    ];

    return {
        orderNumber: order.name,
        steps,
    };
}

export function OrderCard({ order }: { order: OrderSummary }) {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [returnOpen, setReturnOpen] = useState(false);
    const [trackingOpen, setTrackingOpen] = useState(false);

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

    const returnStatusByLineItemId = new Map<string, string>();

    details?.returns?.nodes.forEach((ret) => {
        // You can decide which statuses should lock the line item
        // Usually REQUESTED + APPROVED should disable re-requesting
        const locksItem =
            ret.status === "REQUESTED" || ret.status === "APPROVED";

        if (!locksItem) return;

        ret.returnLineItems.nodes.forEach((rli) => {
            returnStatusByLineItemId.set(rli.lineItem.id, ret.status);
        });
    });


    const items: LineItemDetails[] =
        details?.lineItems.nodes.map((li) => ({
            id: li.id,
            name: li.name,
            quantity: li.quantity,
            variantOptions: li.variantOptions,
            imageUrl: li.image?.url ?? null,
            imageAlt: li.image?.altText ?? null,
            totalPrice: li.totalPrice ?? null,
            currentTotalPrice: li.currentTotalPrice ?? null,
            price: li.price ?? null,

            // ✅ NEW
            refundableQuantity: li.refundableQuantity,
            returnStatus: returnStatusByLineItemId.get(li.id) ?? null,
        })) ?? [];

    const hasAnyReturnable =
        items.some(
            (i) =>
                i.refundableQuantity > 0 &&
                i.returnStatus !== "REQUESTED" &&
                i.returnStatus !== "APPROVED"
        );

    const trackingData = buildLayerATrackingData(order, details);

    const firstFulfillment = details?.fulfillments?.nodes?.[0] ?? null;
    const firstTracking = firstFulfillment?.trackingInformation?.[0] ?? null;

    const trackingCompany = firstTracking?.company ?? null;
    const trackingNumber = firstTracking?.number ?? null;
    const trackingUrl = firstTracking?.url ?? null;
    const trackingUpdatedAt = firstFulfillment?.updatedAt ?? null;

    const deliveryMethod = details?.shippingLine?.title ?? null;

    const isFulfilled = order.fulfillmentStatus === "FULFILLED";

    const itemsSubtotal = {
        amount: items
            .reduce((sum, i) => sum + Number(i.totalPrice?.amount ?? 0), 0)
            .toFixed(2),
        currencyCode: order.totalPrice.currencyCode,
    };

    const netPaidAmount: Money | null = details
        ? {
            amount: (
                Number(details.totalPrice.amount) -
                Number(details.totalRefunded.amount)
            ).toFixed(2),
            currencyCode: details.totalPrice.currencyCode,
        }
        : null;

    function formatMoney(m?: Money | null) {
        if (!m) return "—";
        const n = Number(m.amount);
        const amount = Number.isFinite(n) ? n.toFixed(2) : m.amount;
        return `${m.currencyCode} ${amount}`;
    }

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
                        {/* {order.totalPrice.amount} {order.totalPrice.currencyCode} */}
                        {formatMoney(order.paymentInformation.totalPaidAmount)}
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
                            {open && loading && !details ? (
                                <OrderDetailsSkeleton />
                            ) : error ? (
                                <div className="p-5 md:p-6 text-sm text-red-600">{error}</div>
                            ) : (
                                <>
                                    {/* Line items */}
                                    <div className="space-y-3 p-5 md:p-6">
                                        {items.map((item) => (
                                            <LineItemRow key={item.id} item={item} />
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    {details && (
                                        <div className="px-5 md:px-6 py-4 space-y-2 text-sm">
                                            <div className="flex items-center justify-between text-muted-foreground">
                                                <span>Items Subtotal</span>
                                                <span>{formatMoney(itemsSubtotal)}</span>
                                            </div>

                                            {details.shippingLine && (
                                                <div className="flex items-center justify-between text-muted-foreground">
                                                    <span>Shipping</span>
                                                    <span>{formatMoney(details.shippingLine.originalPrice)}</span>
                                                </div>
                                            )}

                                            <Separator className="my-2" />

                                            <div className="flex items-center justify-between font-medium">
                                                <span>Total</span>
                                                <span>{formatMoney(order.paymentInformation.totalPaidAmount)}</span>
                                            </div>

                                            {details.totalRefunded && Number(details.totalRefunded.amount) > 0 && (
                                                <>
                                                    <div className="flex items-center justify-between text-muted-foreground">
                                                        <span>Refunded</span>
                                                        <span>-{formatMoney(details.totalRefunded)}</span>
                                                    </div>

                                                    <Separator className="my-2" />

                                                    <div className="flex items-center justify-between font-medium">
                                                        <span>Net Total</span>
                                                        <span>{formatMoney(netPaidAmount)}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Mobile total */}
                        <div className="sm:hidden px-5 pb-2 flex justify-between items-center border-t border-border pt-3">
                            <span className="text-sm text-muted-foreground">Total</span>
                            <span className="font-display font-bold text-card-foreground">$</span>
                        </div>

                        {/* Footer actions */}
                        <div className="flex flex-wrap gap-2 p-5 md:p-6 pt-3 md:pt-4 border-t border-border bg-accent/30">

                            <Button variant="outline" size="sm" className="gap-2 text-sm" onClick={() => setTrackingOpen(true)}>
                                {order.fulfillmentStatus === "FULFILLED" ? "View Tracking" : "Track Order"}
                            </Button>
                            {trackingData ? (
                                <TrackingDialog
                                    open={trackingOpen}
                                    onOpenChange={setTrackingOpen}
                                    orderNumber={trackingData.orderNumber}
                                    steps={trackingData.steps}
                                    deliveryMethod={deliveryMethod}
                                    trackingCompany={trackingCompany}
                                    trackingNumber={trackingNumber}
                                    trackingUrl={trackingUrl}
                                    trackingUpdatedAt={trackingUpdatedAt}
                                />
                            ) : null}

                            {isFulfilled && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 text-sm"
                                        onClick={() => setReturnOpen(true)}
                                        disabled={!hasAnyReturnable}
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Request Return
                                    </Button>

                                    <RequestReturnDialog
                                        open={returnOpen}
                                        onOpenChange={setReturnOpen}
                                        orderNumber={order.name}
                                        orderId={order.id}
                                        items={items}
                                    />
                                </>
                            )}

                            <Button variant="outline" size="sm" className="gap-2 text-sm">
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
