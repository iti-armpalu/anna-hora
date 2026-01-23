"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signinAction } from "@/lib/actions/auth/signin";
import { initialAuthState, type AuthActionState } from "@/lib/actions/auth/auth-state";

export function SigninForm() {
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/account";

    // We still use useActionState to handle the transition
    const [state, formAction, isPending] = useActionState<AuthActionState, FormData>(
        signinAction, 
        initialAuthState
    );

    return (
        <div className="space-y-6">
            {/* Context Message */}
            {redirectUrl !== "/account" && (
                <div className="bg-stone-50 border border-stone-100 p-3 rounded-md">
                    <p className="text-xs text-stone-600">
                        Please sign in to access <span className="font-medium">{redirectUrl}</span>
                    </p>
                </div>
            )}

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-stone-700">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="e.g. name@example.com"
                        className="w-full border border-stone-200 px-4 py-3 rounded-md bg-white focus:ring-1 focus:ring-stone-400 outline-none transition-all placeholder:text-stone-400"
                    />
                </div>

                {/* Error handling from the server action */}
                {state.formError && (
                    <p className="text-red-600 text-sm font-light">
                        {state.formError}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white py-6 text-base font-light tracking-wide rounded-md transition-all"
                >
                    {isPending ? "Connecting to Shopify..." : "Continue with Email"}
                </Button>
            </form>

            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-stone-100" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-stone-400">Security</span></div>
            </div>

            <p className="text-[13px] text-center text-stone-500 leading-relaxed">
                We'll send a secure 6-digit login code to your inbox. <br />
                No password required.
            </p>
        </div>
    );
}

// "use client";

// import { useActionState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";

// import { useAuth } from "@/context/auth-context";

// import {
//     signinAction,
// } from "@/lib/actions/auth/signin";

// import {
//     initialAuthState,
//     type AuthActionState,
//   } from "@/lib/actions/auth/auth-state";
// import { Button } from "@/components/ui/button";
// import { PasswordInput } from "@/components/form/password-input";

// export function SigninForm() {
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const { setAuthenticated } = useAuth();

//     const redirect = searchParams.get("redirect") || "/account";

//     const [state, formAction, isPending] =
//     useActionState<AuthActionState, FormData>(signinAction, initialAuthState);

//     const errorMessage =
//         state.formError ??
//         Object.values(state.fieldErrors ?? {})[0]?.[0] ??
//         "";

//     useEffect(() => {
//         if (state.ok) {
//             setAuthenticated(true);
//             router.push(redirect);
//         }
//     }, [state.ok, redirect, router, setAuthenticated]);

//     return (
//         <>
//             {redirect !== "/account" && (
//                 <p className="text-sm text-gray-600 mb-4">
//                     You must be signed in to access{" "}
//                     <span className="font-medium">{redirect}</span>
//                 </p>
//             )}

//             <form action={formAction} className="space-y-4">
//                 <input
//                     name="email"
//                     type="email"
//                     required
//                     className="w-full border px-3 py-2 rounded bg-white"
//                     placeholder="Email"
//                 />

//                 {/* <input
//                     name="password"
//                     type="password"
//                     required
//                     className="w-full border px-3 py-2 rounded bg-white"
//                     placeholder="Password"
//                 /> */}
                
//                 <PasswordInput required autoComplete="current-password" />

//                 {errorMessage && (
//                     <p className="text-red-600 text-sm whitespace-pre-line">
//                         {errorMessage}
//                     </p>
//                 )}

//                 <div className="flex items-center justify-between">
//                     <Link
//                         href="/forgot-password"
//                         className="text-sm text-primary hover:text-primary/80 transition-colors"
//                     >
//                         Forgot password?
//                     </Link>
//                 </div>

//                 <Button
//                     type="submit"
//                     disabled={isPending}
//                     className="w-full bg-anna-green-950 hover:bg-stone-700 text-white py-2 disabled:opacity-50"
//                 >
//                     {isPending ? "Signing in..." : "Sign In"}
//                 </Button>
//             </form>

//             <div className="text-center text-sm text-muted-foreground mt-4">
//                 Don&apos;t have an account?{" "}
//                 <Link
//                     href={`/signup?redirect=${encodeURIComponent(redirect)}`}
//                     className="text-primary hover:text-primary/80 font-medium transition-colors"
//                 >
//                     Sign up
//                 </Link>
//             </div>
//         </>
//     );
// }
