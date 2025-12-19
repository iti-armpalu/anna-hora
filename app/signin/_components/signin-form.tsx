"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/context/auth-context";

import {
    signinAction,
} from "@/lib/actions/auth/signin";

import {
    initialAuthState,
    type AuthActionState,
  } from "@/lib/actions/auth/auth-state";

export function SigninForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setAuthenticated } = useAuth();

    const redirect = searchParams.get("redirect") || "/account";

    const [state, formAction, isPending] =
    useActionState<AuthActionState, FormData>(signinAction, initialAuthState);

    const errorMessage =
        state.formError ??
        Object.values(state.fieldErrors ?? {})[0]?.[0] ??
        "";

    useEffect(() => {
        if (state.ok) {
            setAuthenticated(true);
            router.push(redirect);
        }
    }, [state.ok, redirect, router, setAuthenticated]);

    return (
        <>
            {redirect !== "/account" && (
                <p className="text-sm text-gray-600 mb-4">
                    You must be signed in to access{" "}
                    <span className="font-medium">{redirect}</span>
                </p>
            )}

            <form action={formAction} className="space-y-4">
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

                {errorMessage && (
                    <p className="text-red-600 text-sm whitespace-pre-line">
                        {errorMessage}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
                >
                    {isPending ? "Signing in..." : "Sign In"}
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
    );
}
