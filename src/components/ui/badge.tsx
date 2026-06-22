import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border border-border",
        success:
          "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 dark:border dark:border-primary-700/40",
        warning:
          "bg-primary-200 text-primary-800 dark:bg-primary-800/40 dark:text-primary-200 dark:border dark:border-primary-600/40",
        danger:
          "bg-destructive/15 text-destructive dark:bg-destructive/25 dark:text-destructive dark:border dark:border-destructive/40",
        outline:
          "bg-transparent text-muted-foreground border border-border",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0",
        default: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
