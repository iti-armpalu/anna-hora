import Link from "next/link";

// app/signup/page.tsx
export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-gray-600">
            Join us to unlock personalized shopping and faster checkout.
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
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
