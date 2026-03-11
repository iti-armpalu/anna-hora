import Image from "next/image";

type Money = { amount: string; currencyCode: string };

export type LineItemDetails = {
  id: string;
  name: string;
  quantity: number;

  variantOptions?: Array<{ name: string; value: string }> | null;

  imageUrl: string | null;
  imageAlt?: string | null;

  totalPrice?: Money | null;
  currentTotalPrice?: Money | null;
  price?: Money | null;

  refundableQuantity: number;

  returnStatus?: string | null;
  returnQuantity?: number;
};

function getOptionValue(
  opts: Array<{ name: string; value: string }> | null | undefined,
  key: string
) {
  if (!opts?.length) return null;
  const found = opts.find((o) => o.name.toLowerCase() === key.toLowerCase());
  return found?.value ?? null;
}

function formatMoney(m?: Money | null) {
  if (!m) return "—";
  const n = Number(m.amount);
  const amount = Number.isFinite(n) ? n.toFixed(2) : m.amount;
  return `${amount} ${m.currencyCode}`;
}

function getReturnLabel(
  status?: string | null,
  quantity?: number
): { text: string; badge: string } | null {
  if (!status || !quantity) return null;

  const plural = quantity > 1 ? "s" : "";

  switch (status) {
    case "REQUESTED":
      return {
        text: `${quantity} item${plural} return requested`,
        badge: "Return requested",
      };

    case "APPROVED":
      return {
        text: `${quantity} item${plural} approved for return`,
        badge: "Return approved",
      };

    case "CLOSED":
      return {
        text: `${quantity} item${plural} refunded`,
        badge: "Refunded",
      };

    default:
      return {
        text: `${quantity} item${plural} returned`,
        badge: "Returned",
      };
  }
}

export function LineItemRow({ item }: { item: LineItemDetails }) {
  const title = item.name.split(" - ")[0]; // keeps product name only
  const color = getOptionValue(item.variantOptions, "color");
  const size = getOptionValue(item.variantOptions, "size");

  const variantText = [color, size].filter(Boolean).join(" · ");

  const returnInfo = getReturnLabel(item.returnStatus, item.returnQuantity);

  console.log("LineItemRow item:", item);
  console.log("returnInfo:", returnInfo);

  return (
    <div className="w-full flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent/40">

      {/* Product image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.imageAlt ?? title}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="m9.5 15 3-4.5 3 4.5" />
              <circle cx="9" cy="9" r="1.5" />
            </svg>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-stone-900 truncate">{title}</p>

        {/* Variant info row */}
        {variantText && (
          <p className="text-xs text-stone-500 mt-1">
            {variantText}
          </p>
        )}

        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {"Quantity: "}{item.quantity}
          </span>

          {item.price && (
            <span className="text-xs text-muted-foreground">
              {"@ "}{formatMoney(item.price)}{" each"}
            </span>
          )}
        </div>

        {returnInfo && (
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground italic">
              {returnInfo.text}
            </span>

            <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {returnInfo.badge}
            </span>
          </div>
        )}

      </div>

      {/* Line total */}
      <div className="shrink-0 text-right">
        <span className="text-sm font-semibold text-card-foreground">
          {formatMoney(item.totalPrice)}
        </span>
      </div>

    </div>
  );
}