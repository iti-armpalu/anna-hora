"use client";

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
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderNumber: string;
  steps: TrackingStep[];
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

        <div className="relative pl-1 py-1">
          {steps.map((step, i) => {
            const Icon = getStepIcon(step.label);
            const isLast = i === steps.length - 1;

            return (
              <div key={i} className="relative flex gap-3.5">
                {!isLast && (
                  <div
                    className={`absolute left-[13px] top-[28px] w-[2px] bottom-0 ${
                      step.completed ? "bg-emerald-400" : "bg-border"
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
                    className={`text-sm font-medium leading-7 ${
                      step.completed || step.active
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