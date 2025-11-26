"use client";

import { useState } from "react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.errors?.[0]?.message || "Failed to sign up.");
      setLoading(false);
      return;
    }

    window.location.href = "/account";
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-2xl font-semibold mb-6">Create an Account</h1>

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

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
