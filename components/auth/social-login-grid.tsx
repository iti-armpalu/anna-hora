"use client"

import { Button } from "@/components/ui/button"

import { SocialLoginButton } from "./social-login-button"
import { socialProviders } from "@/data/auth"

interface SocialLoginGridProps {
  onLogin: (providerId: string) => void
  disabled?: boolean
  variant?: "default" | "outline"
  showLabels?: boolean
}

export function SocialLoginGrid({
  onLogin,
  disabled = false,
  variant = "outline",
  showLabels = false,
}: SocialLoginGridProps) {
  return (
    <div className="space-y-3">
      {showLabels && (
        <div className="grid grid-cols-1 gap-3">
          {socialProviders.map((provider) => (
            <SocialLoginButton
              key={provider.id}
              provider={provider}
              onLogin={onLogin}
              disabled={disabled}
              variant={variant}
              size="default"
            />
          ))}
        </div>
      )}

      {!showLabels && (
        <div className="grid grid-cols-3 gap-3">
          {socialProviders.map((provider) => (
            <Button
              key={provider.id}
              variant={variant}
              onClick={() => onLogin(provider.id)}
              disabled={disabled}
              className="h-10 border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95"
              title={`Continue with ${provider.name}`}
            >
              <span className="text-lg">{provider.icon}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
