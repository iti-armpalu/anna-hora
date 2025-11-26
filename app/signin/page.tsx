"use client";

import { useState } from "react";

export default function SigninPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const json = await res.json();
      setError(json.error || "Invalid email or password");
      return;
    }

    // Redirect to the account page
    window.location.href = "/account";
  }

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <h1 className="text-2xl font-semibold mb-6">Sign in to your account</h1>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <input
          type="email"
          className="border p-3 rounded-md"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="border p-3 rounded-md"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-3 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
      </form>

      <p className="text-sm mt-4 text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/signup"
          className="text-black underline hover:opacity-70"
        >
          Create one
        </a>
      </p>
    </div>
  );
}
