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

export function LineItemRow({ item }: { item: LineItemDetails }) {
  const title = item.name.split(" - ")[0];
  const color = getOptionValue(item.variantOptions, "color");
  const size = getOptionValue(item.variantOptions, "size");

  const metaParts = [
    color,
    size,
    `Quantity: ${item.quantity}`,
    item.price ? `${formatMoney(item.price)}` : null,
  ].filter(Boolean);

  const metaText = metaParts.join(" · ");

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

        {metaText ? (
          <p className="mt-1 text-xs text-stone-500">{metaText}</p>
        ) : null}


        {returnEvents.length > 0 ? (
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs italic text-stone-600">
            {returnEvents.map((event, index) => (
              <span
                key={`${event.returnId}-${event.quantity}-${event.status}-${event.isRefunded}`}
                className="flex items-center"
              >
                <span className="font-medium text-stone-900">
                  {event.returnName ?? "Return"}
                </span>

                <span className="mx-1 text-stone-400">—</span>

                <span>{getReturnEventLabel(event)}</span>

                {index < returnEvents.length - 1 && (
                  <span className="mx-2 text-stone-400">·</span>
                )}
              </span>
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