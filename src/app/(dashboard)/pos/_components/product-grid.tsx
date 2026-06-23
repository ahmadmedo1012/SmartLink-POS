"use client"

import { Search, Package, Hash, ChevronDown, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Product {
  id: string
  name: string
  nameAr?: string
  price: number
  stock: number
  minStock?: number
  barcode?: string
  imageUrl?: string
}

export interface Category {
  id: string
  name: string
  nameAr?: string
}

export interface ProductGridProps {
  /** The list of products to display (pre-filtered by the caller) */
  products: Product[] | undefined
  /** True while products are being fetched */
  isLoading: boolean
  /** Truthy when the products query failed */
  error: Error | null
  /** Called to refetch products (e.g. on retry) */
  onRefetch: () => void
  /** Current search text */
  search: string
  /** Called when the search input changes */
  onSearchChange: (value: string) => void
  /** Available categories for the dropdown filter */
  categories: Category[] | undefined
  /** Currently selected category ID */
  selectedCategoryId: string
  /** Called when the category selector changes */
  onCategoryChange: (categoryId: string) => void
  /** Called when a product is clicked */
  onProductClick: (product: Product) => void
  /** Ref forwarded to the search input (for F3 keyboard shortcut) */
  searchInputRef: React.RefObject<HTMLInputElement | null>
  /** Optional currency formatter */
  formatCurrency: (value: number) => string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ProductGrid({
  products,
  isLoading,
  error,
  onRefetch,
  search,
  onSearchChange,
  categories,
  selectedCategoryId,
  onCategoryChange,
  onProductClick,
  searchInputRef,
  formatCurrency,
}: ProductGridProps) {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-auto">
      {/* ---- Filters ---- */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="بحث عن منتج..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-9"
          />
        </div>

        <div className="relative">
          <select
            value={selectedCategoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="appearance-none h-9 rounded-lg border border-input bg-background px-3 pr-8 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">جميع الأقسام</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nameAr || cat.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>

      {/* ---- Product grid / states ---- */}

      {/* Error state */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
          <p className="text-sm font-medium text-foreground mb-2">
            فشل تحميل المنتجات
          </p>
          <Button variant="secondary" size="sm" onClick={onRefetch}>
            إعادة المحاولة
          </Button>
        </div>
      ) : isLoading ? (
        /* Loading skeleton */
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-card border border-border shadow-card animate-pulse h-[178px]"
            />
          ))}
        </div>
      ) : (
        /* Product cards grid */
        <motion.div
          layout
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {products?.map((product) => (
              <motion.button
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => onProductClick(product)}
                className={cn(
                  "group text-right cursor-pointer w-full",
                  "bg-card text-card-foreground border-border rounded-2xl p-3",
                  "shadow-card transition-all duration-200",
                  "hover:border-primary hover:shadow-md",
                  "active:scale-[0.98]",
                  "focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2",
                )}
              >
                {/* Product thumbnail / icon */}
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-2.5 overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.nameAr || product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <Package className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>

                {/* Name */}
                <div className="text-sm font-semibold truncate leading-tight text-right">
                  {product.nameAr || product.name}
                </div>

                {/* Barcode */}
                {product.barcode && (
                  <div className="text-[10px] mt-0.5 font-mono truncate text-muted-foreground text-right">
                    <Hash className="inline w-2.5 h-2.5 align-text-top ml-0.5" />
                    {product.barcode}
                  </div>
                )}

                {/* Price */}
                <div className="text-sm font-bold mt-2 text-primary">
                  {formatCurrency(Number(product.price))}
                </div>

                {/* Stock badge */}
                <div className="mt-2">
                  <Badge
                    variant={
                      product.stock <= (product.minStock ?? 5)
                        ? "danger"
                        : "success"
                    }
                    size="sm"
                  >
                    {product.stock <= (product.minStock ?? 5)
                      ? `${product.stock} متبقي`
                      : `${product.stock} في المخزون`}
                  </Badge>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty state when no products match filter */}
      {!isLoading && products?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Package className="w-12 h-12 mb-3 opacity-40" />
          <p className="text-sm">لا توجد منتجات مطابقة</p>
        </div>
      )}
    </div>
  )
}
