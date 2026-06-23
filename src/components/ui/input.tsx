import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "bg-background text-foreground rounded-sm h-11 px-4 text-sm border border-input transition-colors duration-200",
          "file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground/50",
          "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/35",
          "disabled:bg-muted/50 disabled:text-muted-foreground disabled:cursor-not-allowed",
          "aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
