"use client"

import { Button } from "@/components/ui/button"
import type { SocialProvider } from "@/data/auth"

interface SocialLoginButtonProps {
  provider: SocialProvider
  onLogin: (providerId: string) => void
  disabled?: boolean
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function SocialLoginButton({
  provider,
  onLogin,
  disabled = false,
  variant = "outline",
  size = "default",
}: SocialLoginButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => onLogin(provider.id)}
      disabled={disabled}
      className="relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        borderColor: variant === "outline" ? provider.color : undefined,
        backgroundColor: variant === "default" ? provider.color : undefined,
        color: variant === "default" ? "#ffffff" : provider.color,
      }}
    >
      <span className="text-lg mr-2">{provider.icon}</span>
      <span className="font-medium">{provider.name}</span>
    </Button>
  )
}
