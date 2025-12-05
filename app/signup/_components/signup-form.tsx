// app/(store)/signup/signup-form.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
    signupAction
} from "@/lib/actions/auth/signup";

import {
    initialSignupState,
    type SignupState
} from "@/lib/actions/auth/signup-state";

export function SignupForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setAuthenticated } = useAuth();

    const redirect = searchParams.get("redirect") || "/account";

    const [password, setPassword] = useState("");

    const [state, formAction, isPending] =
        useActionState<SignupState, FormData>(signupAction, initialSignupState);

    useEffect(() => {
        if (state.ok) {
            setAuthenticated(true);
            router.push(redirect);
        }
    }, [state.ok, redirect, router, setAuthenticated]);

    const errorMessage =
        state.formError ??
        Object.values(state.fieldErrors ?? {})[0]?.[0] ??
        "";

    return (
        <>
            {redirect !== "/account" && (
                <p className="text-sm text-gray-600 mb-4">
                    After creating your account, you’ll be redirected to{" "}
                    <span className="font-medium">{redirect}</span>.
                </p>
            )}

            <form action={formAction} className="space-y-4">
                {/* First + Last Name */}
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

                {/* Email */}
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full border px-3 py-2 rounded bg-white"
                    placeholder="Email"
                />

                {/* Password w/ live rules */}
                <div className="space-y-2">
                    <input
                        name="password"
                        type="password"
                        required
                        className="w-full border px-3 py-2 rounded bg-white"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <ul className="text-xs text-stone-600 space-y-1">
                        <li
                            className={`flex items-center gap-2 transition-all ${password.length >= 6 ? "line-through text-green-600" : ""
                                }`}
                        >
                            {password.length >= 6 ? (
                                <span className="text-green-600">✓</span>
                            ) : (
                                <span className="inline-block size-1.5 rounded-full bg-stone-400" />
                            )}
                            At least 6 characters
                        </li>

                        <li
                            className={`flex items-center gap-2 transition-all ${/\d/.test(password) ? "line-through text-green-600" : ""
                                }`}
                        >
                            {/\d/.test(password) ? (
                                <span className="text-green-600">✓</span>
                            ) : (
                                <span className="inline-block size-1.5 rounded-full bg-stone-400" />
                            )}
                            Includes a number
                        </li>

                        <li
                            className={`flex items-center gap-2 transition-all ${/[A-Z]/.test(password) ? "line-through text-green-600" : ""
                                }`}
                        >
                            {/[A-Z]/.test(password) ? (
                                <span className="text-green-600">✓</span>
                            ) : (
                                <span className="inline-block size-1.5 rounded-full bg-stone-400" />
                            )}
                            Includes an uppercase letter
                        </li>
                    </ul>
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-stone-700">
                        I agree to the{" "}
                        <Link href="/terms" className="underline text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline text-primary">
                            Privacy Policy
                        </Link>
                    </Label>
                </div>

                {errorMessage && (
                    <p className="text-red-600 text-sm whitespace-pre-line">
                        {errorMessage}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
                >
                    {isPending ? "Creating account..." : "Create Account"}
                </button>
            </form>

            <div className="text-center text-sm text-muted-foreground mt-4">
                Already have an account?{" "}
                <Link
                    href={`/signin?redirect=${encodeURIComponent(redirect)}`}
                    className="text-primary hover:text-primary/80 font-medium"
                >
                    Sign in
                </Link>
            </div>
        </>
    );
}
