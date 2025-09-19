"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock } from "lucide-react"

interface PasswordInputProps {
  id: string
  name: string
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  showStrength?: boolean
  helperText?: string
}

export function PasswordInput({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  showStrength = false,
  helperText,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" }
    if (password.length < 6) return { strength: 1, label: "Weak" }
    if (password.length < 8) return { strength: 2, label: "Fair" }
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 4, label: "Strong" }
    }
    return { strength: 3, label: "Good" }
  }

  const passwordStrength = showStrength ? getPasswordStrength(value) : null

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-card-foreground">
        {label}
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10 pr-10 bg-input border-border focus:ring-ring"
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {showStrength && passwordStrength && value.length > 0 && (
        <div className="space-y-1">
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full ${
                  level <= passwordStrength.strength
                    ? level <= 2
                      ? "bg-destructive"
                      : level === 3
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Password strength: {passwordStrength.label}</p>
        </div>
      )}

      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  )
}
