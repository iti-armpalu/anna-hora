"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

interface FormFieldProps {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon: React.ReactNode
  required?: boolean
  showPassword?: boolean
  onTogglePassword?: () => void
  helpText?: string
}

export function FormField({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  showPassword,
  onTogglePassword,
  helpText,
}: FormFieldProps) {
  const isPasswordField = type === "password" || (type === "text" && onTogglePassword)

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-card-foreground">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-3 h-4 w-4 text-muted-foreground">{icon}</div>
        <Input
          id={id}
          name={name}
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`pl-10 ${isPasswordField ? "pr-10" : ""} bg-input border-border focus:ring-ring`}
          required={required}
        />
        {isPasswordField && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
    </div>
  )
}
