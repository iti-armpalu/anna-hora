"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { AuthLayout } from "@/components/header/auth-layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";


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
    <AuthLayout title="Create an Account" description="Join us for the finest silk loungewear experience">
      <>
        {redirect !== "/account" && (
          <p className="text-sm text-gray-600 mb-4">
            After creating your account, we’ll take you to{" "}
            <span className="font-medium">{redirect}</span>.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
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
          </div>


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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
            // checked={acceptTerms}
            // onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label
              htmlFor="terms"
              className="text-sm text-card-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:text-primary/80 underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:text-primary/80 underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

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

        <div className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link
            href={`/signin?redirect=${encodeURIComponent(redirect)}`}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign in
          </Link>
        </div>
      </>
    </AuthLayout>
  );
}
