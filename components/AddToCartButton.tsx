"use client";
import { useState } from "react";


export function AddToCartButton({ variantId }: { variantId: string }) {
    const [loading, setLoading] = useState(false);
    async function add() {
        setLoading(true);
        await fetch("/api/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ variantId, quantity: 1 }),
        });
        setLoading(false);
    }
    return (
        <button onClick={add} disabled={loading} className="mt-4 bg-black text-white px-4 py-2 rounded">
            {loading ? "Adding…" : "Add to cart"}
        </button>
    );
}