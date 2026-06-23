"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Search, Edit2, Package, Download, AlertCircle, X } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { PageHeader, PageShell } from "@/components/page-shell"
import { EmptyState } from "@/components/empty-state"
import { downloadCSV } from "@/lib/csv"
import { formatCurrency } from "@/lib/currency"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Product {
  id: string
  name: string
  nameAr: string
  barcode: string
  imageUrl: string | null
  price: number
  cost: number | null
  stock: number
  minStock: number
  categoryId: string | null
  category: { id: string; name: string; nameAr: string } | null
}

interface Category {
  id: string
  name: string
  nameAr: string
}

interface ProductsResponse {
  products: Product[]
  total: number
  pages: number
  page: number
}

interface ProductForm {
  name: string
  nameAr: string
  barcode: string
  imageUrl: string
  price: string
  cost: string
  stock: string
  minStock: string
  categoryId: string
}

const emptyForm: ProductForm = {
  name: "",
  nameAr: "",
  barcode: "",
  imageUrl: "",
  price: "",
  cost: "",
  stock: "0",
  minStock: "0",
  categoryId: "",
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border bg-secondary/50">
        <div className="flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 bg-muted rounded flex-1 shimmer" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-muted rounded w-1/3 shimmer" />
              <div className="h-2 bg-muted rounded w-1/5 shimmer" />
            </div>
            <div className="h-3 bg-muted rounded w-16 shimmer" />
            <div className="h-3 bg-muted rounded w-12 shimmer" />
            <div className="h-6 w-16 bg-muted rounded-lg shimmer" />
            <div className="h-8 w-8 bg-muted rounded-lg shimmer" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ProductsPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyForm)

  // Reset pagination on search change
  useEffect(() => setPage(1), [search])

  // --- Queries ---

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery<ProductsResponse>({
    queryKey: ["products", search, page],
    queryFn: () =>
      fetch(`/api/products?search=${encodeURIComponent(search)}&page=${page}&pageSize=20`).then(
        (r) => {
          if (!r.ok) throw new Error("Failed to load products")
          return r.json()
        },
      ),
  })

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("/api/categories").then((r) => {
        if (!r.ok) throw new Error("Failed to load categories")
        return r.json()
      }),
  })

  // --- Mutations ---

  const saveMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      fetch("/api/products", {
        method: data.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => {
        if (!r.ok) throw new Error("Save failed")
        return r.json()
      }),
    onSuccess: () => {
      toast.success(editing ? "Product updated" : "Product added")
      setOpen(false)
      setEditing(null)
      setForm(emptyForm)
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: () => toast.error("Failed to save product"),
  })

  // --- Handlers ---

  const openEdit = (product: Product) => {
    setEditing(product)
    setForm({
      name: product.name,
      nameAr: product.nameAr || "",
      barcode: product.barcode || "",
      imageUrl: product.imageUrl || "",
      price: String(product.price),
      cost: product.cost ? String(product.cost) : "",
      stock: String(product.stock),
      minStock: String(product.minStock),
      categoryId: product.categoryId || "",
    })
    setOpen(true)
  }

  const openAdd = () => {
    setEditing(null)
    setForm(emptyForm)
    setOpen(true)
  }

  const handleSave = () => {
    saveMutation.mutate({
      id: editing?.id,
      ...form,
      price: Number(form.price),
      cost: form.cost ? Number(form.cost) : null,
      stock: Number(form.stock),
      minStock: Number(form.minStock),
    })
  }

  const handleExportCSV = () => {
    if (!products?.products?.length) return
    downloadCSV(
      ["Product", "Barcode", "Category", "Price", "Stock"],
      products.products.map((p: Product) => [
        p.nameAr || p.name,
        p.barcode || "",
        p.category?.nameAr || p.category?.name || "",
        String(p.price),
        String(p.stock),
      ]),
      "products.csv",
    )
  }

  const canSave =
    form.name.trim() &&
    form.price &&
    Number(form.price) > 0 &&
    !isNaN(Number(form.stock)) &&
    !isNaN(Number(form.minStock))

  // --- Pagination ---

  const totalPages = products?.pages ?? 1
  const pageNumbers: number[] = []
  for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
    pageNumbers.push(i)
  }

  // --- Render ---

  return (
    <PageShell>
      {/* Header */}
      <PageHeader
        title="المنتجات"
        subtitle={`${products?.total ?? 0} منتج`}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExportCSV}
              disabled={!products?.products?.length}
            >
              <Download className="w-4 h-4" />
              CSV
            </Button>
            <Button size="sm" onClick={openAdd}>
              <Plus className="w-4 h-4" />
              إضافة منتج
            </Button>
          </div>
        }
      />

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="بحث بالاسم أو الباركود..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            aria-label="مسح"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-muted hover:bg-border text-muted-foreground transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "تعديل المنتج" : "إضافة منتج"}</DialogTitle>
            <DialogDescription>
              {editing ? "قم بتحديث بيانات المنتج" : "أدخل بيانات المنتج الجديد"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="col-span-2 space-y-1.5">
              <label htmlFor="product-name-en" className="text-xs font-medium text-muted-foreground">الاسم (إنجليزي)</label>
              <Input
                id="product-name-en"
                placeholder="الاسم (إنجليزي)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label htmlFor="product-name-ar" className="text-xs font-medium text-muted-foreground">الاسم (عربي)</label>
              <Input
                id="product-name-ar"
                placeholder="الاسم (عربي)"
                value={form.nameAr}
                onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="product-barcode" className="text-xs font-medium text-muted-foreground">الباركود</label>
              <Input
                id="product-barcode"
                placeholder="الباركود"
                value={form.barcode}
                onChange={(e) => setForm({ ...form, barcode: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="product-image" className="text-xs font-medium text-muted-foreground">رابط الصورة</label>
              <Input
                id="product-image"
                placeholder="رابط الصورة"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="product-category" className="text-xs font-medium text-muted-foreground">الفئة</label>
              <select
                id="product-category"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors duration-150 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 dark:bg-card dark:border-border"
              >
                <option value="">بدون فئة</option>
                {categories?.map((c: Category) => (
                  <option key={c.id} value={c.id}>
                    {c.nameAr || c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="product-price" className="text-xs font-medium text-muted-foreground">السعر</label>
              <Input
                id="product-price"
                placeholder="السعر"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="product-cost" className="text-xs font-medium text-muted-foreground">التكلفة</label>
              <Input
                id="product-cost"
                placeholder="التكلفة"
                type="number"
                step="0.01"
                min="0"
                value={form.cost}
                onChange={(e) => setForm({ ...form, cost: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="product-stock" className="text-xs font-medium text-muted-foreground">المخزون</label>
              <Input
                id="product-stock"
                placeholder="المخزون"
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="product-minstock" className="text-xs font-medium text-muted-foreground">الحد الأدنى</label>
              <Input
                id="product-minstock"
                placeholder="الحد الأدنى"
                type="number"
                min="0"
                value={form.minStock}
                onChange={(e) => setForm({ ...form, minStock: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setOpen(false)
                setEditing(null)
                setForm(emptyForm)
              }}
            >
              إلغاء
            </Button>
            <Button
              className="flex-1"
              onClick={handleSave}
              disabled={!canSave || saveMutation.isPending}
              loading={saveMutation.isPending}
            >
              {saveMutation.isPending ? "جاري الحفظ..." : editing ? "تحديث" : "حفظ"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* States: Error / Loading / Empty / Table */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
          <p className="text-sm font-medium text-foreground mb-2">فشل تحميل المنتجات</p>
          <p className="text-xs text-muted-foreground mb-4">تحقق من الاتصال وحاول مرة أخرى</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            إعادة المحاولة
          </Button>
        </div>
      ) : isLoading ? (
        <TableSkeleton />
      ) : products?.products?.length === 0 ? (
        <EmptyState
          icon={Package}
          title={search ? "لا توجد نتائج" : "لا توجد منتجات"}
          description={search ? "جرب كلمة بحث مختلفة" : "أضف منتجك الأول للبدء"}
          action={
            search
              ? undefined
              : { label: "إضافة منتج", onClick: openAdd }
          }
        />
      ) : (
        <>
          {/* Table */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المنتج</TableHead>
                  <TableHead>الباركود</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>المخزون</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.products?.map((p: Product) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="font-medium text-sm">{p.nameAr || p.name}</div>
                      {p.nameAr && p.name && (
                        <div className="text-xs text-muted-foreground">{p.name}</div>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {p.barcode || <span className="text-muted-foreground/50">&mdash;</span>}
                    </TableCell>
                    <TableCell>
                      {p.category ? (
                        <Badge variant="secondary" size="sm" className="font-normal">
                          {p.category.nameAr || p.category.name}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground/50">&mdash;</span>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold tabular-nums text-primary dark:text-accent">
                      {formatCurrency(Number(p.price))}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          Number(p.stock) === 0
                            ? "danger"
                            : Number(p.stock) <= Number(p.minStock)
                              ? "warning"
                              : "success"
                        }
                        size="sm"
                      >
                        {Number(p.stock) === 0
                          ? "نفد"
                          : Number(p.stock) <= Number(p.minStock)
                            ? `منخفض (${p.stock})`
                            : p.stock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(p)}
                        aria-label="تعديل المنتج"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
                <span className="text-xs text-muted-foreground">
                  الصفحة {page} من {totalPages}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    السابق
                  </Button>
                  {pageNumbers.map((n) => (
                    <Button
                      key={n}
                      variant={n === page ? "default" : "secondary"}
                      size="sm"
                      className="min-w-[32px]"
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </Button>
                  ))}
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    التالي
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Summary row */}
          <p className="text-xs text-muted-foreground text-center">
            عرض {products?.products?.length ?? 0} من {products?.total ?? 0} منتج
          </p>
        </>
      )}
    </PageShell>
  )
}
