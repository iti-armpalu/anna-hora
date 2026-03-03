"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RotateCcw, CheckCircle2 } from "lucide-react";
import { LineItemRow, type LineItemDetails } from "./line-item-row";

const RETURN_REASONS = [
    { value: "SIZE_TOO_SMALL", label: "Too small" },
    { value: "SIZE_TOO_LARGE", label: "Too large" },
    { value: "UNWANTED", label: "Changed my mind" },
    { value: "NOT_AS_DESCRIBED", label: "Not as described" },
    { value: "WRONG_ITEM", label: "Wrong item sent" },
    { value: "DEFECTIVE", label: "Defective / damaged" },
    { value: "STYLE", label: "Style" },
    { value: "COLOR", label: "Color" },
    { value: "OTHER", label: "Other" },
    { value: "UNKNOWN", label: "Prefer not to say" },
] as const;

interface RequestReturnDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderNumber: string;
    orderId: string;
    items: LineItemDetails[];
}

function isLocked(item: LineItemDetails) {
    return item.returnStatus === "REQUESTED" || item.returnStatus === "APPROVED";
}

export function RequestReturnDialog({
    open,
    onOpenChange,
    orderNumber,
    orderId,
    items,
}: RequestReturnDialogProps) {
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
        new Set()
    );
    const [reasons, setReasons] = useState<Record<string, string>>({});
    const [returnQtys, setReturnQtys] = useState<Record<string, number>>({});
    const [notes, setNotes] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
    const [error, setError] = useState<string>("");

    const toggleProduct = (id: string, maxQty: number) => {
        setSelectedProducts((prev) => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
                setReasons((r) => {
                    const { [id]: _, ...rest } = r;
                    return rest;
                });
                setReturnQtys((q) => {
                    const { [id]: _, ...rest } = q;
                    return rest;
                });
            } else {
                next.add(id);
                // default to max returnable qty (you can change to 1 if you prefer)
                setReturnQtys((q) => ({ ...q, [id]: Math.max(1, maxQty) }));
            }

            return next;
        });
    };

    const setReasonForProduct = (id: string, reason: string) => {
        setReasons((prev) => ({ ...prev, [id]: reason }));
    };

    const canSubmit =
        selectedProducts.size > 0 &&
        [...selectedProducts].every((id) => Boolean(reasons[id])) &&
        status !== "submitting";

    async function handleSubmit() {
        if (!canSubmit) return;

        setStatus("submitting");
        setError("");

        try {
            const requestedLineItems = [...selectedProducts].map((id) => ({
                lineItemId: id,
                quantity: Math.max(1, Math.floor(Number(returnQtys[id] ?? 1))),
                returnReason: reasons[id],
                customerNote: notes.trim() || undefined,
            }));

            const res = await fetch("/api/returns/request", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    orderId,
                    requestedLineItems,
                }),
            });

            const json = await res.json().catch(() => null);

            if (!res.ok) {
                setError(
                    json?.userErrors?.[0]?.message ||
                    json?.error ||
                    "Failed to submit return request"
                );
                setStatus("error");
                return;
            }

            setSubmitted(true);
            setStatus("idle");
        } catch (err) {
            console.error("Return submit failed:", err);
            setError("Unexpected error. Please try again.");
            setStatus("error");
        }
    }

    const handleClose = () => {
        onOpenChange(false);

        setTimeout(() => {
            setSelectedProducts(new Set());
            setReasons({});
            setReturnQtys({});
            setNotes("");
            setSubmitted(false);
            setStatus("idle");
            setError("");
        }, 250);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden rounded-xl">
                {submitted ? (
                    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-5">
                            <CheckCircle2 className="w-7 h-7 text-success" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-card-foreground mb-2">
                            Return Requested
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-xs mb-8">
                            We&apos;ve received your return request for {orderNumber}. You&apos;ll
                            get an email with return instructions shortly.
                        </p>
                        <Button onClick={handleClose} className="px-8">
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader className="p-6 pb-4">
                            <DialogTitle className="font-display text-lg font-bold text-card-foreground">
                                Request Return
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                                Select the items you&apos;d like to return from {orderNumber}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="px-6 space-y-5">
                            {/* Select items */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Select Items
                                </label>

                                <div className="rounded-lg border border-border divide-y divide-border">
                                    {items.map((item) => {
                                        const checked = selectedProducts.has(item.id);
                                        const locked = isLocked(item);
                                        const disabled = locked || item.returnableQuantity === 0;

                                        return (
                                            <div key={item.id} className="p-3">
                                                <label
                                                    className={[
                                                        "flex items-center gap-3 p-3 transition-colors rounded-lg",
                                                        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                                                        checked ? "bg-accent/50" : disabled ? "" : "hover:bg-accent/30",
                                                    ].join(" ")}
                                                >
                                                    <Checkbox
                                                        checked={checked}
                                                        disabled={disabled}
                                                        onCheckedChange={() => {
                                                            if (disabled) return;
                                                            // ✅ use returnableQuantity as the max
                                                            toggleProduct(item.id, item.returnableQuantity);
                                                        }}
                                                    />
                                                    <LineItemRow item={item} />
                                                </label>

                                                {disabled ? (
                                                    <p className="pl-10 pt-2 text-xs text-stone-500">
                                                        {locked
                                                            ? "Return already requested for this item."
                                                            : "This item is not returnable."}
                                                    </p>
                                                ) : null}

                                                {checked && !disabled ? (
                                                    <div className="px-3 pb-3 pt-2 pl-10 space-y-2">
                                                        <Select
                                                            value={reasons[item.id] || ""}
                                                            onValueChange={(v) => setReasonForProduct(item.id, v)}
                                                        >
                                                            <SelectTrigger className="w-full h-8 text-xs">
                                                                <SelectValue placeholder="Select reason for return…" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {RETURN_REASONS.map((r) => (
                                                                    <SelectItem key={r.value} value={r.value}>
                                                                        {r.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                        {item.returnableQuantity > 1 ? (
                                                            <div className="flex items-center gap-2">
                                                                <label className="text-xs text-muted-foreground whitespace-nowrap">
                                                                    Return qty:
                                                                </label>

                                                                <Select
                                                                    value={String(returnQtys[item.id] || 1)}
                                                                    onValueChange={(v) =>
                                                                        setReturnQtys((prev) => ({
                                                                            ...prev,
                                                                            [item.id]: Number(v),
                                                                        }))
                                                                    }
                                                                >
                                                                    <SelectTrigger className="w-20 h-8 text-xs">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {Array.from(
                                                                            { length: item.returnableQuantity },
                                                                            (_, i) => i + 1
                                                                        ).map((n) => (
                                                                            <SelectItem key={n} value={String(n)}>
                                                                                {n}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>

                                                                <span className="text-xs text-muted-foreground">
                                                                    of {item.returnableQuantity}
                                                                </span>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Additional Notes{" "}
                                    <span className="normal-case text-muted-foreground/60">
                                        (optional)
                                    </span>
                                </label>
                                <Textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Describe the issue or reason in more detail…"
                                    rows={3}
                                    className="resize-none"
                                />
                            </div>

                            {/* Error */}
                            {error ? (
                                <p className="text-sm text-red-600">{error}</p>
                            ) : null}
                        </div>

                        <DialogFooter className="p-6 pt-5 flex-row gap-2">
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                className="flex-1 sm:flex-none"
                            >
                                Cancel
                            </Button>

                            <Button
                                disabled={!canSubmit}
                                onClick={handleSubmit}
                                className="flex-1 sm:flex-none gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                {status === "submitting" ? "Submitting…" : "Submit Return"}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}