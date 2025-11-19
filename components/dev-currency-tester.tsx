"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const COUNTRIES = [
  { code: "GB", label: "🇬🇧 GBP" },
  { code: "AE", label: "🇦🇪 AED" },
  { code: "US", label: "🇺🇸 USD" },
  { code: "EU", label: "🇪🇺 EUR" },
  { code: "CZ", label: "CZ" },
];

export function DevCurrencyTester() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (process.env.NODE_ENV === "production") return null;

  async function setCountry(code: string) {
    setLoading(true);

    // write cookie
    document.cookie = `country=${code}; path=/; max-age=31536000`;

    // small delay so cookie is applied
    setTimeout(() => {
      router.refresh();
    }, 150);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-stone-300 rounded-lg shadow-xl p-3 flex gap-2">
      {COUNTRIES.map((c) => (
        <button
          key={c.code}
          onClick={() => setCountry(c.code)}
          disabled={loading}
          className="px-3 py-1 rounded-md text-sm font-medium border border-stone-300 hover:bg-stone-100"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
