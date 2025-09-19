"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mail, Lock } from "lucide-react"
import { authenticateUser, validateEmail, demoCredentials, type AuthCredentials } from "@/data/auth"
import { useAuth } from "@/contexts/auth-context"
import { AuthLayout } from "@/components/auth/auth-layout"
import { FormField } from "@/components/auth/form-field"
import { SocialLoginSection } from "@/components/auth/social-login-section"
import { ErrorAlert } from "@/components/auth/error-alert"
import { toast } from "sonner"


export default function SignInPage() {
  const [formData, setFormData] = useState<AuthCredentials>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
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

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!formData.password) {
      setError("Password is required")
      return
    }

    setIsLoading(true)

    try {
      const user = await authenticateUser(formData)
      if (user) {
        login(user)
        toast.success("Welcome back! Successfully signed in.")
        router.push("/")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
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
      toast.success(`Welcome! Successfully signed in with ${provider}.`, {
        duration: 6000,
        position: "top-right",
        // style: {
        //   font: '1rem'

        // },
      })
      router.push("/")
    } catch (err) {
      setError("Social login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setFormData({
      email: demoCredentials.email,
      password: demoCredentials.password,
    })
  }

  return (
    <AuthLayout title="Welcome Back" description="Sign in to your account to continue">
      <div className="bg-muted/50 rounded-lg p-3 border border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="font-medium text-muted-foreground">Demo Account</p>
            <p className="text-xs text-muted-foreground">{demoCredentials.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={fillDemoCredentials} className="text-xs bg-transparent">
            Use Demo
          </Button>
        </div>
      </div>

      <ErrorAlert error={error} />

      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          icon={<Lock className="h-4 w-4" />}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
        />

        <div className="flex items-center justify-between">
          <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <SocialLoginSection onSocialLogin={handleSocialLogin} isLoading={isLoading} />

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  )
}
