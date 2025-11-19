"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User } from "lucide-react"
import { registerUser, validateEmail, validatePassword, type SignUpData } from "@/data/auth"
import { useAuth } from "@/context/auth-context"
import { AuthLayout } from "@/components/auth/auth-layout"
import { FormField } from "@/components/auth/form-field"
import { SocialLoginSection } from "@/components/auth/social-login-section"
import { ErrorAlert } from "@/components/auth/error-alert"

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.firstName.trim()) {
      setError("First name is required")
      return
    }

    if (!formData.lastName.trim()) {
      setError("Last name is required")
      return
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    setIsLoading(true)

    try {
      const user = await registerUser(formData)
      if (user) {
        login(user)
        router.push("/account")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const socialUser = {
        id: `${provider}-user`,
        email: `user@${provider}.com`,
        firstName: "Social",
        lastName: "User",
        createdAt: new Date().toISOString(),
      }
      login(socialUser)
      router.push("/account")
    } catch {
      setError("Social login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Create Account" description="Join us for the finest silk loungewear experience">
      <ErrorAlert error={error} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="firstName"
            name="firstName"
            type="text"
            label="First Name"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
            icon={<User className="h-4 w-4" />}
            required
          />

          <FormField
            id="lastName"
            name="lastName"
            type="text"
            label="Last Name"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
            icon={<User className="h-4 w-4" />}
            required
          />
        </div>

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          icon={<Mail className="h-4 w-4" />}
          required
        />

        <FormField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          icon={<Lock className="h-4 w-4" />}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          helpText="Must be at least 6 characters"
          required
        />

        <FormField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          icon={<Lock className="h-4 w-4" />}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          required
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          />
          <Label
            htmlFor="terms"
            className="text-sm text-card-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:text-primary/80 underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:text-primary/80 underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <SocialLoginSection onSocialLogin={handleSocialLogin} isLoading={isLoading} />

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/signin" className="text-primary hover:text-primary/80 font-medium transition-colors">
          Sign in
        </Link>
      </div>

      <div className="bg-muted/30 rounded-lg p-3 border border-border">
        <p className="text-xs text-muted-foreground text-center">
          Your privacy is important to us. We use your data only to provide you with the best silk loungewear experience
          and will never share it with third parties.
        </p>
      </div>
    </AuthLayout>
  )
}
