import { pageMeta } from "@/lib/config/metadata"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AuthLayout } from "@/components/header/auth-layout"
import { getAuthSession } from "@/lib/auth/session"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMeta.signIn

export default async function SigninPage() {
  const { isAuthenticated } = await getAuthSession()

  if (isAuthenticated) {
    redirect("/account")
  }

  return (
    <AuthLayout
      title="Sign in or create an account"
      description="Continue to the secure sign-in step to access your account and orders."
    >
      <a
        href="/api/auth/login"
        className={cn(buttonVariants({ size: "lg" }), "w-full")}
      >
        Continue
      </a>

      <p className="text-xs text-stone-500">
        If you don't have an account yet, you'll be able to create one during sign-in.
      </p>
    </AuthLayout >
  )
}