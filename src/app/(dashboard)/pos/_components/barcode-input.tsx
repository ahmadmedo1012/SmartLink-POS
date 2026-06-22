"use client"

import { RefObject } from "react"
import { ScanLine, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface BarcodeInputProps {
  /** Current barcode input value */
  value: string
  /** Called when the input value changes */
  onChange: (value: string) => void
  /** Called when the form is submitted (Enter or button click) */
  onSubmit: (e: React.FormEvent) => void
  /** Ref forwarded to the underlying input for keyboard shortcut focus */
  inputRef: RefObject<HTMLInputElement | null>
  /** Disable the submit button */
  disabled?: boolean
}

/**
 * Barcode scanner input bar with keyboard shortcut hints (F1/F3/Esc).
 * Displays an input field, an "Add" button, and a hidden-on-mobile keyboard
 * reference strip.
 */
export function BarcodeInput({
  value,
  onChange,
  onSubmit,
  inputRef,
  disabled = false,
}: BarcodeInputProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <form onSubmit={onSubmit} className="flex-1 flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <ScanLine className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="مسح الباركود..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pr-9 font-mono text-sm h-9"
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="h-9 gap-1.5"
          disabled={disabled || !value}
        >
          <ScanLine className="w-3.5 h-3.5" />
          إضافة
        </Button>
      </form>

      {/* Keyboard hints — hidden on small screens */}
      <div className="hidden md:flex items-center gap-1.5 px-3 h-8 rounded-md border border-border bg-card text-xs text-muted-foreground shrink-0">
        <Keyboard className="w-3 h-3" />
        <kbd className="font-mono font-medium text-foreground">F1</kbd>
        <span>مسح</span>
        <kbd className="font-mono font-medium text-foreground mr-1">F3</kbd>
        <span>بحث</span>
        <kbd className="font-mono font-medium text-foreground mr-1">Esc</kbd>
        <span>مسح</span>
      </div>
    </div>
  )
}
