import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[#F4A34B] to-[#E78C08] text-white hover:translate-y-[-2px] active:scale-[0.96] shadow-card hover:shadow-lg hover:shadow-glow",
        secondary:
          "bg-transparent text-[#E78C08] border border-[#E78C08] hover:bg-[rgba(231,140,8,0.05)] active:scale-[0.98]",
        outline:
          "bg-transparent text-foreground border border-border hover:bg-secondary",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-[rgba(231,140,8,0.05)] hover:text-[#E78C08]",
        accent:
          "bg-gradient-to-br from-[#F4A34B] to-[#E78C08] text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-glow hover:translate-y-[-2px] active:scale-[0.96]",
        glow:
          "bg-primary text-primary-foreground shadow-lg shadow-primary/20 ring-2 ring-primary/30 hover:shadow-primary/30 hover:ring-4 hover:ring-primary/40 active:scale-[0.97]",
        destructive:
          "bg-destructive text-white",
        link:
          "bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
