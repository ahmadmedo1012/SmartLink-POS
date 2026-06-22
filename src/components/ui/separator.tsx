import { forwardRef, type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        orientation === "horizontal"
          ? "h-px bg-border my-4"
          : "w-px bg-border/60 mx-4 h-auto self-stretch",
        className,
      )}
      {...props}
    />
  ),
)
Separator.displayName = "Separator"

export { Separator }
