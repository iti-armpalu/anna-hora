import Image from "next/image";

type Money = { amount: string; currencyCode: string };

export type LineItemDetails = {
  id: string;
  name: string; // Shopify line item name (often "Product - Variant")
  quantity: number;

  variantOptions?: Array<{ name: string; value: string }> | null;

  imageUrl: string | null;
  imageAlt?: string | null;

  currentTotalPrice?: Money | null; // line total
  unitPrice?: { price: Money } | null; // optional: per-item
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

export function LineItemRow({ item }: { item: LineItemDetails }) {
  const title = item.name.split(" - ")[0]; // keeps product name only
  const color = getOptionValue(item.variantOptions, "color");
  const size = getOptionValue(item.variantOptions, "size");

  return (
    <div className="flex items-start justify-between gap-4 p-5 md:p-6">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-16 h-16 rounded-md overflow-hidden bg-stone-100 shrink-0">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              width={64}
              height={64}
              alt={item.imageAlt ?? title}
              className="w-16 h-16 object-cover"
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-stone-900 truncate">{title}</p>

          {/* Variant info row */}
          <p className="text-xs text-stone-500 mt-1">
            {[color, size].filter(Boolean).join(" · ")}
            {([color, size].filter(Boolean).length ? " · " : "")}
            Quantity: {item.quantity}
          </p>

          {/* Optional: unit price */}
          {item.unitPrice?.price ? (
            <p className="text-xs text-stone-500 mt-1">
              {formatMoney(item.unitPrice.price)} each
            </p>
          ) : null}
        </div>
      </div>

      {/* Line total */}
      <div className="text-sm font-medium text-stone-900 whitespace-nowrap">
        {formatMoney(item.currentTotalPrice)}
      </div>
    </div>
  );
}