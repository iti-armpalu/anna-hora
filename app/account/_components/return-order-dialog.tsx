"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import Image from "next/image"
import { Order } from "@/lib/normalizers/order"

interface ReturnOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order;
}

export default function ReturnOrderDialog({
    open,
    onOpenChange,
    order,
}: ReturnOrderDialogProps) {
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [returnReason, setReturnReason] = useState("")
    const [additionalDetails, setAdditionalDetails] = useState("")

    const returnReasons = [
        "Changed my mind",
        "Item doesn't fit",
        "Item damaged or defective",
        "Wrong item received",
        "Item not as described",
        "Quality not as expected",
        "Other",
    ]

    const handleItemToggle = (index: number) => {
        setSelectedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    const handleSubmitReturn = () => {
        if (selectedItems.length === 0) {
            toast.error("Please select at least one item to return")
            return
        }

        if (!returnReason) {
            toast.error("Please select a reason for return")
            return
        }

        // Here you would typically submit to an API
        toast.success("Return request submitted successfully. We'll send you a return label via email.")

        // Reset form
        setSelectedItems([])
        setReturnReason("")
        setAdditionalDetails("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-serif text-2xl text-stone-800">Initiate Return</DialogTitle>
                    <DialogDescription className="text-stone-600">
                        Order {order.id} - Select items to return and provide details
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Select Items */}
                    <div className="space-y-3">
                        <Label className="text-base font-medium text-stone-800">Select items to return</Label>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-3 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
                                >
                                    <Checkbox
                                        checked={selectedItems.includes(index)}
                                        onCheckedChange={() => handleItemToggle(index)}
                                        className="mt-1"
                                    />
                                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-md">
                                        <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-stone-800 text-sm">{item.title}</h4>
                                        <p className="text-xs text-stone-600">
                                            {/* {item.color} • {item.size} */}
                                        </p>
                                        <p className="text-sm font-medium text-stone-800 mt-1">${item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Return Reason */}
                    <div className="space-y-3">
                        <Label className="text-base font-medium text-stone-800">Reason for return</Label>
                        <RadioGroup value={returnReason} onValueChange={setReturnReason}>
                            {returnReasons.map((reason) => (
                                <div key={reason} className="flex items-center space-x-2">
                                    <RadioGroupItem value={reason} id={reason} />
                                    <Label htmlFor={reason} className="font-normal cursor-pointer text-stone-700">
                                        {reason}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-3">
                        <Label htmlFor="details" className="text-base font-medium text-stone-800">
                            Additional details (optional)
                        </Label>
                        <Textarea
                            id="details"
                            placeholder="Please provide any additional information about your return..."
                            value={additionalDetails}
                            onChange={(e) => setAdditionalDetails(e.target.value)}
                            className="min-h-[100px] resize-none"
                        />
                    </div>

                    {/* Return Policy Note */}
                    <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
                        <p className="text-sm text-stone-600">
                            <strong className="text-stone-800">Return Policy:</strong> Items must be returned within 30 days of
                            delivery, unworn and in original packaging. We will email you a prepaid return label within 24 hours.
                            Refunds are processed within 5-7 business days after we receive your return.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitReturn} className="bg-stone-800 hover:bg-stone-700">
                        Submit Return Request
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
