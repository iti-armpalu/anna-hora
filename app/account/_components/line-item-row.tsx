import Image from "next/image";

type Money = { amount: string; currencyCode: string };

type ReturnEvent = {
  returnId: string;
  returnName: string | null;
  status: string;
  quantity: number;
  isRefunded: boolean;
};

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

  returnEvents?: ReturnEvent[];
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

function getReturnEventLabel(event: ReturnEvent): string {
  const plural = event.quantity > 1 ? "items" : "item";

  if (event.isRefunded) {
    return `refunded - ${event.quantity} ${plural}`;
  }

  switch (event.status) {
    case "REQUESTED":
      return `refund requested - ${event.quantity} ${plural}`;
    case "OPEN":
      return `return in progress - ${event.quantity} ${plural}`;
    case "CLOSED":
      return `returned - ${event.quantity} ${plural}`;
    case "DECLINED":
      return `return declined - ${event.quantity} ${plural}`;
    case "CANCELED":
      return `return canceled - ${event.quantity} ${plural}`;
    default:
      return `returned - ${event.quantity} ${plural}`;
  }
}

function getReturnBadgeClasses(event: ReturnEvent): string {
  if (event.isRefunded) {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
  }

  switch (event.status) {
    case "REQUESTED":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";
    case "OPEN":
      return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";
    case "CLOSED":
      return "bg-stone-100 text-stone-700 ring-1 ring-inset ring-stone-200";
    case "DECLINED":
      return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";
    case "CANCELED":
      return "bg-stone-100 text-stone-600 ring-1 ring-inset ring-stone-200";
    default:
      return "bg-stone-100 text-stone-700 ring-1 ring-inset ring-stone-200";
  }
}

export function LineItemRow({ item }: { item: LineItemDetails }) {
  const title = item.name.split(" - ")[0];
  const color = getOptionValue(item.variantOptions, "color");
  const size = getOptionValue(item.variantOptions, "size");
  const variantText = [color, size].filter(Boolean).join(" · ");

  const returnEvents = item.returnEvents ?? [];

  return (
    <div className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent/40">
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="m9.5 15 3-4.5 3 4.5" />
              <circle cx="9" cy="9" r="1.5" />
            </svg>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-stone-900">{title}</p>

        {variantText ? (
          <p className="mt-1 text-xs text-stone-500">{variantText}</p>
        ) : null}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            Quantity: {item.quantity}
          </span>

          {item.price ? (
            <span className="text-xs text-muted-foreground">
              @ {formatMoney(item.price)} each
            </span>
          ) : null}
        </div>

        {returnEvents.length > 0 ? (
          <div className="mt-3 space-y-2">
            {returnEvents.map((event) => (
              <div
                key={`${event.returnId}-${event.quantity}-${event.status}-${event.isRefunded}`}
                className="flex flex-wrap items-center gap-2 rounded-lg bg-stone-50 px-3 py-2"
              >
                <span className="text-xs font-medium text-stone-900">
                  {event.returnName ?? "Return"}
                </span>

                <span className="text-xs text-stone-500">—</span>

                <span className="text-xs text-stone-600">
                  {getReturnEventLabel(event)}
                </span>

                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ${getReturnBadgeClasses(
                    event
                  )}`}
                >
                  {event.isRefunded ? "Refunded" : event.status}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="shrink-0 text-right">
        <span className="text-sm font-semibold text-card-foreground">
          {formatMoney(item.totalPrice)}
        </span>
      </div>
    </div>
  );
}