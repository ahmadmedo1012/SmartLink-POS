"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useCurrency } from "@/lib/currency"
import { playClick } from "@/lib/sounds"
import { BarcodeInput } from "./_components/barcode-input"
import { ProductGrid } from "./_components/product-grid"
import { CartPanel, type CartItem, type Customer } from "./_components/cart-panel"

// ---------------------------------------------------------------------------
// Debounce hook
// ---------------------------------------------------------------------------
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function POSPage() {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const { formatCurrency } = useCurrency()

  const [search, setSearch] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState("")
  const [paidAmount, setPaidAmount] = useState("")
  const [barcodeInput, setBarcodeInput] = useState("")
  const [customerQuery, setCustomerQuery] = useState("")
  const [customerOpen, setCustomerOpen] = useState(false)
  const [confirmClearOpen, setConfirmClearOpen] = useState(false)

  const barcodeRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const prevCountRef = useRef(0)
  const badgeKeyRef = useRef(0)

  const debouncedCustomerQuery = useDebounce(customerQuery, 300)

  // -----------------------------------------------------------------------
  // Data fetching
  // -----------------------------------------------------------------------
  const { data: products, isLoading, error: productsError, refetch: refetchProducts } = useQuery({
    queryKey: ["pos-products", categoryId],
    queryFn: () =>
      fetch(
        `/api/pos/products${categoryId ? `?categoryId=${categoryId}` : ""}`,
      ).then((r) => r.json()),
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch("/api/categories").then((r) => r.json()),
  })

  const { data: recentCustomers } = useQuery({
    queryKey: ["recent-customers"],
    queryFn: () => fetch("/api/customers").then((r) => r.json()),
    select: (data: Customer[]) => data?.slice(0, 5) ?? [],
  })

  const { data: searchResults, isFetching: searchingCustomers } = useQuery({
    queryKey: ["customer-search", debouncedCustomerQuery],
    queryFn: () =>
      fetch(`/api/customers?search=${encodeURIComponent(debouncedCustomerQuery)}`).then((r) => r.json()),
    enabled: debouncedCustomerQuery.length > 0,
  })

  const createInvoice = useMutation({
    mutationFn: (data: any) =>
      fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => {
      toast.success("تمت عملية البيع بنجاح!")
      setCart([])
      setCustomerName("")
      setPaidAmount("")
      queryClient.invalidateQueries({
        queryKey: ["invoices", "pos-products", "dashboard"],
      })
    },
    onError: () => toast.error("فشلت عملية البيع"),
  })

  // -----------------------------------------------------------------------
  // Derived data
  // -----------------------------------------------------------------------
  const filteredProducts = search
    ? products?.filter(
        (p: any) =>
          p.nameAr?.includes(search) ||
          p.name?.includes(search) ||
          p.barcode?.includes(search),
      )
    : products

  const itemCount = cart.reduce((s, i) => s + i.quantity, 0)
  if (itemCount !== prevCountRef.current) {
    prevCountRef.current = itemCount
    badgeKeyRef.current += 1
  }

  // -----------------------------------------------------------------------
  // Keyboard shortcuts
  // -----------------------------------------------------------------------
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement
      ) {
        if (!["F1", "F3"].includes(e.key)) return
      }
      switch (e.key) {
        case "F1":
          e.preventDefault()
          barcodeRef.current?.focus()
          break
        case "F3":
          e.preventDefault()
          searchRef.current?.focus()
          break
        case "Escape":
          setSearch("")
          setBarcodeInput("")
          searchRef.current?.blur()
          barcodeRef.current?.blur()
          break
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // Focus barcode input on mount
  useEffect(() => {
    barcodeRef.current?.focus()
  }, [])

  // -----------------------------------------------------------------------
  // Cart actions
  // -----------------------------------------------------------------------
  const addToCart = useCallback((product: any, isScanned = false) => {
    if (product.stock <= 0) return toast.error("المخزون غير كافٍ")
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) {
          toast.error("المخزون غير كافٍ")
          return prev
        }
        return prev.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + 1, isScanned: isScanned || i.isScanned }
            : i,
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.nameAr || product.name,
          price: Number(product.price),
          quantity: 1,
          stock: product.stock,
          isScanned,
        },
      ]
    })
  }, [])

  // -----------------------------------------------------------------------
  // Barcode handler
  // -----------------------------------------------------------------------
  const handleBarcodeSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!barcodeInput || !products) return
      const product = products.find((p: any) => p.barcode === barcodeInput)
      if (product) {
        addToCart(product, true)
        playClick()
        toast.success(`تم مسح ${product.nameAr || product.name}`)
      } else {
        toast.error("المنتج غير موجود")
      }
      setBarcodeInput("")
    },
    [barcodeInput, products, addToCart],
  )

  // -----------------------------------------------------------------------
  // Checkout handler
  // -----------------------------------------------------------------------
  const handleCheckout = useCallback(() => {
    if (!session?.user?.id) return toast.error("يجب تسجيل الدخول")
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0)
    const paid = Number(paidAmount) || 0
    createInvoice.mutate({
      userId: (session.user as any).id,
      customerName: customerName || undefined,
      total,
      discount: 0,
      tax: 0,
      grandTotal: total,
      paid: paid || total,
      items: cart.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
        total: i.price * i.quantity,
      })),
    })
  }, [session, cart, paidAmount, customerName, createInvoice])

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div dir="rtl" className="flex h-full select-none bg-secondary">
      {/* LEFT — Products */}
      <div className="flex-1 flex flex-col min-w-0 p-5 overflow-auto">
        {/* Barcode scanner bar */}
        <BarcodeInput
          value={barcodeInput}
          onChange={setBarcodeInput}
          onSubmit={handleBarcodeSubmit}
          inputRef={barcodeRef}
        />

        {/* Product grid with search & filter */}
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={productsError}
          onRefetch={refetchProducts}
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          selectedCategoryId={categoryId}
          onCategoryChange={setCategoryId}
          onProductClick={addToCart}
          searchInputRef={searchRef}
          formatCurrency={formatCurrency}
        />
      </div>

      {/* RIGHT — Cart Panel */}
      <CartPanel
        cart={cart}
        onCartChange={setCart}
        badgeKey={badgeKeyRef.current}
        paidAmount={paidAmount}
        onPaidAmountChange={setPaidAmount}
        customerName={customerName}
        onCustomerNameChange={setCustomerName}
        customerQuery={customerQuery}
        onCustomerQueryChange={setCustomerQuery}
        customerOpen={customerOpen}
        onCustomerOpenChange={setCustomerOpen}
        recentCustomers={recentCustomers}
        searchResults={searchResults}
        searchingCustomers={searchingCustomers}
        debouncedCustomerQuery={debouncedCustomerQuery}
        confirmClearOpen={confirmClearOpen}
        onConfirmClearOpenChange={setConfirmClearOpen}
        onCheckout={handleCheckout}
        isCheckoutPending={createInvoice.isPending}
        hasSession={!!session?.user?.id}
        formatCurrency={formatCurrency}
      />
    </div>
  )
}
