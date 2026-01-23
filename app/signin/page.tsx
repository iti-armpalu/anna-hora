
import { AuthLayout } from "@/components/header/auth-layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SigninForm } from "./_components/signin-form";

export default async function SigninPage() {
  const cookieStore = await cookies();

  // Look for the NEW cookie name we defined in the callback
  const session = cookieStore.get("customer_session");

  if (session) redirect("/account");

  
  // Redirect if already logged in
  // const cookieStore = await cookies()
  // const token = cookieStore.get("customerAccessToken");
  // if (token) redirect("/account");

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
    >
      <SigninForm />
    </AuthLayout>
  );
}
