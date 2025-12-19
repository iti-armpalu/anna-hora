 "use client";

import { useActionState } from "react";
import Link from "next/link";

import { forgotPasswordAction } from "@/lib/actions/auth/forgot-password";
import {
  initialAuthState,
  type AuthActionState,
} from "@/lib/actions/auth/auth-state";

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState<
    AuthActionState,
    FormData
  >(forgotPasswordAction, initialAuthState);

  // Success state (important UX)
  if (state.ok) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-stone-700">
          If an account exists for that email, you’ll receive a password reset
          link shortly.
        </p>

        <Link
          href="/signin"
          className="text-sm text-primary hover:text-primary/80 underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        className="w-full border px-3 py-2 rounded bg-white"
        placeholder="Email address"
      />

      {state.formError && (
        <p className="text-sm text-red-600">{state.formError}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
      >
        {isPending ? "Sending reset link..." : "Send reset link"}
      </button>

      <div className="text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link
          href="/signin"
          className="text-primary hover:text-primary/80 underline"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
