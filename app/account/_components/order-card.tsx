"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type OrderSummary = {
  id: string;
  name: string;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus?: string | null;
  totalPrice: { amount: string; currencyCode: string };
};

type OrderDetails = {
  id: string;
  lineItems: {
    nodes: Array<{
      id: string;
      title: string;
      quantity: number;
      variantTitle?: string | null;
      price?: { amount: string; currencyCode: string };
      image?: { url: string; altText?: string | null } | null;
    }>;
  };
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function OrderCard({ order }: { order: OrderSummary }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    const next = !open;
    setOpen(next);

    if (next && !details && !loading) {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/account/order-details?id=${encodeURIComponent(order.id)}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to load");

        const json = await res.json();
        setDetails(json.order);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      
      {/* HEADER */}
      <button
        onClick={toggle}
        className="w-full p-6 flex justify-between items-center hover:bg-stone-50 transition"
      >
        <div className="text-left">
          <h3 className="font-medium text-stone-900">{order.name}</h3>
          <p className="text-sm text-stone-500">
            Placed {formatDate(order.processedAt)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Badge className="bg-stone-100 text-stone-800">
            {order.fulfillmentStatus}
          </Badge>

          {order.financialStatus && (
            <Badge className="bg-stone-100 text-stone-800">
              {order.financialStatus}
            </Badge>
          )}

          <span className="font-medium text-stone-900">
            {order.totalPrice.amount} {order.totalPrice.currencyCode}
          </span>

          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* BODY */}
      {open && (
        <div className="border-t border-stone-200 p-6 space-y-4 bg-white">
          {loading && (
            <p className="text-sm text-stone-500">Loading items…</p>
          )}

          {details?.lineItems.nodes.map((li) => (
            <div key={li.id} className="flex gap-4 items-center">
              
              {/* image */}
              {li.image?.url ? (
                <Image
                  src={li.image.url}
                  width={70}
                  height={70}
                  alt={li.image.altText ?? li.title}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="w-[70px] h-[70px] bg-stone-100 rounded-md" />
              )}

              {/* info */}
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">
                  {li.title}
                </p>

                {li.variantTitle && (
                  <p className="text-xs text-stone-500">
                    {li.variantTitle}
                  </p>
                )}
              </div>

              {/* qty */}
              <div className="text-sm text-stone-700">
                Qty {li.quantity}
              </div>
            </div>
          ))}

          {/* FOOTER ACTIONS */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap gap-3">
            <button className="text-sm underline text-stone-700">
              Track shipment
            </button>

            <button className="text-sm underline text-stone-700">
              Request return
            </button>

            <button className="text-sm underline text-stone-700">
              Reorder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}