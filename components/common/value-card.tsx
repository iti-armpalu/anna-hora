import type { ReactNode } from "react"

interface ValueCardProps {
  icon?: ReactNode // optional so you can pass any icon or custom element
  title: string
  children: ReactNode
}

export function ValueCard({ icon, title, children }: ValueCardProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon ?? <div className="w-8 h-8 bg-stone-400 rounded-full" />}
      </div>
      <h4 className="text-xl font-light text-stone-800 mb-4">{title}</h4>
      <p className="text-stone-600 leading-relaxed">{children}</p>
    </div>
  )
}
