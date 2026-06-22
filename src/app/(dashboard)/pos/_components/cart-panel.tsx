"use client"

import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  User,
  CreditCard,
  Trash2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverTrigger,
  PopoverPositioner,
  PopoverPopup,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  stock: number
  isScanned?: boolean
}

export interface Customer {
  id: string
  name: string
  phone?: string
}

export interface CartPanelProps {
  /** Items currently in the cart */
  cart: CartItem[]
  /** Called to replace the entire cart (clear / set) */
  onCartChange: (items: CartItem[]) => void
  /** Badge animation key — caller increments when item count changes */
  badgeKey: number
  /** Current paid amount string (empty means not entered) */
  paidAmount: string
  /** Called when paid amount changes */
  onPaidAmountChange: (value: string) => void
  /** Current customer name */
  customerName: string
  /** Called when the customer name changes (both query and final value) */
  onCustomerNameChange: (name: string) => void
  /** Customer autocomplete query for search mode */
  customerQuery: string
  /** Called when the customer search query changes */
  onCustomerQueryChange: (query: string) => void
  /** Whether the customer dropdown is open */
  customerOpen: boolean
  /** Called to toggle customer dropdown */
  onCustomerOpenChange: (open: boolean) => void
  /** Recent customers list */
  recentCustomers: Customer[] | undefined
  /** Search results for customer autocomplete */
  searchResults: Customer[] | undefined
  /** True while customer search is in flight */
  searchingCustomers: boolean
  /** Debounced customer search query (used to show recent vs search) */
  debouncedCustomerQuery: string
  /** Whether the confirm-clear dialog is open */
  confirmClearOpen: boolean
  /** Called to toggle the confirm-clear dialog */
  onConfirmClearOpenChange: (open: boolean) => void
  /** Called when checkout is triggered */
  onCheckout: () => void
  /** True while the create-invoice mutation is pending */
  isCheckoutPending: boolean
  /** True if the user is authenticated (session exists) */
  hasSession: boolean
  /** Currency formatter */
  formatCurrency: (value: number) => string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CartPanel({
  cart,
  onCartChange,
  badgeKey,
  paidAmount,
  onPaidAmountChange,
  customerName,
  onCustomerNameChange,
  customerQuery,
  onCustomerQueryChange,
  customerOpen,
  onCustomerOpenChange,
  recentCustomers,
  searchResults,
  searchingCustomers,
  debouncedCustomerQuery,
  confirmClearOpen,
  onConfirmClearOpenChange,
  onCheckout,
  isCheckoutPending,
  hasSession,
  formatCurrency,
}: CartPanelProps) {
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0)
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const paid = Number(paidAmount) || 0
  const change = paid > total ? paid - total : 0

  const updateQuantity = (productId: string, delta: number) => {
    onCartChange(
      cart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, Math.min(item.quantity + delta, item.stock)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const setQuantity = (productId: string, qty: number) => {
    onCartChange(
      cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(Math.max(qty, 1), item.stock) }
          : item,
      ),
    )
  }

  const removeItem = (productId: string) => {
    onCartChange(cart.filter((i) => i.productId !== productId))
  }

  const clearCart = () => {
    onCartChange([])
    onConfirmClearOpenChange(false)
  }

  return (
    <div className="w-80 flex flex-col shrink-0 border-r border-border bg-card">
      {/* ---- Cart header ---- */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">الفاتورة</span>
          <AnimatePresence mode="wait">
            {cart.length > 0 && (
              <motion.span
                key={badgeKey}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full px-1.5 text-[10px] font-semibold bg-primary text-primary-foreground"
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {cart.length > 0 && (
          <button
            onClick={() => onConfirmClearOpenChange(true)}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            إفراغ
          </button>
        )}
      </div>

      {/* ---- Cart items (scrollable) ---- */}
      <div className="flex-1 overflow-auto px-3 py-3 space-y-2 min-h-0">
        <AnimatePresence initial={false}>
          {cart.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <ShoppingCart className="w-12 h-12 mb-3 text-border" />
              <p className="text-sm text-muted-foreground">الفاتورة فارغة</p>
              <p className="text-xs mt-1 text-muted-foreground">
                امسح أو اختر المنتجات للإضافة
              </p>
            </motion.div>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-lg px-3 py-2.5 overflow-hidden bg-muted/50 border border-border hover:bg-muted/60 transition-colors"
              >
                {/* Item top row: name + remove */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <span className="text-sm font-medium truncate text-foreground">
                      {item.name}
                    </span>
                    {item.isScanned && (
                      <span className="inline-flex items-center rounded px-1 py-0 text-[9px] font-medium bg-primary-light text-primary-hover dark:bg-primary/20 dark:text-primary border border-primary/30 dark:border-primary/50 shrink-0">
                        ممسوح
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    aria-label="حذف المنتج"
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mr-1 p-0.5 rounded hover:bg-border text-muted-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Item bottom row: qty controls + line total */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.productId, 1)}
                      aria-label="زيادة الكمية"
                      className="flex items-center justify-center w-6 h-6 rounded-md border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-150 active:scale-90"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <Popover>
                      <PopoverTrigger className="w-8 text-center text-sm font-bold text-foreground cursor-pointer select-none rounded-md border border-transparent hover:border-border hover:bg-muted transition-colors py-0.5 focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2">
                        {item.quantity}
                      </PopoverTrigger>
                      <PopoverPositioner align="center" side="top">
                        <PopoverPopup className="flex gap-1 p-1.5">
                          {[1, 5, 10].map((n) => (
                            <button
                              key={n}
                              onClick={() => setQuantity(item.productId, item.quantity + n)}
                              className="px-3 py-1.5 text-xs font-semibold rounded-md hover:bg-primary hover:text-primary-foreground hover:border-primary border border-border bg-card text-foreground transition-all duration-150 active:scale-90"
                            >
                              +{n}
                            </button>
                          ))}
                        </PopoverPopup>
                      </PopoverPositioner>
                    </Popover>
                    <button
                      onClick={() => updateQuantity(item.productId, -1)}
                      aria-label="تقليل الكمية"
                      className="flex items-center justify-center w-6 h-6 rounded-md border border-border bg-card text-muted-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-150 active:scale-90"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>

                {/* Unit price hint */}
                <div className="mt-1 text-[10px] leading-none text-muted-foreground">
                  {formatCurrency(item.price)} &times; {item.quantity}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ---- Cart footer ---- */}
      <div className="px-4 py-3 border-t border-border bg-card space-y-3">
        {/* Customer search typeahead */}
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none z-10" />
          <Input
            type="text"
            placeholder="اسم العميل (اختياري)"
            aria-label="اسم العميل"
            value={customerOpen ? customerQuery : customerName}
            onFocus={() => {
              onCustomerOpenChange(true)
              onCustomerQueryChange(customerName || "")
            }}
            onBlur={() => {
              setTimeout(() => onCustomerOpenChange(false), 200)
            }}
            onChange={(e) => {
              onCustomerQueryChange(e.target.value)
              onCustomerNameChange(e.target.value)
            }}
            className="pr-9"
          />
          {customerOpen && (
            <div className="absolute bottom-full mb-1 right-0 left-0 z-20 bg-popover border border-border rounded-xl shadow-modal overflow-hidden">
              {debouncedCustomerQuery.length === 0 &&
                recentCustomers &&
                recentCustomers.length > 0 && (
                  <>
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      العملاء الأخيرون
                    </div>
                    {recentCustomers.map((c: Customer) => (
                      <button
                        key={c.id}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          onCustomerNameChange(c.name)
                          onCustomerQueryChange(c.name)
                          onCustomerOpenChange(false)
                        }}
                        className="w-full text-right px-3 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">{c.name}</span>
                        {c.phone && (
                          <span className="text-xs text-muted-foreground mr-auto" dir="ltr">
                            {c.phone}
                          </span>
                        )}
                      </button>
                    ))}
                    {debouncedCustomerQuery.length === 0 && <Separator />}
                  </>
                )}
              {debouncedCustomerQuery.length > 0 && (
                <>
                  {searchingCustomers ? (
                    <div className="px-3 py-3 text-xs text-muted-foreground">
                      جاري البحث...
                    </div>
                  ) : searchResults && searchResults.length > 0 ? (
                    searchResults.map((c: Customer) => (
                      <button
                        key={c.id}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          onCustomerNameChange(c.name)
                          onCustomerQueryChange(c.name)
                          onCustomerOpenChange(false)
                        }}
                        className="w-full text-right px-3 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">{c.name}</span>
                        {c.phone && (
                          <span className="text-xs text-muted-foreground mr-auto" dir="ltr">
                            {c.phone}
                          </span>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-3 text-xs text-muted-foreground">
                      لا يوجد عملاء مطابقون
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Paid amount */}
        <div className="relative">
          <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            type="number"
            placeholder="المبلغ المدفوع"
            aria-label="المبلغ المدفوع"
            value={paidAmount}
            onChange={(e) => onPaidAmountChange(e.target.value)}
            className="pr-9"
          />
        </div>

        {/* Change display */}
        {change > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between px-1"
          >
            <span className="text-sm text-muted-foreground">الباقي</span>
            <span className="text-sm font-bold text-success">
              {formatCurrency(change)}
            </span>
          </motion.div>
        )}

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">الإجمالي</span>
          <motion.span
            key={total}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            className="text-base font-bold text-primary dark:text-accent"
          >
            {formatCurrency(total)}
          </motion.span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant="accent"
            size="lg"
            disabled={!cart.length || isCheckoutPending}
            onClick={onCheckout}
            className={cn(
              "flex-1 h-10 text-sm font-semibold active:scale-[0.98] disabled:opacity-40",
              cart.length && "shadow-lg shadow-primary/20",
            )}
          >
            {isCheckoutPending
              ? "جارٍ المعالجة..."
              : cart.length
                ? `إتمام البيع — ${formatCurrency(total)}`
                : "إتمام البيع"}
          </Button>

          {cart.length > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => onConfirmClearOpenChange(true)}
              aria-label="إفراغ السلة"
              className="h-10 px-3 shrink-0 text-muted-foreground hover:text-destructive hover:border-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ---- Confirm clear dialog ---- */}
      <Dialog open={confirmClearOpen} onOpenChange={onConfirmClearOpenChange}>
        <DialogContent className="sm:max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle>إلغاء الفاتورة</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من إلغاء هذه الفاتورة؟ سيتم حذف جميع المنتجات المضافة.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onConfirmClearOpenChange(false)}>
              تراجع
            </Button>
            <Button variant="destructive" onClick={clearCart}>
              تأكيد الإلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
