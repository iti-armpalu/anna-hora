// app/forgot-password/page.tsx

import { AuthLayout } from "@/components/header/auth-layout";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email and we’ll send you a link to reset your password."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
