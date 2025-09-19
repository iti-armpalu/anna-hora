"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { siteContent } from "@/data/content"

interface AccountHeaderProps {
  firstName: string
  onSignOut: () => void
}

export function AccountHeader({ firstName, onSignOut }: AccountHeaderProps) {
  const { welcome } = siteContent.account

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
        <h2 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-2">
          {welcome.greeting}, {firstName}
        </h2>
        <p className="text-stone-600">{welcome.subtitle}</p>
      </div>
      <Button
        variant="outline"
        className="mt-4 sm:mt-0 border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
        onClick={onSignOut}
      >
        <LogOut className="w-4 h-4 mr-2" />
        {welcome.signOutButton}
      </Button>
    </div>
  )
}
