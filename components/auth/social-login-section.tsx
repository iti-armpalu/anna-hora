"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { socialProviders } from "@/data/auth"

interface SocialLoginSectionProps {
  onSocialLogin: (provider: string) => void
  isLoading: boolean
}

export function SocialLoginSection({ onSocialLogin, isLoading }: SocialLoginSectionProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => onSocialLogin(provider.id)}
            disabled={isLoading}
            className="h-10 border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <span className="text-lg">{provider.icon}</span>
          </Button>
        ))}
      </div>
    </>
  )
}
