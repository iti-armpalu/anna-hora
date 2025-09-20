import * as React from "react"
import Link from "next/link"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type CommonProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean
  className?: string
}

/** Button (onClick) variant */
type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

/** Link variant (internal or external; uses Next Link for internal) */
type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }))

    // Radix Slot path (you control the rendered element)
    if (asChild) {
      return (
        <Slot
          data-slot="button"
          className={classes}
          ref={ref as React.Ref<HTMLButtonElement | HTMLAnchorElement>}
          {...props}
        />
      )
    }

    // Link mode
    if (href) {
      const isInternal = href.startsWith("/")
      // For internal links, use Next.js Link
      if (isInternal) {
        const anchorProps = props as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">
        return (
          <Link
            href={href}
            className={classes}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...anchorProps}
          />
        )
      }

      // External link: ensure safe rel if opening a new tab
      const { target, rel, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
      const safeRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel
      return (
        <a
          href={href}
          target={target}
          rel={safeRel}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...rest}
        />
      )
    }

    // Button element mode
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button
        data-slot="button"
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
      />
    )
  }
)

Button.displayName = "Button"
