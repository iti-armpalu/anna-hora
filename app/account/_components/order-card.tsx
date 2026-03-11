"use client";

import { useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { RequestReturnDialog } from "./request-return-dialog";
import { LineItemRow, type LineItemDetails } from "./line-item-row";
import { TrackingDialog } from "./tracking-dialog";

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
        totalPaidAmount: Money;
    } | null;
    totalPrice: Money;
};

type OrderDetails = {
    id: string;
    name: string;

    // Order lifecycle
    createdAt: string;
    processedAt: string;
    fulfillmentStatus: string;
    financialStatus: string | null;

    // Money
    totalPrice: Money;
    totalRefunded: Money;

    // Refund events
    refunds: Array<{
        id: string;
        createdAt: string | null;
        updatedAt: string;
        returnName: string | null;
        totalRefunded: Money;
    }>;

    // Refund/payment transactions
    transactions: {
        nodes: Array<{
            id: string;
            kind: string | null;
            status: string | null;
            createdAt: string;
            processedAt: string | null;
            transactionAmount: {
                shopMoney: Money;
                presentmentMoney: Money;
            };
        }>;
    };

    // Delivery method
    shippingLine: {
        title: string;
        handle: string | null;
        originalPrice: Money;
    } | null;

    // Fulfillment / tracking
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

    // Return events
    returns: {
        nodes: Array<{
            id: string;
            name: string | null;
            status: string;
            returnLineItems: {
                nodes: Array<{
                    lineItem: { id: string };
                    quantity: number;
                }>;
            };
        }>;
    };

    // Purchased items
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

type ReturnRefundState = {
    returnId: string;
    returnName: string | null;
    status: string;
    lineItems: Array<{
        lineItemId: string;
        quantity: number;
    }>;
    refund: {
        id: string;
        amount: Money;
        createdAt: string | null;
        updatedAt: string;
    } | null;
};

/* --------------------------------------------------------
 * Small formatting helpers
 * ------------------------------------------------------ */

function formatDate(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;

    return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
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

function formatMoney(m?: Money | null) {
    if (!m) return "—";
    const n = Number(m.amount);
    const amount = Number.isFinite(n) ? n.toFixed(2) : m.amount;
    return `${m.currencyCode} ${amount}`;
}

function toAmount(m?: Money | null) {
    return Number(m?.amount ?? 0);
}

/* --------------------------------------------------------
 * Skeleton
 * ------------------------------------------------------ */

function Skeleton({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse rounded-md bg-stone-200/70 ${className}`} />;
}

function OrderDetailsSkeleton() {
    return (
        <div className="space-y-4 p-5 md:p-6">
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

/* --------------------------------------------------------
 * Tracking model
 * ------------------------------------------------------ */

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
            label: "Dispatched",
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

/* --------------------------------------------------------
 * Return / refund normalization
 * ------------------------------------------------------ */

function buildReturnRefundStates(details: OrderDetails | null): ReturnRefundState[] {
    if (!details) return [];

    return details.returns.nodes.map((ret) => {
        const matchingRefund =
            details.refunds.find(
                (refund) => refund.returnName && ret.name && refund.returnName === ret.name
            ) ?? null;

        return {
            returnId: ret.id,
            returnName: ret.name ?? null,
            status: ret.status,
            lineItems: ret.returnLineItems.nodes.map((rli) => ({
                lineItemId: rli.lineItem.id,
                quantity: rli.quantity,
            })),
            refund: matchingRefund
                ? {
                    id: matchingRefund.id,
                    amount: matchingRefund.totalRefunded,
                    createdAt: matchingRefund.createdAt,
                    updatedAt: matchingRefund.updatedAt,
                }
                : null,
        };
    });
}

/* --------------------------------------------------------
 * Component
 * ------------------------------------------------------ */

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
                const res = await fetch(
                    `/api/account/order-details?id=${encodeURIComponent(order.id)}`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );

                if (!res.ok) {
                    const body = await res.json().catch(() => null);
                    throw new Error(body?.error ?? "Failed to load order details");
                }

                const json = (await res.json()) as { order: OrderDetails };
                setDetails(json.order);
            } catch (e: unknown) {
                const message = e instanceof Error ? e.message : "Failed to load order details";
                setError(message);
            } finally {
                setLoading(false);
            }
        }
    }

    const returnStates = buildReturnRefundStates(details);

    const returnStatusByLineItemId = new Map<string, string>();
    const returnQtyByLineItemId = new Map<string, number>();
    const refundStatusByLineItemId = new Map<string, boolean>();

    returnStates.forEach((ret) => {
        ret.lineItems.forEach((line) => {
            returnStatusByLineItemId.set(line.lineItemId, ret.status);
            returnQtyByLineItemId.set(line.lineItemId, line.quantity);
            refundStatusByLineItemId.set(line.lineItemId, Boolean(ret.refund));
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
            refundableQuantity: li.refundableQuantity,
            returnStatus: returnStatusByLineItemId.get(li.id) ?? null,
            returnQuantity: returnQtyByLineItemId.get(li.id) ?? 0,
            isRefunded: refundStatusByLineItemId.get(li.id) ?? false,
        })) ?? [];

    const hasAnyReturnable = items.some(
        (item) => item.refundableQuantity > 0 && item.returnStatus !== "REQUESTED"
    );

    const isFulfilled = order.fulfillmentStatus === "FULFILLED";

    const trackingData = buildLayerATrackingData(order, details);

    const firstFulfillment = details?.fulfillments?.nodes?.[0] ?? null;
    const firstTracking = firstFulfillment?.trackingInformation?.[0] ?? null;

    const trackingCompany = firstTracking?.company ?? null;
    const trackingNumber = firstTracking?.number ?? null;
    const trackingUrl = firstTracking?.url ?? null;
    const trackingUpdatedAt = firstFulfillment?.updatedAt ?? null;

    const deliveryMethod = details?.shippingLine?.title ?? null;

    const collapsedTotal = order.paymentInformation?.totalPaidAmount ?? order.totalPrice;

    const itemsSubtotal: Money = {
        amount: items
            .reduce((sum, item) => sum + toAmount(item.totalPrice), 0)
            .toFixed(2),
        currencyCode: collapsedTotal.currencyCode,
    };

    const refundTransactions =
        details?.transactions?.nodes?.filter((tx) => tx.kind === "REFUND") ?? [];

    const hasRefundPending = refundTransactions.some((tx) => tx.status === "PENDING");

    const pendingRefundAmount = refundTransactions
        .filter((tx) => tx.status === "PENDING")
        .reduce(
            (sum, tx) => sum + toAmount(tx.transactionAmount.presentmentMoney),
            0
        );

    const pendingRefundMoney: Money | null =
        hasRefundPending && details
            ? {
                amount: pendingRefundAmount.toFixed(2),
                currencyCode:
                    refundTransactions[0]?.transactionAmount.presentmentMoney.currencyCode ??
                    details.totalPrice.currencyCode,
            }
            : null;

    const hasRefundedAmount = !!details && toAmount(details.totalRefunded) > 0;

    const totalPaidAmount = order.paymentInformation?.totalPaidAmount ?? details?.totalPrice ?? null;

    const netPaidAmount: Money | null =
        details && totalPaidAmount
            ? {
                amount: (
                    toAmount(totalPaidAmount) - toAmount(details.totalRefunded)
                ).toFixed(2),
                currencyCode: totalPaidAmount.currencyCode,
            }
            : null;

    return (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
            <button
                type="button"
                onClick={toggle}
                className="flex w-full items-center justify-between gap-4 p-6 transition hover:bg-stone-50"
                aria-expanded={open}
            >
                <div className="min-w-0 text-left">
                    <div className="flex items-center gap-2">
                        <h3 className="truncate font-medium text-stone-900">{order.name}</h3>
                    </div>
                    <p className="text-sm text-stone-500">Placed {formatDate(order.processedAt)}</p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                    <Badge variant="secondary" className="bg-stone-100 text-stone-800">
                        {order.fulfillmentStatus}
                    </Badge>

                    <span className="text-sm font-medium text-stone-900">
                        {formatMoney(collapsedTotal)}
                    </span>

                    <ChevronDown
                        className={`h-5 w-5 text-stone-600 transition-transform ${open ? "rotate-180" : ""
                            }`}
                    />
                </div>
            </button>

            <div
                className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-border">
                        <div className="divide-y divide-border">
                            {open && loading && !details ? (
                                <OrderDetailsSkeleton />
                            ) : error ? (
                                <div className="p-5 text-sm text-red-600 md:p-6">{error}</div>
                            ) : (
                                <>
                                    <div className="space-y-3 p-5 md:p-6">
                                        {items.map((item) => (
                                            <LineItemRow key={item.id} item={item} />
                                        ))}
                                    </div>

                                    {details ? (
                                        <div className="space-y-2 p-5 text-sm md:p-6">
                                            <div className="flex items-center justify-between text-muted-foreground">
                                                <span>Items Subtotal</span>
                                                <span>{formatMoney(itemsSubtotal)}</span>
                                            </div>

                                            {details.shippingLine ? (
                                                <div className="flex items-center justify-between text-muted-foreground">
                                                    <span>Shipping</span>
                                                    <span>{formatMoney(details.shippingLine.originalPrice)}</span>
                                                </div>
                                            ) : null}

                                            <Separator className="my-2" />

                                            <div className="flex items-center justify-between font-medium">
                                                <span>Total Paid</span>
                                                <span>{formatMoney(totalPaidAmount)}</span>
                                            </div>

                                            {hasRefundPending ? (
                                                <div className="flex items-center justify-between text-muted-foreground">
                                                    <span>Refund</span>
                                                    <span>
                                                        {pendingRefundMoney
                                                            ? `${formatMoney(pendingRefundMoney)} pending`
                                                            : "Pending"}
                                                    </span>
                                                </div>
                                            ) : null}

                                            {hasRefundedAmount ? (
                                                <>
                                                    <div className="flex items-center justify-between text-muted-foreground">
                                                        <span>Refunded</span>
                                                        <span>-{formatMoney(details.totalRefunded)}</span>
                                                    </div>

                                                    <Separator className="my-2" />

                                                    <div className="flex items-center justify-between font-medium">
                                                        <span>Net Paid</span>
                                                        <span>{formatMoney(netPaidAmount)}</span>
                                                    </div>
                                                </>
                                            ) : null}
                                        </div>
                                    ) : null}
                                </>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 border-t border-border bg-accent/30 p-5 pt-3 md:p-6 md:pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 text-sm"
                                onClick={() => setTrackingOpen(true)}
                            >
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

                            {isFulfilled ? (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 text-sm"
                                        onClick={() => setReturnOpen(true)}
                                        disabled={!hasAnyReturnable}
                                    >
                                        <RotateCcw className="h-4 w-4" />
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
                            ) : null}

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