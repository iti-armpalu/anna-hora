"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { AuthLayout } from "@/components/header/auth-layout";
import Link from "next/link";


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

    <AuthLayout title="Welcome back" description="Sign in to your account to continue">
      <>

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

          <div className="flex items-center justify-between">
            <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>


        <div className="text-center text-sm text-muted-foreground mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup?redirect=${encodeURIComponent(redirect)}`}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>

      </>
    </AuthLayout>
  );
}
