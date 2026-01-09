// app/care-guide/_components/icon.tsx
import {
    AlertCircle,
    Archive,
    Droplets,
    Home,
    Package,
    Shield,
    Sun,
    Wind,
  } from "lucide-react"
  
  export const ICONS = {
    droplets: Droplets,
    sun: Sun,
    wind: Wind,
    alertCircle: AlertCircle,
    package: Package,
    home: Home,
    shield: Shield,
    archive: Archive,
  } as const
  
  export type IconName = keyof typeof ICONS
  
  export function Icon({
    name,
    className = "h-6 w-6",
    "aria-hidden": ariaHidden = true,
  }: {
    name: IconName
    className?: string
    "aria-hidden"?: boolean
  }) {
    const LucideIcon = ICONS[name]
    return <LucideIcon className={className} aria-hidden={ariaHidden} />
  }
  