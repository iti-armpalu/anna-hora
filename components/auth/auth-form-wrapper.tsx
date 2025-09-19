"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthFormWrapperProps {
  children: React.ReactNode
  title: string
  description: string
  showBrand?: boolean
}

export function AuthFormWrapper({ children, title, description, showBrand = true }: AuthFormWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        {showBrand && (
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-primary mb-2">Anna Hora</h1>
              <p className="text-muted-foreground text-sm">Premium Silk Loungewear</p>
            </Link>
          </div>
        )}

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-card-foreground">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">{children}</CardContent>
        </Card>

        {/* Decorative Image */}
        <div className="mt-8 text-center">
          <img
            src="/elegant-woman-profile.png"
            alt="Elegant woman in silk loungewear"
            className="w-24 h-24 mx-auto rounded-full object-cover opacity-60"
          />
        </div>
      </div>
    </div>
  )
}
