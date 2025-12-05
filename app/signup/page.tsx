// app/(store)/signup/page.tsx

import { AuthLayout } from "@/components/header/auth-layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignupForm } from "./_components/signup-form";

export default async function SignupPage() {
  // (Optional) redirect if already logged in
  const cookieStore = await cookies()
  const token = cookieStore.get("customerAccessToken");
  if (token) redirect("/account");

  return (
    <AuthLayout
      title="Create an Account"
      description="Join us for the finest silk loungewear experience"
    >
      <SignupForm />
    </AuthLayout>
  );
}
