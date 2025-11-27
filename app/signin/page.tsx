"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";


export default function SigninPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account"; // default

  const { setAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.errors?.[0] ?? "Invalid login.");
      setLoading(false);
      return;
    }

    // Update UI auth state (client-side convenience only)
    setAuthenticated(true);

    // Redirect to original page or account dashboard
    window.location.href = redirect;
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-2xl font-semibold mb-6">Sign In</h1>

      {redirect !== "/account" && (
        <p className="text-sm text-gray-600 mb-4">
          You must be signed in to view <span className="font-medium">{redirect}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          required
          className="w-full border px-3 py-2 rounded bg-white"
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          required
          className="w-full border px-3 py-2 rounded bg-white"
          placeholder="Password"
        />

        {error && (
          <p className="text-red-600 text-sm whitespace-pre-line">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-sm mt-4 text-gray-600">
        Don’t have an account?{" "}
        <a
          href={`/signup?redirect=${encodeURIComponent(redirect)}`}
          className="underline"
        >
          Create one
        </a>
      </p>
    </div>
  );
}
