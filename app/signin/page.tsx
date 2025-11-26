// app/signin/page.tsx
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-600">
            Sign in to access your account, track orders, and manage preferences.
          </p>
        </div>

        <form action="/api/auth/login" method="GET">
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition"
          >
            Continue
          </button>
        </form>

        <p className="text-center text-gray-600">
          New here?{" "}
          <Link href="/signup" className="text-blue-600 font-medium underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
