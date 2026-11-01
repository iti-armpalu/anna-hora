import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * ANNA HORA button — small uppercase labels with wide tracking, sharp corners
 * (radius tokens are 0), no shadows. Colours come only from semantic tokens in
 * globals.css, so a palette change there reaches every button.
 *
 * Sizes: sm 36px (compact UI) · default 44px (minimum touch target) · lg 48px (primary CTAs)
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "text-xs font-medium uppercase tracking-widest",
    "transition-colors duration-200",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        // Hairline border that firms up on hover — the premium alternative to a filled button
        outline: "border border-input bg-transparent text-foreground hover:border-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-muted-foreground/10",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        // Inline text links read as sentences, so they drop the uppercase treatment
        link: "h-auto p-0 normal-case tracking-normal text-small text-primary underline underline-offset-4 decoration-1 hover:decoration-2",
        silk: "bg-accent text-accent-foreground hover:bg-accent/90",
      },
      size: {
        default: "h-11 px-6 has-[>svg]:px-5",
        sm: "h-9 px-4 has-[>svg]:px-3",
        lg: "h-12 px-8 has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }