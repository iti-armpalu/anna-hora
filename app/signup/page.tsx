"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";


export default function SignupPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

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
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    if (!res.ok) {
      const data = await res.json();
      const firstError = data.errors?.[0]?.message || "Failed to create account.";
      setError(firstError);
      setLoading(false);
      return;
    }

    // Update UI client-side auth state
    setAuthenticated(true);

    // Redirect after successful signup
    window.location.href = redirect;
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h1 className="text-2xl font-semibold mb-6">Create an Account</h1>

      {redirect !== "/account" && (
        <p className="text-sm text-gray-600 mb-4">
          After creating your account, we’ll take you to{" "}
          <span className="font-medium">{redirect}</span>.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="firstName"
          type="text"
          required
          className="w-full border px-3 py-2 rounded bg-white"
          placeholder="First name"
        />

        <input
          name="lastName"
          type="text"
          required
          className="w-full border px-3 py-2 rounded bg-white"
          placeholder="Last name"
        />

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
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-sm mt-4 text-gray-600">
        Already have an account?{" "}
        <a
          href={`/signin?redirect=${encodeURIComponent(redirect)}`}
          className="underline"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
