import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    items: LineItemDetails[];
}

export function RequestReturnDialog({ open, onOpenChange, orderNumber, items }: RequestReturnDialogProps) {
    const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
    const [reasons, setReasons] = useState<Record<string, string>>({});
    const [returnQtys, setReturnQtys] = useState<Record<string, number>>({});
    const [notes, setNotes] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const toggleProduct = (id: string, quantity: number) => {
        setSelectedProducts((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
                setReasons((r) => { const { [id]: _, ...rest } = r; return rest; });
                setReturnQtys((r) => { const { [id]: _, ...rest } = r; return rest; });
            } else {
                next.add(id);
                setReturnQtys((prev) => ({ ...prev, [id]: quantity }));
            }
            return next;
        });
    };

    const setReasonForProduct = (id: string, reason: string) => {
        setReasons((prev) => ({ ...prev, [id]: reason }));
    };

    const handleSubmit = () => {

        setSubmitted(true);
    };

    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => {
            setSelectedProducts(new Set());
            setReasons({});
            setReturnQtys({});
            setNotes("");
            setSubmitted(false);
        }, 300);
    };

    const canSubmit = selectedProducts.size > 0 && [...selectedProducts].every((id) => reasons[id]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden rounded-xl">
                {submitted ? (
                    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-5">
                            <CheckCircle2 className="w-7 h-7 text-success" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-card-foreground mb-2">Return Requested</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mb-8">
                            We've received your return request for {orderNumber}. You'll get an email with return instructions shortly.
                        </p>
                        <Button onClick={handleClose} className="px-8">Done</Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader className="p-6 pb-4">
                            <div className="flex items-center gap-3 mb-1">
                                <DialogTitle className="font-display text-lg font-bold text-card-foreground">
                                    Request Return
                                </DialogTitle>
                            </div>
                            <DialogDescription className="text-sm text-muted-foreground pl-12">
                                Select the items you'd like to return from {orderNumber}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="px-6 space-y-5">
                            {/* Product selection with per-item reasons */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Select Items</label>
                                <div className="rounded-lg border border-border divide-y divide-border">
                                    {items.map((item) => (
                                        <div key={item.id} className="p-3">
                                            <LineItemRow item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Additional Notes <span className="normal-case text-muted-foreground/60">(optional)</span>
                                </label>
                                <Textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Describe the issue or reason in more detail…"
                                    rows={3}
                                    className="resize-none"
                                />
                            </div>
                        </div>

                        <DialogFooter className="p-6 pt-5 flex-row gap-2">
                            <Button variant="outline" onClick={handleClose} className="flex-1 sm:flex-none">
                                Cancel
                            </Button>
                            <Button disabled={!canSubmit} onClick={handleSubmit} className="flex-1 sm:flex-none gap-2">
                                <RotateCcw className="w-4 h-4" />
                                Submit Return
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
