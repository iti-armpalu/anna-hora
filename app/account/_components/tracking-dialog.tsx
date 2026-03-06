"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Check, Circle, ClipboardList, Package, PackageCheck } from "lucide-react";

type TrackingStep = {
    label: string;
    description: string;
    date: string | null;
    completed: boolean;
    active: boolean;
};

function getStepIcon(label: string) {
    if (label === "Order confirmed") return ClipboardList;
    if (label === "Processing" || label === "In progress") return Package;
    return PackageCheck;
}

export function TrackingDialog({
    open,
    onOpenChange,
    orderNumber,
    steps,
    deliveryMethod,
    trackingCompany,
    trackingNumber,
    trackingUrl,
    trackingUpdatedAt
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderNumber: string;
    steps: TrackingStep[];
    deliveryMethod?: string | null;
    trackingCompany?: string | null;
    trackingNumber?: string | null;
    trackingUrl?: string | null;
    trackingUpdatedAt?: string | null;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Track Order {orderNumber}</DialogTitle>
                    <DialogDescription>
                        View the progress of your order.
                    </DialogDescription>
                </DialogHeader>

                {/* Info row */}
                <div className="flex flex-wrap items-center gap-2">
                    <Badge
                        variant="outline"
                        className="gap-1.5 font-normal text-xs py-1 px-2.5"
                    >
                        {deliveryMethod}
                    </Badge>
                </div>

                {/* Tracking information */}
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                        Tracking information
                    </p>

                    {trackingCompany || trackingNumber || trackingUrl ? (
                        <div className="space-y-2">
                            {trackingCompany ? (
                                <p className="text-sm text-foreground">
                                    Carrier: <span className="font-medium">{trackingCompany}</span>
                                </p>
                            ) : null}

                            {trackingNumber ? (
                                <p className="text-sm text-foreground">
                                    Tracking number: <span className="font-medium font-mono">{trackingNumber}</span>
                                </p>
                            ) : null}

                            {trackingUrl ? (
                                <Button asChild variant="outline" size="sm" className="mt-2">
                                    <a href={trackingUrl} target="_blank" rel="noreferrer">
                                        Track package
                                    </a>
                                </Button>
                            ) : null}
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <p className="text-sm text-foreground font-medium">
                                Tracking info will appear here soon
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Once your package has been handed to the carrier, we’ll show the tracking company,
                                tracking number, and tracking link here.
                            </p>
                        </div>
                    )}
                </div>


                <div className="relative pl-1 py-1">
                    {steps.map((step, i) => {
                        const Icon = getStepIcon(step.label);
                        const isLast = i === steps.length - 1;

                        return (
                            <div key={i} className="relative flex gap-3.5">
                                {!isLast && (
                                    <div
                                        className={`absolute left-[13px] top-[28px] w-[2px] bottom-0 ${step.completed ? "bg-emerald-400" : "bg-border"
                                            }`}
                                    />
                                )}

                                <div className="relative z-10 shrink-0">
                                    {step.completed ? (
                                        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-emerald-500">
                                            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                        </div>
                                    ) : step.active ? (
                                        <div className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-emerald-500 bg-emerald-50">
                                            <Icon className="h-3.5 w-3.5 text-emerald-600" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-border bg-background">
                                            <Circle className="h-2.5 w-2.5 text-muted-foreground/40" />
                                        </div>
                                    )}
                                </div>

                                <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                                    <p
                                        className={`text-sm font-medium leading-7 ${step.completed || step.active
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        {step.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {step.description}
                                    </p>

                                    {step.date && (
                                        <p className="text-[11px] text-muted-foreground/70 mt-1 font-mono">
                                            {step.date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}