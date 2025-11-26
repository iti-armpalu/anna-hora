"use client";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";


export function AuthStatus() {
  const { customer, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!customer) {
    return <Link href="/signin">Sign In</Link>;
  }

  return (
    <div>
      <span>Hello, {customer.firstName}</span>
      <a href="/api/auth/logout" className="ml-4 underline">Logout</a>
    </div>
  );
}
