"use client";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto py-20 text-center">
      <h1 className="text-3xl font-semibold mb-6">Create your account</h1>

      <p className="text-gray-600 mb-8">
        Your account will let you track orders, manage addresses, and more.
      </p>

      <a
        href="/auth/customer/login"
        className="px-6 py-3 bg-black text-white rounded-md"
      >
        Continue to Signup
      </a>

      <p className="mt-4 text-sm text-gray-500">
        You will be redirected to our secure Shopify account page.
      </p>
    </div>
  );
}
