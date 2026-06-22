"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react"

import { cn } from "@/lib/utils"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverPortal({ ...props }: PopoverPrimitive.Portal.Props) {
  return <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />
}

function PopoverPositioner({
  className,
  ...props
}: PopoverPrimitive.Positioner.Props) {
  return (
    <PopoverPrimitive.Positioner
      data-slot="popover-positioner"
      className={cn("z-50", className)}
      {...props}
    />
  )
}

function PopoverPopup({
  className,
  ...props
}: PopoverPrimitive.Popup.Props) {
  return (
    <PopoverPrimitive.Popup
      data-slot="popover-popup"
      className={cn(
        "bg-popover text-popover-foreground",
        "rounded-[12px] shadow-modal border border-border p-2",
        "min-w-[120px]",
        "data-[open]:animate-scale-in",
        className,
      )}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
}
