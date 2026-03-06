import { Check, Truck, MapPin } from "lucide-react";

export type DeliveryStage =
  | "CONFIRMED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "PICKED_UP";

export type DeliveryMethod = "HOME_DELIVERY" | "PICKUP";

interface Step {
  label: string;
  completed: boolean;
  active: boolean;
}

function getStepIndex(stage: DeliveryStage): number {
  if (stage === "CONFIRMED") return 0;
  if (stage === "IN_TRANSIT") return 1;
  return 2; // DELIVERED or PICKED_UP
}

function buildSteps(
  stage: DeliveryStage,
  method: DeliveryMethod
): Step[] {
  const activeIndex = getStepIndex(stage);

  const finalLabel =
    method === "PICKUP" ? "Picked Up" : "Delivered";

  const labels = ["Confirmed", "On Its Way", finalLabel];

  return labels.map((label, i) => ({
    label,
    completed: i < activeIndex,
    active: i === activeIndex,
  }));
}

export function DeliveryProgress({
  stage,
  method = "HOME_DELIVERY",
}: {
  stage: DeliveryStage;
  method?: DeliveryMethod;
}) {
  const steps = buildSteps(stage, method);

  const methodLabel =
    method === "PICKUP" ? "Pickup from location" : "Home delivery";
  const MethodIcon = method === "PICKUP" ? MapPin : Truck;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Steps */}
      <div className="flex items-center gap-0">
        {steps.map((step, i) => {
          const isCompleted = step.completed;
          const isActive = step.active;

          return (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-1.5">
                <div
                  className={`flex items-center justify-center shrink-0 rounded-full transition-colors ${
                    isCompleted
                      ? "h-4 w-4 bg-emerald-500"
                      : isActive
                        ? "h-4 w-4 border-2 border-emerald-500 bg-emerald-50"
                        : "h-4 w-4 border-2 border-border bg-background"
                  }`}
                >
                  {isCompleted && (
                    <Check
                      className="h-2.5 w-2.5 text-primary-foreground"
                      strokeWidth={3}
                    />
                  )}
                  {isActive && (
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                </div>
                <span
                  className={`text-[11px] leading-none whitespace-nowrap ${
                    isCompleted
                      ? "text-emerald-700 font-medium"
                      : isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div
                  className={`mx-2 h-[2px] w-6 rounded-full transition-colors ${
                    isCompleted ? "bg-emerald-400" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Delivery method label */}
      <div className="flex items-center gap-1 ml-0.5">
        <MethodIcon className="h-3 w-3 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">{methodLabel}</span>
      </div>
    </div>
  );
}
