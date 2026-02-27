import { AuthLayout } from "@/components/header/auth-layout";
import { getAuthSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function SigninPage() {
  const { isAuthenticated } = await getAuthSession();

  if (isAuthenticated) {
    redirect("/account");
  }

  return (
    <AuthLayout
      title="Sign in or create an account"
      description="Continue to the secure sign-in step to access your account and orders."
    >
      <a
        href="/api/auth/login"
        className="inline-flex w-full items-center justify-center rounded-md bg-anna-hora-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 transition"
      >
        Continue
      </a>

      <p className="text-xs text-stone-500">
        If you don’t have an account yet, you’ll be able to create one during sign-in.
      </p>
    </AuthLayout>
  );
}
